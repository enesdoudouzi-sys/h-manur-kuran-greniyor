// Elif-Ba content (dualar, namaz, esmâ, kıssalar, bilgi hazinesi, ödüller, ebeveyn paneli)
// integrated into Hümanur'un Kur'an Yolculuğu. Loaded after script.js.

/* Content taken over from the former Elif-Ba Yolculuğu app. */
const MK=['َ','ِ','ُ'];
const EB_LET=[
['ا','Elif','',0,0,'Tek başına ses taşımaz; harekelerle birlikte e, i, u sesini verir.'],
['ب','Be','b',0,1,''],['ت','Te','t',0,1,''],
['ث','Se','s',0,1,'Dilin ucu üst dişlerin arasına konur; peltek “s” gibi okunur.'],
['ج','Cim','c',0,1,''],
['ح','Ha','h',0,1,'Boğazdan çıkan hafif ve ince “h”.'],
['خ','Hı','h',1,1,'Boğazdan çıkan kalın ve hırıltılı “h”.'],
['د','Dal','d',0,0,''],
['ذ','Zel','z',0,0,'Dil dişlerin arasında, peltek “z” gibi okunur.'],
['ر','Ra','r',0,0,''],['ز','Ze','z',0,0,''],['س','Sin','s',0,1,''],['ش','Şın','ş',0,1,''],
['ص','Sad','s',1,1,'Kalın “s”. Ağız dolgun, dil geriye çekilir.'],
['ض','Dad','d',1,1,'Kalın “d”. Dilin yan kenarıyla çıkar.'],
['ط','Tı','t',1,1,'Kalın “t”.'],
['ظ','Zı','z',1,1,'Kalın ve peltek “z”.'],
['ع','Ayn',"'",0,1,'Boğazın derinlerinden çıkan ses. Türkçede karşılığı yoktur.'],
['غ','Gayn','ğ',1,1,'Boğazdan, gargara yapar gibi çıkan kalın “ğ”.'],
['ف','Fe','f',0,1,''],
['ق','Kaf','k',1,1,'Kalın “k”. Dilin arka kısmıyla, boğaza yakın çıkar.'],
['ك','Kef','k',0,1,''],['ل','Lam','l',0,1,''],['م','Mim','m',0,1,''],['ن','Nun','n',0,1,''],
['و','Vav','v',0,0,''],['ه','He','h',0,1,''],['ي','Ye','y',0,1,'']
].map(a=>({ch:a[0],name:a[1],s:a[2],heavy:a[3],join:a[4],tip:a[5]}));
const DUA=[
{id:'besmele',t:'Besmele',w:'Her işe başlarken',ar:'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ',ok:'Bismillâhirrahmânirrahîm',m:'Rahman ve Rahim olan Allah’ın adıyla.'},
{id:'yemek1',t:'Yemekten Önce',w:'Sofraya otururken',ar:'بِسْمِ اللَّهِ وَعَلَىٰ بَرَكَةِ اللَّهِ',ok:'Bismillâhi ve alâ bereketillâh',m:'Allah’ın adıyla ve Allah’ın bereketiyle.'},
{id:'yemek2',t:'Yemekten Sonra',w:'Yemek bittiğinde',ar:'الْحَمْدُ لِلَّهِ الَّذِي أَطْعَمَنَا وَسَقَانَا وَجَعَلَنَا مِنَ الْمُسْلِمِينَ',ok:'Elhamdü lillâhillezî at\'amenâ ve sekânâ ve cealenâ minel müslimîn',m:'Bizi doyuran, içiren ve Müslümanlardan kılan Allah’a hamdolsun.'},
{id:'uyan',t:'Uyanınca',w:'Sabah yataktan kalkarken',ar:'الْحَمْدُ لِلَّهِ الَّذِي أَحْيَانَا بَعْدَ مَا أَمَاتَنَا وَإِلَيْهِ النُّشُورُ',ok:'Elhamdü lillâhillezî ahyânâ ba\'de mâ emâtenâ ve ileyhin nüşûr',m:'Bizi öldürdükten (uykudan) sonra dirilten Allah’a hamdolsun. Dönüş O’nadır.'},
{id:'uyku',t:'Uyumadan Önce',w:'Akşam yatarken',ar:'اللَّهُمَّ بِاسْمِكَ أَمُوتُ وَأَحْيَا',ok:'Allâhümme bismike emûtü ve ahyâ',m:'Allah’ım, senin adınla uyur ve senin adınla uyanırım.'},
{id:'cikis',t:'Evden Çıkarken',w:'Kapıdan çıkarken',ar:'بِسْمِ اللَّهِ تَوَكَّلْتُ عَلَى اللَّهِ وَلَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ',ok:'Bismillâhi tevekkeltü alallâhi ve lâ havle ve lâ kuvvete illâ billâh',m:'Allah’ın adıyla çıkıyorum. Allah’a güvendim. Güç ve kuvvet ancak Allah’tandır.'},
{id:'anne',t:'Anne Baba İçin',w:'Anne babaya dua ederken',ar:'رَبِّ ارْحَمْهُمَا كَمَا رَبَّيَانِي صَغِيرًا',ok:'Rabbirhamhümâ kemâ rabbeyânî sağîrâ',m:'Rabbim, küçükken beni yetiştirdikleri gibi sen de onlara merhamet et.'},
{id:'ilim',t:'İlim İçin',w:'Ders çalışmadan önce',ar:'رَبِّ زِدْنِي عِلْمًا',ok:'Rabbi zidnî ilmâ',m:'Rabbim, ilmimi artır.'},
{id:'rabbena',t:'Rabbenâ Âtinâ',w:'Her zaman',ar:'رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ',ok:'Rabbenâ âtinâ fid dünyâ haseneten ve fîl âhirati haseneten ve kınâ azâben nâr',m:'Rabbimiz, bize dünyada iyilik ver, ahirette de iyilik ver ve bizi ateş azabından koru.'}
];
const HIK=[
{id:'fil',t:'Fil Yılı: Küçük Kuşların Gücü',k:'Fîl Suresi',p:[
'Çok eskiden Mekke’de Kâbe vardı. Yemen’i yöneten Ebrehe adlı bir komutan, insanlar Kâbe yerine kendi yaptırdığı kiliseye gelsin istiyordu. Bu yüzden büyük bir ordu ve koca filler alıp Kâbe’yi yıkmaya yürüdü.',
'Mekkeliler bu orduya karşı koyamayacaklarını anlayınca dağlara çekildiler. Kâbe’nin bakıcısı Abdülmuttalib, “Ben develerimin sahibiyim, Kâbe’nin de bir sahibi var, O onu korur” dedi.',
'Ordu Mekke’ye yaklaşınca gökyüzü karardı. Allah sürü sürü küçük kuşlar gönderdi. Kuşlar gagalarındaki taşları ordunun üzerine bıraktı. Güçlü ordu dağıldı ve Kâbe’ye zarar veremedi.',
'Aynı yıl Mekke’de Peygamberimiz Hz. Muhammed (s.a.v.) dünyaya geldi. O yıla bu yüzden “Fil Yılı” denir.'],
d:'Allah’ın evi ve inananları korumak için çok büyük ordulara gerek yoktur. Kibirlenenler ne kadar güçlü olursa olsun, Allah’ın karşısında duramaz.'},
{id:'karinca',t:'Süleyman ve Karınca',k:'Neml Suresi',p:[
'Hz. Süleyman Peygamber’e Allah hayvanların dilini de öğretmişti. Bir gün ordusuyla birlikte bir karınca vadisinden geçiyordu.',
'Küçük bir karınca durup yüksek sesle uyardı: “Ey karıncalar! Yuvalarınıza girin ki Süleyman ve ordusu farkına varmadan sizi ezmesin.”',
'Süleyman karıncanın sözünü duyunca gülümsedi. Hemen Allah’a şükretti ve ondan hep iyi işler yapmayı nasip etmesini diledi.',
'Hz. Süleyman çok büyük bir kral olduğu halde, küçücük bir karıncayı bile önemsedi ve ona kızmadı.'],
d:'Küçük de olsa herkesin bir değeri vardır. Güçlü olan, zayıfları korur ve nimetler için Allah’a şükreder.',
dua:{ar:'رَبِّ أَوْزِعْنِي أَنْ أَشْكُرَ نِعْمَتَكَ الَّتِي أَنْعَمْتَ عَلَيَّ',ok:'Rabbi evzı\'nî en eşkure ni\'metekelletî en\'amte aleyye',m:'Rabbim, bana verdiğin nimetlere şükretmeyi nasip et.'}},
{id:'yunus',t:'Yunus ve Balığın Karnı',k:'Enbiyâ Suresi',p:[
'Hz. Yunus Peygamber, kavmini Allah’a çağırdı ama insanlar dinlemedi. Yunus üzüldü, kızdı ve Allah’ın izni gelmeden şehirden ayrılıp bir gemiye bindi.',
'Denizde büyük bir fırtına çıktı. Gemi batmasın diye yolculardan biri denize atılacaktı; kura Yunus’a çıktı. Yunus denize düştü ve büyük bir balık onu yuttu.',
'Yunus balığın karnında, denizin karanlığında ve gecenin karanlığında kalmıştı. Ama o umudunu kaybetmedi, yalnız Allah’a yöneldi ve şu duayı etti.',
'Allah duasını kabul etti ve onu kurtardı. Yunus tekrar kavmine döndü; bu sefer insanlar inandı.'],
d:'Hata yapınca pes etmeyiz; Allah’a yönelip tövbe ederiz. Allah dua edenin sesini duyar.',
dua:{ar:'لَا إِلَٰهَ إِلَّا أَنتَ سُبْحَانَكَ إِنِّي كُنتُ مِنَ الظَّالِمِينَ',ok:'Lâ ilâhe illâ ente sübhâneke innî küntü minez zâlimîn',m:'Senden başka ilah yoktur. Sen her eksiklikten uzaksın. Ben kendime yazık edenlerden oldum.'}},
{id:'torun',t:'Secdedeki Torun',k:'Peygamberimizin sevgisi',p:[
'Peygamberimiz (s.a.v.) bir gün mescitte cemaate namaz kıldırıyordu. Küçük torunları Hasan ve Hüseyin de o sırada mescitteydi.',
'Peygamberimiz secdeye varınca çocuklardan biri koşup sırtına çıktı. Peygamberimiz onu incitmemek için başını kaldırmadı ve secdeyi uzattı.',
'Namaz bitince sahabeler, “Ey Allah’ın Resulü, secdeyi çok uzattın” dediler. Peygamberimiz torununun sırtında olduğunu, onu aceleyle indirmek istemediğini anlattı.',
'Bu olay Peygamberimiz’in çocuklara ne kadar sevgi ve sabırla davrandığını gösterir.'],
d:'Büyükler çocuklara sevgiyle ve sabırla davranır. Çocuklar da büyüklerine saygı gösterir.'}
];
const SAH=[
{id:'ebubekir',n:'Hz. Ebû Bekir',l:'Sıddîk (çok doğru olan)',p:[
'Hz. Ebû Bekir, Peygamberimiz’in en yakın arkadaşıydı. Peygamberimiz peygamber olduğunu söylediğinde hiç tereddüt etmeden “Doğru söylüyorsun” diyerek inandı. Bu yüzden ona “Sıddîk” denildi.',
'Hicret yolculuğunda Peygamberimiz’le birlikte Sevr Mağarası’nda saklandı. Mağarada Peygamberimiz ona, “Üzülme, Allah bizimle beraberdir” dedi.',
'Malını Müslümanlara yardım için harcadı. İşkence gören Bilal gibi köleleri satın alarak azat etti.'],
d:'Doğru söylemek, arkadaşına sadık kalmak ve malı iyilik için harcamak.'},
{id:'bilal',n:'Hz. Bilâl',l:'İlk müezzin',p:[
'Hz. Bilal, Habeşistan asıllı bir köleydi. Müslüman olunca efendisi ona çok eziyet etti. Sıcak kumlara yatırıp göğsüne ağır taşlar koydu.',
'Bilal bunca eziyete rağmen “Ehad, ehad (Allah bir tektir)” demekten vazgeçmedi. Hz. Ebû Bekir onu satın alıp özgür bıraktı.',
'Medine’de ezan okumaya başlayınca ilk müezzin oldu. Güzel sesiyle müminleri namaza çağırırdı.'],
d:'İnancından vazgeçmemek, zorluğa karşı sabretmek. Allah katında önemli olan renk veya sınıf değil, güzel ahlaktır.'},
{id:'omer',n:'Hz. Ömer',l:'Fârûk (hakkı bâtıldan ayıran)',p:[
'Hz. Ömer güçlü ve cesur biriydi. Müslüman olduktan sonra inananların açıkça namaz kılabilmesine destek oldu.',
'Halife olduğunda adaletiyle tanındı. İnsanların hâlini bizzat öğrenmek için geceleri şehri dolaştığı rivayet edilir.',
'Makamı büyüktü ama sade yaşar, kendisini halkından üstün görmezdi.'],
d:'Adil olmak, herkese eşit davranmak ve büyüklenmemek.'},
{id:'osman',n:'Hz. Osmân',l:'Zinnûreyn ve haya sahibi',p:[
'Hz. Osman çok zengin, aynı zamanda çok utangaç ve cömert biriydi. Peygamberimiz onun hayasından dolayı melekler bile utanır demişti.',
'Medine’de içilecek temiz su azdı. Rûme Kuyusu satılıktı. Hz. Osman kuyuyu satın alıp Müslümanlara vakfetti, herkes ücretsiz su içti.',
'Tebük Seferi’nde de ordunun hazırlanması için çok büyük yardımda bulundu.'],
d:'Cömert olmak, haya ve yardımseverlik. Malı insanlara hayır için harcamak.'},
{id:'ali',n:'Hz. Ali',l:'Esedullah (Allah’ın aslanı)',p:[
'Hz. Ali, Peygamberimiz’in amcasının oğluydu ve çocukluğundan beri onun yanında büyüdü. İlk Müslüman olanlar arasındadır.',
'Hicret gecesi, düşmanlar Peygamberimiz’in evini kuşatmıştı. Hz. Ali korkmadan onun yatağında yattı. Peygamberimiz de güvenle yola çıktı.',
'Bilgisi ve cesaretiyle tanındı. Gençlere, “Bilgi maldan daha değerlidir” diye öğüt verirdi.'],
d:'Cesur olmak, ilim öğrenmek ve arkadaşına güvenilir olmak.'},
{id:'musab',n:'Hz. Mus‘ab b. Umeyr',l:'İlk elçi, güzel ahlak',p:[
'Mus‘ab, Mekke’nin zengin ve şık giyinen bir gencidir. Müslüman olunca ailesi ona sert davrandı ve desteğini kesti. O rahat hayatı bırakıp sade yaşamayı seçti.',
'Peygamberimiz onu Medine’ye öğretmen olarak gönderdi. Kur’an okuyup anlattı, birçok insanın Müslüman olmasına vesile oldu.',
'Uhud Savaşı’nda sancağı taşırken şehit düştü.'],
d:'Rahatı değil doğruyu seçmek, öğrendiğini başkalarına güzel şekilde anlatmak.'},
{id:'enes',n:'Hz. Enes b. Mâlik',l:'Peygamberimizin küçük hizmetçisi',p:[
'Enes, daha küçük bir çocukken annesi onu Peygamberimiz’e hizmet etmesi için getirdi. Yaklaşık on yıl boyunca Peygamberimiz’in yanında kaldı.',
'Daha sonra Peygamberimiz’in kendisine hiç sert davranmadığını, hiç “Bunu neden yaptın?” diye azarlamadığını anlatırdı.',
'Enes çok yıllar yaşadı ve Peygamberimiz’den duyduğu hadisleri sonraki nesillere aktardı.'],
d:'Büyüklere hizmet etmek, çocuklara şefkatle davranmak.'}
];
DUA.push({id:'kadir',t:'Kadir Gecesi Duası',w:'Kadir gecesi ve Ramazan’da',ar:'اللَّهُمَّ إِنَّكَ عَفُوٌّ تُحِبُّ الْعَفْوَ فَاعْفُ عَنِّي',ok:'Allâhümme inneke afüvvün tühıbbül afve fa\'fü annî',m:'Allah’ım, sen çok affedicisin, affetmeyi seversin. Beni de affet.'});
const AB=[
['Niyet ve Besmele','Abdest almaya niyet et ve “Bismillâhirrahmânirrahîm” de.'],
['Elleri Yıka','Elleri bileklere kadar üç kez yıka. Parmak aralarını ovala.'],
['Ağzı Çalkala','Sağ elinle su alıp ağzını üç kez çalkala.'],
['Buruna Su Çek','Burnuna üç kez hafifçe su çek ve sümkür.'],
['Yüzü Yıka','Alından çene altına, kulak yumuşaklarına kadar üç kez yıka. Bu bir farzdır.'],
['Kolları Yıka','Önce sağ, sonra sol kolu dirseklerle birlikte üç kez yıka. Bu bir farzdır.'],
['Başı Mesh Et','Islak elini başının en az dörtte birine sür. Bu bir farzdır.'],
['Kulak ve Boyun','Islak parmaklarınla kulaklarını, elinin tersiyle ensenini sil.'],
['Ayakları Yıka','Önce sağ, sonra sol ayağı topuklarla birlikte üç kez yıka. Parmak aralarını ovala. Bu bir farzdır.'],
['Abdest Sonrası','Abdest bitince şehadet kelimesini söyle.','أَشْهَدُ أَنْ لَا إِلَٰهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ وَأَشْهَدُ أَنَّ مُحَمَّدًا عَبْدُهُ وَرَسُولُهُ','Eşhedü en lâ ilâhe illallâhü vahdehû lâ şerîke leh ve eşhedü enne Muhammeden abdühû ve resûlüh']
];
const AICON=[
 '<path d="M32 52C10 36 10 18 24 16c4 0 7 2 8 6 1-4 4-6 8-6 14 2 14 20-8 36Z"/>',
 '<rect x="18" y="30" width="28" height="22" rx="9"/><path d="M23 30V16M31 30V11M39 30V11M46 34V19"/><path class="dr" d="M10 14c0 0-4 6-4 9a4 4 0 0 0 8 0c0-3-4-9-4-9Z"/>',
 '<path d="M12 28Q32 58 52 28Q32 38 12 28Z"/><path d="M20 31h24"/><path class="dr" d="M50 10c0 0-4 6-4 9a4 4 0 0 0 8 0c0-3-4-9-4-9Z"/>',
 '<path d="M32 10V38"/><path d="M22 40Q22 48 30 46M42 40Q42 48 34 46"/><path class="dr" d="M10 14c0 0-4 6-4 9a4 4 0 0 0 8 0c0-3-4-9-4-9Z"/>',
 '<circle cx="32" cy="32" r="20"/><circle cx="25" cy="27" r="1.500"/><circle cx="39" cy="27" r="1.500"/><path d="M24 39Q32 46 40 39"/>',
 '<path d="M8 48L26 30L36 40L56 20"/><circle cx="26" cy="30" r="3"/><path class="dr" d="M48 44c0 0-4 6-4 9a4 4 0 0 0 8 0c0-3-4-9-4-9Z"/>',
 '<circle cx="32" cy="36" r="18"/><path d="M14 32Q32 4 50 32"/><path d="M22 14L42 14"/>',
 '<path d="M24 50C14 40 18 14 34 14c14 0 16 18 6 24-6 4-2 12-10 12"/><path d="M28 28Q34 24 36 30"/>',
 '<path d="M22 10V40Q22 54 36 54H50Q56 54 56 47Q56 41 46 39L38 36V10Z"/><path d="M44 46h6"/><path class="dr" d="M10 36c0 0-4 6-4 9a4 4 0 0 0 8 0c0-3-4-9-4-9Z"/>',
 '<path d="M10 28Q12 52 32 54Q52 52 54 28"/><path d="M10 28L18 20M54 28L46 20"/><path d="M32 12v10M27 17h10"/>'
];
const abIcon=i=>`<svg viewBox="0 0 64 64" aria-hidden="true">${AICON[i]}</svg>`;
const POSE={
 kiyam:'<circle cx="60" cy="18" r="9"/><path d="M60 27V72M60 72L52 112M60 72L68 112M60 38L72 54L56 58"/>',
 ruku:'<circle cx="102" cy="64" r="9"/><path d="M40 66H93M40 66V112M88 66L42 92"/>',
 secde:'<circle cx="98" cy="104" r="8"/><path d="M14 112H46M46 112L44 74L86 98M86 98L84 112"/>',
 kade:'<circle cx="40" cy="40" r="9"/><path d="M40 49V98L74 102L28 112M40 62L58 82"/>',
 selam:'<circle cx="40" cy="40" r="9"/><path d="M40 49V98L74 102L28 112M40 62L58 82"/><path class="ac" d="M58 36H78M71 29L78 36L71 43"/>'
};
const pose=k=>`<div class="pose"><svg viewBox="0 0 120 120" aria-hidden="true">${POSE[k]}</svg></div>`;
const NM=[
['Niyet ve Tekbir','kiyam','Kıbleye dön, kılacağın namaza niyet et. “Allâhü ekber” diyerek elleri kaldır. Erkekler elleri kulak hizasına, kadınlar omuz hizasına kaldırır.','اللَّهُ أَكْبَرُ','Allâhü ekber'],
['Kıyam','kiyam','Elleri bağla. Sübhâneke’yi, sonra Eûzü-Besmele’yi oku, ardından Fâtiha ve bir sûre oku.','سُبْحَانَكَ اللَّهُمَّ وَبِحَمْدِكَ وَتَبَارَكَ اسْمُكَ وَتَعَالَىٰ جَدُّكَ وَلَا إِلَٰهَ غَيْرُكَ','Sübhânekellâhümme ve bihamdik ve tebârekesmük ve teâlâ ceddük ve lâ ilâhe ğayruk'],
['Rükû','ruku','“Allâhü ekber” diyerek eğil. Elleri dizlere koy, sırtın düz olsun. Üç kez tesbih oku.','سُبْحَانَ رَبِّيَ الْعَظِيمِ','Sübhâne rabbiyel azîm'],
['Kavme','kiyam','Rükûdan doğrulurken “Semiallâhü limen hamideh” de. Dik durunca “Rabbenâ lekel hamd” de.','سَمِعَ اللَّهُ لِمَنْ حَمِدَهُ، رَبَّنَا لَكَ الْحَمْدُ','Semiallâhü limen hamideh, Rabbenâ lekel hamd'],
['Secde','secde','“Allâhü ekber” diyerek secdeye var. Alın ve burun yere değer. Üç kez tesbih oku.','سُبْحَانَ رَبِّيَ الْأَعْلَى','Sübhâne rabbiyel a\'lâ'],
['Celse ve İkinci Secde','kade','“Allâhü ekber” diyerek başını kaldırıp kısa süre otur. Tekrar “Allâhü ekber” diyerek ikinci secdeye var ve aynı tesbihi oku.','سُبْحَانَ رَبِّيَ الْأَعْلَى','Sübhâne rabbiyel a\'lâ'],
['İkinci Rekât','kiyam','“Allâhü ekber” diyerek ayağa kalk. Besmele, Fâtiha ve bir sûre oku. Rükû, kavme ve iki secdeyi aynı şekilde yap.','',''],
['Ka\'de ve Ettehiyyâtü','kade','İkinci rekâtın ikinci secdesinden sonra otur. Ettehiyyâtü’yü oku. Dört rekâtlı namazlarda bu oturuştan sonra kalkılır.','التَّحِيَّاتُ لِلَّهِ وَالصَّلَوَاتُ وَالطَّيِّبَاتُ، السَّلَامُ عَلَيْكَ أَيُّهَا النَّبِيُّ وَرَحْمَةُ اللَّهِ وَبَرَكَاتُهُ، السَّلَامُ عَلَيْنَا وَعَلَىٰ عِبَادِ اللَّهِ الصَّالِحِينَ، أَشْهَدُ أَنْ لَا إِلَٰهَ إِلَّا اللَّهُ وَأَشْهَدُ أَنَّ مُحَمَّدًا عَبْدُهُ وَرَسُولُهُ','Ettehiyyâtü lillâhi ves salevâtü vet tayyibât. Esselâmü aleyke eyyühen nebiyyü ve rahmetullâhi ve berekâtüh. Esselâmü aleynâ ve alâ ibâdillâhis sâlihîn. Eşhedü en lâ ilâhe illallâh ve eşhedü enne Muhammeden abdühû ve resûlüh'],
['Salli, Bârik ve Dualar','kade','Ettehiyyâtü’den sonra Allâhümme salli ve Allâhümme bârik dualarını, ardından Rabbenâ duasını oku. Bunları bir hoca ya da ebeveyn eşliğinde ezberleyin.','رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ','Rabbenâ âtinâ fid dünyâ haseneten ve fîl âhirati haseneten ve kınâ azâben nâr'],
['Selâm','selam','Önce sağ omzuna, sonra sol omzuna bakarak selam ver. Namaz tamamlandı.','السَّلَامُ عَلَيْكُمْ وَرَحْمَةُ اللَّهِ','Esselâmü aleyküm ve rahmetullâh']
];
const VAK=[
['Sabah',[['s',2],['f',2]]],
['Öğle',[['s',4],['f',4],['s',2]]],
['İkindi',[['s',4],['f',4]]],
['Akşam',[['f',3],['s',2]]],
['Yatsı',[['s',4],['f',4],['s',2],['v',3]]]
];
const ESMA=[
['اللَّهُ','Allah','Bütün güzel isimlerin sahibi, yaratıcımız'],
['الرَّحْمَٰنُ','er-Rahmân','Dünyada herkese merhamet eden'],
['الرَّحِيمُ','er-Rahîm','Ahirette müminlere çok merhamet eden'],
['الْمَلِكُ','el-Melik','Her şeyin gerçek sahibi'],
['الْقُدُّوسُ','el-Kuddûs','Her eksiklikten uzak, tertemiz'],
['السَّلَامُ','es-Selâm','Selamet veren, güvenle koruyan'],
['الْمُؤْمِنُ','el-Mü\'min','Güven veren'],
['الْمُهَيْمِنُ','el-Müheymin','Her şeyi gözetip koruyan'],
['الْعَزِيزُ','el-Azîz','İzzet sahibi, üstün ve güçlü'],
['الْجَبَّارُ','el-Cebbâr','Azamet ve kudret sahibi'],
['الْمُتَكَبِّرُ','el-Mütekebbir','Büyüklükte eşi olmayan'],
['الْخَالِقُ','el-Hâlık','Her şeyi yaratan'],
['الْبَارِئُ','el-Bâri\'','Yoktan var eden'],
['الْمُصَوِّرُ','el-Musavvir','Her şeye şekil veren'],
['الْغَفَّارُ','el-Gaffâr','Günahları çok bağışlayan'],
['الْقَهَّارُ','el-Kahhâr','Her şeye üstün gelen'],
['الْوَهَّابُ','el-Vehhâb','Karşılık beklemeden çok veren'],
['الرَّزَّاقُ','er-Rezzâk','Rızık veren'],
['الْفَتَّاحُ','el-Fettâh','Hayır kapılarını açan'],
['الْعَلِيمُ','el-Alîm','Her şeyi bilen'],
['الْقَابِضُ','el-Kâbıd','Dilediğine dar eden, tutan'],
['الْبَاسِطُ','el-Bâsıt','Dilediğine bol veren'],
['الْخَافِضُ','el-Hâfıd','Alçaltan'],
['الرَّافِعُ','er-Râfi\'','Yücelten'],
['الْمُعِزُّ','el-Mu\'izz','İzzet veren'],
['الْمُذِلُّ','el-Müzill','Zillete düşüren'],
['السَّمِيعُ','es-Semî\'','Her şeyi işiten'],
['الْبَصِيرُ','el-Basîr','Her şeyi gören'],
['الْحَكَمُ','el-Hakem','Hüküm veren, hakkı yerine getiren'],
['الْعَدْلُ','el-Adl','Çok adil'],
['اللَّطِيفُ','el-Latîf','Lütuf sahibi, ince işleri bilen'],
['الْخَبِيرُ','el-Habîr','Her şeyden haberi olan'],
['الْحَلِيمُ','el-Halîm','Cezada acele etmeyen, yumuşak'],
['الْعَظِيمُ','el-Azîm','Pek yüce'],
['الْغَفُورُ','el-Gafûr','Çok bağışlayan'],
['الشَّكُورُ','eş-Şekûr','Az ibadete çok sevap veren'],
['الْعَلِيُّ','el-Aliyy','Çok yüce'],
['الْكَبِيرُ','el-Kebîr','Çok büyük'],
['الْحَفِيظُ','el-Hafîz','Her şeyi koruyan'],
['الْمُقِيتُ','el-Mukît','Besinleri yaratan'],
['الْحَسِيبُ','el-Hasîb','Herkesin hesabını gören'],
['الْجَلِيلُ','el-Celîl','Azamet sahibi'],
['الْكَرِيمُ','el-Kerîm','Çok cömert'],
['الرَّقِيبُ','er-Rakîb','Her şeyi gözeten'],
['الْمُجِيبُ','el-Mücîb','Duaları kabul eden'],
['الْوَاسِعُ','el-Vâsi\'','İlmi ve rahmeti geniş'],
['الْحَكِيمُ','el-Hakîm','Her işi hikmetli'],
['الْوَدُودُ','el-Vedûd','Kullarını seven'],
['الْمَجِيدُ','el-Mecîd','Şanı çok yüce'],
['الْبَاعِثُ','el-Bâis','Öldükten sonra dirilten'],
['الشَّهِيدُ','eş-Şehîd','Her şeye şahit olan'],
['الْحَقُّ','el-Hakk','Varlığı kesin gerçek olan'],
['الْوَكِيلُ','el-Vekîl','Güvenilen, işleri üstlenen'],
['الْقَوِيُّ','el-Kavî','Çok güçlü'],
['الْمَتِينُ','el-Metîn','Çok sağlam'],
['الْوَلِيُّ','el-Velî','Dost ve yardımcı'],
['الْحَمِيدُ','el-Hamîd','Çok övülen'],
['الْمُحْصِي','el-Muhsî','Her şeyi sayan'],
['الْمُبْدِئُ','el-Mübdi\'','Yaratmayı başlatan'],
['الْمُعِيدُ','el-Muîd','Yeniden yaratan'],
['الْمُحْيِي','el-Muhyî','Hayat veren'],
['الْمُمِيتُ','el-Mümît','Ölümü yaratan'],
['الْحَيُّ','el-Hayy','Her zaman diri'],
['الْقَيُّومُ','el-Kayyûm','Her şeyi ayakta tutan'],
['الْوَاجِدُ','el-Vâcid','Hiçbir şeye muhtaç olmayan'],
['الْمَاجِدُ','el-Mâcid','Şerefi ve şanı büyük'],
['الْوَاحِدُ','el-Vâhid','Bir olan'],
['الصَّمَدُ','es-Samed','Herkes O’na muhtaç, O hiçbir şeye muhtaç değil'],
['الْقَادِرُ','el-Kâdir','Her şeye gücü yeten'],
['الْمُقْتَدِرُ','el-Muktedir','Kudreti sonsuz'],
['الْمُقَدِّمُ','el-Mukaddim','Dilediğini öne alan'],
['الْمُؤَخِّرُ','el-Muahhir','Dilediğini geriye bırakan'],
['الْأَوَّلُ','el-Evvel','Başlangıcı olmayan'],
['الْآخِرُ','el-Âhir','Sonu olmayan'],
['الظَّاهِرُ','ez-Zâhir','Varlığı apaçık olan'],
['الْبَاطِنُ','el-Bâtın','Zatı gözle görülmeyen'],
['الْوَالِي','el-Vâlî','Her şeyi yöneten'],
['الْمُتَعَالِي','el-Müteâlî','Çok yüce'],
['الْبَرُّ','el-Berr','İyilik eden'],
['التَّوَّابُ','et-Tevvâb','Tövbeleri kabul eden'],
['الْمُنْتَقِمُ','el-Müntakim','Zalimlerin hakkından gelen'],
['الْعَفُوُّ','el-Afüvv','Çok affeden'],
['الرَّءُوفُ','er-Raûf','Çok şefkatli'],
['مَالِكُ الْمُلْكِ','Mâlikü’l-Mülk','Mülkün sahibi'],
['ذُو الْجَلَالِ وَالْإِكْرَامِ','Zü’l-Celâli ve’l-İkrâm','Azamet ve ikram sahibi'],
['الْمُقْسِطُ','el-Muksit','Adaletle hükmeden'],
['الْجَامِعُ','el-Câmi\'','Herkesi bir araya toplayan'],
['الْغَنِيُّ','el-Ganî','Hiçbir şeye ihtiyacı olmayan'],
['الْمُغْنِي','el-Muğnî','Zengin eden'],
['الْمَانِعُ','el-Mâni\'','Dilediğini engelleyen'],
['الضَّارُّ','ed-Dârr','Zarar veren şeyleri yaratan'],
['النَّافِعُ','en-Nâfi\'','Fayda veren şeyleri yaratan'],
['النُّورُ','en-Nûr','Her şeyi aydınlatan'],
['الْهَادِي','el-Hâdî','Doğru yolu gösteren'],
['الْبَدِيعُ','el-Bedî\'','Eşsiz yaratan'],
['الْبَاقِي','el-Bâkî','Sonsuza dek var olan'],
['الْوَارِثُ','el-Vâris','Her şeyin asıl sahibi'],
['الرَّشِيدُ','er-Reşîd','Doğru yola ileten'],
['الصَّبُورُ','es-Sabûr','Çok sabırlı']
];
const AYET=[
['فَاذْكُرُونِي أَذْكُرْكُمْ','Fezkürûnî ezkürküm','Siz beni anın, ben de sizi anayım.','Bakara, 152'],
['إِنَّ مَعَ الْعُسْرِ يُسْرًا','İnne meal usri yüsrâ','Şüphesiz zorlukla beraber bir kolaylık vardır.','İnşirâh, 6'],
['وَقُل رَّبِّ زِدْنِي عِلْمًا','Ve kul rabbi zidnî ilmâ','De ki: Rabbim, ilmimi artır.','Tâhâ, 114'],
['إِنَّ اللَّهَ مَعَ الصَّابِرِينَ','İnnallâhe meas sâbirîn','Şüphesiz Allah sabredenlerle beraberdir.','Bakara, 153'],
['إِنَّ اللَّهَ يُحِبُّ الْمُحْسِنِينَ','İnnallâhe yühıbbül muhsinîn','Allah iyilik edenleri sever.','Bakara, 195'],
['أَلَا بِذِكْرِ اللَّهِ تَطْمَئِنُّ الْقُلُوبُ','Elâ bi zikrillâhi tatmeinnül kulûb','Biliniz ki kalpler ancak Allah’ı anmakla huzur bulur.','Ra‘d, 28'],
['وَقُولُوا لِلنَّاسِ حُسْنًا','Ve kûlû lin nâsi husnâ','İnsanlara güzel söz söyleyin.','Bakara, 83'],
['وَتَعَاوَنُوا عَلَى الْبِرِّ وَالتَّقْوَىٰ','Ve teâvenû alel birri vet takvâ','İyilik ve takva üzerinde yardımlaşın.','Mâide, 2'],
['وَبِالْوَالِدَيْنِ إِحْسَانًا','Ve bil vâlideyni ihsânâ','Anne babaya iyilik edin.','Bakara, 83'],
['وَلَسَوْفَ يُعْطِيكَ رَبُّكَ فَتَرْضَىٰ','Ve le sevfe yu\'tîke rabbüke fe terdâ','Rabbin sana verecek ve sen razı olacaksın.','Duhâ, 5']
];
const HADIS=[
['Güzel söz sadakadır.','Buhârî, Müslim'],
['Kardeşine güler yüzle bakman sadakadır.','Tirmizî'],
['Sizin en hayırlınız, Kur’an’ı öğrenen ve öğretendir.','Buhârî'],
['Temizlik imanın yarısıdır.','Müslim'],
['Merhamet etmeyene merhamet olunmaz.','Buhârî, Müslim'],
['Biriniz kendisi için istediğini kardeşi için de istemedikçe gerçek anlamda iman etmiş olmaz.','Buhârî, Müslim'],
['Kolaylaştırın, zorlaştırmayın. Müjdeleyin, nefret ettirmeyin.','Buhârî, Müslim'],
['Doğru olun. Doğruluk iyiliğe, iyilik de cennete götürür.','Buhârî, Müslim'],
['Ameller niyetlere göredir.','Buhârî, Müslim'],
['Allah’a ve ahiret gününe iman eden, komşusuna ikramda bulunsun.','Buhârî, Müslim']
];
const TEKBIR={ar:'اللَّهُ أَكْبَرُ اللَّهُ أَكْبَرُ لَا إِلَٰهَ إِلَّا اللَّهُ وَاللَّهُ أَكْبَرُ اللَّهُ أَكْبَرُ وَلِلَّهِ الْحَمْدُ',ok:'Allâhü ekber Allâhü ekber, lâ ilâhe illallâhü vallâhü ekber, Allâhü ekber ve lillâhil hamd'};
const HAYLER=['Muharrem','Safer','Rebiülevvel','Rebiülâhir','Cemaziyelevvel','Cemaziyelâhir','Recep','Şaban','Ramazan','Şevval','Zilkade','Zilhicce'];
const OZEL=[
{n:'Hicrî Yılbaşı',m:1,d:1,t:'Hicrî takvimin ilk günüdür. Peygamberimizin Mekke’den Medine’ye hicreti İslam tarihinin dönüm noktasıdır ve takvim bu olaydan başlar.',a:['Hicret hikâyesini ve Hz. Ebû Bekir’in hayatını birlikte oku','Yeni yıl için güzel bir hedef koy: “Bu yıl … sûresini ezberleyeceğim”']},
{n:'Âşûrâ Günü',m:1,d:10,t:'Muharrem ayının onuncu günüdür. Peygamberimizin bu günde oruç tuttuğu bilinir. Rivayetlere göre Hz. Nuh’un gemisi de bu günlerde karaya oturmuştur. Aşure tatlısı yapıp paylaşmak yaygın bir gelenektir.',a:['Aşure yapıp komşulara ikram edin','Hz. Nuh’un kıssasını dinle']},
{n:'Mevlid Kandili',m:3,d:12,eve:1,t:'Peygamberimizin dünyaya geldiği geceyi anarız. O, âlemlere rahmet olarak gönderildi.',a:['Peygamberimizin hayatından kısa bir bölüm oku','Salavat getir: “Allâhümme salli alâ Muhammed”','Fîl Sûresi’ni ve Fil Yılı hikâyesini oku']},
{n:'Üç Aylar Başlangıcı',m:7,d:1,t:'Recep, Şaban ve Ramazan aylarına “Üç Aylar” denir. Ramazan’a hazırlık zamanı başlar. Recep’in ilk Cuma gecesi Regaib Kandili’dir.',a:['Her gün bir sûreyi tekrar et','Ramazan için küçük hedefler koy']},
{n:'Miraç Kandili',m:7,d:27,eve:1,t:'Peygamberimiz bir gecede Mescid-i Haram’dan Mescid-i Aksâ’ya, oradan göklere yükselmiştir. Beş vakit namaz Miraç’ta hediye edilmiştir.',a:['Namaz bölümünü birlikte tekrar edin','Peygamberimize salavat getir']},
{n:'Berat Kandili',m:8,d:15,eve:1,t:'Bağışlanma gecesi olarak anılır. Hata yapınca Allah’tan af dileriz, küsleri barıştırırız.',a:['Birine kırgınsan gönlünü al','Anne baba ve ailen için dua et']},
{n:'Ramazan Başlangıcı',m:9,d:1,t:'Kur’an’ın indirilmeye başlandığı aydır. Oruç, sahur, iftar ve teravih ayıdır. Çocuklar gücü yettiği kadar kısmi oruç tutabilir.',a:['Sahura ve iftara birlikte hazırlanın','Her gün küçük bir iyilik yap: komşuya ikram, yardım kumbarası','Günde bir sûre veya dua tekrar et']},
{n:'Kadir Gecesi',m:9,d:27,eve:1,t:'Bin aydan hayırlı olan, Kur’an’ın indirilmeye başlandığı gecedir. Kadir Sûresi bu geceyi anlatır.',a:['Kadir Sûresi’ni oku (Dua & Sûre bölümü)','Kadir Gecesi duasını tekrar et'],dua:'kadir'},
{n:'Ramazan Bayramı',m:10,d:1,t:'Ramazan orucunun ardından gelen sevinç günüdür. Bayram namazı kılınır, büyüklerin elleri öpülür, akrabalar ve komşular ziyaret edilir. Fitre bayram namazından önce verilir.',a:['Büyüklerinin ellerini öp ve bayramlaş','Komşulara tatlı götür','Tekbir getir'],tek:1},
{n:'Kurban Bayramı',m:12,d:10,t:'Hz. İbrahim’in Allah’a teslimiyetini ve oğlu İsmail’in sadakatini hatırlarız. Kurban kesilir ve etler paylaşılır. Arefe, bayramdan bir gün öncedir.',a:['Hz. İbrahim ve İsmail’in hikâyesini oku','Paylaşmayı düşün: bir komşuya veya muhtaç birine pay götür','Tekbir getir'],tek:1}
];
const ALIM=[{"id":"harizmi","n":"el-Hârizmî","alan":"Matematik ve Astronomi","d":"yaklaşık 780–850 · Bağdat, Beytülhikme","ozet":"Bağdat’taki Beytülhikme’de çalışan büyük bir âlimdi. Sayılarla problem çözmenin yollarını bir kitapta topladı. Kitabının adındaki “el-cebr” sözü, bugün kullandığımız “cebir” kelimesinin kaynağıdır. Adının Latince yazılışından da “algoritma” kelimesi doğdu.","eser":[{"ad":"Kitâbü’l-Muhtasar fî Hisâbi’l-Cebr ve’l-Mukābele","anlam":"Denklem çözmeyi anlatan cebir kitabı"},{"ad":"Zîc","anlam":"Güneş, Ay ve gezegenlerin hareket tabloları"},{"ad":"Sûretü’l-Arz","anlam":"Şehirlerin ve yerlerin koordinatlarını içeren yeryüzü kitabı"}],"ders":"Büyük işler, adım adım ve düzenli çalışmayla başarılır."},{"id":"fergani","n":"el-Fergânî","alan":"Astronomi","d":"9. yüzyıl · Fergana’dan Bağdat’a","ozet":"Gökyüzü bilgisini sade ve anlaşılır biçimde yazdı. Kitabı Latinceye çevrildi ve Avrupa’da uzun yıllar astronomi dersinde okundu.","eser":[{"ad":"Cevâmi‘ İlmi’n-Nücûm ve Usûli’l-Harekâti’s-Semâviyye","anlam":"Yıldızlar ilminin ve gök hareketlerinin özeti"}],"ders":"Bildiğini sade anlatmak, bilgiyi herkese ulaştırır."},{"id":"battani","n":"el-Battânî","alan":"Astronomi ve Matematik","d":"yaklaşık 858–929 · Rakka","ozet":"Yıllarca Güneş’i ve Ay’ı gözlemledi. Güneş yılının uzunluğunu çok küçük bir farkla hesapladı. Hesaplarında trigonometriyi kullandı.","eser":[{"ad":"Kitâbü’z-Zîc (Zîcü’s-Sâbî)","anlam":"Gözlemlerini ve gök tablolarını toplayan büyük eser"}],"ders":"Sabırla yapılan gözlem, doğru sonuca götürür."},{"id":"sufi","n":"Abdurrahman es-Sûfî","alan":"Astronomi","d":"903–986 · Rey ve Şiraz çevresi","ozet":"Gökyüzündeki yıldızları tek tek gözleyip kitabına çizdi. Her yıldız kümesinin resmini yaptı, parlaklıklarını yazdı. Andromeda’yı da bir bulut gibi parlayan nokta olarak kaydetti.","eser":[{"ad":"Kitâbü Suveri’l-Kevâkibi’s-Sâbite","anlam":"Sabit Yıldızlar Kitabı: resimli yıldız katalogu"}],"ders":"Dikkatle bakmak, yeni şeyler görmeyi sağlar."},{"id":"biruni","n":"Ebû Reyhân el-Bîrûnî","alan":"Astronomi ve Coğrafya","d":"973–1048 · Harezm ve Gazne","ozet":"Bir dağın tepesinden yaptığı ölçümle Dünya’nın çevresini hesapladı. Şehirler arası uzaklıkları ve kıble yönünü hesaplayan yöntemler yazdı. Çok dil bilir, çok kitap yazardı.","eser":[{"ad":"el-Âsârü’l-Bâkıye ani’l-Kurûni’l-Hâliye","anlam":"Eski milletlerin takvimlerini karşılaştıran eser"},{"ad":"el-Kānûnü’l-Mes‘ûdî","anlam":"Astronomi ansiklopedisi"},{"ad":"Tahdîdü Nihâyâti’l-Emâkin","anlam":"Yerler arası mesafeler ve kıble hesapları"}],"ders":"Ölç, hesapla, öğren. Öğrenmenin sonu yoktur."},{"id":"heysem","n":"İbnü’l-Heysem","alan":"Optik ve Astronomi","d":"yaklaşık 965–1040 · Basra ve Kahire","ozet":"Görmenin nasıl olduğunu deneylerle açıkladı: ışık nesnelerden gözümüze gelir. Karanlık oda (kamera obskura) deneyleri yaptı. Bir bilginin doğru olması için deney ve gözlemle kontrol edilmesi gerektiğini savundu.","eser":[{"ad":"Kitâbü’l-Menâzır","anlam":"Optik kitabı: ışık, ayna, mercek ve görme"},{"ad":"eş-Şükûk alâ Batlamyus","anlam":"Eski astronomi görüşlerini sorgulayan eser"}],"ders":"Sor, dene, kontrol et."},{"id":"tusi","n":"Nasîrüddîn-i Tûsî","alan":"Astronomi ve Matematik","d":"1201–1274 · Meraga","ozet":"1259’da Meraga Rasathanesi’nin kurulmasına öncülük etti. Orada çalışan âlimlerle yıldız tabloları hazırladı.","eser":[{"ad":"Zîc-i Îlhânî","anlam":"Meraga’da yapılan gözlemlerin gök tabloları"},{"ad":"et-Tezkire fî İlmi’l-Hey’e","anlam":"Astronomi ilmini anlatan eser"}],"ders":"Birlikte çalışmak, tek başına çalışmaktan güçlüdür."},{"id":"ulugbey","n":"Uluğ Bey","alan":"Astronomi","d":"1394–1449 · Semerkant","ozet":"Hem hükümdar hem bilgindi. Semerkant’ta büyük bir rasathane kurdu ve burada yaklaşık bin yıldızı içeren bir katalog hazırlandı. Tablolarının doğruluğu uzun yıllar övüldü.","eser":[{"ad":"Zîc-i Cedîd-i Gürgânî (Uluğ Bey Zîci)","anlam":"Yıldız katalogu ve gök tabloları"}],"ders":"Güç ve makam, bilime hizmet için kullanılabilir."},{"id":"aliKuscu","n":"Ali Kuşçu","alan":"Astronomi ve Matematik","d":"yaklaşık 1403–1474 · Semerkant’tan İstanbul’a","ozet":"Semerkant’ta Uluğ Bey’in rasathanesinde çalıştı. Daha sonra İstanbul’a gelip Ayasofya Medresesi’nde ders verdi. Astronomi kitabını Fatih Sultan Mehmed’e sundu.","eser":[{"ad":"er-Risâletü’l-Fethiyye","anlam":"Astronomi eseri"},{"ad":"el-Muhammediyye","anlam":"Hesap ve matematik eseri"}],"ders":"Bilgi, şehirleri ve kıtaları birbirine bağlar."},{"id":"sinan","n":"Mimar Sinan","alan":"Mimarlık ve Mühendislik","d":"yaklaşık 1489–1588 · Kayseri ve İstanbul","ozet":"Üç padişah döneminde baş mimar olarak çalıştı. Yüzlerce cami, medrese, köprü, hamam ve su yolu yaptı. Kubbeleri çok sağlam ve çok geniş inşa etme konusunda ün kazandı. Edirne’deki Selimiye Camii’ni “ustalık eserim” diye anlattığı bilinir.","eser":[{"ad":"Süleymaniye Camii (İstanbul, 1557)","anlam":"Kanuni Sultan Süleyman adına yapılan büyük külliye"},{"ad":"Selimiye Camii (Edirne, 1575)","anlam":"Ustalık eseri olarak anılan, dört minareli cami"},{"ad":"Tezkiretü’l-Bünyân ve Tuhfetü’l-Mi‘mârîn","anlam":"Hayatını ve eserlerini anlatan yazılar"}],"ders":"Sabırla, ölçüyle ve güzel işçilikle yapılan eserler yüzyıllarca ayakta kalır."},{"id":"takiyuddin","n":"Takiyüddin","alan":"Astronomi ve Mühendislik","d":"1526–1585 · İstanbul","ozet":"1577’de İstanbul’da bir rasathane kurdu. Gözlem yapmak için mekanik saatler ve özel aletler yaptı. Çok hassas gözlemler için emek verdi.","eser":[{"ad":"Sidretü Müntehâ’l-Efkâr","anlam":"Yeni gözlemlere dayanan astronomi tabloları (zîc)"}],"ders":"Doğru ölçmek için doğru alet gerekir."},{"id":"cezeri","n":"el-Cezerî","alan":"Mühendislik","d":"1136–1206 · Cizre","ozet":"Su gücüyle çalışan saatler ve hareketli makineler tasarladı. Çizimlerle desteklediği kitabında yaptığı otomatları adım adım anlattı.","eser":[{"ad":"Kitâbü’l-Hiyel (Kitâb fî Ma‘rifeti’l-Hiyeli’l-Hendesiyye)","anlam":"Mekanik aletler ve saatlerin resimli kitabı"}],"ders":"Merak et, tasarla, dene."},{"id":"ibnsina","n":"İbn Sînâ","alan":"Tıp","d":"980–1037 · Buhara","ozet":"Genç yaşta tıp öğrendi, hastaları tedavi etti. Yazdığı kitap yüzyıllarca hem İslam dünyasında hem Avrupa’daki üniversitelerde okutuldu.","eser":[{"ad":"el-Kānûn fi’t-Tıb","anlam":"Tıbbın Kanunu: hastalıklar ve tedavileri"},{"ad":"eş-Şifâ","anlam":"Felsefe ve bilim ansiklopedisi"}],"ders":"Sağlığı korumak ve hastalara yardım etmek güzel bir ibadettir."},{"id":"razi","n":"Ebû Bekir er-Râzî","alan":"Tıp","d":"865–925 · Rey ve Bağdat","ozet":"Hastaları dikkatle gözleyerek hastalıkları birbirinden ayırdı. Çiçek ve kızamık hastalıklarını anlatan bir risale yazdı.","eser":[{"ad":"Kitâbü’l-Hâvî","anlam":"Tıp bilgilerini toplayan geniş kitap"},{"ad":"el-Cüderî ve’l-Hasbe","anlam":"Çiçek ve kızamık hastalıkları risalesi"}],"ders":"İyi gözlemci iyi doktor olur."},{"id":"sabuncuoglu","n":"Sabuncuoğlu Şerafeddin","alan":"Tıp (Cerrahi)","d":"1385–1468 · Amasya","ozet":"Amasya’da doktorluk yaptı. Ameliyatları ve kullandığı aletleri resimleriyle Türkçe olarak anlattı. Kitabı, Türkçe yazılmış resimli ilk cerrahi eser olarak bilinir.","eser":[{"ad":"Cerrahiyyetü’l-İlhâniyye","anlam":"1465’te yazılan resimli cerrahi kitabı"}],"ders":"Bilgiyi kendi dilinde yazmak, onu herkese ulaştırır."},{"id":"pirireis","n":"Piri Reis","alan":"Coğrafya ve Denizcilik","d":"yaklaşık 1465–1553 · Gelibolu ve İstanbul","ozet":"Denizci ve haritacıydı. 1513’te hazırladığı dünya haritasının bir parçası bugün Topkapı Sarayı’nda saklanır. Akdeniz kıyılarını anlatan kitabı denizcilere yol gösterdi.","eser":[{"ad":"Kitâb-ı Bahriye","anlam":"Akdeniz limanlarını ve yollarını anlatan denizcilik kitabı"},{"ad":"1513 Dünya Haritası","anlam":"Gazelden yapılmış ünlü harita parçası"}],"ders":"Yolu bilen, yolculuğu güvenle yapar."},{"id":"katipcelebi","n":"Katip Çelebi (Hacı Halife)","alan":"Coğrafya ve Kitap Bilimi","d":"1609–1657 · İstanbul","ozet":"Çok kitap okudu ve yazdı. Bilinen binlerce eseri ve yazarını sıraya koyan büyük bir kitap listesi hazırladı. Coğrafya kitabıyla dünyayı tanıttı.","eser":[{"ad":"Keşfü’z-Zunûn","anlam":"Binlerce kitabı tanıtan büyük bibliyografya"},{"ad":"Cihannümâ","anlam":"Coğrafya kitabı"}],"ders":"Okumak ve kaydetmek bilgiyi yaşatır."},{"id":"matrakci","n":"Matrakçı Nasuh","alan":"Matematik ve Minyatür","d":"1564’te öldü · Bosna doğumlu, İstanbul","ozet":"Matematikçi, ressam ve devlet görevlisiydi. Padişahın seferlerini şehir resimleriyle anlattı. Hesap kitapları da yazdı.","eser":[{"ad":"Beyân-ı Menâzil-i Sefer-i Irakeyn","anlam":"Sefer yolundaki şehirlerin resimli anlatımı"},{"ad":"Cemâlü’l-Küttâb ve Kemâlü’l-Hisâb","anlam":"Hesap kitabı"}],"ders":"Hem sayılar hem renkler, bilgiye giden yoldur."},{"id":"evliya","n":"Evliya Çelebi","alan":"Seyahat ve Tarih","d":"1611–1682 · İstanbul","ozet":"Yaklaşık kırk yıl seyahat edip gördüklerini yazdı. On ciltlik eseri, 17. yüzyılın şehirlerini, yemeklerini ve insanlarını anlatır.","eser":[{"ad":"Seyahatname","anlam":"On ciltlik seyahat kitabı"}],"ders":"Gezmek ve gördüğünü yazmak, geleceğe miras bırakır."},{"id":"kazvini","n":"Zekeriyyâ el-Kazvînî","alan":"Doğa ve Kâinat","d":"yaklaşık 1203–1283 · Kazvin","ozet":"Gökyüzünden denizlere, bitkilerden hayvanlara kadar Allah’ın yarattığı varlıkları resimli bir kitapta anlattı.","eser":[{"ad":"Acâibü’l-Mahlûkāt ve Garâibü’l-Mevcûdât","anlam":"Yaratılmış varlıkların harikalarını anlatan resimli kitap"}],"ders":"Yaratılanlara bakmak, Yaratıcıyı tanımanın bir yoludur."}];
const GOK=[{"id":"gunes-vakit","t":"Güneş ve Namaz Vakitleri","k":"Güneşin yolu, ibadetin saati","p":["Namaz vakitleri, Güneş’in gökyüzündeki konumuna göre belirlenir. Öğle, Güneş tepe noktasını geçince girer. İkindi, cisimlerin gölgesi belli bir uzunluğa ulaşınca girer. Akşam, Güneş batınca girer.","Âlimler, vakitleri çok önceden hesaplamak için gökbilim ve matematik kullandı. Camilerde vakitleri tutan kişilere “muvakkit” denir.","Bugün vakitler tablolarda ve uygulamalarda hazır bulunur, ama arkasında yüzyıllarca süren gözlem ve hesap vardır."],"a":["Güneşli bir günde bir çubuk dik ve gölgesini her saat başı ölç","Gölgenin gün içinde nasıl kısalıp uzadığını çiz","Bulunduğun yerin namaz vakitlerine Diyanet takviminden bak"],"ayet":{"ar":"هُوَ الَّذِي جَعَلَ الشَّمْسَ ضِيَاءً وَالْقَمَرَ نُورًا وَقَدَّرَهُ مَنَازِلَ لِتَعْلَمُوا عَدَدَ السِّنِينَ وَالْحِسَابَ","ok":"Hüvellezî cealeş şemse ziyâen vel kamere nûran ve kaddarehû menâzile li ta'lemû adedes sinîne vel hisâb","m":"Güneşi bir ışık, Ay’ı bir nur yapan ve yılların sayısını ve hesabı bilmeniz için Ay’a konaklar takdir eden O’dur.","k":"Yûnus, 5"}},{"id":"ay-hilal","t":"Ay, Hilal ve Hicrî Takvim","k":"Ayın evreleri","p":["Hicrî takvim Ay’ın hareketine göre düzenlenir. Her ay, yeni hilalin görülmesiyle başlar. Bu yüzden Ramazan’ın ve bayramların başlangıcı için hilâle bakılır.","Ay, yaklaşık 29,5 günde bir tur atar ve bu sürede şekli değişir: hilâl, ilk dördün, dolunay, son dördün. Ayın bu değişimine “evre” denir.","Âlimler, hilâlin ne zaman görüleceğini hesaplamak için yüzyıllar boyunca tablolar ve aletler geliştirdi."],"a":["Her akşam Ay’a bak ve şeklini defterine çiz","Hicrî ayın kaçıncı günü olduğunu birlikte hesapla","Ramazan hilâlini aile olarak beklemek için bir plan yap"],"ayet":{"ar":"وَالْقَمَرَ قَدَّرْنَاهُ مَنَازِلَ حَتَّىٰ عَادَ كَالْعُرْجُونِ الْقَدِيمِ","ok":"Vel kamere kaddernâhü menâzile hattâ âde kel urcûnil kadîm","m":"Ay için de konaklar takdir ettik. Sonunda eski bir hurma dalı gibi olur.","k":"Yâsîn, 39"}},{"id":"kible","t":"Kıble ve Haritalar","k":"Kâbe’ye doğru yön","p":["Müslümanlar namazda Kâbe’ye yönelir. Dünyanın her yerinde bu yönü bulmak için âlimler küresel geometri ve trigonometri kullandı.","el-Bîrûnî ve el-Battânî gibi âlimler, şehirlerin enlem ve boylamlarını hesaplayarak kıble yönünü bulmanın yollarını yazdı.","Bugün telefonlardaki pusula ve harita uygulamaları kıbleyi hızla gösterir, ama arkasında bu eski hesaplar vardır."],"a":["Evinde kıble yönünü bir pusula veya harita uygulamasıyla bul","Kâbe’yi dünya haritasında göster","Seccadeyi kıbleye doğru sermeyi öğren"]},{"id":"yildizlar","t":"Yıldızlar ve İsimleri","k":"Arapça kökenli gök isimleri","p":["Bugün bilinen birçok yıldız adının Arapça kökeni vardır. Örneğin Altair, Aldebaran ve Deneb gibi isimler Arapça sözlerden gelir.","Bunun sebebi, Müslüman âlimlerin yıldız kitapları hazırlaması ve bu kitapların Avrupa’ya çevrilmesidir. es-Sûfî’nin Sabit Yıldızlar Kitabı bunlardan biridir.","Gökyüzüne bakmak, Allah’ın yarattıklarını düşünmenin güzel bir yoludur."],"a":["Açık bir gecede gökyüzüne bak ve en parlak yıldızı bul","Bir takımyıldızı çiz","Âlimlerin kitaplarındaki yıldız resimlerine birlikte bak"],"ayet":{"ar":"وَكُلٌّ فِي فَلَكٍ يَسْبَحُونَ","ok":"Ve kullun fî felekin yesbehûn","m":"Hepsi bir yörüngede yüzer.","k":"Yâsîn, 40"}},{"id":"rasathane","t":"Rasathaneler: Gök Evleri","k":"Gözlem yapılan yerler","p":["Rasathane, gökyüzünü gözlemek için kurulan yerdir. Müslüman âlimler Bağdat’tan Meraga’ya, Semerkant’tan İstanbul’a kadar birçok şehirde rasathaneler kurdu.","Meraga’da Nasîrüddîn-i Tûsî, Semerkant’ta Uluğ Bey, İstanbul’da Takiyüddin çalıştı. Gözlemlerini kitaplara ve tablolara yazdılar.","Bu gözlem kitapları, sonraki âlimlere ve başka ülkelerdeki bilginlere yol gösterdi."],"a":["Bir gökyüzü günlüğü tut: tarih, saat ve gördüklerini yaz","Rasathane maketi yap","Âlimler bölümünden bir rasathane kuran âlimi oku"]}];
const PAD=[{"id":"osman","n":"Osman Gazi","d":"yaklaşık 1258–1326 · Söğüt","ozet":"Osmanlı Devleti’nin kurucusudur. Küçük bir beylik olarak başlayan topluluğu adaleti ve komşularına güzel davranışıyla büyüttü.","yap":["Söğüt ve çevresinde bir beylik kurdu (yaklaşık 1299)","Bilecik ve çevresindeki yerleri aldı","Bursa kuşatmasını başlattı; Bursa oğlu Orhan zamanında 1326’da alındı"],"ders":"Adalet ve güzel komşuluk, küçük bir topluluğu büyük bir devlet yapar."},{"id":"orhan","n":"Orhan Gazi","d":"1281–1362 · Bursa","ozet":"Babası Osman Gazi’nin kurduğu beyliği devlet düzenine kavuşturdu.","yap":["Bursa’yı başkent yaptı","İznik’te ilk Osmanlı medresesini açtı (1331)","İlk Osmanlı gümüş parası olan akçeyi bastırdı","Rumeli’ye geçişin başladığı dönemdir (1354)"],"ders":"Düzen, ilim ve okul, bir devleti ayakta tutar."},{"id":"murad1","n":"I. Murad (Hüdavendigâr)","d":"1326–1389 · Edirne","ozet":"Balkanlara doğru ilerleyen Osmanlı’nın yolunu açtı.","yap":["Edirne’yi aldı ve devletin yeni merkezi yaptı","Yeniçeri Ocağı’nın düzenli ordu hâline gelmesi bu dönemde güçlendi","Kosova Savaşı’nda şehit oldu (1389)"],"ders":"Sorumluluk almak, bir milleti ileri taşır."},{"id":"bayezid1","n":"Yıldırım Bayezid","d":"1360–1403 · Bursa","ozet":"Çok hızlı hareket ettiği için “Yıldırım” denildi.","yap":["Niğbolu Zaferi’ni kazandı (1396)","Boğaz’ın Anadolu yakasında Anadolu Hisarı’nı yaptırdı (1395)","1402’deki Ankara Savaşı’nda Timur’a yenildi"],"ders":"Zaferlerde de tedbiri elden bırakmamak gerekir."},{"id":"fatih","n":"Fatih Sultan Mehmed","d":"1432–1481 · İstanbul","ozet":"21 yaşında İstanbul’u fethetti. İlim ve sanata çok değer verdi, bilginleri ve ustaları şehrine topladı.","yap":["29 Mayıs 1453’te İstanbul’u fethetti","Fatih Camii ve külliyesini, Sahn-ı Seman medreselerini kurdurdu","Topkapı Sarayı’nı yaptırdı","Astronomi âlimi Ali Kuşçu’yu İstanbul’a getirdi ve Ayasofya Medresesi’nde ders vermesini sağladı"],"hadis":"Peygamberimiz (s.a.v.) İstanbul’un fethini müjdelemiştir: “Konstantiniyye mutlaka fethedilecektir. Onu fetheden komutan ne güzel komutan, o ordu ne güzel ordudur.” (Ahmed b. Hanbel)","ders":"Hedef koy, hazırlan, çok çalış ve bilginlere değer ver."},{"id":"bayezid2","n":"II. Bayezid","d":"1447–1512 · Edirne ve İstanbul","ozet":"Barışı seven, kitaba ve sanata önem veren bir padişahtı.","yap":["Edirne’de külliye ve darüşşifa yaptırdı; hastalar musikiyle de tedavi edildi","İstanbul’da Bayezid Camii ve Külliyesi’ni yaptırdı (1506)","1492’de İspanya’dan çıkarılan Müslümanlara ve Yahudilere kapılarını açtığı anlatılır"],"ders":"Hastaya şefkat, mağdura yardım güzel bir ahlaktır."},{"id":"selim1","n":"Yavuz Sultan Selim","d":"1470–1520 · İstanbul","ozet":"Kısa saltanatında devletin sınırlarını çok genişletti.","yap":["Mercidabık (1516) ve Ridaniye (1517) zaferleriyle Suriye ve Mısır’ı devlete kattı","Mekke ve Medine Osmanlı’nın hizmetine girdi; padişahlara “Hâdimü’l-Haremeyn” (iki harem-i şerifin hizmetkârı) denildi","Hırka-i Saadet gibi mübarek emanetler İstanbul’a getirildi ve Topkapı Sarayı’nda korundu"],"ders":"Kutsal yerlere hizmet etmek büyük bir şereftir."},{"id":"kanuni","n":"Kanuni Sultan Süleyman","d":"1494–1566 · İstanbul","ozet":"46 yıl devleti yönetti. Adalet ve kanunlara verdiği önem yüzünden “Kanuni” dendi. Muhibbî mahlasıyla şiirler yazdı.","yap":["Mimar Sinan’a Süleymaniye Camii’ni yaptırdı (1557)","Kudüs surlarını yeniletti (1537–1541)","Mohaç Zaferi’ni kazandı (1526)","Hukuk düzenlemeleri (kanunnameler) hazırlattı"],"ders":"Adaletle yönetmek, güzel eserler bırakmak."},{"id":"ahmed1","n":"I. Ahmed","d":"1590–1617 · İstanbul","ozet":"14 yaşında padişah oldu. Adıyla anılan ünlü camiyi yaptırdı.","yap":["Sedefkâr Mehmed Ağa’ya Sultanahmet Camii’ni yaptırdı (1609–1616)","Altı minareli bu cami, çinileriyle “Mavi Cami” olarak da bilinir"],"ders":"Güzel bir cami, yüzyıllarca dua edilen bir yer olur."},{"id":"selim3","n":"III. Selim","d":"1761–1808 · İstanbul","ozet":"Devleti yenilemek için yeni düzenlemeler yaptı. Müzikle de ilgilenir, besteler yapardı.","yap":["Nizâm-ı Cedîd adıyla yeni, düzenli bir ordu kurdu","Avrupa şehirlerinde daimi elçilikler açtı","Mühendislik ve askerî okulları destekledi"],"ders":"Yenilik yaparken ilim ve düzen temel olmalı."},{"id":"mahmud2","n":"II. Mahmud","d":"1785–1839 · İstanbul","ozet":"Devletin ordusunu ve okullarını yenilemeye çalıştı.","yap":["Yeniçeri Ocağı’nı kaldırdı (1826)","Askerî Tıbbiye’yi kurdu (1827)","İlk resmî gazete Takvîm-i Vekâyi’yi çıkarttı (1831)"],"ders":"Zamanın ihtiyacına göre okul ve düzen kurmak gerekir."},{"id":"hamid2","n":"II. Abdülhamid","d":"1842–1918 · İstanbul","ozet":"Okullara, telgrafa ve demiryollarına önem verdi.","yap":["Şam–Medine arasında Hicaz Demiryolu’nu yaptırdı; halkın bağışlarıyla 1900’de başlandı ve 1908’de Medine’ye ulaştı","Rüşdiye ve idadi okullarını yaygınlaştırdı, Tıp, mühendislik ve hukuk okullarını destekledi","Telgraf hatlarını genişletti"],"ders":"Hacıların yolculuğunu kolaylaştırmak ve okul açmak büyük hizmettir."}];
const WORDS=[['قَلَم','kalem','kalem'],['كِتَاب','kitâb','kitap'],['بَاب','bâb','kapı'],['بَيْت','beyt','ev'],['شَمْس','şems','güneş'],['قَمَر','kamer','ay'],['نَجْم','necm','yıldız'],['سَمَاء','semâ','gök'],['مَاء','mâ','su'],['نُور','nûr','ışık'],['وَلَد','veled','çocuk'],['أُمّ','umm','anne']];
const SYN=29.530588853;
function moonPhase(d){d=d||new Date();const days=d.getTime()/864e5-Date.UTC(2000,0,6,18,14)/864e5;const age=((days%SYN)+SYN)%SYN,p=age/SYN;
  const nm=[[0.03,'Yeni Ay'],[0.22,'Hilâl (büyüyen)'],[0.28,'İlk Dördün'],[0.47,'Şişkin Ay (büyüyen)'],[0.53,'Dolunay'],[0.72,'Şişkin Ay (küçülen)'],[0.78,'Son Dördün'],[0.97,'Hilâl (küçülen)'],[1.01,'Yeni Ay']];
  return{age,p,name:nm.find(x=>p<x[0])[1],lit:(1-Math.cos(2*Math.PI*p))/2}}
