# Lale-Chat einrichten (für die GitHub-Version)

Im **claude.ai-Link** funktioniert „Lale'ye sor“ ohne Einrichtung.
Damit der Chat auch auf **GitHub Pages** läuft, braucht es einmalig einen kleinen
Server. Er hält deinen KI-Schlüssel geheim, denn der darf nie öffentlich auf der Webseite stehen.
Dafür nehmen wir einen **Cloudflare Worker**. Für dieses Projekt ist er kostenlos.

## Was du brauchst

1. Ein **Anthropic-Konto** mit API-Schlüssel: <https://console.anthropic.com>
   → Settings → API Keys → „Create Key“. Den Schlüssel (`sk-ant-…`) kopieren.
2. Ein kostenloses **Cloudflare-Konto**: <https://dash.cloudflare.com/sign-up>
3. Einen Computer mit **Node.js** (<https://nodejs.org>, Version 20 oder neuer)

## Einrichtung (ca. 10 Minuten)

Im Terminal, im Ordner `worker/` dieses Repos:

```bash
cd worker
npm install
npx wrangler login                       # öffnet den Browser, bei Cloudflare anmelden
npx wrangler secret put ANTHROPIC_API_KEY  # den sk-ant-… Schlüssel einfügen, Enter
npx wrangler deploy
```

Am Ende zeigt `deploy` eine Adresse wie:

```
https://lale-chat.<dein-name>.workers.dev
```

## Adresse in die App eintragen

**Variante A (für alle Geräte):** In `docs/config.js` eintragen und auf GitHub mergen:

```js
window.HUMANUR_CONFIG = {
  chatUrl: 'https://lale-chat.<dein-name>.workers.dev'
};
```

**Variante B (nur dieses Gerät):** In der App unter **Ayarlar → Lale sohbeti** einfügen.

Schick mir die Adresse auch gern einfach im Chat, dann trage ich sie ein.

## Kosten und Sicherheit

- Jede Frage kostet bei Anthropic etwa **1–2 Cent** (Modell Claude Opus 5.5, kurze Antworten).
  Lege in der Anthropic-Konsole unter **Limits** ein **monatliches Ausgabenlimit** fest, z. B. 5 €.
  Dann kann es nie teurer werden.
- Der Worker nimmt nur Anfragen von `https://enesdoudouzi-sys.github.io` an
  (`ALLOWED_ORIGINS` in `wrangler.toml`), höchstens 500 Zeichen pro Nachricht
  und die letzten 20 Nachrichten.
- Lale hat feste Kinder-Regeln (kurz, freundlich, keine persönlichen Daten,
  bei schwierigen Glaubensfragen: „Frag deine Eltern oder deinen Hoca“).
  Die Regeln stehen in `src/index.js` (`SYSTEM_PROMPT`).
- Lehnt die KI eine Frage ab, antwortet Lale freundlich, dass ein Erwachsener helfen soll.

## Testen

```bash
curl -X POST https://lale-chat.<dein-name>.workers.dev \
  -H "Origin: https://enesdoudouzi-sys.github.io" \
  -H "Content-Type: application/json" \
  -d '{"messages":[{"role":"user","content":"Elif nasıl okunur?"}]}'
```

Die Antwort sieht so aus: `{"reply":"…"}`.
