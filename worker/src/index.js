// Lale chat backend for Hümanur'un Kur'an Yolculuğu.
// A Cloudflare Worker that keeps the Anthropic API key secret and forwards a
// child's question to Claude with kid-safe instructions.
import Anthropic from "@anthropic-ai/sdk";

export const SYSTEM_PROMPT = `Sen "Lale"sin: Hümanur'un Kur'an Yolculuğu uygulamasındaki neşeli, sevecen bir lale çiçeği. Küçük bir çocukla (yaklaşık 5-10 yaş) konuşuyorsun.

Görevin:
- Arapça harfler (Elifbe), harekeler (üstün, esre, ötre), cezm, şedde, tenvin, med, harflerin mahreci, kısa sûreler, dualar, abdest, namaz ve temel İslami bilgiler hakkında çocuğun sorularını cevaplamak.
- Uygulamadaki bölümleri önerebilirsin: Elifbe, Hece, Okuma Dersleri, Sûreler, Dualar, Namaz, Esmâ, Kıssalar, Bugünkü dersim.

Nasıl konuşursun:
- Çocuk hangi dilde yazarsa o dilde cevap ver (genellikle Türkçe, bazen Almanca).
- Çok kısa cevap ver: en fazla 3-4 kısa cümle. Basit kelimeler kullan. Bir emoji kullanabilirsin.
- Arapça örnek verirken harekeli Arapça yaz ve yanına Türkçe okunuşunu ekle, örneğin: بَ (ba).
- Sıcak ve cesaret verici ol, çocuğu öv.

Kurallar:
- İslami bilgileri Diyanet İşleri Başkanlığı'nın yaygın, ana akım görüşlerine uygun ve sade anlat. Emin olmadığın bir şeyi uydurma; "Bunu hocana sorarsan çok güzel olur" de.
- Fıkhî ayrıntılar, mezhep farklılıkları, tartışmalı veya korkutucu konular (cehennem, ölüm, savaş gibi) sorulursa kısaca ve yumuşak cevap ver, sonra "Bunu annene, babana veya hocana sor" de.
- Kur'an âyetlerini kelimesi kelimesine sadece eminsen yaz; değilsen uygulamadaki Sûreler bölümüne yönlendir.
- Çocuktan asla kişisel bilgi (adres, okul, telefon, şifre, fotoğraf) isteme; paylaşırsa bunu kimseye söylememesi gerektiğini nazikçe hatırlat.
- Çocuğa uygun olmayan bir şey istenirse kibarca reddet ve konuyu harflere veya bir sûreye getir.
- Uygulamayla ilgisiz basit sorulara (renkler, hayvanlar gibi) kısa ve neşeli cevap verebilirsin, sonra öğrenmeye geri davet et.
- Bir insan değil, bir yapay zekâ yardımcısı olduğunu sorulursa dürüstçe söyle.`;

const MAX_MESSAGES = 20;     // conversation turns kept per request
const MAX_CHARS = 500;       // per message
const KID_FALLBACK = "Bu soruyu en iyi annen, baban veya hocan cevaplar. 🌷 İstersen bana bir harf sor!";

function corsHeaders(origin, env){
  const allowed = (env.ALLOWED_ORIGINS || "").split(",").map(s=> s.trim()).filter(Boolean);
  const ok = allowed.includes(origin) || /^http:\/\/localhost(:\d+)?$/.test(origin || "");
  return {
    "Access-Control-Allow-Origin": ok ? origin : allowed[0] || "null",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Vary": "Origin"
  };
}
const json = (body, status, headers)=> new Response(JSON.stringify(body), {status, headers:{...headers, "Content-Type":"application/json"}});

// Accepts [{role:"user"|"assistant", content:string}, ...] ending with a user turn.
export function validateMessages(messages){
  if(!Array.isArray(messages) || messages.length === 0) return null;
  const clean = messages.slice(-MAX_MESSAGES).map(m=> ({
    role: m && m.role === "assistant" ? "assistant" : "user",
    content: String((m && m.content) || "").slice(0, MAX_CHARS).trim()
  })).filter(m=> m.content);
  while(clean.length && clean[0].role !== "user") clean.shift();
  if(!clean.length || clean[clean.length - 1].role !== "user") return null;
  // Merge accidental consecutive turns of the same role.
  const merged = [];
  for(const m of clean){
    const last = merged[merged.length - 1];
    if(last && last.role === m.role) last.content += "\n" + m.content;
    else merged.push({...m});
  }
  return merged;
}

export default {
  async fetch(request, env){
    const origin = request.headers.get("Origin") || "";
    const cors = corsHeaders(origin, env);
    if(request.method === "OPTIONS") return new Response(null, {status:204, headers:cors});
    if(request.method !== "POST") return json({error:"method_not_allowed"}, 405, cors);
    if(cors["Access-Control-Allow-Origin"] !== origin) return json({error:"forbidden_origin"}, 403, cors);
    if(!env.ANTHROPIC_API_KEY) return json({error:"not_configured"}, 500, cors);
    // The Origin header only stops browsers; scripts can fake it. These limits
    // keep strangers from running up the API bill.
    if(Number(request.headers.get("Content-Length") || 0) > 20000) return json({error:"too_large"}, 413, cors);
    if(env.LIMITER){
      const {success} = await env.LIMITER.limit({key: request.headers.get("CF-Connecting-IP") || "unknown"});
      if(!success) return json({error:"busy"}, 429, cors);
    }

    let body;
    try{ body = await request.json(); }catch(e){ return json({error:"bad_json"}, 400, cors); }
    const messages = validateMessages(body && body.messages);
    if(!messages) return json({error:"bad_messages"}, 400, cors);

    const client = new Anthropic({apiKey: env.ANTHROPIC_API_KEY});
    try{
      const response = await client.beta.messages.create({
        model: "claude-opus-5-5",
        max_tokens: 1000, // answers are deliberately short (3-4 sentences)
        output_config: {effort: "low"},
        betas: ["server-side-fallback-2026-07-01"],
        fallbacks: "default",
        system: SYSTEM_PROMPT,
        messages
      });
      if(response.stop_reason === "refusal") return json({reply: KID_FALLBACK}, 200, cors);
      const reply = response.content.filter(b=> b.type === "text").map(b=> b.text).join("\n").trim();
      return json({reply: reply || KID_FALLBACK}, 200, cors);
    }catch(error){
      if(error instanceof Anthropic.RateLimitError) return json({error:"busy"}, 429, cors);
      if(error instanceof Anthropic.AuthenticationError) return json({error:"not_configured"}, 500, cors);
      if(error instanceof Anthropic.BadRequestError) return json({error:"bad_request"}, 400, cors);
      if(error instanceof Anthropic.APIError) return json({error:"upstream", status:error.status}, 502, cors);
      return json({error:"network"}, 502, cors);
    }
  }
};