function moonSvg(p){const q=p<0.5?p:1-p,rx=40*Math.abs(Math.cos(2*Math.PI*q)),sw=q<0.25?0:1,flip=p>0.5;
  return `<svg viewBox="0 0 100 100" width="96" height="96" aria-hidden="true"><circle cx="50" cy="50" r="40" fill="var(--soft)" stroke="var(--line)" stroke-width="2"/>${q<0.02?'':`<path d="M50 10A40 40 0 0 1 50 90A${rx.toFixed(2)} 40 0 0 ${sw} 50 10Z" fill="#F2CB68" ${flip?'transform="translate(100 0) scale(-1 1)"':''}/>`}</svg>`}
const ALAN_IC=[['Astronomi','🔭'],['Matematik','📐'],['Optik','👁️'],['Tıp','⚕️'],['Coğrafya','🗺️'],['Mühendislik','⚙️'],['Mimarlık','🕌'],['Seyahat','🧭'],['Doğa','🌿']];
const alanIc=a=>{const f=ALAN_IC.find(x=>a.indexOf(x[0])>=0);return f?f[1]:'📚'};
const LEVELS=[[0,'Minik Yıldız','⭐'],[10,'Işık Çocuğu','🕯️'],[25,'Ay Talebesi','🌙'],[50,'Güneş Talebesi','☀️'],[90,'Gökkuşağı Hafızı','🌈'],[140,'Nur Yıldızı','🌟'],[200,'Şeyh Çocuk','🕌'],[300,'Altın Hafız','👑']];
const LEX={
'ا':['ٱللَّهُ','Allah',112,1],'ب':['بِسْمِ','adıyla',1,1],'ت':['تَبَّتْ','kurusun',111,1],'ث':['ثُمَّ','sonra',102,7],
'ج':['جَزَاؤُهُمْ','mükâfatları',98,8],'ح':['ٱلْحَمْدُ','hamd, övgü',1,2],'خ':['خَلَقَ','yarattı',96,2],'د':['بِٱلدِّينِ','dine, hesap gününe',107,1],
'ذ':['ٱلَّذِي','ki o',106,4],'ر':['رَبِّ','Rab',114,1],'ز':['زُلْزِلَتِ','sarsıldı',99,1],'س':['سَبِّحِ','tesbih et',87,1],
'ش':['شَرِّ','kötülük',113,2],'ص':['ٱلصَّمَدُ','her şeyin muhtaç olduğu',112,2],'ض':['ٱلضَّآلِّينَ','sapıtanlar',1,7],'ط':['طَيْرًا','kuşlar',105,3],
'ظ':['ظَهْرَكَ','sırtını',94,3],'ع':['ٱلْعَصْرِ','zaman, asır',103,1],'غ':['غَاسِقٍ','karanlık',113,3],'ف':['ٱلْفَلَقِ','sabahın aydınlığı',113,1],
'ق':['ٱلْقَدْرِ','kadir',97,1],'ك':['ٱلْكَوْثَرَ','kevser',108,1],'ل':['لَمْ','-medi',112,3],'م':['مَالُهُۥ','malı',111,2],
'ن':['ٱلنَّاسِ','insanlar',114,3],'و':['وَٱلضُّحَىٰ','kuşluk vaktine yemin olsun',93,1],'ه':['هُوَ','o',108,3],'ي':['يَوْمِ','gün',1,4]};
const MUK={'ا':[2,1,'الٓمٓ'],'ل':[2,1,'الٓمٓ'],'م':[2,1,'الٓمٓ'],'ص':[38,1,'صٓ'],'ر':[10,1,'الٓر'],'ك':[19,1,'كٓهيعٓصٓ'],'ه':[20,1,'طه'],'ي':[36,1,'يسٓ'],'ع':[42,2,'عٓسٓقٓ'],'ط':[20,1,'طه'],'س':[36,1,'يسٓ'],'ح':[40,1,'حمٓ'],'ق':[50,1,'قٓ'],'ن':[68,1,'نٓ']};
const SADI={1:'Fâtiha',2:'Bakara',10:'Yûnus',19:'Meryem',20:'Tâhâ',36:'Yâsîn',38:'Sâd',40:'Mü’min',42:'Şûrâ',50:'Kâf',68:'Kalem',87:'A‘lâ',93:'Duhâ',94:'İnşirâh',96:'Alak',97:'Kadir',98:'Beyyine',99:'Zilzâl',102:'Tekâsür',103:'Asr',105:'Fîl',106:'Kureyş',107:'Mâûn',108:'Kevser',111:'Mesed',112:'İhlâs',113:'Felak',114:'Nâs'};

