/* Araç listesi. Yönetim panelindeki "Araçlar" bölümünden düzenlenir.
   Elle düzenleyeceksen yapıyı (anahtar adlarını) bozmamaya dikkat et. */
window.ARACLAR = [
  {
    "id": "chatgpt",
    "ad": "ChatGPT",
    "url": "https://chatgpt.com",
    "kategori": [
      "metin",
      "gorsel"
    ],
    "ucret": "kismen",
    "ucretNot": "Ücretsiz planda günlük kullanım sınırlıdır; sınır dolunca daha basit modele düşer.",
    "ozet": "En yaygın sohbet tabanlı yapay zekâ. Soru hazırlama, plan yazma, metin düzeltme ve görsel üretmeyi tek yerde yapar.",
    "alt": "Sohbet",
    "yas": "13+, 18 yaş altı için veli onayı isteniyor",
    "turkce": "Arayüz ve çıktı Türkçe; Türkçe metinlerde başarılı.",
    "neIcin": [
      "Kazanıma uygun test, açık uçlu soru ve cevap anahtarı hazırlamak.",
      "Ders planı, etkinlik ve dereceli puanlama anahtarı (rubrik) yazmak.",
      "Veli yazısı, duyuru ve resmî yazı taslağı çıkarmak.",
      "PDF ya da Word belgesi yükleyip özet ve soru üretmek.",
      "Görsel üretmek ve görseli sohbetle adım adım düzeltmek."
    ],
    "prompt": "Ben [5.] sınıf [Sosyal Bilgiler] öğretmeniyim. \"[Konu]\" konusunda 10 soruluk, 4 seçenekli bir test hazırla. Sorular kolaydan zora sıralansın. Çeldiriciler öğrencilerin yaptığı yaygın yanlışları yansıtsın. Sonuna cevap anahtarını ve her cevabın kısa gerekçesini ekle.",
    "ipucu": "Sonuç istediğin gibi değilse sıfırdan yazmak yerine konuşmaya devam et: \"üçüncü soru çok kolay, zorlaştır\" gibi tek cümlelik düzeltmeler en hızlı yoldur.",
    "dikkat": "Öğrenci adı, numarası, notu ya da sağlık bilgisi girme. Ücretsiz planda yazdıkların modelin eğitiminde kullanılabilir; ayarlardan kapatabilirsin.",
    "etiket": [
      "sohbet",
      "sinav",
      "test",
      "ders plani",
      "metin",
      "openai",
      "gpt"
    ],
    "kontrol": "2026-11"
  },
  {
    "id": "gemini",
    "ad": "Google Gemini",
    "url": "https://gemini.google.com",
    "kategori": [
      "metin",
      "gorsel",
      "video"
    ],
    "ucret": "kismen",
    "ucretNot": "Temel kullanım ücretsiz. Video ve ileri görsel üretimi ücretli planlarda; bazı ülkelerde öğrencilere kampanyalı veriliyor.",
    "ozet": "Google hesabınla çalışan sohbet aracı. Dokümanlar, Gmail ve Drive ile aynı dünyada olduğu için okul işlerinde pratiktir.",
    "alt": "Sohbet",
    "yas": "Okul (Workspace for Education) hesaplarında her yaşa açık, 18 yaş altında kısıtlı sürüm; kişisel hesapta 13+",
    "turkce": "Arayüz ve çıktı Türkçe.",
    "neIcin": [
      "Drive’daki belgeyi açmadan özetletmek, Gmail taslağı yazdırmak.",
      "Ders görseli üretmek ve sohbetle düzeltmek.",
      "Uzun araştırma raporu çıkarmak (Deep Research).",
      "Resimli hikâye kitabı üretmek (Storybook).",
      "Fotoğrafını çektiğin soruyu çözdürmek ve çözümü anlattırmak."
    ],
    "prompt": "Ben [6.] sınıf [Fen Bilimleri] öğretmeniyim. \"[Konu]\" için 40 dakikalık bir ders planı hazırla: giriş, etkinlik, değerlendirme ve kapanış bölümlerini süreleriyle yaz. Sınıfım [28] kişilik, [akıllı tahta var]. Gerekli materyalleri ve öğrenci yönergesini ayrıca belirt. Sonucu tablo olarak ver.",
    "ipucu": "Okul hesabınla girdiğinde yazdıkların modelin eğitiminde kullanılmaz; kişisel hesapla girdiğinde kullanılabilir. Mümkünse okul hesabını kullan.",
    "dikkat": "Öğrenci bilgisi içeren dosyaları yükleme. Storybook ve video özellikleri bölgeye göre açılıp kapanabilir.",
    "etiket": [
      "sohbet",
      "google",
      "drive",
      "arastirma",
      "hikaye",
      "bard"
    ],
    "kontrol": "2026-11"
  },
  {
    "id": "claude",
    "ad": "Claude",
    "url": "https://claude.ai",
    "kategori": [
      "metin"
    ],
    "ucret": "kismen",
    "ucretNot": "Ücretsiz planda günlük mesaj sınırı var.",
    "ozet": "Uzun metinlerle çalışmakta güçlü sohbet aracı. Kitap bölümü, yönerge ya da rapor gibi uzun belgeleri bozmadan işler.",
    "alt": "Sohbet",
    "yas": "18+",
    "turkce": "Türkçe yazıyor; akademik dilde başarılı.",
    "neIcin": [
      "Uzun ders notundan ünite özeti ve soru bankası çıkarmak.",
      "Yazılı kâğıdı değerlendirme ölçütü yazdırmak, örnek cevap hazırlatmak.",
      "Öğrenci metnini (isim olmadan) verip geri bildirim taslağı hazırlamak.",
      "Resmî yazıyı sadeleştirmek ya da veli dilinde yeniden yazdırmak."
    ],
    "prompt": "Sana [8.] sınıf [Türkçe] dersi için hazırladığım yazılı sınavı veriyorum. (1) Her sorunun hangi kazanımı ölçtüğünü yaz. (2) Belirsiz ya da iki anlama gelen soruları işaretle ve düzeltme öner. (3) 4 ölçütlü, 4 düzeyli bir puanlama anahtarı hazırla.\n\nSınav: [sınavı buraya yapıştır]",
    "ipucu": "Uzun belgeleri doğrudan yapıştırmak yerine dosya olarak yükle; sohbet daha derli toplu kalır.",
    "dikkat": "18 yaş sınırı var, öğrencilerle birlikte kullanılmaz. Öğrenci metinlerinden isimleri silerek yükle.",
    "etiket": [
      "sohbet",
      "uzun metin",
      "rubrik",
      "degerlendirme",
      "anthropic"
    ],
    "kontrol": "2026-11"
  },
  {
    "id": "copilot",
    "ad": "Microsoft Copilot",
    "url": "https://copilot.microsoft.com",
    "kategori": [
      "metin",
      "gorsel"
    ],
    "ucret": "kismen",
    "ucretNot": "Web ve uygulama kullanımı ücretsiz. Word, Excel ve PowerPoint içinde çalışması ücretli lisans ister.",
    "ozet": "Windows ve Office ile birlikte gelen yapay zekâ. Word, Outlook ve PowerPoint içinde çalıştığı için okul yazışmalarında rahattır.",
    "alt": "Sohbet",
    "yas": "13+ (okul hesaplarında yöneticinin iznine bağlı)",
    "turkce": "Arayüz ve çıktı Türkçe.",
    "neIcin": [
      "Word’de açık duran yazıyı özetletmek, tonunu değiştirtmek.",
      "Outlook’ta veli e-postası taslağı yazdırmak.",
      "PowerPoint sunumunu metinden oluşturmak.",
      "Excel’de not çizelgesinde formül kurdurmak."
    ],
    "prompt": "\"[Konu: örneğin okul gezisi]\" hakkında velilere gönderilecek kısa, nazik ve anlaşılır bir bilgilendirme yazısı hazırla. Tarih, saat ve yer için [boşluk] bırak. En fazla 120 kelime olsun. Sonunda velilerin ne yapması gerektiğini tek cümleyle yaz.",
    "ipucu": "Okulunuzda Microsoft 365 Education varsa bilişim sorumlusuna sor: öğretmen hesabında Copilot zaten açık olabilir.",
    "dikkat": "Okul hesabıyla girmek kurumsal veri korumasını devreye sokar; kişisel hesapla girdiğinde bu koruma yoktur.",
    "etiket": [
      "office",
      "word",
      "excel",
      "powerpoint",
      "outlook",
      "microsoft",
      "bing"
    ],
    "kontrol": "2026-11"
  },
  {
    "id": "perplexity",
    "ad": "Perplexity",
    "url": "https://www.perplexity.ai",
    "kategori": [
      "metin"
    ],
    "ucret": "kismen",
    "ucretNot": "Ücretsiz planda günde yaklaşık 5 ayrıntılı (Pro) arama; basit aramalar sınırsız.",
    "ozet": "Arama motoru gibi çalışan yapay zekâ: her cümlenin yanına kaynak bağlantısını koyar.",
    "alt": "Kaynaklı arama",
    "yas": "13+",
    "turkce": "Türkçe soruyu anlar, Türkçe yanıtlar; kaynaklar çoğunlukla İngilizcedir.",
    "neIcin": [
      "Güncel bilgiyi kaynağıyla birlikte bulmak (istatistik, tarih, mevzuat).",
      "Öğrencilere kaynak gösterme alışkanlığını örnekle öğretmek.",
      "Bir konudaki farklı görüşleri karşılaştırmak.",
      "Proje ödevi için başlangıç kaynak listesi çıkarmak."
    ],
    "prompt": "\"[Araştırma konusu]\" hakkında [son 5 yılı kapsayan] güvenilir bilgileri derle. Resmî kurumları ve akademik yayınları öncele. Her bilginin yanına kaynak bağlantısı ekle. Kaynaklar çelişiyorsa belirt. Sonucu [10.] sınıf öğretmeninin derste kullanabileceği 8 maddede özetle.",
    "ipucu": "Kaynak gösteriyor diye doğru sanma: verdiği bağlantıyı aç, bilginin gerçekten orada yazdığını gör. Derste bunu öğrencilere gösterip model ol.",
    "dikkat": "Kaynak bağlantıları bazen konuyla ilgisiz çıkabiliyor. Sayı ve tarihleri mutlaka ikinci bir kaynaktan doğrula.",
    "etiket": [
      "arama",
      "kaynak",
      "arastirma",
      "guncel",
      "referans"
    ],
    "kontrol": "2026-11"
  },
  {
    "id": "notebooklm",
    "ad": "Gemini Notebook (eski NotebookLM)",
    "url": "https://notebooklm.google.com",
    "kategori": [
      "metin",
      "ses",
      "egitim"
    ],
    "ucret": "kismen",
    "ucretNot": "Ücretsiz planda 100 defter ve defter başına 50 kaynak.",
    "ozet": "Sadece senin yüklediğin kaynaklara bakan çalışma defteri. Uydurma riski en düşük araçlardan biri.",
    "alt": "Kaynakla çalışma",
    "yas": "18+; okul hesaplarında 13+ olabilir",
    "turkce": "Türkçe belgelerle çalışır; sesli özet Türkçe üretilebilir.",
    "yeni": true,
    "neIcin": [
      "Ders kitabı bölümünü, yönetmeliği ya da PDF’i yükleyip özet ve soru üretmek.",
      "Yüklediğin kaynaklardan podcast tarzı sesli özet çıkarmak.",
      "Kaynaklardan kavram haritası, zihin haritası ve sunum taslağı oluşturmak.",
      "Ünite boyunca sorduğun her soruya kaynaktaki yeriyle cevap almak."
    ],
    "prompt": "Yüklediğim kaynaklara dayanarak: (1) Ana fikirleri 5 maddede özetle, (2) [8.] sınıf öğrencisinin bilmesi gereken 10 kavramı kısa tanımlarıyla listele, (3) kaynağa dayalı 5 tartışma sorusu yaz. Kaynakta olmayan bilgi ekleme; her madde için ilgili bölümü belirt.",
    "ipucu": "Her ünite için bir defter aç. Dönem boyunca aynı deftere kaynak eklersen sınav haftası hazır bir çalışma arkadaşın olur. Temmuz 2026’da adı Gemini Notebook oldu; eski notebooklm.google adresi çalışmaya devam ediyor.",
    "dikkat": "Telif hakkı olan kitapları yükleyip çıktısını öğrencilerle paylaşmak sorun yaratabilir; kendi notlarını ve açık kaynakları tercih et.",
    "etiket": [
      "pdf",
      "ozet",
      "podcast",
      "kaynak",
      "google",
      "calisma",
      "notebooklm",
      "gemini notebook"
    ],
    "kontrol": "2026-11",
    "vitrin": true
  },
  {
    "id": "deepseek",
    "ad": "DeepSeek",
    "url": "https://chat.deepseek.com",
    "kategori": [
      "metin"
    ],
    "ucret": "ucretsiz",
    "ucretNot": "Sohbet kullanımı ücretsiz.",
    "ozet": "Ücretsiz ve güçlü bir sohbet aracı. Özellikle matematik ve adım adım akıl yürütmede iyi sonuç verir.",
    "alt": "Sohbet",
    "yas": "18+ (hizmet koşullarına göre)",
    "turkce": "Türkçe yanıt verir; bazı terimlerde çeviri kokusu olabilir.",
    "neIcin": [
      "Matematik ve fen sorularının çözümünü adım adım yazdırmak.",
      "Ücretsiz planı dolan diğer araçlara yedek olarak kullanmak.",
      "Soru çözümlerinde farklı yol göstermesini istemek."
    ],
    "prompt": "Şu soruyu [7.] sınıf öğrencisinin anlayacağı dille, adım adım çöz: [soruyu yaz]. Her adımda hangi kuralı kullandığını yaz. Sonunda öğrencilerin bu soruda en sık yaptığı 2 hatayı belirt.",
    "dikkat": "Sunucuları Çin’de bulunuyor ve veri politikası Avrupa kurallarından farklı. Kurum belgesi, öğrenci verisi ya da kişisel bilgi girme.",
    "etiket": [
      "ucretsiz",
      "matematik",
      "cozum",
      "sohbet"
    ],
    "kontrol": "2026-11",
    "vitrin": true
  },
  {
    "id": "lechat",
    "ad": "Le Chat (Mistral)",
    "url": "https://chat.mistral.ai",
    "kategori": [
      "metin"
    ],
    "ucret": "kismen",
    "ucretNot": "Geniş bir ücretsiz plan sunar.",
    "ozet": "Avrupa merkezli sohbet aracı. Verilerin Avrupa’da işlenmesi kurumsal kullanımda avantaj sağlar.",
    "alt": "Sohbet",
    "yas": "16+",
    "turkce": "Türkçe yanıt verir.",
    "neIcin": [
      "Hızlı metin yazma, özetleme ve çeviri işleri.",
      "Avrupa veri kurallarına önem veren okullarda alternatif olmak.",
      "Belge yükleyip içindeki bilgiye soru sormak."
    ],
    "ipucu": "Yanıtları çok hızlı üretir; kısa düzeltmeleri art arda isteyerek çalışmak rahattır.",
    "etiket": [
      "avrupa",
      "kvkk",
      "sohbet",
      "mistral"
    ],
    "kontrol": "2026-11"
  },
  {
    "id": "grok",
    "ad": "Grok",
    "url": "https://grok.com",
    "kategori": [
      "metin",
      "gorsel"
    ],
    "ucret": "kismen",
    "ucretNot": "Sınırlı ücretsiz kullanım; X Premium ile geniş erişim.",
    "ozet": "X (Twitter) ile bağlantılı sohbet aracı. Güncel olaylara hızlı erişir.",
    "alt": "Sohbet",
    "yas": "18+ (13+ veli izniyle)",
    "turkce": "Türkçe yanıt verir.",
    "neIcin": [
      "Çok güncel bir olayı derste konuşmadan önce hızla özetlemek.",
      "Sosyal medyadaki bir tartışmanın farklı taraflarını görmek."
    ],
    "dikkat": "İçerik denetimi diğer araçlara göre daha gevşektir; sınıfta öğrencilerle birlikte kullanmak için uygun değildir.",
    "etiket": [
      "guncel",
      "sosyal medya",
      "x",
      "twitter"
    ],
    "kontrol": "2026-11"
  },
  {
    "id": "deepl",
    "ad": "DeepL",
    "url": "https://www.deepl.com/translator",
    "kategori": [
      "metin"
    ],
    "ucret": "kismen",
    "ucretNot": "Ücretsiz planda karakter sınırı var; belge çevirisi sınırlı.",
    "ozet": "Doğallığıyla öne çıkan çeviri aracı. Yabancı dil öğretmenleri ve kaynak çevirisi için tercih edilir.",
    "alt": "Çeviri",
    "yas": "18+ (ücretsiz web kullanımı hesap gerektirmez)",
    "turkce": "Türkçe-İngilizce çift yönlü çeviri yapar.",
    "neIcin": [
      "Yabancı kaynaklı okuma metnini derse hazırlamak.",
      "Uluslararası proje (eTwinning, Erasmus) yazışmalarını çevirmek.",
      "Yazdığın İngilizce metni daha doğal hâle getirmek."
    ],
    "ipucu": "Çeviriden sonra cümleye tıkla: alternatif karşılıkları gösterir, ders için en uygun olanı seçebilirsin.",
    "dikkat": "Ücretsiz web sürümüne yapıştırdığın metin hizmetin iyileştirilmesinde kullanılabilir; sınav metni ve kurum yazısı yapıştırma.",
    "etiket": [
      "ceviri",
      "ingilizce",
      "yabanci dil",
      "metin"
    ],
    "kontrol": "2026-11"
  },
  {
    "id": "canva",
    "ad": "Canva",
    "url": "https://www.canva.com/tr_tr/education/",
    "kategori": [
      "gorsel",
      "egitim"
    ],
    "ucret": "ogretmen",
    "ucretNot": "Canva for Education yalnızca K-12 (ilk ve ortaöğretim) öğretmenlerine ücretsiz; üniversiteler kapsam dışı. Başvuruda kurum belgesi istenir, yaklaşık 3 yılda bir yeniden doğrulama yapılır.",
    "ozet": "Afiş, çalışma kâğıdı, sunum ve videoyu tek yerde hazırlayabileceğin tasarım aracı; içinde yapay zekâ araçları da var.",
    "alt": "Tasarım",
    "yas": "Öğretmen hesabıyla sınıf kullanımına uygun",
    "turkce": "Arayüz tam Türkçe.",
    "yeni": true,
    "neIcin": [
      "Hazır şablonlarla sınıf panosu, afiş ve çalışma kâğıdı yapmak.",
      "Magic Write ve Magic Media ile metin, görsel ve kısa video üretmek.",
      "Sunumunu dakikalar içinde tasarıma dökmek.",
      "Öğrencilere ödev olarak tasarım görevi vermek ve sınıf alanından toplamak.",
      "Yapay zekâ ile oluşturduğun görseli aynı yerde afişe dönüştürmek."
    ],
    "prompt": "Magic Media için: Düz vektör çizim tarzında, [su döngüsünü] gösteren, etiketleri olmayan sade bir görsel. Arka plan açık renkli, çizgiler kalın, çocuklara uygun. Görselde yazı olmasın.",
    "ipucu": "Görsel üretirken yazıyı Canva’nın kendi metin aracıyla ekle. Yapay zekâ ile üretilen görsellerdeki Türkçe yazılar genellikle bozuk çıkar.",
    "dikkat": "Öğretmen başvurusu onaylanana kadar bazı araçlar kilitli kalır. Öğrenci fotoğraflarını yüklerken veli iznini unutma.",
    "etiket": [
      "tasarim",
      "afis",
      "sunum",
      "pano",
      "calisma kagidi",
      "ucretsiz ogretmen"
    ],
    "kontrol": "2026-11"
  },
  {
    "id": "ideogram",
    "ad": "Ideogram",
    "url": "https://ideogram.ai",
    "kategori": [
      "gorsel"
    ],
    "ucret": "kismen",
    "ucretNot": "Ücretsiz hesapta haftada 10 kredi (yaklaşık 40 görsel); her cumartesi yenilenir.",
    "ozet": "Görsel üzerindeki yazıları doğru yazabilen ender araçlardan biri. Afiş ve pano başlıkları için uygundur.",
    "alt": "Görsel",
    "yas": "13+",
    "turkce": "Prompt Türkçe yazılabilir; görsel üzerindeki Türkçe karakterlerde hata olabilir.",
    "neIcin": [
      "Üzerinde başlık yazan sınıf afişi ve pano görseli üretmek.",
      "Ders temalı rozet, etiket ve sertifika görselleri yapmak.",
      "Kitap kapağı, dergi kapağı gibi görsel okuryazarlık etkinlikleri kurmak."
    ],
    "prompt": "Bir sınıf panosu afişi: üzerinde büyük harflerle \"KITAP KURDU\" yazsın. Yanında kitap okuyan sevimli bir kurt karakteri olsun. Düz çizim tarzı, canlı renkler, sade arka plan, 3:4 dikey oran.",
    "ipucu": "Yazıyı promptta tırnak içinde ver. Türkçe karakterli kelimelerde (ş, ğ, ı) hata olursa yazıyı İngilizce harflerle yazdır, Türkçesini sonradan Canva ile ekle.",
    "dikkat": "Ücretsiz planda ürettiğin görseller herkese açık galeride görünebilir. Özel okul logosu ya da kurum görseli yükleyip işletme.",
    "etiket": [
      "gorsel",
      "yazi",
      "afis",
      "pano",
      "kapak"
    ],
    "kontrol": "2026-11"
  },
  {
    "id": "midjourney",
    "ad": "Midjourney",
    "url": "https://www.midjourney.com",
    "kategori": [
      "gorsel"
    ],
    "ucret": "ucretli",
    "ucretNot": "Ücretsiz denemesi yok; aylık abonelik gerekir.",
    "ozet": "Görsel kalitesi en yüksek araçlardan biri. Sanatsal ve atmosferik görsellerde fark atar.",
    "alt": "Görsel",
    "yas": "13+",
    "turkce": "Promptu İngilizce yazmak gerekir.",
    "neIcin": [
      "Edebiyat ve tarih derslerinde atmosfer kuran yüksek kaliteli görseller üretmek.",
      "Görsel sanatlar dersinde üslup ve kompozisyon tartışması açmak.",
      "Okul etkinliği için afiş ve davetiye görseli hazırlamak."
    ],
    "ipucu": "Promptun sonuna --ar 16:9 yazarak oranı, --no text yazarak yazısız olmasını isteyebilirsin.",
    "dikkat": "Ücretsiz planı yok; ücretli hesaplarda da ürettiğin görseller herkese açık olabilir. Sadece gerçekten yüksek kalite gereken işler için öner.",
    "etiket": [
      "gorsel",
      "sanat",
      "kaliteli",
      "ucretli"
    ],
    "kontrol": "2026-11"
  },
  {
    "id": "firefly",
    "ad": "Adobe Firefly",
    "url": "https://firefly.adobe.com",
    "kategori": [
      "gorsel",
      "video"
    ],
    "ucret": "kismen",
    "ucretNot": "Ücretsiz planda aylık 25 üretim kredisi; devretmez.",
    "ozet": "Adobe’un görsel üreticisi. Telif açısından güvenli kaynaklarla eğitildiği için kurumsal kullanımda rahattır.",
    "alt": "Görsel",
    "yas": "13+",
    "turkce": "Arayüz Türkçe; prompt Türkçe yazılabilir.",
    "neIcin": [
      "Okul yayınlarında kullanılacak telif sorunu olmayan görsel üretmek.",
      "Var olan görseli genişletmek, nesne eklemek ya da silmek.",
      "Görseldeki yazıyı ve rengi hızlıca değiştirmek."
    ],
    "ipucu": "Okul dergisi, broşür gibi basılı işlerde telif soruları çıkıyorsa Firefly en güvenli seçeneklerden biridir.",
    "etiket": [
      "adobe",
      "telif",
      "gorsel",
      "duzenleme"
    ],
    "kontrol": "2026-11"
  },
  {
    "id": "leonardo",
    "ad": "Leonardo AI",
    "url": "https://leonardo.ai",
    "kategori": [
      "gorsel"
    ],
    "ucret": "kismen",
    "ucretNot": "Her gün 150 ücretsiz jeton; gece yenilenir ve devretmez.",
    "ozet": "Her gün ücretsiz kredi veren görsel üreticisi. Karakter ve illüstrasyon üretiminde esnektir.",
    "alt": "Görsel",
    "yas": "13+",
    "turkce": "Promptu İngilizce yazmak daha iyi sonuç verir.",
    "neIcin": [
      "Hikâye ve masal etkinlikleri için karakter görselleri üretmek.",
      "Aynı sahnenin birçok farklı hâlini üretip sınıfta karşılaştırmak.",
      "Oyunlaştırma materyalleri (kart, rozet, harita) hazırlamak."
    ],
    "ipucu": "Günlük ücretsiz jeton gece yenilenir. Büyük bir iş varsa üretimi birkaç güne böl.",
    "etiket": [
      "gorsel",
      "karakter",
      "illustrasyon",
      "ucretsiz kredi"
    ],
    "kontrol": "2026-11"
  },
  {
    "id": "recraft",
    "ad": "Recraft",
    "url": "https://www.recraft.ai",
    "kategori": [
      "gorsel"
    ],
    "ucret": "kismen",
    "ucretNot": "Günde yaklaşık 30 ücretsiz kredi.",
    "ozet": "Vektör çizim, ikon ve çizgi görsel üretir. Çıktılar büyütülünce bozulmadığı için baskıya uygundur.",
    "alt": "Vektör",
    "yas": "13+",
    "turkce": "Prompt İngilizce yazıldığında daha iyi sonuç verir.",
    "neIcin": [
      "Çalışma kâğıdı için sade çizgi görseller ve ikonlar üretmek.",
      "Boyama sayfası hazırlamak.",
      "Baskıda bozulmayan afiş görselleri çıkarmak."
    ],
    "prompt": "Simple black and white line art coloring page for children: [a water cycle scene with sun, cloud, mountain and river]. Thick clean outlines, no shading, no text, white background.",
    "ipucu": "Çıktıyı SVG olarak indirirsen Canva ya da Word içinde renklerini değiştirebilirsin.",
    "dikkat": "Ücretsiz planda üretilen görseller herkese açık olur ve ticari kullanım hakkı vermez.",
    "etiket": [
      "vektor",
      "ikon",
      "boyama",
      "cizgi",
      "baski"
    ],
    "kontrol": "2026-11"
  },
  {
    "id": "napkin",
    "ad": "Napkin AI",
    "url": "https://www.napkin.ai",
    "kategori": [
      "gorsel",
      "egitim"
    ],
    "ucret": "kismen",
    "ucretNot": "Ücretsiz planda haftada 500 kredi; çıktıda Napkin logosu kalır, PNG ve PDF olarak indirilir.",
    "ozet": "Yazdığın metni şema, akış ve infografiğe çevirir. Sunum ve çalışma kâğıdı görselleri için çok hızlıdır.",
    "alt": "Şema",
    "yas": "13+",
    "turkce": "Türkçe metinden şema üretir.",
    "yeni": true,
    "neIcin": [
      "Ders konusunu akış şemasına ya da zaman çizelgesine dönüştürmek.",
      "Karşılaştırma tablosu ve kavram ilişkisi görseli üretmek.",
      "Sunum slaytlarına yazı yerine görsel koymak."
    ],
    "prompt": "Aşağıdaki metni öğrencilerin kolay anlayacağı bir akış şemasına dönüştürecek şekilde yaz, sonra şemaya çevir: [sindirim sisteminin aşamalarını buraya yapıştır]",
    "ipucu": "Önce metni ChatGPT ya da Gemini ile kısa maddelere indir, sonra Napkin’e yapıştır. Şema çok daha düzenli çıkar.",
    "etiket": [
      "sema",
      "infografik",
      "akis",
      "gorselleme",
      "sunum"
    ],
    "kontrol": "2026-11"
  },
  {
    "id": "mapify",
    "ad": "Mapify",
    "url": "https://mapify.so",
    "kategori": [
      "gorsel",
      "egitim"
    ],
    "ucret": "kismen",
    "ucretNot": "Ücretsiz planda tek seferlik 30 kredi verilir.",
    "ozet": "PDF, video ya da metinden kavram haritası çıkarır. Ünite özetlerini tek sayfaya sığdırmak için pratiktir.",
    "alt": "Kavram haritası",
    "yas": "13+",
    "turkce": "Türkçe kaynaklarla çalışır.",
    "yeni": true,
    "neIcin": [
      "Ünite özetini kavram haritası olarak çıkarmak.",
      "YouTube videosundan ders notu haritası üretmek.",
      "Öğrencilere boş bırakılmış harita vererek doldurtmak."
    ],
    "ipucu": "Haritayı resim olarak indirip bazı kutuları beyazlatırsan hazır bir tekrar etkinliği olur.",
    "etiket": [
      "kavram haritasi",
      "zihin haritasi",
      "ozet",
      "pdf",
      "video"
    ],
    "kontrol": "2026-11"
  },
  {
    "id": "sora",
    "ad": "Sora",
    "url": "https://openai.com",
    "kategori": [
      "video"
    ],
    "ucret": "ucretli",
    "ozet": "OpenAI’ın video uygulaması 26 Nisan 2026’da kapatıldı; geliştirici erişimi de 24 Eylül 2026’da sona erdi.",
    "durum": "kapandi",
    "yerine": "kling",
    "etiket": [
      "video",
      "openai",
      "sahne",
      "kapandi"
    ],
    "kontrol": "2026-11"
  },
  {
    "id": "veo",
    "ad": "Google Veo",
    "url": "https://labs.google/flow",
    "kategori": [
      "video"
    ],
    "ucret": "kismen",
    "ucretNot": "Flow’da günde az sayıda ücretsiz kredi (filigranlı çıktı); düzenli kullanım Google AI Pro gibi ücretli plan ister.",
    "ozet": "Google’ın video modeli. Sesli ve tutarlı sahneler üretmekte güçlüdür.",
    "alt": "Video",
    "yas": "18+",
    "turkce": "Prompt Türkçe yazılabilir; konuşma Türkçe üretilebilir.",
    "neIcin": [
      "Ses efekti ve konuşma içeren kısa ders sahneleri üretmek.",
      "Tarihî bir anı canlandırıp tartışma açmak.",
      "Birkaç sahneyi birbirine bağlayarak kısa anlatı kurmak."
    ],
    "dikkat": "Ücretsiz çıktılarda filigran olur ve günlük hak çok azdır. Tarihî canlandırmaların gerçeğe uygunluğunu kontrol et; yapay zekâ kıyafet ve nesneleri karıştırabilir.",
    "etiket": [
      "video",
      "google",
      "ses",
      "sahne",
      "flow"
    ],
    "kontrol": "2026-11"
  },
  {
    "id": "runway",
    "ad": "Runway",
    "url": "https://runwayml.com",
    "kategori": [
      "video"
    ],
    "ucret": "kismen",
    "ucretNot": "Tek seferlik 125 kredi verir, aylık yenilenmez; ücretsiz çıktıda filigran olur.",
    "ozet": "Video üretme ve düzenleme araçlarını bir arada veren stüdyo. Görselden video yapmakta yaygın kullanılır.",
    "alt": "Video",
    "yas": "13+ (18 yaş altı veli izniyle)",
    "turkce": "Arayüz İngilizce; prompt Türkçe yazılabilir.",
    "neIcin": [
      "Elindeki tek görseli hareketlendirip derse giriş videosu yapmak.",
      "Videodan nesne silmek, arka planı değiştirmek.",
      "Görsel sanatlar ve medya derslerinde üretim atölyesi kurmak."
    ],
    "prompt": "Yüklediğim tarihî fotoğrafı çok hafif hareketlendir: kamera yavaşça yakınlaşsın, insanlar ve nesneler değişmesin. 4 saniye, sessiz.",
    "ipucu": "Ücretsiz kredi hızla biter. İlk denemelerini en kısa süre ve en düşük çözünürlükle yap.",
    "dikkat": "Ücretsiz kredi bir kez verilir, aylık yenilenmez. Üretim öncesi süre ve kaliteyi kontrol et.",
    "etiket": [
      "video",
      "duzenleme",
      "gorselden video",
      "stüdyo"
    ],
    "kontrol": "2026-11"
  },
  {
    "id": "kling",
    "ad": "Kling AI",
    "url": "https://klingai.com",
    "kategori": [
      "video"
    ],
    "ucret": "kismen",
    "ucretNot": "Her gün 66 ücretsiz kredi; 24 saatte bir yenilenir, devretmez. Ücretsiz çıktıda filigran olur.",
    "ozet": "Görseli videoya çevirmekte güçlü ve her gün ücretsiz kredi veren araç.",
    "alt": "Video",
    "yas": "18+",
    "turkce": "Prompt Türkçe yazılabilir, İngilizce daha iyi sonuç verir.",
    "neIcin": [
      "Çizim ya da fotoğrafı 5 saniyelik videoya dönüştürmek.",
      "Öğrencinin çizdiği karakteri hareketlendirip sınıfta göstermek.",
      "Ücretsiz krediyle düzenli video denemesi yapmak."
    ],
    "ipucu": "Günlük kredi gece yenilenir; büyük işleri birkaç güne bölerek ücretsiz tamamlayabilirsin.",
    "dikkat": "Sunucuları Çin’de. Öğrenci fotoğrafı ya da kişisel görsel yükleme.",
    "etiket": [
      "video",
      "gorselden video",
      "ucretsiz kredi",
      "animasyon"
    ],
    "kontrol": "2026-11",
    "vitrin": true
  },
  {
    "id": "luma",
    "ad": "Luma Dream Machine",
    "url": "https://lumalabs.ai/dream-machine",
    "kategori": [
      "video"
    ],
    "ucret": "kismen",
    "ucretNot": "Aylık ücretsiz üretim hakkı verir.",
    "ozet": "Hızlı ve akıcı kısa videolar üretir. Kamera hareketlerini yönlendirmek kolaydır.",
    "alt": "Video",
    "yas": "13+",
    "turkce": "Prompt Türkçe yazılabilir.",
    "neIcin": [
      "Derse giriş için kısa atmosfer videoları üretmek.",
      "Bir görselden kamera hareketli sahne çıkarmak.",
      "Sunum arasına geçiş videosu eklemek."
    ],
    "etiket": [
      "video",
      "kamera",
      "kisa video"
    ],
    "kontrol": "2026-11"
  },
  {
    "id": "videogen",
    "ad": "VideoGen",
    "url": "https://videogen.io",
    "kategori": [
      "video"
    ],
    "ucret": "ucretli",
    "ucretNot": "Kalıcı ücretsiz plan belirsiz; filigransız çıktı ücretli plan ister.",
    "ozet": "Yazdığın metni seslendirme, altyazı ve stok görüntülerle hazır videoya çevirir. En hızlı yol budur.",
    "alt": "Video",
    "yas": "13+",
    "turkce": "Türkçe seslendirme ve altyazı üretebilir.",
    "neIcin": [
      "Ders özetini 60-90 saniyelik anlatımlı videoya çevirmek.",
      "Duyuru ve tanıtım videosu hazırlamak.",
      "Sosyal medya ve okul ekranları için kısa bilgi videoları yapmak."
    ],
    "prompt": "\"[Konu]\" konusunu [6.] sınıf öğrencilerine anlatan 60 saniyelik video senaryosu yaz. Merak uyandıran bir soruyla başla. Her sahne için dış ses metnini ve ekranda görünecek görüntüyü iki ayrı başlıkta yaz. Dili sade olsun, sonunda tek bir düşünme sorusu sor.",
    "ipucu": "Senaryoyu önce bir metin yapay zekâsına yazdır, sonra buraya yapıştır. Doğrudan konu adı yazmak yüzeysel video üretir.",
    "dikkat": "Ücretsiz kullanım sınırlı ve filigranlıdır; bütçen yoksa önce Canva ya da Gemini Notebook ile dene. Türkçe seslendirmede özel adların okunuşunu dinleyerek kontrol et.",
    "etiket": [
      "video",
      "seslendirme",
      "altyazi",
      "metinden video"
    ],
    "kontrol": "2026-11"
  },
  {
    "id": "heygen",
    "ad": "HeyGen",
    "url": "https://www.heygen.com",
    "kategori": [
      "video",
      "ses"
    ],
    "ucret": "kismen",
    "ucretNot": "Ücretsiz planda kısa ve filigranlı video üretilir.",
    "ozet": "Konuşan avatar videoları üretir. Yüzünü göstermek istemediğin anlatım videolarında işe yarar.",
    "alt": "Avatar video",
    "yas": "18+",
    "turkce": "Türkçe konuşan avatar üretebilir; dudak hareketi uyumludur.",
    "neIcin": [
      "Uzaktan ders ya da telafi dersi için anlatım videosu hazırlamak.",
      "Yabancı dil dersinde hedef dilde konuşan karakter kullanmak.",
      "Var olan videoyu başka dile çevirip dudak hareketini uyarlamak."
    ],
    "dikkat": "Başka birinin yüzünü ya da sesini izinsiz avatara dönüştürmek hukuken sorun yaratır. Yalnızca kendi görüntünü ya da hazır avatarları kullan.",
    "etiket": [
      "avatar",
      "konusan",
      "video",
      "seslendirme",
      "ceviri"
    ],
    "kontrol": "2026-11"
  },
  {
    "id": "synthesia",
    "ad": "Synthesia",
    "url": "https://www.synthesia.io",
    "kategori": [
      "video"
    ],
    "ucret": "ucretli",
    "ucretNot": "Kısa bir ücretsiz deneme sunar; sürekli kullanım ücretlidir.",
    "ozet": "Kurumsal eğitim videolarında yaygın kullanılan avatar video aracı. Çıktısı düzenli ve temizdir.",
    "alt": "Avatar video",
    "yas": "18+",
    "turkce": "Türkçe seslendirme destekler.",
    "neIcin": [
      "Okul içi eğitim ve oryantasyon videoları hazırlamak.",
      "Aynı videoyu birçok dilde çıkarmak."
    ],
    "dikkat": "Ücretsiz planı yok sayılır; okul bütçesiyle alınmadıkça öğretmenin tek başına kullanması zordur.",
    "etiket": [
      "avatar",
      "kurumsal",
      "egitim videosu",
      "ucretli"
    ],
    "kontrol": "2026-11"
  },
  {
    "id": "clipchamp",
    "ad": "Clipchamp",
    "url": "https://clipchamp.com",
    "kategori": [
      "video"
    ],
    "ucret": "kismen",
    "ucretNot": "Temel düzenleme ve 1080p çıktı ücretsiz, filigran yok; premium stok içerik Microsoft 365 aboneliği ister.",
    "ozet": "Microsoft’un ücretsiz video düzenleyicisi. Otomatik altyazı ve metinden konuşma özellikleri vardır.",
    "alt": "Video düzenleme",
    "yas": "13+ (okul hesabıyla)",
    "turkce": "Arayüz Türkçe; Türkçe otomatik altyazı üretir.",
    "neIcin": [
      "Çektiğin ders videosunu kırpmak ve birleştirmek.",
      "Videoya otomatik Türkçe altyazı eklemek.",
      "Yapay zekâ ile ürettiğin sahneleri tek videoda birleştirmek."
    ],
    "ipucu": "Otomatik altyazı eğitimde erişilebilirlik için çok değerli. Üretilen altyazıyı bir kez okuyup düzeltmen yeterli.",
    "etiket": [
      "video duzenleme",
      "altyazi",
      "microsoft",
      "ucretsiz",
      "kurgu"
    ],
    "kontrol": "2026-11"
  },
  {
    "id": "elevenlabs",
    "ad": "ElevenLabs",
    "url": "https://elevenlabs.io",
    "kategori": [
      "ses"
    ],
    "ucret": "kismen",
    "ucretNot": "Ücretsiz planda ayda yaklaşık 10.000 karakter; çıktıyı paylaşırken ElevenLabs’e atıf istenir.",
    "ozet": "Metinleri doğal insan sesiyle okutur. Türkçe seslendirmede en iyi sonuçlardan birini verir.",
    "alt": "Seslendirme",
    "yas": "18+",
    "turkce": "Türkçe seslendirme doğal ve akıcıdır.",
    "neIcin": [
      "Ders notunu dinlenebilir hâle getirmek (okuma güçlüğü olan öğrenciler için).",
      "Sunum ve videolara profesyonel dış ses eklemek.",
      "Yabancı dil dersinde dinleme metni üretmek.",
      "Hikâyeyi farklı karakter sesleriyle okutmak."
    ],
    "prompt": "Seslendirilecek metin için önce metin yapay zekâsına şunu yazdır: \"[Konu] hakkında [5.] sınıf öğrencilerinin dinleyerek öğrenebileceği 300 kelimelik bir anlatım yaz. Kısa cümleler kullan, her paragrafta tek fikir olsun, sesli okunmaya uygun olsun.\"",
    "ipucu": "Noktalama seslendirmenin ritmini belirler. Virgül ve noktaları düzelttiğinde ses belirgin şekilde doğallaşır.",
    "dikkat": "Başka bir kişinin sesini izinsiz klonlamak yasalara aykırıdır. Ücretsiz planda ürettiğin sesi kullanırken kaynak belirtmen istenir.",
    "etiket": [
      "seslendirme",
      "ses",
      "dinleme",
      "erisilebilirlik",
      "tts"
    ],
    "kontrol": "2026-11"
  },
  {
    "id": "suno",
    "ad": "Suno",
    "url": "https://suno.com",
    "kategori": [
      "ses"
    ],
    "ucret": "kismen",
    "ucretNot": "Her gün 50 kredi (yaklaşık 10 şarkı); ücretsiz üretimler ticari olarak kullanılamaz.",
    "ozet": "Yazdığın sözlerden saniyeler içinde şarkı üretir. Ezberlenecek bilgileri şarkıya çevirmek için en pratik araç.",
    "alt": "Müzik",
    "yas": "13+ (hesap açmak için 18+)",
    "turkce": "Türkçe şarkı söyler; bazı kelimelerde vurgu hatası olabilir.",
    "neIcin": [
      "Gezegenler, çarpım tablosu, kurallar gibi ezber konularını şarkıya çevirmek.",
      "Sınıf marşı, tören şarkısı ya da proje jingle’ı üretmek.",
      "Yabancı dil dersinde hedef dilde şarkı hazırlamak.",
      "Müzik dersinde tür ve enstrüman farklarını dinleterek tartışmak."
    ],
    "prompt": "[4.] sınıf öğrencilerinin \"[Konu: örneğin gezegenlerin sırası]\" konusunu ezberlemesini sağlayacak, neşeli bir çocuk şarkısı sözü yaz. 2 kıta ve kolay tekrar edilen bir nakarat olsun. Bilgiler doğru sırada geçsin.",
    "ipucu": "Sözleri Suno’ya değil, önce bir metin yapay zekâsına yazdır. Suno’nun kendi yazdığı sözlerde bilgi hataları çok olur.",
    "dikkat": "Şarkıyı dinlemeden sınıfa götürme: kelimeler yanlış telaffuz edilebilir ya da bilgi sırası bozulabilir. Ücretsiz planda üretilen şarkılar ticari olarak kullanılamaz.",
    "etiket": [
      "sarki",
      "muzik",
      "ezber",
      "nakarat",
      "ritim"
    ],
    "kontrol": "2026-11"
  },
  {
    "id": "udio",
    "ad": "Udio",
    "url": "https://www.udio.com",
    "kategori": [
      "ses"
    ],
    "ucret": "kismen",
    "ucretNot": "Aylık ücretsiz üretim hakkı verir.",
    "ozet": "Suno’ya alternatif müzik üreticisi. Ses kalitesi ve tür çeşitliliği güçlüdür.",
    "alt": "Müzik",
    "yas": "18+",
    "turkce": "Türkçe söz söyleyebilir; telaffuz kontrolü gerekir.",
    "neIcin": [
      "Ders şarkısının farklı bir tarzını üretip sınıfa seçtirmek.",
      "Etkinlik ve gösteri için fon müziği hazırlamak."
    ],
    "ipucu": "Aynı sözleri hem Suno hem Udio’ya verip sınıfta oylatmak, öğrencilerin dikkatini konuya çeken güzel bir açılış olur.",
    "etiket": [
      "muzik",
      "sarki",
      "fon muzigi"
    ],
    "kontrol": "2026-11"
  },
  {
    "id": "murf",
    "ad": "Murf AI",
    "url": "https://murf.ai",
    "kategori": [
      "ses"
    ],
    "ucret": "kismen",
    "ucretNot": "Ücretsiz planda indirme kısıtlı olabilir.",
    "ozet": "Sunumlara dış ses eklemek için tasarlanmış seslendirme aracı. Slayt ve ses eşleştirmesini kolaylaştırır.",
    "alt": "Seslendirme",
    "yas": "18+",
    "turkce": "Türkçe sesler mevcuttur.",
    "neIcin": [
      "Sunuma slayt slayt dış ses eklemek.",
      "Konuşma hızını ve tonunu ayarlayarak dinleme metni üretmek."
    ],
    "etiket": [
      "seslendirme",
      "sunum",
      "dis ses",
      "tts"
    ],
    "kontrol": "2026-11"
  },
  {
    "id": "turboscribe",
    "ad": "TurboScribe",
    "url": "https://turboscribe.ai",
    "kategori": [
      "ses",
      "metin"
    ],
    "ucret": "kismen",
    "ucretNot": "Ücretsiz planda günde 3 dosya, dosya başına en fazla 30 dakika.",
    "ozet": "Ses ve video kaydını yazıya çevirir. Toplantı, seminer ve ders kaydını nota dönüştürmek için kullanılır.",
    "alt": "Deşifre",
    "yas": "18+",
    "turkce": "Türkçe deşifrede başarılıdır.",
    "neIcin": [
      "Zümre toplantısı kaydını yazılı tutanağa çevirmek.",
      "Kendi dersinin kaydını yazıya döküp öğrencilere not olarak vermek.",
      "Konferans ya da seminer kaydından özet çıkarmak."
    ],
    "ipucu": "Çıkan metni bir sohbet aracına verip \"bunu maddelere ayır ve karar listesi çıkar\" dediğinde tutanak hazır olur.",
    "dikkat": "Ses kaydı almak için ortamdaki herkesin bilgisi ve izni gerekir. Öğrenci sesi içeren kayıtları yükleme.",
    "etiket": [
      "desifre",
      "transkript",
      "tutanak",
      "kayit",
      "yaziya cevir"
    ],
    "kontrol": "2026-11"
  },
  {
    "id": "adobepodcast",
    "ad": "Adobe Podcast",
    "url": "https://podcast.adobe.com/enhance",
    "kategori": [
      "ses"
    ],
    "ucret": "ucretsiz",
    "ucretNot": "Ses iyileştirme aracı ücretsiz kullanılabilir.",
    "ozet": "Kötü kaydedilmiş sesi stüdyo kalitesine yakın hâle getirir. Telefonla çekilmiş ders videolarını kurtarır.",
    "alt": "Ses temizleme",
    "yas": "13+",
    "turkce": "Dilden bağımsız çalışır.",
    "neIcin": [
      "Sınıfta telefonla çektiğin videonun uğultulu sesini temizlemek.",
      "Uzaktan ders kaydındaki yankıyı azaltmak.",
      "Öğrenci sunum kayıtlarını dinlenebilir hâle getirmek."
    ],
    "ipucu": "Video dosyasının sesini ayırıp buraya yükle, temizlenen sesi Clipchamp’te videoyla yeniden birleştir.",
    "etiket": [
      "ses temizleme",
      "gurultu",
      "kayit",
      "adobe",
      "ucretsiz"
    ],
    "kontrol": "2026-11"
  },
  {
    "id": "magicschool",
    "ad": "MagicSchool AI",
    "url": "https://www.magicschool.ai",
    "kategori": [
      "egitim",
      "metin"
    ],
    "ucret": "kismen",
    "ucretNot": "Öğretmenlere ücretsiz plan var ama aylık üretim sınırı uygulanır; Google Dokümanlar ve Word’e doğrudan aktarma ücretli planda.",
    "ozet": "Sadece öğretmenler için yapılmış, 80’den fazla hazır araç. Prompt yazmayı bilmeden form doldurarak çalışırsın.",
    "alt": "Öğretmen aracı",
    "yas": "Öğretmen kullanımı için; öğrenci alanı ayrı",
    "turkce": "Arayüz İngilizce; çıktı dilini Türkçe seçebilirsin.",
    "yeni": true,
    "neIcin": [
      "Ders planı, rubrik, test ve farklılaştırma materyali üretmek.",
      "Veli e-postası ve davranış gözlem notu taslağı hazırlamak.",
      "Bireyselleştirilmiş eğitim planı (BEP) için hedef önerileri almak.",
      "Öğrenci çalışmasına geri bildirim taslağı çıkarmak.",
      "Öğrencilere güvenli, öğretmen gözetimli sohbet alanı açmak (Raina)."
    ],
    "ipucu": "Çıktı dili için formun altındaki dil kutusundan Türkçe seç. İngilizce üretip çevirmekten daha iyi sonuç verir.",
    "dikkat": "Formlara öğrenci adı yazmak kolay geliyor ama yazma: hedef ve durumu genel anlat, adı sonradan kendi belgenize ekle.",
    "etiket": [
      "ogretmen",
      "ders plani",
      "rubrik",
      "bep",
      "farklilastirma",
      "hazir arac"
    ],
    "kontrol": "2026-11"
  },
  {
    "id": "diffit",
    "ad": "Diffit",
    "url": "https://web.diffit.me",
    "kategori": [
      "egitim",
      "metin"
    ],
    "ucret": "kismen",
    "ucretNot": "Ücretsiz planda haftalık üretim sayısı sınırlı.",
    "ozet": "Herhangi bir metni ya da konuyu istediğin okuma düzeyine uyarlar; yanına kelime listesi ve soru üretir.",
    "alt": "Farklılaştırma",
    "yas": "Öğretmen kullanımı için",
    "turkce": "Çıktı dilini Türkçe seçebilirsin.",
    "yeni": true,
    "neIcin": [
      "Aynı metni destek gereken ve ileri düzey öğrenciye göre yeniden yazdırmak.",
      "Metinle birlikte anahtar kelime listesi ve anlama sorusu almak.",
      "Çıktıyı doğrudan çalışma kâğıdı olarak indirmek.",
      "Haber ya da makaleyi sınıf düzeyine indirmek."
    ],
    "prompt": "Aşağıdaki metni anlamını ve temel terimlerini koruyarak [6.] sınıf için üç ayrı okuma düzeyine uyarla: (1) okumada destek gereken öğrenci, (2) sınıf düzeyi, (3) ileri düzey. Her düzeyin sonuna 2 anlama sorusu ekle.\n\nMetin: [metni buraya yapıştır]",
    "ipucu": "Çıktıyı Google Dokümanlar olarak indirip kendi düzeninle biçimlendirebilirsin; sıfırdan yazmaktan çok hızlı.",
    "dikkat": "Destek düzeyi metinlerinin küçümseyici bir dile kaymadığını okuyarak kontrol et.",
    "etiket": [
      "farklilastirma",
      "okuma duzeyi",
      "metin uyarlama",
      "calisma kagidi"
    ],
    "kontrol": "2026-11"
  },
  {
    "id": "gamma",
    "ad": "Gamma",
    "url": "https://gamma.app",
    "kategori": [
      "egitim",
      "gorsel"
    ],
    "ucret": "kismen",
    "ucretNot": "Kayıtta tek seferlik 400 kredi verir, yenilenmez; ücretsiz çıktılarda Gamma logosu kalır.",
    "ozet": "Birkaç cümleden tasarımlı sunum üretir. PowerPoint’te saatler alan işi dakikalara indirir.",
    "alt": "Sunum",
    "yas": "13+",
    "turkce": "Türkçe sunum üretir.",
    "yeni": true,
    "neIcin": [
      "Konu başlığından tasarımlı ders sunumu çıkarmak.",
      "Elindeki metni ya da PDF’i sunuma çevirmek.",
      "Zümre sunumu ve veli toplantısı sunumu hazırlamak.",
      "Sunumu PowerPoint ya da PDF olarak indirmek."
    ],
    "prompt": "\"[Konu]\" hakkında [7.] sınıf öğrencilerine anlatılacak [10] slaytlık bir sunum hazırla. Her slaytta başlık ve en fazla 3 kısa madde olsun. İlk slayt merak uyandıran bir soruyla başlasın, son slayt 3 tekrar sorusuyla bitsin.",
    "ipucu": "Önce slayt başlıklarını bir sohbet aracına yazdır, onayladıktan sonra Gamma’ya yapıştır. Doğrudan konu adı vermek yüzeysel sunum üretir.",
    "dikkat": "Ürettiği görseller konuyla ilgisiz çıkabilir; her slaydın görselini kontrol et.",
    "etiket": [
      "sunum",
      "slayt",
      "powerpoint",
      "tasarim"
    ],
    "kontrol": "2026-11"
  },
  {
    "id": "curipod",
    "ad": "Curipod",
    "url": "https://curipod.com",
    "kategori": [
      "egitim",
      "web20"
    ],
    "ucret": "kismen",
    "ucretNot": "Öğretmenler için ücretsiz plan var; PDF indirme ve ayrıntılı raporlar ücretli planda.",
    "ozet": "Konu yazdığında etkileşimli ders sunumu üretir: içinde anket, kelime bulutu ve açık uçlu soru hazır gelir.",
    "alt": "Etkileşimli ders",
    "yas": "Öğrenciler kod ile katılır, hesap gerekmez",
    "turkce": "Türkçe ders üretebilir.",
    "yeni": true,
    "neIcin": [
      "Tek cümlelik konu girdisinden etkileşimli ders akışı üretmek.",
      "Ders içinde öğrencilerden canlı yanıt toplamak.",
      "Derse ısınma (warm-up) etkinliği ile başlamak."
    ],
    "ipucu": "Üretilen dersi olduğu gibi kullanma; slayt sırasını kendi ders akışına göre düzenle.",
    "etiket": [
      "etkilesimli",
      "sunum",
      "anket",
      "canli",
      "isinma"
    ],
    "kontrol": "2026-11",
    "vitrin": true
  },
  {
    "id": "eduaide",
    "ad": "Eduaide.ai",
    "url": "https://www.eduaide.ai",
    "kategori": [
      "egitim",
      "metin"
    ],
    "ucret": "kismen",
    "ucretNot": "Ücretsiz planda ayda yaklaşık 15 üretim.",
    "ozet": "Öğretmen işlerine göre ayrılmış 100’den fazla üretim şablonu sunar; çıktıyı düzenleyip indirebilirsin.",
    "alt": "Öğretmen aracı",
    "yas": "Öğretmen kullanımı için",
    "turkce": "Çıktı dili Türkçe seçilebilir.",
    "yeni": true,
    "neIcin": [
      "Soru bankası, tartışma yönergesi ve proje görevi üretmek.",
      "Geri bildirim ve değerlendirme ölçütü hazırlamak.",
      "Üretilen içeriği aynı ekranda düzenleyip Word olarak indirmek."
    ],
    "etiket": [
      "ogretmen",
      "sablon",
      "soru",
      "geri bildirim"
    ],
    "kontrol": "2026-11"
  },
  {
    "id": "questionwell",
    "ad": "QuestionWell",
    "url": "https://questionwell.org",
    "kategori": [
      "egitim"
    ],
    "ucret": "kismen",
    "ucretNot": "Ücretsiz planda sınırsız soru üretir, bazı aktarma biçimleri ücretlidir.",
    "ozet": "Metin ya da bağlantı verdiğinde kazanıma bağlı sorular üretir ve Kahoot, Wayground gibi araçlara aktarır.",
    "alt": "Soru üretimi",
    "yas": "Öğretmen kullanımı için",
    "turkce": "Türkçe metinlerden soru üretebilir.",
    "yeni": true,
    "neIcin": [
      "Okuma metninden çoktan seçmeli soru havuzu çıkarmak.",
      "Soruları temel soru (essential question) ve öğrenme hedefiyle eşleştirmek.",
      "Soruları doğrudan yarışma araçlarına aktarmak."
    ],
    "ipucu": "Önce metni Diffit ile sınıf düzeyine indir, sonra QuestionWell ile soru üret: zorluk düzeyi çok daha tutarlı olur.",
    "etiket": [
      "soru",
      "test",
      "olcme",
      "kazanim",
      "aktarma"
    ],
    "kontrol": "2026-11"
  },
  {
    "id": "twee",
    "ad": "Twee",
    "url": "https://twee.com",
    "kategori": [
      "egitim"
    ],
    "ucret": "ucretli",
    "ucretNot": "Yalnızca kısa bir ücretsiz deneme (birkaç üretim) var; sürekli kullanım ücretli.",
    "ozet": "İngilizce öğretmenleri için tasarlanmış araç. Video, metin ve dilbilgisi etkinliklerini hazır üretir.",
    "alt": "İngilizce",
    "yas": "Öğretmen kullanımı için",
    "turkce": "Arayüz İngilizce; çıktılar İngilizce ders içindir.",
    "yeni": true,
    "neIcin": [
      "YouTube videosundan dinleme etkinliği ve soru üretmek.",
      "Dilbilgisi konusuna uygun alıştırma ve boşluk doldurma hazırlamak.",
      "Konuşma dersi için tartışma soruları ve diyalog üretmek.",
      "Kelime çalışması ve eş anlamlı alıştırmaları çıkarmak."
    ],
    "ipucu": "Video bağlantısını yapıştırıp soru üretmek, dinleme etkinliği hazırlamanın en hızlı yoludur.",
    "etiket": [
      "ingilizce",
      "dinleme",
      "dilbilgisi",
      "kelime",
      "yabanci dil"
    ],
    "kontrol": "2026-11"
  },
  {
    "id": "khanmigo",
    "ad": "Khanmigo",
    "url": "https://www.khanmigo.ai",
    "kategori": [
      "egitim"
    ],
    "ucret": "ogretmen",
    "ucretNot": "Öğretmen araçları Türkiye dâhil 180’den fazla ülkede ücretsiz; ücretli öğrenci ve veli aboneliği yalnızca ABD’de.",
    "ozet": "Khan Academy’nin öğretmen ve öğrenci asistanı. Cevabı doğrudan vermeyip soru sorarak yönlendirir.",
    "alt": "Öğretmen aracı",
    "yas": "Öğrenci sürümü okul hesabıyla kullanılır",
    "turkce": "Arayüz ve içerik ağırlıklı olarak İngilizcedir.",
    "yeni": true,
    "neIcin": [
      "Ders planı ve soru hazırlamak.",
      "Öğrenciye cevabı vermeden adım adım rehberlik eden model görmek.",
      "Matematik konularında alıştırma ve açıklama üretmek."
    ],
    "dikkat": "İçerik ve arayüz ağırlıklı olarak İngilizcedir; öğrenci sürümü için okul yönetiminin onayı gerekir.",
    "etiket": [
      "khan",
      "matematik",
      "ogretmen",
      "sokratik"
    ],
    "kontrol": "2026-11"
  },
  {
    "id": "bookcreator",
    "ad": "Book Creator",
    "url": "https://bookcreator.com",
    "kategori": [
      "egitim",
      "web20"
    ],
    "ucret": "kismen",
    "ucretNot": "Ücretsiz öğretmen hesabında 1 kitaplık ve 40 kitap; öğrenciler için ek ücret yok.",
    "ozet": "Öğrencilerin kendi dijital kitaplarını yazıp seslendirdiği araç. Ürün ortaya çıkaran projeler için çok uygundur.",
    "alt": "Dijital kitap",
    "yas": "Öğrenciler öğretmen kodu ile katılır",
    "turkce": "Arayüz İngilizce ama kullanımı sezgiseldir.",
    "yeni": true,
    "neIcin": [
      "Öğrencilere konu anlatan dijital kitap yazdırmak.",
      "Sesli kitap hazırlayarak okuma akıcılığını kaydetmek.",
      "Sınıf antolojisi ya da ünite portfolyosu oluşturmak.",
      "Yapay zekâ ile üretilen hikâye ve görselleri kitaba dönüştürmek."
    ],
    "ipucu": "Yapay zekâ ile hikâye ve görselleri üret, kitaba dönüştürme işini öğrencilere bırak. Öğrenme tasarım sürecinde oluşur.",
    "etiket": [
      "kitap",
      "proje",
      "portfolyo",
      "ogrenci urun",
      "okuma"
    ],
    "kontrol": "2026-11"
  },
  {
    "id": "genially",
    "ad": "Genially",
    "url": "https://genially.com",
    "kategori": [
      "web20",
      "egitim"
    ],
    "ucret": "kismen",
    "ucretNot": "Ücretsiz planda çıktı indirme kısıtlı, çalışmalar herkese açık olur.",
    "ozet": "Tıklanabilir, etkileşimli sunum ve oyun hazırlamaya yarar. Kaçış odası etkinlikleri için favoridir.",
    "alt": "Etkileşimli içerik",
    "yas": "13+",
    "turkce": "Arayüz Türkçe.",
    "neIcin": [
      "Dijital kaçış odası ve bulmacalı tekrar etkinliği kurmak.",
      "Tıklanabilir infografik ve etkileşimli görsel hazırlamak.",
      "Sanal müze turu ya da keşif etkinliği tasarlamak."
    ],
    "ipucu": "Kaçış odası senaryosunu ve bulmacaları bir sohbet aracına yazdır, tasarımı Genially’de kur.",
    "etiket": [
      "kacis odasi",
      "etkilesimli",
      "oyun",
      "infografik",
      "sunum"
    ],
    "kontrol": "2026-11"
  },
  {
    "id": "kahoot",
    "ad": "Kahoot!",
    "url": "https://kahoot.com",
    "kategori": [
      "web20"
    ],
    "ucret": "kismen",
    "ucretNot": "Ücretsiz öğretmen hesabında oyun başına yaklaşık 40 katılımcı; daha fazlası ve bazı oyun türleri ücretli.",
    "ozet": "Sınıfı ayağa kaldıran canlı yarışma aracı. Tekrar ve ısınma etkinliklerinde en bilinen seçenek.",
    "alt": "Yarışma",
    "yas": "Öğrenciler kod ile katılır, hesap gerekmez",
    "turkce": "Arayüz Türkçe.",
    "neIcin": [
      "Ünite tekrarını canlı yarışmaya çevirmek.",
      "Derse ısınma sorularıyla başlamak.",
      "Yapay zekâ ile üretilen soruları içe aktarmak.",
      "Ödev modunda öğrencilerin kendi hızında çözmesini sağlamak."
    ],
    "prompt": "\"[Konu]\" konusunda [5.] sınıf için 10 soruluk canlı yarışma hazırla. Her soru en fazla 15 kelime, her seçenek en fazla 6 kelime olsun. Sonucu şu sütunlarla tablo yap: Soru, A, B, C, D, Doğru Cevap.",
    "ipucu": "Soruları yapay zekâya tablo olarak yazdır, Excel’e yapıştır, Kahoot’un şablonuyla içe aktar. 10 soru 2 dakikada hazır olur.",
    "dikkat": "Öğrencilere takma ad kullandır; gerçek ad ve soyadı ekranda herkese görünür.",
    "etiket": [
      "yarisma",
      "quiz",
      "tekrar",
      "canli",
      "oyun"
    ],
    "kontrol": "2026-11"
  },
  {
    "id": "wayground",
    "ad": "Wayground (eski Quizizz)",
    "url": "https://wayground.com",
    "kategori": [
      "web20"
    ],
    "ucret": "kismen",
    "ucretNot": "1 Ocak 2026’dan beri ücretsiz planda en fazla 20 kayıtlı etkinlik saklanıyor; bazı soru türleri ve raporlar ücretli.",
    "ozet": "Quizizz’in yeni adı. Öğrencilerin kendi hızında çözdüğü testler ve yapay zekâ destekli soru üretimi sunar.",
    "alt": "Ölçme",
    "yas": "Öğrenciler kod ile katılır",
    "turkce": "Arayüz Türkçe.",
    "neIcin": [
      "Ödev olarak verilen, kendi hızında çözülen test hazırlamak.",
      "Yapay zekâ ile metinden otomatik soru üretmek.",
      "Soru bazlı raporla hangi kazanımın eksik kaldığını görmek.",
      "Hazır milyonlarca soruyu arayıp kendi testine eklemek."
    ],
    "ipucu": "Test sonrası soru raporuna bak: tüm sınıfın yanlış yaptığı soru genellikle öğretim eksiğini, tek tek yanlışlar ise bireysel desteği gösterir.",
    "dikkat": "Öğrenci hesabı açtırıyorsan okul izni ve veli bilgilendirmesi gerekir.",
    "etiket": [
      "quizizz",
      "test",
      "odev",
      "olcme",
      "rapor"
    ],
    "kontrol": "2026-11",
    "vitrin": true
  },
  {
    "id": "mentimeter",
    "ad": "Mentimeter",
    "url": "https://www.mentimeter.com",
    "kategori": [
      "web20"
    ],
    "ucret": "kismen",
    "ucretNot": "Ücretsiz planda sunum sayısı sınırsız ama aynı anda 50 katılımcı sınırı var (ayda bir kez aşılabilir).",
    "ozet": "Canlı anket, kelime bulutu ve oylama aracı. Sınıfın ne düşündüğünü anında ekrana getirir.",
    "alt": "Anket",
    "yas": "Katılımcılar kod ile girer, hesap gerekmez",
    "turkce": "Arayüz Türkçe.",
    "neIcin": [
      "Derse \"bu kelime size neyi hatırlatıyor?\" kelime bulutuyla başlamak.",
      "Tartışmalı bir konuda sınıfın görüşünü anonim olarak toplamak.",
      "Ders sonunda anlaşılma düzeyini hızla ölçmek.",
      "Veli ve zümre toplantılarında canlı geri bildirim almak."
    ],
    "ipucu": "Anonim olması çekingen öğrencilerin de katılmasını sağlar; hassas konularda bunu açıkça söyle.",
    "etiket": [
      "anket",
      "kelime bulutu",
      "oylama",
      "canli",
      "geri bildirim"
    ],
    "kontrol": "2026-11"
  },
  {
    "id": "plickers",
    "ad": "Plickers",
    "url": "https://get.plickers.com",
    "kategori": [
      "web20"
    ],
    "ucret": "kismen",
    "ucretNot": "Ücretsiz planda soru sayısı sınırlı; kartlar ücretsiz indirilir.",
    "ozet": "Öğrencilerin telefonu ya da tableti olmadan oylama yapmasını sağlar. Kartı kaldırır, sen telefonla okutursun.",
    "alt": "Cihazsız ölçme",
    "yas": "Öğrenci hesabı gerekmez",
    "turkce": "Arayüz İngilizce ama kullanımı basittir.",
    "neIcin": [
      "Cihazı olmayan sınıflarda anlık ölçme yapmak.",
      "Yoklama ve hızlı anlama kontrolü almak.",
      "Kim ne cevap verdi bilgisini sınıfa göstermeden kaydetmek."
    ],
    "ipucu": "Kartları bir kez laminat yapıp sınıfta bırak; yıllarca kullanırsın.",
    "etiket": [
      "cihazsiz",
      "kart",
      "olcme",
      "yoklama",
      "qr"
    ],
    "kontrol": "2026-11"
  },
  {
    "id": "padlet",
    "ad": "Padlet",
    "url": "https://padlet.com",
    "kategori": [
      "web20"
    ],
    "ucret": "kismen",
    "ucretNot": "Ücretsiz planda 3 pano; gönderi sayısı sınırsız.",
    "ozet": "Dijital yapışkan not panosu. Öğrenciler yazı, resim, ses ve video ekleyerek birlikte doldurur.",
    "alt": "İşbirliği panosu",
    "yas": "Öğrenciler bağlantıyla katılır, hesap gerekmez",
    "turkce": "Arayüz Türkçe.",
    "neIcin": [
      "Beyin fırtınası yapmak ve fikirleri sınıfla birlikte toplamak.",
      "Ödev ve proje çıktılarını tek panoda toplamak.",
      "Çıkış kartı (exit ticket) uygulamak.",
      "Sessiz tartışma yürütmek: herkes aynı anda yazar."
    ],
    "ipucu": "Panoyu \"sadece bağlantıyla görünür\" yap ve öğrenci gönderilerini onaylı moda al; istenmeyen içerik ekranda görünmez.",
    "dikkat": "Panoya öğrenci fotoğrafı yükleniyorsa veli izni gerekir. Panoyu herkese açık paylaşmaktan kaçın.",
    "etiket": [
      "pano",
      "isbirligi",
      "beyin firtinasi",
      "cikis karti"
    ],
    "kontrol": "2026-11"
  },
  {
    "id": "wordwall",
    "ad": "Wordwall",
    "url": "https://wordwall.net",
    "kategori": [
      "web20"
    ],
    "ucret": "kismen",
    "ucretNot": "Ücretsiz planda 5 etkinlik oluşturabilirsin.",
    "ozet": "Bir kelime listesini onlarca farklı oyuna çevirir: eşleştirme, çarkıfelek, labirent, bulmaca.",
    "alt": "Oyunlaştırma",
    "yas": "Öğrenciler bağlantıyla oynar",
    "turkce": "Arayüz Türkçe; Türkçe etkinlik havuzu geniştir.",
    "neIcin": [
      "Kelime, terim ve tanım çalışmalarını oyuna çevirmek.",
      "Aynı içerikten birden çok oyun türü üretmek.",
      "Akıllı tahtada sınıfça oynanacak tekrar etkinliği hazırlamak.",
      "Yazdırılabilir çalışma kâğıdı olarak indirmek."
    ],
    "ipucu": "Terim-tanım listesini yapay zekâya yazdır, Wordwall’a yapıştır, sonra \"şablonu değiştir\" ile 5 farklı oyun üret.",
    "etiket": [
      "oyun",
      "eslestirme",
      "kelime",
      "tekrar",
      "carkifelek"
    ],
    "kontrol": "2026-11"
  },
  {
    "id": "learningapps",
    "ad": "LearningApps",
    "url": "https://learningapps.org",
    "kategori": [
      "web20"
    ],
    "ucret": "ucretsiz",
    "ucretNot": "Tamamen ücretsiz; hesap açmak zorunlu değil ama kaydetmek için gerekir.",
    "ozet": "Tamamen ücretsiz etkileşimli alıştırma aracı. Bütçesi olmayan okullar için güçlü bir seçenek.",
    "alt": "Alıştırma",
    "yas": "Öğrenciler bağlantıyla kullanır",
    "turkce": "Arayüz Türkçe.",
    "neIcin": [
      "Eşleştirme, gruplama, boşluk doldurma alıştırmaları yapmak.",
      "Hazır etkinlik havuzundan kendi dersine uyarlamak.",
      "Ücretsiz ve süresiz kullanılacak tekrar materyali üretmek."
    ],
    "etiket": [
      "ucretsiz",
      "alistirma",
      "eslestirme",
      "etkilesimli"
    ],
    "kontrol": "2026-11"
  },
  {
    "id": "nearpod",
    "ad": "Nearpod",
    "url": "https://nearpod.com",
    "kategori": [
      "web20",
      "egitim"
    ],
    "ucret": "kismen",
    "ucretNot": "Ücretsiz Silver planı var; hazır ders kütüphanesi 1 Temmuz 2026’dan beri ücretli pakette.",
    "ozet": "Sunumun içine soru, çizim ve video gömmeni sağlar. Öğrenciler kendi ekranından katılır.",
    "alt": "Etkileşimli ders",
    "yas": "Öğrenciler kod ile katılır",
    "turkce": "Arayüz İngilizce.",
    "neIcin": [
      "Var olan PowerPoint sunumuna etkileşimli soru eklemek.",
      "Ders içinde her öğrenciden yazılı ya da çizimli yanıt toplamak.",
      "Sanal gezi ve 3B içerikle konuyu zenginleştirmek."
    ],
    "etiket": [
      "etkilesimli",
      "sunum",
      "canli ders",
      "sanal gezi"
    ],
    "kontrol": "2026-11"
  },
  {
    "id": "edpuzzle",
    "ad": "Edpuzzle",
    "url": "https://edpuzzle.com",
    "kategori": [
      "web20",
      "video"
    ],
    "ucret": "kismen",
    "ucretNot": "Ücretsiz planda en fazla 20 kayıtlı etkinlik; davet ettiğin her öğretmen için 3 hak ekleniyor.",
    "ozet": "Videonun içine soru gömer. Öğrenci videoyu izlerken cevaplar, sen kimin nerede takıldığını görürsün.",
    "alt": "Video + soru",
    "yas": "Öğrenciler sınıf kodu ile katılır",
    "turkce": "Arayüz Türkçe.",
    "neIcin": [
      "YouTube videosunu kırpıp içine anlama soruları eklemek.",
      "Ters yüz sınıf (flipped) için ev ödevi videosu hazırlamak.",
      "Öğrencinin videoyu gerçekten izleyip izlemediğini görmek.",
      "Videoya kendi sesli açıklamanı eklemek."
    ],
    "ipucu": "Soruları yapay zekâya videonun deşifresinden yazdırabilirsin: altyazıyı kopyala, \"bu metinden 5 anlama sorusu üret\" de.",
    "etiket": [
      "video",
      "soru",
      "ters yuz",
      "youtube",
      "odev"
    ],
    "kontrol": "2026-11"
  },
  {
    "id": "quizlet",
    "ad": "Quizlet",
    "url": "https://quizlet.com",
    "kategori": [
      "web20"
    ],
    "ucret": "kismen",
    "ucretNot": "Temel kart ve oyun kullanımı ücretsiz; yapay zekâ özellikleri ücretli.",
    "ozet": "Bilgi kartı (flashcard) temelli çalışma aracı. Kelime ve terim ezberinde yaygın kullanılır.",
    "alt": "Bilgi kartı",
    "yas": "13+",
    "turkce": "Arayüz Türkçe.",
    "neIcin": [
      "Terim-tanım kart setleri oluşturup öğrencilerle paylaşmak.",
      "Aynı setten test ve eşleştirme oyunu üretmek.",
      "Yabancı dil kelime çalışmasını sesli yürütmek."
    ],
    "ipucu": "Terim listesini yapay zekâya \"terim - tanım\" biçiminde satır satır yazdır; Quizlet’e tek seferde içe aktarabilirsin.",
    "etiket": [
      "bilgi karti",
      "flashcard",
      "kelime",
      "ezber",
      "terim"
    ],
    "kontrol": "2026-11"
  },
  {
    "id": "google-formlar",
    "ad": "Google Formlar",
    "url": "https://forms.google.com",
    "kategori": [
      "web20"
    ],
    "ucret": "ucretsiz",
    "ucretNot": "Google hesabıyla tamamen ücretsiz.",
    "ozet": "Sınav, anket ve veri toplama için en güvenilir ücretsiz araç. Otomatik puanlar, sonuçları tabloya döker.",
    "alt": "Form ve sınav",
    "yas": "Okul hesabıyla sınıf kullanımına uygun",
    "turkce": "Arayüz Türkçe.",
    "neIcin": [
      "Otomatik puanlanan online sınav yapmak.",
      "Veli ve öğrenci anketi düzenlemek.",
      "Yapay zekâ ile ürettiğin soruları forma aktarmak.",
      "Sonuçları Google Tablolar’da analiz etmek."
    ],
    "ipucu": "Soruları yapay zekâya \"her soru ve seçenekleri ayrı satırda\" yazdırıp forma yapıştırmak en hızlı yoldur.",
    "dikkat": "Formda öğrenci kimlik bilgisi topluyorsan yalnızca gerekli alanı sor ve sonuçları paylaşırken dikkatli ol.",
    "etiket": [
      "form",
      "sinav",
      "anket",
      "google",
      "ucretsiz",
      "otomatik puan"
    ],
    "kontrol": "2026-11"
  },
  {
    "id": "classroomscreen",
    "ad": "Classroomscreen",
    "url": "https://classroomscreen.com",
    "kategori": [
      "web20"
    ],
    "ucret": "kismen",
    "ucretNot": "Temel araçlar ücretsiz; kaydetme ve ek araçlar ücretli.",
    "ozet": "Akıllı tahtaya kurulan sınıf panosu: sayaç, gürültü ölçer, rastgele seçici, çalışma simgeleri.",
    "alt": "Sınıf yönetimi",
    "yas": "Öğrenci hesabı gerekmez",
    "turkce": "Arayüz Türkçe.",
    "neIcin": [
      "Etkinlik süresini sayaçla görünür kılmak.",
      "Söz vermek için rastgele öğrenci seçmek.",
      "Çalışma düzenini (sessiz, ikili, grup) simgeyle göstermek.",
      "Yönergeleri tahtada sabit tutmak."
    ],
    "ipucu": "Grup çalışmalarında sayaç ve gürültü ölçerini birlikte açmak sınıf yönetimini belirgin şekilde kolaylaştırır.",
    "etiket": [
      "sinif yonetimi",
      "sayac",
      "rastgele",
      "akilli tahta"
    ],
    "kontrol": "2026-11"
  },
  {
    "id": "bard",
    "ad": "Google Bard",
    "url": "https://gemini.google.com",
    "kategori": [
      "metin"
    ],
    "ucret": "ucretsiz",
    "ozet": "Google’ın ilk sohbet aracıydı; adı Gemini olarak değişti ve Bard adresi kapandı.",
    "durum": "kapandi",
    "yerine": "gemini",
    "etiket": [
      "bard",
      "kapandi"
    ],
    "kontrol": "2026-11"
  },
  {
    "id": "bingchat",
    "ad": "Bing Chat",
    "url": "https://copilot.microsoft.com",
    "kategori": [
      "metin"
    ],
    "ucret": "ucretsiz",
    "ozet": "Microsoft’un arama tabanlı sohbeti Copilot adıyla birleşti; Bing Chat adı kullanılmıyor.",
    "durum": "kapandi",
    "yerine": "copilot",
    "etiket": [
      "bing",
      "kapandi"
    ],
    "kontrol": "2026-11"
  },
  {
    "id": "flip",
    "ad": "Flip (Flipgrid)",
    "url": "https://info.flip.com",
    "kategori": [
      "web20"
    ],
    "ucret": "ucretsiz",
    "ozet": "Öğrencilerin video ile cevap verdiği Microsoft aracıydı; 2024’te kapatıldı.",
    "durum": "kapandi",
    "yerine": "padlet",
    "etiket": [
      "flipgrid",
      "video cevap",
      "kapandi"
    ],
    "kontrol": "2026-11"
  },
  {
    "id": "jamboard",
    "ad": "Google Jamboard",
    "url": "https://jamboard.google.com",
    "kategori": [
      "web20"
    ],
    "ucret": "ucretsiz",
    "ozet": "Google’ın dijital beyaz tahtası 2024 sonunda kapatıldı; panolar artık açılmıyor.",
    "durum": "kapandi",
    "yerine": "padlet",
    "etiket": [
      "beyaz tahta",
      "jamboard",
      "kapandi"
    ],
    "kontrol": "2026-11"
  },
  {
    "id": "quizizz",
    "ad": "Quizizz",
    "url": "https://wayground.com",
    "kategori": [
      "web20"
    ],
    "ucret": "kismen",
    "ozet": "Quizizz’in adı Wayground olarak değişti; eski bağlantılar yeni adrese yönleniyor.",
    "durum": "kapandi",
    "yerine": "wayground",
    "etiket": [
      "quizizz",
      "ad degisikligi"
    ],
    "kontrol": "2026-11"
  }
];
