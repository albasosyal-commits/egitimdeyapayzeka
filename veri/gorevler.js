/* Ana sayfadaki "Yapacağın işi seç" rehberleri. Panelin "Görev rehberleri" bölümünden düzenlenir.
   "araclar" içindeki id'ler veri/araclar.js dosyasındaki araçları gösterir. */
window.GOREVLER = [
  {
    "id": "sinav",
    "baslik": "Sınav ve soru hazırla",
    "ikon": "soru",
    "kategori": "metin",
    "sure": "10 dk",
    "ozet": "Kazanıma uygun test, açık uçlu soru ve cevap anahtarı.",
    "araclar": [
      {
        "id": "chatgpt",
        "neden": "Soru tarzını tek yönergeyle hızla değiştirir, cevap anahtarını yazar."
      },
      {
        "id": "gemini",
        "neden": "Google Formlar ile çalışıyorsan soruları kolayca aktarırsın."
      },
      {
        "id": "claude",
        "neden": "Uzun ders notlarından soru üretmekte iyidir."
      }
    ],
    "adimlar": [
      "Kendini ve sınıf düzeyini tanıt.",
      "Konuyu, soru sayısını ve zorluğu aşağıdaki promptta belirt.",
      "Ders kitabından bir bölüm varsa ekle; sorular ona dayansın.",
      "Soruları tek tek oku, hatalıları düzeltmesini iste.",
      "Son hâlini Google Formlar ya da Kahoot gibi bir araca aktar."
    ],
    "prompt": "Ben [5.] sınıf [Sosyal Bilgiler] öğretmeniyim. \"[Konu]\" konusunda 10 soruluk, 4 seçenekli bir test hazırla. Sorular kolaydan zora sıralansın; 3 kolay, 5 orta, 2 zor soru olsun. Çeldiriciler öğrencilerin yaptığı yaygın yanlışları yansıtsın. Sonuna cevap anahtarını ve her cevabın kısa gerekçesini ekle.",
    "kontrol": [
      "Her sorunun doğru cevabını kendim çözerek kontrol ettim.",
      "Sorular kazanıma ve sınıf düzeyine uygun.",
      "Tek bir doğru seçenek var; çeldiriciler anlamlı.",
      "Metinde öğrenci adı ya da kişisel bilgi yok."
    ]
  },
  {
    "id": "ders-plani",
    "baslik": "Ders planı ve etkinlik",
    "ikon": "plan",
    "kategori": "metin",
    "sure": "15 dk",
    "ozet": "Süreleri belli plan, grup etkinliği ve materyal listesi.",
    "araclar": [
      {
        "id": "chatgpt",
        "neden": "Etkinlik fikirlerini çoğaltmak ve planı biçimlendirmek için rahat."
      },
      {
        "id": "magicschool",
        "neden": "Ders planı için hazır, öğretmene özel form sunar."
      },
      {
        "id": "claude",
        "neden": "Uzun planları tutarlı biçimde düzenler."
      }
    ],
    "adimlar": [
      "Kazanımı müfredattan olduğu gibi kopyala.",
      "Sınıf mevcudunu ve imkânlarını (akıllı tahta, internet) belirt.",
      "İlk planı al, sınıfına uymayan yerleri söyleyerek düzelttir.",
      "Etkinlik yönergesini öğrencinin anlayacağı dile çevirt."
    ],
    "prompt": "Ben [5.] sınıf [Fen Bilimleri] öğretmeniyim. Kazanım: \"[kazanımı buraya yapıştır]\". Sınıfım [28] kişilik ve [akıllı tahta var, öğrencilerin tableti yok]. Bu kazanım için 40 dakikalık bir ders planı hazırla: giriş, etkinlik, değerlendirme ve kapanış bölümlerini sürelerle yaz. Etkinlik grup çalışması olsun. Gerekli materyalleri ve öğrenci yönergesini ayrıca belirt. Sonucu tablo olarak ver.",
    "kontrol": [
      "Plan, kazanımla ve müfredatla örtüşüyor.",
      "Süreler sınıfımın gerçek hızına uygun.",
      "Materyaller okulumda var.",
      "Etkinliği her öğrenci yapabilir."
    ]
  },
  {
    "id": "uyarlama",
    "baslik": "Metni seviyeye uyarla",
    "ikon": "katman",
    "kategori": "egitim",
    "sure": "5 dk",
    "ozet": "Aynı konuyu destek gereken ve ileri düzey öğrenciye göre yeniden yaz.",
    "araclar": [
      {
        "id": "diffit",
        "neden": "Metni seçilen düzeye uyarlamak için özel olarak tasarlandı."
      },
      {
        "id": "chatgpt",
        "neden": "Türkçe metinlerde düzeyi yönergeyle kolayca ayarlarsın."
      },
      {
        "id": "magicschool",
        "neden": "Farklılaştırma için hazır araçları var."
      }
    ],
    "adimlar": [
      "Kaynak metni hazırla ve öğrenci adı içermediğinden emin ol.",
      "Üç düzeyi aşağıdaki promptla iste.",
      "Terimlerin korunup korunmadığını kontrol et.",
      "Her düzeye uygun anlama soruları ekle."
    ],
    "prompt": "Aşağıdaki metni anlamını ve temel terimlerini koruyarak [6.] sınıf için üç ayrı okuma düzeyine uyarla: (1) okumada destek gereken öğrenci, (2) sınıf düzeyi, (3) ileri düzey. Her düzeyin sonuna 2 anlama sorusu ekle.\n\nMetin: [metni buraya yapıştır]",
    "kontrol": [
      "Bilgi hatası eklenmedi, anlam korundu.",
      "Destek düzeyi metni küçümseyici değil.",
      "Temel terimler her düzeyde var."
    ]
  },
  {
    "id": "belge",
    "baslik": "Uzun belge özetle",
    "ikon": "belge",
    "kategori": "metin",
    "sure": "10 dk",
    "ozet": "Kitap, rapor ya da PDF'ten özet, soru ve sesli özet çıkar.",
    "araclar": [
      {
        "id": "notebooklm",
        "neden": "Yalnızca yüklediğin kaynaklara dayanır ve kaynağını gösterir."
      },
      {
        "id": "claude",
        "neden": "Çok uzun metinlerle tutarlı çalışır."
      },
      {
        "id": "gemini",
        "neden": "Google Drive belgeleriyle doğrudan çalışır."
      }
    ],
    "adimlar": [
      "Belgede kişisel veri olmadığından emin ol.",
      "Belgeyi yeni bir not defterine ya da sohbete yükle.",
      "Aşağıdaki promptla özet iste.",
      "Önemli bilgileri belgedeki yerinden doğrula."
    ],
    "prompt": "Yüklediğim belgeye dayanarak: (1) Ana fikirleri 5 maddede özetle, (2) [8.] sınıf öğrencisinin bilmesi gereken 10 kavramı kısa tanımlarıyla listele, (3) belgeye dayalı 5 tartışma sorusu yaz. Belgede olmayan bilgi ekleme; her madde için belgenin ilgili bölümünü belirt.",
    "kontrol": [
      "Önemli bilgileri asıl belgeden doğruladım.",
      "Belgede öğrenci ya da veli bilgisi yoktu.",
      "Telif hakkı olan içeriği öğrencilerle paylaşmadan önce düşündüm."
    ]
  },
  {
    "id": "arastirma",
    "baslik": "Kaynaklı araştırma yap",
    "ikon": "arama",
    "kategori": "metin",
    "sure": "10 dk",
    "ozet": "Güncel bilgi bul, her iddianın kaynağını gör.",
    "araclar": [
      {
        "id": "perplexity",
        "neden": "Yanıtlarında kaynak bağlantılarını gösterir."
      },
      {
        "id": "gemini",
        "neden": "Ayrıntılı araştırma raporları hazırlayabilir."
      },
      {
        "id": "chatgpt",
        "neden": "Web aramasıyla kapsamlı özet çıkarabilir."
      }
    ],
    "adimlar": [
      "Sorunu dar tut: tarih aralığı ve konuyu belirt.",
      "Kaynak türünü belirt (resmî kurum, akademik yayın).",
      "Verilen bağlantıları açıp gerçekten orada yazdığını kontrol et."
    ],
    "prompt": "\"[Araştırma konusu]\" hakkında [son 5 yılı kapsayan] güvenilir bilgileri derle. Resmî kurumları ve akademik yayınları öncele. Her bilginin yanına kaynak bağlantısı ekle. Kaynaklar arasında çelişki varsa belirt. Sonucu [10.] sınıf öğretmeninin derste kullanabileceği 8 maddede özetle.",
    "kontrol": [
      "Kaynak bağlantılarını açtım; bilgi gerçekten orada yazıyor.",
      "Kaynaklar güncel ve güvenilir.",
      "Sayıları ve tarihleri ikinci bir kaynakla doğruladım."
    ]
  },
  {
    "id": "yazisma",
    "baslik": "Veli yazısı ve duyuru",
    "ikon": "mektup",
    "kategori": "metin",
    "sure": "5 dk",
    "ozet": "Veli bilgilendirmesi, resmî yazı ve okul duyurusu taslakları.",
    "araclar": [
      {
        "id": "chatgpt",
        "neden": "Tonu tek cümleyle resmîleştirir ya da samimileştirir."
      },
      {
        "id": "copilot",
        "neden": "Word ve Outlook içinde çalışıyorsan kullanışlıdır."
      },
      {
        "id": "gemini",
        "neden": "Gmail ve Google Dokümanlar ile uyumludur."
      }
    ],
    "adimlar": [
      "Yalnızca genel durumu anlat; öğrenci adı ve özel durum yazma.",
      "Tonu ve uzunluğu belirt.",
      "Taslağa adları ve ayrıntıları yapay zekânın dışında kendin ekle."
    ],
    "prompt": "\"[Konu: örneğin okul gezisi]\" hakkında velilere gönderilecek kısa, nazik ve anlaşılır bir bilgilendirme yazısı hazırla. Tarih, saat ve yer için [boşluk] bırak. En fazla 120 kelime olsun. Sonunda velilerin ne yapması gerektiğini tek cümleyle yaz.",
    "kontrol": [
      "Yapay zekâya öğrenci ya da veli bilgisi vermedim.",
      "Tarih, saat ve yer bilgileri doğru.",
      "Ton okulun kurumsal diline uygun."
    ]
  },
  {
    "id": "gorsel",
    "baslik": "Ders görseli ve afiş üret",
    "ikon": "resim",
    "kategori": "gorsel",
    "sure": "10 dk",
    "ozet": "Hayal edilemeyeni gösteren görseller, sınıf panosu ve afişler.",
    "araclar": [
      {
        "id": "canva",
        "neden": "Görseli üretip aynı yerde afişe dönüştürürsün."
      },
      {
        "id": "chatgpt",
        "neden": "Görseli sohbetle adım adım düzeltirsin."
      },
      {
        "id": "gemini",
        "neden": "Hızlı görsel üretir, sohbetle düzenler."
      },
      {
        "id": "ideogram",
        "neden": "Görsel üzerindeki yazılarda başarılıdır."
      }
    ],
    "adimlar": [
      "Önce metin yapay zekâsına fikrini anlat ve görsel promptu yazdır.",
      "Promptu görsel aracına yapıştır.",
      "Sonucu sohbetle düzelt: \"gökyüzünü mor yap\" gibi tek tek iste.",
      "Bilimsel ve tarihsel ayrıntıları kontrol et."
    ],
    "prompt": "Bilimsel illüstrasyon tarzında, yüksek yerçekimli ve çok kurak hayali bir gezegenin ekosistemini gösteren detaylı bir manzara oluştur. Yüzey çatlak topraklardan ve turuncu kumlardan oluşsun; soluk mor gökyüzünde iki küçük güneş olsun. Bitkiler bodur, kalın gövdeli ve sert yapraklı olsun. Hayvanlar yere yakın, çok bacaklı ve zırhlı görünsün. Görselde yazı olmasın.",
    "kontrol": [
      "Görselde bilimsel ya da tarihsel hata yok.",
      "Görselin yapay zekâ ile üretildiğini belirttim.",
      "Gerçek bir öğrencinin fotoğrafını kullanmadım.",
      "Yazılar varsa Türkçe karakterleri doğru."
    ]
  },
  {
    "id": "sunum",
    "baslik": "Sunum hazırla",
    "ikon": "sunum",
    "kategori": "egitim",
    "sure": "15 dk",
    "ozet": "Birkaç cümleden düzenli slaytlar; ardından kendi dokunuşun.",
    "araclar": [
      {
        "id": "gamma",
        "neden": "Metinden tasarımlı slayt destesini hızla üretir."
      },
      {
        "id": "canva",
        "neden": "Öğretmen hesabı ve hazır şablonlarıyla öne çıkar."
      },
      {
        "id": "notebooklm",
        "neden": "Yüklediğin kaynaklardan sunum üretir."
      }
    ],
    "adimlar": [
      "Önce yapay zekâya slayt başlıklarını yazdır ve onayla.",
      "Başlıkları sunum aracına yapıştır.",
      "Her slayttaki yazıyı azalt, kendi örneğini ekle.",
      "Bilgi ve görselleri kontrol et."
    ],
    "prompt": "\"[Konu]\" hakkında [7.] sınıf öğrencilerine anlatılacak [10] slaytlık bir sunum taslağı hazırla. Her slayt için başlık, en fazla 3 kısa madde ve önerilen görsel yaz. İlk slayt merak uyandıran bir soruyla başlasın, son slayt 3 tekrar sorusuyla bitsin.",
    "kontrol": [
      "Slaytlarda çok fazla yazı yok.",
      "Bilgiler ve tarihler doğru.",
      "Görseller konuyu doğru yansıtıyor."
    ]
  },
  {
    "id": "video",
    "baslik": "Kısa ders videosu üret",
    "ikon": "video",
    "kategori": "video",
    "sure": "30 dk",
    "ozet": "Metinden anlatımlı video ya da görselden kısa canlandırma.",
    "araclar": [
      {
        "id": "notebooklm",
        "neden": "Yüklediğin kaynaklardan video özet çıkarır; ücretsiz planla başlanır."
      },
      {
        "id": "canva",
        "neden": "Öğretmen hesabı ücretsiz; senaryoyu seslendirmeli videoya aynı yerde çevirirsin."
      },
      {
        "id": "kling",
        "neden": "Görseli kısa videoya dönüştürür, her gün ücretsiz kredi verir."
      },
      {
        "id": "runway",
        "neden": "Yaratıcı kısa sahneler ve düzenleme araçları sunar."
      }
    ],
    "adimlar": [
      "Önce metin yapay zekâsı ile 60-90 saniyelik senaryo yaz.",
      "Senaryoyu video aracına yapıştır.",
      "Ücretsiz kredini korumak için önce kısa bir deneme üret.",
      "Sesi, altyazıyı ve görüntülerdeki bilgileri kontrol et."
    ],
    "prompt": "\"[Konu]\" konusunu [6.] sınıf öğrencilerine anlatan 60 saniyelik bir video senaryosu yaz. Merak uyandıran bir soruyla başla. Her sahne için dış ses metnini ve ekranda görünecek görüntüyü iki ayrı başlıkta yaz. Dili sade olsun, sonunda öğrencilere tek bir düşünme sorusu sor.",
    "kontrol": [
      "Görüntülerde gerçeğe aykırı ayrıntı yok.",
      "Videonun yapay zekâ ile üretildiğini belirttim.",
      "Gerçek kişilerin yüzünü ya da sesini izinsiz kullanmadım.",
      "Türkçe seslendirme doğru okunuyor."
    ]
  },
  {
    "id": "ses",
    "baslik": "Seslendirme ve şarkı",
    "ikon": "nota",
    "kategori": "ses",
    "sure": "10 dk",
    "ozet": "Ders notunu dinlenir hâle getir, ezberlenecek şeyleri şarkı yap.",
    "araclar": [
      {
        "id": "suno",
        "neden": "Yazdığın sözlerden saniyeler içinde şarkı üretir."
      },
      {
        "id": "elevenlabs",
        "neden": "Metinleri doğal sesle Türkçe okur."
      },
      {
        "id": "notebooklm",
        "neden": "Belgeden sohbet tarzı sesli özet çıkarır."
      }
    ],
    "adimlar": [
      "Önce metin yapay zekâsına sözleri yazdır.",
      "Sözleri müzik aracına yapıştır, tarzı belirt.",
      "Şarkıyı dinle: Kavramlar doğru söyleniyor mu?",
      "Seslendirmede özel adların okunuşunu kontrol et."
    ],
    "prompt": "[4.] sınıf öğrencilerinin \"[Konu: örneğin gezegenlerin sırası]\" konusunu ezberlemesini sağlayacak, neşeli bir çocuk şarkısı sözü yaz. 2 kıta ve kolay tekrar edilen bir nakarat olsun. Bilgiler doğru sırada geçsin.",
    "kontrol": [
      "Sözlerdeki bilgiler doğru.",
      "Kullanım hakları koşullarına baktım (özellikle ücretsiz planda).",
      "Gerçek bir kişinin sesini izinsiz taklit etmedim."
    ]
  },
  {
    "id": "hikaye",
    "baslik": "Resimli hikâye kitabı",
    "ikon": "kitap",
    "kategori": "metin",
    "sure": "10 dk",
    "ozet": "Dakikalar içinde resimli ve seslendirilmiş hikâye kitabı.",
    "araclar": [
      {
        "id": "gemini",
        "neden": "Storybook özelliği metni, resimleri ve sesi birlikte üretir."
      },
      {
        "id": "canva",
        "neden": "Hikâyeyi yazdırılabilir kitapçığa dönüştürmek için uygun."
      },
      {
        "id": "bookcreator",
        "neden": "Öğrenciler kendi dijital kitaplarını yazabilir."
      }
    ],
    "adimlar": [
      "Hikâyenin kahramanını, yerini ve vermek istediğin mesajı belirle.",
      "Gerçek öğrenci adı kullanma; hayali kahraman seç.",
      "Sayfaları oku, tutarsız yerleri düzelttir.",
      "Çıktıyı paylaş ya da yazdır."
    ],
    "prompt": "[Birinci] sınıfa yeni başlayacak bir çocuk için [8] sayfalık, resimli bir hikâye kitabı yaz. Hikâye [Aydın]'da geçsin. Kahramanın adı [Deniz] olsun. Mesajı \"[yeni başlangıçlar heyecan vericidir]\" olsun. Dili yaşına uygun, cümleleri kısa olsun.",
    "kontrol": [
      "Hikâye yaş düzeyine uygun.",
      "Gerçek öğrencilerin adlarını kullanmadım.",
      "Metin ile resimler birbiriyle uyumlu."
    ]
  },
  {
    "id": "oyun",
    "baslik": "Sınıf içi etkileşim",
    "ikon": "grup",
    "kategori": "web20",
    "sure": "15 dk",
    "ozet": "Yarışma, anket, oyun, etkileşimli sunum ve sınıf panosu; soruları yapay zekâya yazdır.",
    "araclar": [
      {
        "id": "kahoot",
        "neden": "Sınıfı ayağa kaldıran canlı yarışmalar için."
      },
      {
        "id": "wayground",
        "neden": "Öğrencilerin kendi hızında çözdüğü testler için."
      },
      {
        "id": "wordwall",
        "neden": "Tek kelime listesini onlarca oyuna çevirir."
      },
      {
        "id": "mentimeter",
        "neden": "Canlı anket ve kelime bulutu için."
      },
      {
        "id": "plickers",
        "neden": "Öğrencilerin telefonu ya da tableti gerekmez."
      },
      {
        "id": "curipod",
        "neden": "Konu yazdığında içinde anket olan etkileşimli ders sunumu üretir."
      },
      {
        "id": "padlet",
        "neden": "Sınıfça ortak pano doldurmak ve fikir toplamak için."
      },
      {
        "id": "classroomscreen",
        "neden": "Sayaç, gürültü ölçer ve rastgele seçici ile ders akışını yönetmek için."
      }
    ],
    "adimlar": [
      "Etkinliğin amacını seç: ısınma, tekrar, ölçme ya da fikir toplama.",
      "Soruları ya da kelime listesini yapay zekâya yazdır; \"Sınav ve soru hazırla\" rehberindeki promptu da kullanabilirsin.",
      "Soruları tek tek oku ve doğruluğunu kontrol et.",
      "Amacına uygun aracı seç: canlı yarışma için Kahoot, kendi hızında çözme için Wayground, oyun için Wordwall, anket için Mentimeter.",
      "Soruları araca yapıştır; çoğu araç tablo ya da düz metin yapıştırmayı kabul eder.",
      "Öğrencilere gerçek adı yerine takma ad kullandır.",
      "Etkinlik bitince sonuç ekranından hangi soruların yanlış gittiğine bak; bir sonraki dersin tekrar konusu odur."
    ],
    "prompt": "\"[Konu]\" konusunda [5.] sınıf için 10 soruluk canlı yarışma hazırla. Her soru en fazla 15 kelime, 4 seçenek en fazla 6 kelime olsun. Sonucu şu sütunlarla tablo yap: Soru, A, B, C, D, Doğru Cevap.",
    "kontrol": [
      "Soruların doğruluğunu kendim kontrol ettim.",
      "Öğrenciler takma ad kullanıyor; ekranda gerçek isim görünmüyor.",
      "Hesap gerektiren araçlarda okul iznini ve yaş sınırını kontrol ettim.",
      "Ücretsiz plan sınırını (katılımcı ya da etkinlik sayısı) aşmıyorum."
    ]
  }
];