/* ============ Extra suras (appended so saved keys stay valid) ============ */
SURAS.push(
  { name:"Kadir Sûresi", note:"Kadir Gecesi", num:97, ayat:[
    {ar:"إِنَّا أَنزَلْنَاهُ فِي لَيْلَةِ الْقَدْرِ", tr:"İnnâ enzelnâhü fî leyleti'l-kadr", de:"Şüphesiz biz onu (Kur'an'ı) Kadir gecesinde indirdik."},
    {ar:"وَمَا أَدْرَاكَ مَا لَيْلَةُ الْقَدْرِ", tr:"Ve mâ edrâke mâ leyletü'l-kadr", de:"Kadir gecesinin ne olduğunu sen nereden bileceksin?"},
    {ar:"لَيْلَةُ الْقَدْرِ خَيْرٌ مِّنْ أَلْفِ شَهْرٍ", tr:"Leyletü'l-kadri hayrun min elfi şehr", de:"Kadir gecesi bin aydan daha hayırlıdır."},
    {ar:"تَنَزَّلُ الْمَلَائِكَةُ وَالرُّوحُ فِيهَا بِإِذْنِ رَبِّهِم مِّن كُلِّ أَمْرٍ", tr:"Tenezzelü'l-melâiketü ve'r-rûhu fîhâ bi-izni rabbihim min külli emr", de:"Melekler ve Cebrail, o gece Rablerinin izniyle her iş için iner."},
    {ar:"سَلَامٌ هِيَ حَتَّىٰ مَطْلَعِ الْفَجْرِ", tr:"Selâmün hiye hattâ matla'i'l-fecr", de:"O gece, tan yeri ağarıncaya kadar bir esenliktir."}
  ]},
  { name:"Âyetü'l-Kürsî", note:"Bakara 255", num:2, audioRef:[2,255], ayat:[
    {ar:"اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ", tr:"Allâhü lâ ilâhe illâ hüve'l-hayyü'l-kayyûm", de:"Allah'tan başka ilah yoktur. O diridir, her şeyi ayakta tutandır."},
    {ar:"لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ ۚ لَّهُ مَا فِي السَّمَاوَاتِ وَمَا فِي الْأَرْضِ", tr:"Lâ te'huzühû sinetün ve lâ nevm, lehû mâ fi's-semâvâti ve mâ fi'l-ard", de:"O'nu ne uyuklama ne de uyku tutar. Göklerdeki ve yerdeki her şey O'nundur."},
    {ar:"مَن ذَا الَّذِي يَشْفَعُ عِندَهُ إِلَّا بِإِذْنِهِ ۚ يَعْلَمُ مَا بَيْنَ أَيْدِيهِمْ وَمَا خَلْفَهُمْ", tr:"Men ze'llezî yeşfeu indehû illâ bi-iznih, ya'lemü mâ beyne eydîhim ve mâ halfehüm", de:"İzni olmadan O'nun katında kim şefaat edebilir? O, insanların önlerindekini ve arkalarındakini bilir."},
    {ar:"وَلَا يُحِيطُونَ بِشَيْءٍ مِّنْ عِلْمِهِ إِلَّا بِمَا شَاءَ ۚ وَسِعَ كُرْسِيُّهُ السَّمَاوَاتِ وَالْأَرْضَ", tr:"Ve lâ yuhîtûne bi-şey'in min ilmihî illâ bimâ şâ', vesia kürsiyyühü's-semâvâti ve'l-ard", de:"O'nun dilediği kadarı dışında ilminden hiçbir şeyi kavrayamazlar. O'nun kürsüsü gökleri ve yeri kaplar."},
    {ar:"وَلَا يَئُودُهُ حِفْظُهُمَا ۚ وَهُوَ الْعَلِيُّ الْعَظِيمُ", tr:"Ve lâ yeûdühû hıfzuhümâ, ve hüve'l-aliyyü'l-azîm", de:"Gökleri ve yeri korumak O'na ağır gelmez. O yücedir, büyüktür."}
  ]}
);
TOTAL_AYAT = SURAS.reduce((n,s)=> n + s.ayat.length, 0);

