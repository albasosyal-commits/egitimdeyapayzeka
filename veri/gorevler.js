/* Ana sayfadaki "Yapacağın işi seç" rehberleri. Panelin "Görev rehberleri" bölümünden düzenlenir.
   "araclar" içindeki id'ler veri/araclar.js dosyasındaki araçları gösterir. */
window.GOREVLER = [
  {
    "id": "metin",
    "baslik": "Metin oluştur",
    "kisa": "Soru, plan, hikâye, yazı",
    "ikon": "metin",
    "kategori": "metin",
    "sure": "5–15 dk",
    "ozet": "Sınav sorusu, ders planı, seviyeye uyarlanmış okuma parçası, hikâye kitabı ve veli duyurusu hazırla.",
    "araclar": [
      {
        "id": "chatgpt",
        "neden": "Soru hazırlama, ders planı yazma ve metin tonunu tek yönergeyle değiştirmede en esnek araç."
      },
      {
        "id": "gemini",
        "neden": "Google Dokümanlar, Formlar ve Storybook (resimli hikâye) ile doğrudan uyumlu çalışır."
      },
      {
        "id": "claude",
        "neden": "Uzun ders notlarından tutarlı soru, plan ve rubrik üretmekte çok başarılıdır."
      },
      {
        "id": "magicschool",
        "neden": "Ders planı, rubrik ve farklılaştırma için öğretmene özel hazır formlar sunar."
      },
      {
        "id": "diffit",
        "neden": "Okuma metinlerini seçilen sınıf düzeyine uyarlamak için özel olarak tasarlandı."
      }
    ],
    "adimlar": [
      "Branşını, sınıf düzeyini ve kazanımı net olarak belirt.",
      "Ne üretmek istediğini seç: sınav sorusu, ders planı, seviyeye uyarlama, hikâye ya da veli yazısı.",
      "Varsa ders kitabından ilgili metni yapıştır; kişisel öğrenci bilgisi ekleme.",
      "İlk çıktıyı incele ve \"3. soruyu zorlaştır\" veya \"dili sadeleştir\" gibi kısa komutlarla düzelt.",
      "Son hâlini kontrol ederek kendi ders materyaline aktar."
    ],
    "prompt": "Ben [5.] sınıf [Sosyal Bilgiler] öğretmeniyim. \"[Konu]\" konusunda 10 soruluk, 4 seçenekli bir test hazırla. Sorular kolaydan zora sıralansın; 3 kolay, 5 orta, 2 zor soru olsun. Çeldiriciler öğrencilerin yaptığı yaygın yanlışları yansıtsın. Sonuna cevap anahtarını ve her cevabın kısa gerekçesini ekle.",
    "promptlar": [
      {
        "baslik": "Sınav ve soru hazırla",
        "prompt": "Ben [5.] sınıf [Sosyal Bilgiler] öğretmeniyim. \"[Konu]\" konusunda 10 soruluk, 4 seçenekli bir test hazırla. Sorular kolaydan zora sıralansın; 3 kolay, 5 orta, 2 zor soru olsun. Çeldiriciler öğrencilerin yaptığı yaygın yanlışları yansıtsın. Sonuna cevap anahtarını ve her cevabın kısa gerekçesini ekle."
      },
      {
        "baslik": "Ders planı ve etkinlik",
        "prompt": "Ben [5.] sınıf [Fen Bilimleri] öğretmeniyim. Kazanım: \"[kazanımı buraya yapıştır]\". Sınıfım [28] kişilik ve [akıllı tahta var, öğrencilerin tableti yok]. Bu kazanım için 40 dakikalık bir ders planı hazırla: giriş, etkinlik, değerlendirme ve kapanış bölümlerini sürelerle yaz. Etkinlik grup çalışması olsun. Gerekli materyalleri ve öğrenci yönergesini ayrıca belirt. Sonucu tablo olarak ver."
      },
      {
        "baslik": "Metni seviyeye uyarla",
        "prompt": "Aşağıdaki metni anlamını ve temel terimlerini koruyarak [6.] sınıf için üç ayrı okuma düzeyine uyarla: (1) okumada destek gereken öğrenci, (2) sınıf düzeyi, (3) ileri düzey. Her düzeyin sonuna 2 anlama sorusu ekle.\n\nMetin: [metni buraya yapıştır]"
      },
      {
        "baslik": "Veli yazısı ve duyuru",
        "prompt": "\"[Konu: örneğin okul gezisi]\" hakkında velilere gönderilecek kısa, nazik ve anlaşılır bir bilgilendirme yazısı hazırla. Tarih, saat ve yer için [boşluk] bırak. En fazla 120 kelime olsun. Sonunda velilerin ne yapması gerektiğini tek cümleyle yaz."
      },
      {
        "baslik": "Resimli hikâye kitabı",
        "prompt": "[Birinci] sınıfa yeni başlayacak bir çocuk için [8] sayfalık, resimli bir hikâye kitabı yaz. Hikâye [Aydın]'da geçsin. Kahramanın adı [Deniz] olsun. Mesajı \"[yeni başlangıçlar heyecan vericidir]\" olsun. Dili yaşına uygun, cümleleri kısa olsun."
      }
    ],
    "kontrol": [
      "Bilgilerin ve soru cevaplarının doğruluğunu kendim kontrol ettim.",
      "İçerik kazanıma ve sınıf düzeyine uygun.",
      "Yapay zekâya öğrenci ya da veli kişisel bilgisi vermedim.",
      "Metin dili ve tonu okul kültürüne uygun."
    ]
  },
  {
    "id": "gorsel",
    "baslik": "Görüntü oluştur",
    "kisa": "Ders görseli ve afiş",
    "ikon": "resim",
    "kategori": "gorsel",
    "sure": "10 dk",
    "ozet": "Hayal edilemeyeni gösteren ders görselleri, bilimsel çizimler, sınıf panosu ve afişler üret.",
    "araclar": [
      {
        "id": "canva",
        "neden": "Görseli üretip aynı yerde sınıf afişine, panoya ya da çalışma kâğıdına dönüştürürsün."
      },
      {
        "id": "chatgpt",
        "neden": "Görseli sohbet ederek adım adım düzeltir, ayrıntıları kolayca değiştirirsin."
      },
      {
        "id": "gemini",
        "neden": "Hızlı görsel üretir ve Türkçe yönergeleri iyi anlar."
      },
      {
        "id": "ideogram",
        "neden": "Görselin üzerinde düzgün başlık veya etiket yazması gerektiğinde başarılıdır."
      }
    ],
    "adimlar": [
      "Sahneyi, tarzı (bilimsel çizim, suluboya, 3B, boyama sayfası) ve renkleri açıkça tarif et.",
      "Promptu görsel aracına yapıştır ve ilk görseli üret.",
      "Sonucu sohbetle adım adım düzelt: \"arka planı sadeleştir\", \"yazıları kaldır\" gibi tek tek iste.",
      "Bilimsel ve tarihsel ayrıntıları kontrol et; gerekiyorsa Canva'da Türkçe başlık ekle."
    ],
    "prompt": "Bilimsel illüstrasyon tarzında, yüksek yerçekimli ve çok kurak hayali bir gezegenin ekosistemini gösteren detaylı bir manzara oluştur. Yüzey çatlak topraklardan ve turuncu kumlardan oluşsun; soluk mor gökyüzünde iki küçük güneş olsun. Bitkiler bodur, kalın gövdeli ve sert yapraklı olsun. Görselde yazı olmasın.",
    "promptlar": [
      {
        "baslik": "Ders görseli ve bilimsel illüstrasyon",
        "prompt": "Bilimsel illüstrasyon tarzında, yüksek yerçekimli ve çok kurak hayali bir gezegenin ekosistemini gösteren detaylı bir manzara oluştur. Yüzey çatlak topraklardan ve turuncu kumlardan oluşsun; soluk mor gökyüzünde iki küçük güneş olsun. Bitkiler bodur, kalın gövdeli ve sert yapraklı olsun. Görselde yazı olmasın."
      },
      {
        "baslik": "Sınıf panosu ve etkinlik afişi",
        "prompt": "[İlkokul / Ortaokul] sınıf panosuna asılacak, \"[Konu: örneğin Su Tasarrufu]\" temalı, sıcak ve davetkâr renklerde, düz vektör illüstrasyon tarzında bir afiş arka planı oluştur. Ortada başlık yazmak için sade ve açık renkli bir alan bırak. Görselde yazı olmasın."
      },
      {
        "baslik": "Boyama ve çalışma kâğıdı çizimi",
        "prompt": "[2.] sınıf öğrencileri için \"[Konu: örneğin Çiftlik Hayvanları]\" konulu, siyah-beyaz net çizgilerden oluşan, gölgesiz, kolay boyanabilir bir boyama sayfası çizimi oluştur. Arka plan tamamen beyaz olsun."
      }
    ],
    "kontrol": [
      "Görselde bilimsel ya da tarihsel hata yok.",
      "Görselin yapay zekâ ile üretildiğini belirttim.",
      "Gerçek bir öğrencinin fotoğrafını kullanmadım.",
      "Görsel üzerinde yazı varsa Türkçe karakterleri doğru."
    ]
  },
  {
    "id": "ses",
    "baslik": "Ses oluştur",
    "kisa": "Seslendirme ve şarkı",
    "ikon": "nota",
    "kategori": "ses",
    "sure": "10 dk",
    "ozet": "Ders notunu doğal Türkçe sesle okut, kavramları akılda kalıcı şarkıya ya da sesli özete dönüştür.",
    "araclar": [
      {
        "id": "suno",
        "neden": "Yazdığın ders sözlerinden saniyeler içinde akılda kalıcı şarkı üretir."
      },
      {
        "id": "elevenlabs",
        "neden": "Metinleri ve hikâyeleri doğal tonlamayla Türkçe seslendirir."
      },
      {
        "id": "notebooklm",
        "neden": "Yüklediğin ders notundan iki kişilik sohbet (podcast) tarzı sesli özet çıkarır."
      }
    ],
    "adimlar": [
      "Önce metin yapay zekâsına şarkı sözlerini ya da seslendirme metnini yazdır.",
      "Şarkı için sözleri Suno'ya yapıştırıp müzik tarzını (neşeli çocuk şarkısı, akustik, pop) seç.",
      "Seslendirme için metni ElevenLabs'e yapıştır; kısaltmaları açık yaz.",
      "Kaydı dinle: terimler ve Türkçe kelimeler doğru telaffuz ediliyor mu kontrol et."
    ],
    "prompt": "[4.] sınıf öğrencilerinin \"[Konu: örneğin gezegenlerin sırası]\" konusunu ezberlemesini sağlayacak, neşeli bir çocuk şarkısı sözü yaz. 2 kıta ve kolay tekrar edilen bir nakarat olsun. Bilgiler doğru sırada geçsin.",
    "promptlar": [
      {
        "baslik": "Eğitici ders şarkısı sözü",
        "prompt": "[4.] sınıf öğrencilerinin \"[Konu: örneğin gezegenlerin sırası]\" konusunu ezberlemesini sağlayacak, neşeli bir çocuk şarkısı sözü yaz. 2 kıta ve kolay tekrar edilen bir nakarat olsun. Bilgiler doğru sırada geçsin."
      },
      {
        "baslik": "Seslendirme ve dinleme metni",
        "prompt": "\"[Konu]\" hakkında [6.] sınıf öğrencilerine dinletilecek, 90 saniyelik, merak uyandıran bir seslendirme metni yaz. Cümleler kısa ve konuşma diline uygun olsun; kısaltmaları ve sayıları okunuşuyla yaz."
      }
    ],
    "kontrol": [
      "Sözlerdeki ve metindeki bilgiler doğru.",
      "Özel adların ve terimlerin Türkçe okunuşu düzgün.",
      "Ücretsiz planın kullanım hakları koşullarına dikkat ettim.",
      "Gerçek bir kişinin sesini izinsiz taklit etmedim."
    ]
  },
  {
    "id": "video",
    "baslik": "Video oluştur",
    "kisa": "Ders videosu ve sahne",
    "ikon": "video",
    "kategori": "video",
    "sure": "20–30 dk",
    "ozet": "Metinden anlatımlı kısa ders videosu ya da görselden hareketli canlandırma üret.",
    "araclar": [
      {
        "id": "notebooklm",
        "neden": "Yüklediğin kaynaklardan anlatımlı özet çıkarır; ücretsiz planla başlanır."
      },
      {
        "id": "canva",
        "neden": "Öğretmen hesabı ücretsiz; senaryoyu seslendirmeli videoya aynı yerde çevirirsin."
      },
      {
        "id": "kling",
        "neden": "Ders görselini 5-10 saniyelik hareketli videoya dönüştürür, günlük ücretsiz kredi verir."
      },
      {
        "id": "runway",
        "neden": "Yaratıcı kısa sahneler ve görsel canlandırma araçları sunar."
      }
    ],
    "adimlar": [
      "Önce metin yapay zekâsı ile 60 saniyelik kısa ve net bir video senaryosu hazırla.",
      "Senaryoyu video aracına yapıştır ya da ürettiğin görseli canlandırma aracına yükle.",
      "Ücretsiz kredini korumak için önce tek bir sahneyle kısa deneme üret.",
      "Sesi, altyazıyı ve görüntülerdeki bilimsel/tarihsel ayrıntıları kontrol et."
    ],
    "prompt": "\"[Konu]\" konusunu [6.] sınıf öğrencilerine anlatan 60 saniyelik bir video senaryosu yaz. Merak uyandıran bir soruyla başla. Her sahne için dış ses metnini ve ekranda görünecek görüntüyü iki ayrı başlıkta yaz. Dili sade olsun, sonunda öğrencilere tek bir düşünme sorusu sor.",
    "promptlar": [
      {
        "baslik": "60 saniyelik ders videosu senaryosu",
        "prompt": "\"[Konu]\" konusunu [6.] sınıf öğrencilerine anlatan 60 saniyelik bir video senaryosu yaz. Merak uyandıran bir soruyla başla. Her sahne için dış ses metnini ve ekranda görünecek görüntüyü iki ayrı başlıkta yaz. Dili sade olsun, sonunda öğrencilere tek bir düşünme sorusu sor."
      },
      {
        "baslik": "Görseli videoya canlandırma komutu",
        "prompt": "Yüklediğim ders görselini 5 saniyelik akıcı bir videoya dönüştürmek için kamera hareketini ve sahnedeki doğal hareketi tarif eden kısa, net bir video üretim komutu (prompt) yaz. Sahne: \"[görseldeki sahneyi kısaca yaz]\"."
      }
    ],
    "kontrol": [
      "Görüntülerde gerçeğe aykırı ayrıntı yok.",
      "Videonun yapay zekâ ile üretildiğini belirttim.",
      "Gerçek kişilerin yüzünü ya da sesini izinsiz kullanmadım.",
      "Türkçe seslendirme ve altyazı doğru."
    ]
  },
  {
    "id": "sunum",
    "baslik": "Sunum oluştur",
    "kisa": "Hızlı slayt destesi",
    "ikon": "sunum",
    "kategori": "egitim",
    "sure": "10–15 dk",
    "ozet": "Konu başlığından veya ders notlarından dakikalar içinde düzenli slaytlar hazırla.",
    "araclar": [
      {
        "id": "gamma",
        "neden": "Konu başlığından veya metinden tasarımlı slayt destesini hızla üretir."
      },
      {
        "id": "canva",
        "neden": "Öğretmenlere ücretsiz; zengin eğitim şablonları ve kolay düzenleme sunar."
      },
      {
        "id": "notebooklm",
        "neden": "Yüklediğin ders kaynaklarına sadık kalarak sunum taslağı çıkarır."
      },
      {
        "id": "curipod",
        "neden": "İçinde canlı anket ve soru-cevap olan etkileşimli ders sunumu üretir."
      }
    ],
    "adimlar": [
      "Önce yapay zekâya slayt başlıklarını ve her slayttaki 3 kısa maddeyi yazdır.",
      "Onayladığın taslağı Gamma ya da Canva'ya yapıştırarak slaytları oluştur.",
      "Slaytlardaki uzun cümleleri kısalt, kendi sınıfından bir örnek ekle.",
      "Görsellerin ve bilgilerin kazanıma uygunluğunu kontrol et."
    ],
    "prompt": "\"[Konu]\" hakkında [7.] sınıf öğrencilerine anlatılacak [10] slaytlık bir sunum taslağı hazırla. Her slayt için başlık, en fazla 3 kısa madde ve önerilen görsel yaz. İlk slayt merak uyandıran bir soruyla başlasın, son slayt 3 tekrar sorusuyla bitsin.",
    "promptlar": [
      {
        "baslik": "Merak uyandıran ders sunumu taslağı",
        "prompt": "\"[Konu]\" hakkında [7.] sınıf öğrencilerine anlatılacak [10] slaytlık bir sunum taslağı hazırla. Her slayt için başlık, en fazla 3 kısa madde ve önerilen görsel yaz. İlk slayt merak uyandıran bir soruyla başlasın, son slayt 3 tekrar sorusuyla bitsin."
      },
      {
        "baslik": "Ders notundan slayt özeti",
        "prompt": "Aşağıdaki ders notunu [8.] sınıf düzeyinde [8] slayta böl. Her slaytta yalnızca 1 ana fikir ve en fazla 3 kısa madde bulunsun; öğretmenin sözlü anlatacağı notu \"Konuşmacı Notu\" olarak altına ekle.\n\nDers notu: [metni buraya yapıştır]"
      }
    ],
    "kontrol": [
      "Slaytlarda okunmayı zorlaştıran uzun paragraflar yok.",
      "Bilgiler, formüller ve tarihler doğru.",
      "Görseller konuyu doğru yansıtıyor."
    ]
  },
  {
    "id": "arastirma",
    "baslik": "Belge ve araştırma",
    "kisa": "PDF özeti ve kaynak",
    "ikon": "arama",
    "kategori": "metin",
    "sure": "10 dk",
    "ozet": "Uzun PDF, kitap ve raporları özetle; kaynak bağlantılı güvenilir araştırma yap.",
    "araclar": [
      {
        "id": "notebooklm",
        "neden": "Yalnızca senin yüklediğin PDF ve belgelere dayanır, her bilginin belgedeki yerini gösterir."
      },
      {
        "id": "perplexity",
        "neden": "İnternette güncel araştırma yapar ve her cümlenin yanına kaynak bağlantısını ekler."
      },
      {
        "id": "claude",
        "neden": "Çok uzun belgeleri, kitap bölümlerini ve yönergeleri bozmadan analiz eder."
      },
      {
        "id": "gemini",
        "neden": "Deep Research özelliğiyle kapsamlı araştırma raporu yazar, Drive belgeleriyle çalışır."
      }
    ],
    "adimlar": [
      "Yükleyeceğin belgede öğrenci, veli veya kişisel veri olmadığından emin ol.",
      "Belge özeti için dosyayı NotebookLM veya Claude'a yükle; web araştırması için Perplexity'yi aç.",
      "Yapay zekâdan bilgiyi mutlaka kaynak bölümü veya bağlantısıyla birlikte göstermesini iste.",
      "Kritik sayıları, tarihleri ve kaynak bağlantılarını açarak asıl kaynaktan doğrula."
    ],
    "prompt": "Yüklediğim belgeye dayanarak: (1) Ana fikirleri 5 maddede özetle, (2) [8.] sınıf öğrencisinin bilmesi gereken 10 kavramı kısa tanımlarıyla listele, (3) belgeye dayalı 5 tartışma sorusu yaz. Belgede olmayan bilgi ekleme; her madde için belgenin ilgili bölümünü belirt.",
    "promptlar": [
      {
        "baslik": "Uzun belge ve PDF özetle",
        "prompt": "Yüklediğim belgeye dayanarak: (1) Ana fikirleri 5 maddede özetle, (2) [8.] sınıf öğrencisinin bilmesi gereken 10 kavramı kısa tanımlarıyla listele, (3) belgeye dayalı 5 tartışma sorusu yaz. Belgede olmayan bilgi ekleme; her madde için belgenin ilgili bölümünü belirt."
      },
      {
        "baslik": "Kaynaklı güncel araştırma yap",
        "prompt": "\"[Araştırma konusu]\" hakkında [son 5 yılı kapsayan] güvenilir bilgileri derle. Resmî kurumları ve akademik yayınları öncele. Her bilginin yanına kaynak bağlantısı ekle. Kaynaklar arasında çelişki varsa belirt. Sonucu [10.] sınıf öğretmeninin derste kullanabileceği 8 maddede özetle."
      }
    ],
    "kontrol": [
      "Önemli bilgileri ve alıntıları asıl belgeden/kaynaktan doğruladım.",
      "Kaynak bağlantılarını açıp bilginin gerçekten orada yazdığını gördüm.",
      "Yüklediğim belgede öğrenci ya da veli bilgisi yoktu."
    ]
  },
  {
    "id": "oyun",
    "baslik": "Etkileşim ve oyun oluştur",
    "kisa": "Yarışma, anket, oyun",
    "ikon": "oyun",
    "kategori": "web20",
    "sure": "10–15 dk",
    "ozet": "Canlı bilgi yarışması, kelime oyunu, anket ve ortak sınıf panosu etkinlikleri hazırla.",
    "araclar": [
      {
        "id": "kahoot",
        "neden": "Sınıfı heyecanlandıran canlı bilgi yarışmaları için."
      },
      {
        "id": "wayground",
        "neden": "Öğrencilerin kendi hızında çözdüğü oyunlaştırılmış testler için."
      },
      {
        "id": "wordwall",
        "neden": "Tek bir kelime veya kavram listesini saniyeler içinde onlarca farklı oyuna çevirir."
      },
      {
        "id": "mentimeter",
        "neden": "Canlı anket, kelime bulutu ve hızlı görüş toplamak için."
      },
      {
        "id": "plickers",
        "neden": "Öğrencilerin elinde telefon ya da tablet olmadan kağıt kartlarla anında ölçme yapmak için."
      },
      {
        "id": "padlet",
        "neden": "Sınıfça ortak dijital pano doldurmak ve fikir toplamak için."
      }
    ],
    "adimlar": [
      "Etkinliğin amacını seç: derse ısınma, konu tekrarı, hızlı ölçme ya da fikir toplama.",
      "Soruları veya kavram eşleştirmelerini aşağıdaki promptla tablo biçiminde yapay zekâya yazdır.",
      "Tabloyu kontrol edip Kahoot, Wayground veya Wordwall'a doğrudan yapıştır.",
      "Sınıfta uygularken öğrencilerin gerçek adları yerine takma ad kullanmasını sağla."
    ],
    "prompt": "\"[Konu]\" konusunda [5.] sınıf için 10 soruluk canlı yarışma hazırla. Her soru en fazla 15 kelime, 4 seçenek en fazla 6 kelime olsun. Sonucu şu sütunlarla tablo yap: Soru, A, B, C, D, Doğru Cevap.",
    "promptlar": [
      {
        "baslik": "Canlı yarışma tablosu (Kahoot / Wayground)",
        "prompt": "\"[Konu]\" konusunda [5.] sınıf için 10 soruluk canlı yarışma hazırla. Her soru en fazla 15 kelime, 4 seçenek en fazla 6 kelime olsun. Sonucu şu sütunlarla tablo yap: Soru, A, B, C, D, Doğru Cevap."
      },
      {
        "baslik": "Kavram eşleştirme oyunu (Wordwall)",
        "prompt": "\"[Konu]\" konusunda [6.] sınıf düzeyinde eşleştirme oyununda kullanılacak 12 temel kavram ve karşısına en fazla 8 kelimelik net tanımlarını iki sütunlu tablo olarak yaz."
      },
      {
        "baslik": "Sınıf içi tartışma ve anket (Mentimeter / Padlet)",
        "prompt": "\"[Konu]\" dersinin başında öğrencilerin ön bilgilerini ve merakını harekete geçirecek 3 canlı anket sorusu, 1 kelime bulutu sorusu ve Padlet panosuna yazacakları 1 açık uçlu düşünme sorusu hazırla."
      }
    ],
    "kontrol": [
      "Soruların ve eşleştirmelerin doğruluğunu kendim kontrol ettim.",
      "Öğrenciler takma ad kullanıyor; tahtada gerçek isim görünmüyor.",
      "Ücretsiz planın katılımcı ya da etkinlik sınırını kontrol ettim."
    ]
  }
];