/* ============ Reading words as a lesson ============ */
(()=>{
  const items = WORDS.map((w, i)=>{
    const others = shuffle(WORDS.filter((_, j)=> j !== i)).slice(0,3).map(x=> x[1]);
    return {g:w[0], correct:w[1], options:[w[1], ...others]};
  });
  LESSONS.push({ id:"kelime", title:"Kelimeler", sign:"قَلَم",
    text:"Harfleri ve harekeleri birleştirerek kelime oku! Kelimeler gökyüzünden ve günlük hayattan seçildi.",
    examples:WORDS.slice(0,3).map(w=> [w[0], w[1]+' · '+w[2]]),
    items });
  LESSON_ITEM_COUNT = LESSONS.reduce((n,l)=> n + l.items.length, 0);
})();

/* ============ Reciters for the suras ============ */
const RECITERS = [
  ['Alafasy_128kbps','Mishary Alafasy'],
  ['Abdurrahmaan_As-Sudais_192kbps','Şeyh Sudeys (Kâbe)'],
  ['Saood_ash-Shuraym_128kbps','Şeyh Şüreym (Kâbe)'],
  ['Hudhaify_128kbps','Şeyh Huzeyfî (Medine)'],
  ['MaherAlMuaiqly128kbps','Şeyh Mâhir el-Muaykılî (Kâbe)']
];
// Display order: Alafasy, the three Kâbe imams, then Medine (indices stay stable for saved choices).
const RECITER_ORDER = [0, 1, 2, 4, 3];
let reciter = 0;
try{ reciter = Math.min(RECITERS.length-1, Math.max(0, +localStorage.getItem('humanur-reciter') || 0)); }catch(e){}
function recitationUrl(sura, ayah, who){
  const r = RECITERS[who === undefined ? reciter : who] || RECITERS[0];
  return 'https://everyayah.com/data/'+r[0]+'/'+pad3(sura)+pad3(ayah)+'.mp3';
}
function ayahAudioUrl(si, ai, who){
  const s = SURAS[si];
  return s.audioRef ? recitationUrl(s.audioRef[0], s.audioRef[1], who) : recitationUrl(s.num, ai+1, who);
}
function reciterChips(){
  return RECITER_ORDER.map(i=>
    `<button class="chip ${i===reciter?'on':''}" type="button" onclick="setReciter(${i})">${RECITERS[i][1]}</button>`).join('');
}
function setReciter(i){
  reciter = i;
  try{ localStorage.setItem('humanur-reciter', String(i)); }catch(e){}
  stopAudio();
  document.querySelectorAll('.reciter-chips').forEach(el=> el.innerHTML = reciterChips());
  if(typeof renderFormsView === 'function') renderFormsView();
}

/* ============ Letter tips + recitation in "Şekiller" ============ */
const LETTER_TIPS = {};
EB_LET.forEach(L=>{ if(L.tip) LETTER_TIPS[L.ch] = L.tip; });
function playRef(sura, ayah){
  stopAudio();
  const audio = new Audio(recitationUrl(sura, ayah));
  currentAudio = audio;
  let retried = false;
  const fail = ()=>{
    if(currentAudio !== audio) return;
    if(!retried && reciter !== 0){
      retried = true;
      showToast('Bu kâri yüklenemedi, Mishary Alafasy okuyor.');
      audio.src = recitationUrl(sura, ayah, 0);
      const p2 = audio.play();
      if(p2 && p2.catch) p2.catch(()=>{ currentAudio = null; });
      return;
    }
    currentAudio = null;
    showToast('Ses yüklenemedi. İnternet bağlantını kontrol et.');
  };
  audio.onended = ()=>{ if(currentAudio === audio) currentAudio = null; };
  audio.onerror = fail;
  const p = audio.play();
  if(p && p.catch) p.catch(fail);
}
function letterExtra(g){
  const tip = LETTER_TIPS[g], w = LEX[g], m = MUK[g];
  let html = '';
  if(tip) html += `<div class="ex-tip">💡 ${tip}</div>`;
  if(w || m){
    html += `<div class="ex-card"><div class="ex-label">Kur'ân'dan dinle · ${RECITERS[reciter][1]}</div>`;
    if(w) html += `<div class="ex-row"><button class="play-btn" type="button" onclick="playRef(${w[2]},${w[3]})" aria-label="Âyeti dinle">▶</button>
      <div class="ex-grow"><div class="arabic ex-ar">${w[0]}</div><div class="ex-sub">${w[1]} · ${SADI[w[2]]||'Sûre '+w[2]}, ${w[3]}. âyet</div></div></div>`;
    if(m) html += `<div class="ex-row"><button class="play-btn" type="button" onclick="playRef(${m[0]},${m[1]})" aria-label="Harfin okunuşunu dinle">▶</button>
      <div class="ex-grow"><div class="arabic ex-ar">${m[2]}</div><div class="ex-sub">Sûre başında harf adıyla okunur (${SADI[m[0]]||'Sûre '+m[0]}, ${m[1]}. âyet)</div></div></div>`;
    html += `</div>`;
  }
  if(typeof voiceBox === 'function') html += voiceBox('l:'+g);
  return html;
}

/* ============ Extra stars ============ */
const EX_SETS = [
  ['d', ()=> DUA.map(x=> x.id)],
  ['i', ()=> ['abdest','namaz']],
  ['n', ()=> ESMA.map((_, i)=> String(i))],
  ['h', ()=> HIK.map(x=> x.id)],
  ['a', ()=> SAH.map(x=> x.id)],
  ['m', ()=> ALIM.map(x=> x.id)],
  ['g', ()=> GOK.map(x=> x.id)],
  ['p', ()=> PAD.map(x=> x.id)]
];
const exCount = prefix=> Object.keys(state.extra).filter(k=> state.extra[k] && k.startsWith(prefix+':')).length;
function extraStars(){
  let n = 0, max = 0;
  EX_SETS.forEach(([p, ids])=>{ const all = ids(); max += all.length; n += all.filter(id=> state.extra[p+':'+id]).length; });
  return {n, max};
}
function exMark(key, btn){
  if(state.extra[key]){ showToast('Bu zaten tamamlandı ✓'); return; }
  state.extra[key] = true;
  if(btn){ celebrate(btn); btn.classList.add('done'); btn.textContent = '✓ Tamamlandı'; }
  showToast('Maşallah! +1 yıldız ⭐');
  updateHeader();
  if(['dua','ibadet','kissa','hazine'].includes(currentStage)) renderExtra(currentStage);
}
const exBtn = (key, label)=> state.extra[key]
  ? `<button class="ex-learn done" type="button">✓ Tamamlandı</button>`
  : `<button class="ex-learn" type="button" onclick="exMark('${key}', this)">${label} ⭐</button>`;
const exSpeak = ar=> `<button class="ex-speak" type="button" onclick="speakArabic(this.dataset.ar)" data-ar="${ar}">🔊 Dinle</button>`;

/* ============ Day log (for streaks and the parent panel) ============ */
const dkOf = d=> d.getFullYear()+'-'+(d.getMonth()+1)+'-'+d.getDate();
const DK = dkOf(new Date());
const dayIdx = Math.floor((Date.now() + 7200000) / 864e5);
let lastTotal = null;
function logProgress(total){
  if(lastTotal !== null && total > lastTotal){
    const d = state.days[DK] || (state.days[DK] = {s:[0,0,0,0,0], n:0});
    d.n = (d.n || 0) + (total - lastTotal);
  }
  lastTotal = total;
}
function dayNum(k){ const a = String(k).split('-').map(Number); return Math.floor(Date.UTC(a[0], a[1]-1, a[2]) / 864e5); }
function streak(){
  const ds = new Set(Object.keys(state.days).filter(k=> (state.days[k].n||0) > 0 || (state.days[k].s||[]).some(Boolean)).map(dayNum));
  let t = dayNum(DK); if(!ds.has(t)) t--;
  let n = 0; while(ds.has(t)){ n++; t--; }
  return n;
}

/* ============ Hijri calendar ============ */
let HF = null;
try{ HF = new Intl.DateTimeFormat('en-u-ca-islamic-umalqura-nu-latn', {day:'numeric', month:'numeric', year:'numeric'}); }catch(e){}
function hij(d){ const p = HF.formatToParts(d); const g = t=> +p.find(x=> x.type===t).value; return {m:g('month'), d:g('day'), y:g('year')}; }
let _oz = null;
function ozList(){
  if(_oz) return _oz;
  _oz = [];
  if(!HF) return _oz;
  try{
    const base = new Date(); base.setHours(12,0,0,0);
    const days = [];
    for(let i = 0; i < 420; i++){ const x = new Date(base.getTime() + i*864e5); days.push([x, hij(x)]); }
    OZEL.forEach(o=>{ const k = days.findIndex(([x,h])=> h.m===o.m && h.d===o.d); if(k >= 0) _oz.push(Object.assign({}, o, {left:k, date:days[k][0]})); });
    _oz.sort((a,b)=> a.left - b.left);
  }catch(e){}
  return _oz;
}
const fmtD = d=> d.toLocaleDateString('tr-TR', {day:'numeric', month:'long', weekday:'long'});
const leftTxt = n=> n===0 ? 'Bugün' : n===1 ? 'Yarın' : n+' gün sonra';

/* ============ Rewards ============ */
function lvlOf(st){ let i = 0; LEVELS.forEach((l, k)=>{ if(st >= l[0]) i = k; }); return i; }
const suraDone = si=> SURAS[si].ayat.every((_, ai)=> state.suraAyat[si+'-'+ai]);
const BADGES = [
  ['İlk Adım','🌱','İlk yıldızını kazan', ()=> totalStars().total >= 1],
  ['Harf Kâşifi','ب','14 harf öğren', ()=> countTrue(state.letters) >= 14],
  ['Elifbe Tamam','🎓','28 harfin hepsi', ()=> countTrue(state.letters) >= 28],
  ['Küçük Hattat','✍️','10 harfi parmağınla çiz', ()=> countTrue(state.trace) >= 10],
  ['Fâtiha','📖','Fâtiha Sûresi\'ni ezberle', ()=> suraDone(0)],
  ['Sûre Dostu','📚','5 sûreyi tamamla', ()=> SURAS.filter((_, i)=> suraDone(i)).length >= 5],
  ['Dua Eri','🤲','5 dua ezberle', ()=> exCount('d') >= 5],
  ['Abdest ve Namaz','🕌','Abdesti ve namazı öğren', ()=> state.extra['i:abdest'] && state.extra['i:namaz']],
  ['Esmâ Yolcusu','✨','10 esmâ öğren', ()=> exCount('n') >= 10],
  ['Esmâ\'ül Hüsnâ','💎','99 esmânın hepsi', ()=> exCount('n') >= 99],
  ['Hikâye Dinleyici','🌙','3 kıssa veya sahâbe oku', ()=> exCount('h') + exCount('a') >= 3],
  ['Bilgin Avcısı','🔭','3 âlimi tanı', ()=> exCount('m') >= 3],
  ['Tarih Yolcusu','🏛️','3 padişahı tanı', ()=> exCount('p') >= 3],
  ['Akşam Sofrası','🍽️','Bir akşam 5 adımı bitir', ()=> Object.values(state.days).some(d=> d.bonus)],
  ['3 Gün Üst Üste','🔥','3 gün art arda çalış', ()=> streak() >= 3],
  ['Bir Hafta','🏅','7 gün art arda çalış', ()=> streak() >= 7],
  ['100 Yıldız','🌟','100 yıldız topla', ()=> totalStars().total >= 100],
  ['200 Yıldız','🏆','200 yıldız topla', ()=> totalStars().total >= 200]
];

/* ============ Map nodes and panels ============ */
const EX_STAGES = [
  {id:'gun',     icon:'📅', title:'Bugün',               desc:'Günün âyeti ve hadisi, Akşam Sofrası, özel günler'},
  {id:'dua',     icon:'🤲', title:'Dualar',              desc:'Her gün okunan kısa dualar'},
  {id:'ibadet',  icon:'🕌', title:'Abdest ve Namaz',     desc:'Adım adım, çizimli anlatım ve vakitler'},
  {id:'esma',    icon:'✨', title:'Esmâ\'ül Hüsnâ',     desc:'Allah\'ın 99 güzel ismi'},
  {id:'kissa',   icon:'🌙', title:'Kıssalar ve Sahâbe',  desc:'Uyumadan önce birlikte okunacak hikâyeler'},
  {id:'hazine',  icon:'🔭', title:'Bilgi Hazinesi',      desc:'Âlimler, gökyüzü ve Osmanlı padişahları'},
  {id:'oduller', icon:'🏆', title:'Ödüllerim',           desc:'Seviyeler, rozetler ve seri'},
  {id:'veli',    icon:'👪', title:'Ebeveyn Paneli',      desc:'Haftalık özet ve takip'}
];
const exUI = {dua:null, ibadet:'abdest', kissa:'hikaye', kissaItem:null, hazine:'alim', hazineItem:null, gi:0, pOk:false, pq:[3+Math.floor(Math.random()*6), 4+Math.floor(Math.random()*6)]};

function buildExtras(){
  // Map: section heading + nodes before the Ottoman stories node
  const anchor = document.querySelector('.story-node');
  const head = document.createElement('div');
  head.className = 'map-heading';
  head.innerHTML = '<span>Daha Fazla Keşfet</span>';
  anchor.parentNode.insertBefore(head, anchor);
  EX_STAGES.forEach(st=>{
    const n = document.createElement('div');
    n.className = 'stage-node ex-node';
    n.dataset.stage = st.id;
    n.setAttribute('role', 'button');
    n.tabIndex = 0;
    n.onclick = ()=> openStage(st.id);
    n.onkeydown = e=> onStageKey(e, st.id);
    n.innerHTML = `<div class="stage-badge">${st.icon}</div><div class="stage-body"><h3>${st.title}</h3><p>${st.desc}</p><div class="stage-stars" id="stars-${st.id}"></div></div>`;
    anchor.parentNode.insertBefore(n, anchor);
  });
  // Panels
  const main = document.querySelector('main');
  EX_STAGES.forEach(st=>{
    const sec = document.createElement('section');
    sec.className = 'panel';
    sec.id = 'panel-'+st.id;
    sec.innerHTML = `<button class="back-btn" onclick="closeStage()">← Yolculuğa dön</button>
      <div class="panel-header"><h2>${st.title}</h2><p>${st.desc}</p></div><div class="ex-body" id="exbody-${st.id}"></div>`;
    main.appendChild(sec);
  });
  // Reciter choice above the suras
  const wrap = document.getElementById('surasWrap');
  const rc = document.createElement('div');
  rc.className = 'ex-card';
  rc.innerHTML = '<div class="ex-label">Kâri (okuyan)</div><div class="chips reciter-chips"></div>';
  wrap.parentNode.insertBefore(rc, wrap);
  rc.querySelector('.reciter-chips').innerHTML = reciterChips();
  renderAllExtras();
}

function renderAllExtras(){
  ['gun','dua','ibadet','esma','kissa','hazine','oduller','veli'].forEach(id=> renderExtra(id));
}
function renderExtra(id){
  const el = document.getElementById('exbody-'+id);
  if(!el) return;
  el.innerHTML = ({gun:vGun, dua:vDua, ibadet:vIbadet, esma:vEsma, kissa:vKissa, hazine:vHazine, oduller:vOduller, veli:vVeli})[id]();
}

function updateExtras(){
  const set = (id, txt)=>{ const e = document.getElementById('stars-'+id); if(e) e.textContent = txt; };
  set('dua', exCount('d')+' / '+DUA.length+' ★');
  set('ibadet', exCount('i')+' / 2 ★');
  set('esma', exCount('n')+' / '+ESMA.length+' ★');
  set('kissa', (exCount('h')+exCount('a'))+' / '+(HIK.length+SAH.length)+' ★');
  set('hazine', (exCount('m')+exCount('g')+exCount('p'))+' / '+(ALIM.length+GOK.length+PAD.length)+' ★');
  const lv = LEVELS[lvlOf(totalStars().total)];
  set('oduller', lv[2]+' 🔥 '+streak()+' gün');
  const oz = ozList()[0], d = state.days[DK];
  set('gun', '🍽️ '+(d ? d.s.filter(Boolean).length : 0)+'/5'+(oz ? ' · 🌙 '+leftTxt(oz.left) : ''));
  set('veli', 'Yetişkinler için');
  // keep open panels fresh, but don't redraw the one being interacted with
  ['oduller','veli'].forEach(id=>{ if(currentStage !== id) renderExtra(id); });
}

/* ----- Bugün ----- */
const EVENING = [
  ['Besmele ile başla', ()=> openExtraItem('dua','besmele')],
  ['Bugünün hikâyesini oku', ()=> openExtraItem('kissa','h:'+HIK[dayIdx % HIK.length].id)],
  ['İhlâs, Felak ve Nâs sûrelerini oku', ()=> openStage('suras')],
  ['Uyku duasını oku', ()=> openExtraItem('dua','uyku')],
  ['Bugün için bir şükür söyle', null]
];
function vGun(){
  const i = dayIdx + exUI.gi;
  const ay = AYET[((i % AYET.length) + AYET.length) % AYET.length];
  const h = HADIS[((i % HADIS.length) + HADIS.length) % HADIS.length];
  const g = ESMA[dayIdx % 99];
  const d = state.days[DK] || {s:[0,0,0,0,0]};
  let hijri = '';
  try{ const x = hij(new Date()); hijri = `${x.d} ${HAYLER[x.m-1]} ${x.y}`; }catch(e){}
  const L = ozList();
  return `
    <div class="ex-card ex-center"><div class="ex-label">Günün âyeti</div>
      <div class="arabic ex-ar-lg">${ay[0]}</div><div class="ex-okunus">${ay[1]}</div><p>${ay[2]}</p><div class="ex-sub">${ay[3]}</div>${exSpeak(ay[0])}</div>
    <div class="ex-card ex-center"><div class="ex-label">Hadis-i şerif</div><p class="ex-quote">“${h[0]}”</p><div class="ex-sub">${h[1]}</div></div>
    <div class="ex-row ex-nav"><button class="chip" type="button" onclick="exUI.gi--;renderExtra('gun')">← Önceki</button><button class="chip" type="button" onclick="exUI.gi=0;renderExtra('gun')">Bugün</button><button class="chip" type="button" onclick="exUI.gi++;renderExtra('gun')">Sonraki →</button></div>
    <div class="ex-card ex-center"><div class="ex-label">Günün ismi</div><div class="arabic ex-ar-lg">${g[0]}</div><b>${g[1]}</b><p>${g[2]}</p></div>
    <div class="ex-evening"><h3>Akşam Sofrası</h3><p>Günü huzurla kapatmak için 5 küçük adım.</p>
      ${EVENING.map((s, k)=> `<div class="ex-step-row"><button class="ex-step ${d.s[k]?'on':''}" type="button" onclick="toggleEvening(${k})"><span class="cb">${d.s[k]?'✓':''}</span>${s[0]}</button>${s[1]?`<button class="ex-go" type="button" onclick="EVENING[${k}][1]()">Aç</button>`:''}</div>`).join('')}
      <p>${d.s.filter(Boolean).length}/5 tamamlandı${d.bonus?' · Maşallah! 🌷':''}</p></div>
    <h3 class="sub-title">Özel Günler</h3>
    ${hijri ? `<p class="tab-hint">Bugün: ${hijri} (yaklaşık). Tarihler Hicrî takvime göre hesaplanır; Diyanet takvimiyle bir gün fark olabilir. Kandiller, belirtilen günden bir önceki akşam başlar.</p>` : ''}
    ${L.length ? L.map((o, k)=> `<div class="ex-card"><div class="ex-row"><b class="ex-grow">${o.n}</b>${k===0?'<span class="chip on">Yaklaşıyor</span>':''}</div>
      <div class="ex-sub"><b>${leftTxt(o.left)}</b> · ${o.eve?'gece: ':''}${fmtD(o.eve ? new Date(o.date.getTime()-864e5) : o.date)}</div>
      <p>${o.t}</p><div class="ex-label">Birlikte yapalım</div><ul class="ex-ul">${o.a.map(x=> `<li>${x}</li>`).join('')}</ul>
      ${o.dua ? (()=>{ const dd = DUA.find(x=> x.id===o.dua); return dd ? `<div class="ex-mean"><div class="arabic ex-ar">${dd.ar}</div><div class="ex-okunus">${dd.ok}</div><p>${dd.m}</p></div>` : ''; })() : ''}
      ${o.tek ? `<div class="ex-mean"><b>Bayram tekbiri</b><div class="arabic ex-ar">${TEKBIR.ar}</div><div class="ex-okunus">${TEKBIR.ok}</div></div>` : ''}</div>`).join('')
      : '<div class="ex-card">Hicrî takvim bu cihazda hesaplanamadı. Güncel tarihler için Diyanet takvimine bakınız.</div>'}`;
}
function toggleEvening(k){
  const d = state.days[DK] || (state.days[DK] = {s:[0,0,0,0,0], n:0});
  d.s[k] = d.s[k] ? 0 : 1;
  if(d.s.every(Boolean) && !d.bonus){
    d.bonus = 1;
    celebrate(document.querySelector('#panel-gun .ex-evening'));
    showToast('Maşallah! Akşam Sofrası tamam! 🌷');
  }
  saveProgress();
  renderExtra('gun');
  updateExtras();
}

/* ----- Dualar ----- */
function vDua(){
  return DUA.map(d=>{
    const open = exUI.dua === d.id, key = 'd:'+d.id;
    return `<div class="ex-item ${open?'open':''} ${state.extra[key]?'learned':''}" id="dua-${d.id}">
      <button class="ex-item-head" type="button" onclick="exUI.dua = exUI.dua==='${d.id}' ? null : '${d.id}'; renderExtra('dua')">
        <span class="ex-num">${state.extra[key]?'✓':'🤲'}</span><span class="ex-grow"><b>${d.t}</b><span class="ex-sub">${d.w}</span></span><span class="chevron">▸</span></button>
      ${open ? `<div class="ex-item-body"><div class="arabic ex-ar-lg">${d.ar}</div><div class="ex-okunus">${d.ok}</div>
        <div class="ex-mean"><b>Anlamı</b><p>${d.m}</p></div><div class="ex-row">${exSpeak(d.ar)}${exBtn(key,'Ezberledim')}</div>
        ${typeof voiceBox === 'function' ? voiceBox(key) : ''}</div>` : ''}</div>`;
  }).join('');
}

/* ----- Abdest ve Namaz ----- */
function vIbadet(){
  const sub = exUI.ibadet;
  const tabs = [['abdest','Abdest'],['namaz','Namaz'],['vakit','Vakitler']].map(([k,l])=>
    `<button class="tab-btn ${sub===k?'active':''}" type="button" onclick="exUI.ibadet='${k}';renderExtra('ibadet')">${l}</button>`).join('');
  let body;
  if(sub === 'abdest'){
    body = AB.map((s, i)=> `<div class="ex-card ex-step-card"><div class="ex-pic">${abIcon(i)}</div><div class="ex-grow"><span class="ex-no">${i+1}</span><b>${s[0]}</b><p>${s[1]}</p>${s[2]?`<div class="arabic ex-ar">${s[2]}</div><div class="ex-okunus">${s[3]}</div>`:''}</div></div>`).join('')
      + `<div class="ex-mean"><b>Abdesti bozan şeyler</b><p>Tuvalet ihtiyacı, yellenmek, yatarak uyumak, bayılmak ve vücuttan akan kan gibi durumlar abdesti bozar.</p></div>`
      + exBtn('i:abdest', 'Abdesti öğrendim');
  }else if(sub === 'namaz'){
    body = `<p class="tab-hint">İki rekâtlık bir namazın adımları. Peygamberimiz çocuklara yedi yaşında namazı öğretmeyi tavsiye etmiştir. Erkek ve kız çocukların bazı duruşları farklıdır; bir hocadan ya da ebeveynden birlikte öğrenin.</p>`
      + NM.map((s, i)=> `<div class="ex-card ex-step-card">${pose(s[1])}<div class="ex-grow"><span class="ex-no">${i+1}</span><b>${s[0]}</b><p>${s[2]}</p>${s[3]?`<div class="arabic ex-ar">${s[3]}</div><div class="ex-okunus">${s[4]}</div>`:''}</div></div>`).join('')
      + exBtn('i:namaz', 'Namazı öğrendim');
  }else{
    body = `<p class="tab-hint">Vakitlerin rekât sayıları: <span class="chip on">Farz</span> <span class="chip">Sünnet</span> <span class="chip gold">Vitir</span>. Başlangıçta farzları öğrenmek yeterlidir; sünnetler zamanla eklenir.</p>`
      + VAK.map(v=> `<div class="ex-card"><b>${v[0]} namazı</b><div class="chips">${v[1].map(x=> `<span class="chip ${x[0]==='f'?'on':x[0]==='v'?'gold':''}">${x[1]} ${x[0]==='f'?'farz':x[0]==='v'?'vitir':'sünnet'}</span>`).join('')}</div></div>`).join('')
      + `<p class="tab-hint">Namaz vakitleri günden güne değişir. Bulunduğunuz yerin vakitleri için Diyanet İşleri Başkanlığı'nın takvimine bakın.</p>`;
  }
  return `<div class="tabbar">${tabs}</div>${body}`;
}

/* ----- Esmâ'ül Hüsnâ ----- */
function vEsma(){
  const gi = dayIdx % 99, g = ESMA[gi];
  return `<div class="ex-card ex-center"><div class="ex-label">Günün ismi</div><div class="arabic ex-ar-lg">${g[0]}</div><b>${gi+1}. ${g[1]}</b><p>${g[2]}</p></div>
    <p class="tab-hint">Öğrendiğin isme dokun, yıldız kazan.</p>
    <div class="ex-grid">${ESMA.map((e, i)=> `<button class="ex-name ${state.extra['n:'+i]?'learned':''}" type="button" onclick="learnEsma(${i}, this)"><span class="ex-k">${i+1}</span><span class="arabic">${e[0]}</span><b>${e[1]}</b><span class="ex-sub">${e[2]}</span></button>`).join('')}</div>`;
}
function learnEsma(i, el){
  if(state.extra['n:'+i]){ speakArabic(ESMA[i][0]); return; }
  speakArabic(ESMA[i][0]);
  exMark('n:'+i);
  el.classList.add('learned');
  celebrate(el);
}

/* ----- Kıssalar ve Sahâbe ----- */
function openExtraItem(panel, item){
  if(panel === 'dua'){ exUI.dua = item; }
  else if(panel === 'kissa'){ exUI.kissa = item.startsWith('a:') ? 'sahabe' : 'hikaye'; exUI.kissaItem = item; }
  if(currentStage) document.getElementById('panel-'+currentStage).classList.remove('open');
  currentStage = null;
  renderExtra(panel);
  openStage(panel);
}
function vKissa(){
  const it = exUI.kissaItem;
  if(it){
    const [t, id] = it.split(':');
    const back = `<button class="chip" type="button" onclick="exUI.kissaItem=null;renderExtra('kissa')">← Listeye dön</button>`;
    if(t === 'h'){
      const h = HIK.find(x=> x.id===id);
      return `${back}<div class="ex-story"><h3>${h.t}</h3><div class="ex-sub">${h.k}</div>${h.p.map(p=> `<p>${p}</p>`).join('')}
        ${h.dua ? `<div class="ex-mean"><b>Hikâyenin duası</b><div class="arabic ex-ar">${h.dua.ar}</div><div class="ex-okunus">${h.dua.ok}</div><p>${h.dua.m}</p>${exSpeak(h.dua.ar)}</div>` : ''}
        <div class="ex-ders"><b>Dersimiz</b>${h.d}</div>${exBtn(it,'Okudum')}</div>`;
    }
    const s = SAH.find(x=> x.id===id);
    return `${back}<div class="ex-story"><h3>${s.n}</h3><div class="ex-sub">${s.l}</div>${s.p.map(p=> `<p>${p}</p>`).join('')}
      <div class="ex-ders"><b>Bizim için örnek</b>${s.d}</div><p class="tab-hint">Bu bilgiler kısaca özetlenmiştir; ayrıntılar için bir siyer kitabına birlikte bakabilirsiniz.</p>${exBtn(it,'Okudum')}</div>`;
  }
  const sub = exUI.kissa;
  const tabs = [['hikaye','Kıssalar'],['sahabe','Sahâbe Hayatı']].map(([k,l])=>
    `<button class="tab-btn ${sub===k?'active':''}" type="button" onclick="exUI.kissa='${k}';renderExtra('kissa')">${l}</button>`).join('');
  const list = sub === 'hikaye'
    ? HIK.map(h=> exListItem('h:'+h.id, '🌙', h.t, h.k, 'kissa'))
    : SAH.map((s, i)=> exListItem('a:'+s.id, String(i+1), s.n, s.l, 'kissa'));
  return `<div class="tabbar">${tabs}</div>${list.join('')}`;
}
function exListItem(key, num, title, sub, panel){
  return `<button class="ex-item-head ex-list ${state.extra[key]?'learned':''}" type="button" onclick="exOpen('${panel}','${key}')">
    <span class="ex-num">${state.extra[key]?'✓':num}</span><span class="ex-grow"><b>${title}</b><span class="ex-sub">${sub}</span></span><span class="chevron">▸</span></button>`;
}
function exOpen(panel, key){
  if(panel === 'kissa') exUI.kissaItem = key; else exUI.hazineItem = key;
  renderExtra(panel);
  window.scrollTo({top:0, behavior:'smooth'});
}

/* ----- Bilgi Hazinesi: Âlimler, Gökyüzü, Padişahlar ----- */
function vHazine(){
  const it = exUI.hazineItem;
  const back = `<button class="chip" type="button" onclick="exUI.hazineItem=null;renderExtra('hazine')">← Listeye dön</button>`;
  if(it){
    const [t, id] = it.split(':');
    if(t === 'm'){
      const a = ALIM.find(x=> x.id===id);
      return `${back}<div class="ex-story"><h3>${a.n}</h3><div class="ex-sub">${a.alan} · ${a.d}</div><p>${a.ozet}</p>
        <div class="ex-label">Eserleri (yazdığı kitaplar)</div>${a.eser.map(e=> `<div class="ex-card"><b>${e.ad}</b><div class="ex-sub">${e.anlam}</div></div>`).join('')}
        <div class="ex-ders"><b>Dersimiz</b>${a.ders}</div>${exBtn(it,'Okudum')}</div>`;
    }
    if(t === 'g'){
      const g = GOK.find(x=> x.id===id), mo = moonPhase();
      return `${back}<div class="ex-story"><h3>${g.t}</h3><div class="ex-sub">${g.k}</div>
        ${id==='ay-hilal' ? `<div class="ex-card ex-center">${moonSvg(mo.p)}<b>${mo.name}</b><div class="ex-sub">Ayın yaşı yaklaşık ${Math.round(mo.age)} gün · Aydınlık: %${Math.round(mo.lit*100)}</div></div>` : ''}
        ${g.p.map(p=> `<p>${p}</p>`).join('')}
        ${g.ayet ? `<div class="ex-mean"><b>Âyet-i kerime · ${g.ayet.k}</b><div class="arabic ex-ar">${g.ayet.ar}</div><div class="ex-okunus">${g.ayet.ok}</div><p>${g.ayet.m}</p>${exSpeak(g.ayet.ar)}</div>` : ''}
        <div class="ex-label">Birlikte yapalım</div><ul class="ex-ul">${g.a.map(x=> `<li>${x}</li>`).join('')}</ul>${exBtn(it,'Okudum')}</div>`;
    }
    const p = PAD.find(x=> x.id===id);
    return `${back}<div class="ex-story"><h3>${p.n}</h3><div class="ex-sub">${p.d}</div><p>${p.ozet}</p>
      <div class="ex-label">Yaptıkları</div><ul class="ex-ul">${p.yap.map(x=> `<li>${x}</li>`).join('')}</ul>
      ${p.hadis ? `<div class="ex-mean"><b>Hadis-i şerif</b><p>${p.hadis}</p></div>` : ''}
      <div class="ex-ders"><b>Dersimiz</b>${p.ders}</div>${exBtn(it,'Okudum')}</div>`;
  }
  const sub = exUI.hazine;
  const tabs = [['alim','Âlimler'],['gok','Gökyüzü'],['pad','Padişahlar']].map(([k,l])=>
    `<button class="tab-btn ${sub===k?'active':''}" type="button" onclick="exUI.hazine='${k}';renderExtra('hazine')">${l}</button>`).join('');
  let list;
  if(sub === 'alim') list = `<p class="tab-hint">Bilime katkı yapan Müslüman âlimler ve yazdıkları kitaplar.</p>` + ALIM.map(a=> exListItem('m:'+a.id, alanIc(a.alan), a.n, a.alan, 'hazine')).join('');
  else if(sub === 'gok'){
    const mo = moonPhase();
    list = `<div class="ex-card ex-center">${moonSvg(mo.p)}<b>Bugünün Ayı: ${mo.name}</b><div class="ex-sub">Aydınlık: %${Math.round(mo.lit*100)}</div></div>`
      + GOK.map(g=> exListItem('g:'+g.id, '✨', g.t, g.k, 'hazine')).join('');
  }
  else list = `<p class="tab-hint">Osmanlı padişahlarının ilim, sanat, hizmet ve adalet alanındaki önemli işleri.</p>` + PAD.map((p, i)=> exListItem('p:'+p.id, String(i+1), p.n, p.d, 'hazine')).join('');
  return `<div class="tabbar">${tabs}</div>${list}`;
}

/* ----- Ödüllerim ----- */
function vOduller(){
  const total = totalStars().total, lv = lvlOf(total), cur = LEVELS[lv], nx = LEVELS[lv+1], st = streak();
  const got = BADGES.filter(b=> b[3]()).length;
  const pct = nx ? Math.round((total - cur[0]) / (nx[0] - cur[0]) * 100) : 100;
  return `<div class="ex-card ex-center"><div class="ex-level">${cur[2]}</div><h3>${cur[1]}</h3>
      <div class="ex-sub">${total} yıldız${nx ? ` · sonraki seviye: ${nx[2]} ${nx[1]} (${nx[0]-total} yıldız kaldı)` : ' · en yüksek seviye!'}</div>
      <div class="bar-bg ex-bar"><div class="bar-fill" style="width:${pct}%"></div></div></div>
    <div class="ex-row ex-stats"><div class="ex-card ex-center"><b>🔥 ${st}</b><div class="ex-sub">gün üst üste</div></div><div class="ex-card ex-center"><b>🏅 ${got}/${BADGES.length}</b><div class="ex-sub">rozet</div></div></div>
    <div class="ex-label">Seviyeler</div><div class="chips">${LEVELS.map((l, i)=> `<span class="chip ${i<=lv?'on':''}">${l[2]} ${l[1]} · ${l[0]}</span>`).join('')}</div>
    <div class="ex-label">Rozetler</div>
    <div class="ex-grid">${BADGES.map(b=>{ const ok = b[3](); return `<div class="ex-name ${ok?'learned':'locked'}"><span class="ex-badge">${ok?b[1]:'🔒'}</span><b>${b[0]}</b><span class="ex-sub">${b[2]}</span></div>`; }).join('')}</div>`;
}

/* ----- Ebeveyn Paneli ----- */
function vVeli(){
  if(!exUI.pOk){
    return `<div class="ex-card"><b>Yetişkin doğrulaması</b><p class="tab-hint">Bu bölüm ebeveynler içindir. Devam etmek için işlemi çöz.</p>
      <label for="pans"><b>${exUI.pq[0]} + ${exUI.pq[1]} = ?</b></label>
      <input id="pans" class="ex-input" type="number" inputmode="numeric" autocomplete="off">
      <button class="ex-learn" type="button" onclick="parentCheck()">Giriş</button><p id="pErr" class="ex-err"></p></div>`;
  }
  const t = totalStars();
  const week = [];
  const gun = ['Paz','Pzt','Sal','Çar','Per','Cum','Cmt'];
  for(let i = 6; i >= 0; i--){ const d = new Date(); d.setDate(d.getDate()-i); const k = dkOf(d); const x = state.days[k] || {}; week.push({lab:gun[d.getDay()], n:x.n||0, ev:(x.s||[]).filter(Boolean).length}); }
  const mx = Math.max(1, ...week.map(w=> w.n));
  const left = SURAS.filter((_, i)=> !suraDone(i)).map(s=> s.name).concat(DUA.filter(d=> !state.extra['d:'+d.id]).map(d=> 'Dua: '+d.t));
  const stat = (v, l)=> `<div class="ex-card ex-center"><b>${v}</b><div class="ex-sub">${l}</div></div>`;
  return `<div class="ex-stats-grid">
      ${stat(t.total+' / '+t.max, 'toplam yıldız')}${stat(t.stage1+' / '+STAGE1_MAX, 'Elifbe')}${stat(t.s+' / '+SYLLABLES.length, 'hece')}
      ${stat(t.d+' / '+LESSON_ITEM_COUNT, 'okuma dersi')}${stat(t.q+' / '+TOTAL_AYAT, 'âyet')}${stat(exCount('d')+' / '+DUA.length, 'dua')}
      ${stat(exCount('n')+' / 99', 'Esmâ')}${stat('🔥 '+streak(), 'gün üst üste')}</div>
    <div class="ex-label">Son 7 gün · kazanılan yıldız</div>
    <div class="ex-card"><div class="ex-bars">${week.map(w=> `<div><em>${w.n}</em><i style="height:${Math.round(w.n/mx*70)}%"></i><small>${w.lab}</small></div>`).join('')}</div></div>
    <div class="ex-label">Akşam Sofrası · adım</div>
    <div class="ex-card"><div class="ex-bars ex-bars-sm">${week.map(w=> `<div><em>${w.ev}</em><i class="gold" style="height:${Math.round(w.ev/5*60)}%"></i><small>${w.lab}</small></div>`).join('')}</div></div>
    <div class="ex-label">Zorlandıkları</div>
    <div class="ex-card">${(()=>{ const w = typeof weakItems === 'function' ? weakItems(12) : []; return w.length ? `<div class="chips">${w.map(k=> `<span class="chip weak-chip">${weakLabel(k)} · ${state.mistakes[k]}×</span>`).join('')}</div><p class="ex-sub">Bunlar "Bugünkü dersim"de tekrar sorulur; doğru bildikçe listeden çıkar.</p>` : '<p>Şu an zorlandığı bir şey yok. 👏</p>'; })()}</div>
    <div class="ex-label">Sırada ezberlenecekler</div>
    <div class="ex-card">${left.length ? `<div class="chips">${left.map(x=> `<span class="chip gold">${x}</span>`).join('')}</div>` : '<p>Tüm sûre ve dualar tamamlandı. Maşallah!</p>'}</div>
    <div class="ex-row"><button class="ex-learn" type="button" onclick="copySummary()">Özeti kopyala</button><button class="reset-btn" type="button" onclick="resetProgress()">İlerlemeyi sıfırla</button></div>
    <div class="ex-label">Başka cihaza taşı</div>
    <div class="ex-card"><p>İlerleme bu cihazda saklanır. Başka bir telefona veya tablete geçmek için önce burada dosyayı indir, sonra diğer cihazda bu panelden yükle. Yüklenen ilerleme mevcut olanla birleştirilir; hiçbir yıldız kaybolmaz.</p>
      <div class="ex-row"><button class="ex-learn" type="button" onclick="exportProgress()">📥 İlerlemeyi indir</button>
      <label class="voice-btn ghost">📤 Dosyadan yükle<input type="file" accept="application/json,.json" hidden onchange="importProgress(this)"></label></div>
      <p class="ex-sub">Ses kayıtları dosyaya dahil değildir; her cihazda ayrıca kaydedilir.</p></div>
    <p class="tab-hint">Kayıtlar bu sürümden itibaren tutulur.</p>`;
}
function parentCheck(){
  const v = +(document.getElementById('pans')||{}).value;
  if(v === exUI.pq[0] + exUI.pq[1]){ exUI.pOk = true; renderExtra('veli'); }
  else document.getElementById('pErr').textContent = 'Cevap yanlış, tekrar dene.';
}
function copySummary(){
  const t = totalStars();
  const txt = `Hümanur'un Kur'an Yolculuğu – özet\nYıldız: ${t.total}/${t.max}\nElifbe: ${t.stage1}/${STAGE1_MAX}, Hece: ${t.s}/${SYLLABLES.length}, Okuma dersleri: ${t.d}/${LESSON_ITEM_COUNT}\nÂyet: ${t.q}/${TOTAL_AYAT}, Dua: ${exCount('d')}/${DUA.length}, Esmâ: ${exCount('n')}/99\nSeri: ${streak()} gün`;
  try{ navigator.clipboard.writeText(txt).then(()=> showToast('Özet kopyalandı'), ()=> showToast('Kopyalanamadı')); }catch(e){ showToast('Kopyalanamadı'); }
}
