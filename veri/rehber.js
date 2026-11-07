/* Prompt Atölyesi, Güvenli Kullanım ve Yeni Başlayanlar sayfalarının metinleri.
   Metinleri değiştirmek için doğrudan burayı düzenleyebilirsin; yapıyı (anahtar adlarını) bozmamaya dikkat et. */
window.REHBER = {

  /* ------------------------- PROMPT ATÖLYESİ ------------------------- */

  promptFormul: [
    { id: 'rol', ad: 'Kim soruyor', aciklama: 'Branşını ve sınıf düzeyini söyle. Yapay zekâ cevabın kime gideceğini bilsin.' },
    { id: 'gorev', ad: 'Ne istiyorsun', aciklama: 'Tek bir iş söyle ve sayı ver: 10 soru, 8 slayt, 3 etkinlik.' },
    { id: 'hedef', ad: 'Kim için', aciklama: 'Dil ve örneklerin hangi yaşa uygun olacağını belirt.' },
    { id: 'bicim', ad: 'Hangi biçimde', aciklama: 'Tablo mu, madde mi, akıcı metin mi? Söylemezsen uzun paragraf yazar.' },
    { id: 'sinir', ad: 'Neyi yapmasın', aciklama: 'Uydurmasın, kaynak göstersin, isim kullanmasın gibi sınırları yaz.' }
  ],

  promptOrnek: {
    zayif: 'Kesirler konusunda soru hazırla.',
    zayifNeden: 'Kaç soru, hangi sınıf, hangi zorlukta, hangi biçimde belli değil. Sonuç: her sınıfa uyan ama hiçbir sınıfa yetmeyen genel bir liste.',
    guclu: [
      ['rol', 'Ben 5. sınıf Matematik öğretmeniyim.'],
      ['gorev', 'Kesirlerde toplama konusunda 10 soruluk, 4 seçenekli bir test hazırla; 3 kolay, 5 orta, 2 zor olsun.'],
      ['hedef', 'Soruları 5. sınıf öğrencisinin okuyup anlayacağı kısa cümlelerle yaz, günlük yaşamdan örnek kullan.'],
      ['bicim', 'Sonucu tablo olarak ver; son sütun cevap anahtarı olsun.'],
      ['sinir', 'Her sorunun tek doğru cevabı olsun; emin olmadığın bilgiyi uydurma.']
    ]
  },

  /* ------------------------- GÜVENLİ KULLANIM ------------------------- */

  guvenlik: {
    giris: 'Yapay zekâ öğretmenin işini hafifletir ama sorumluluğu devretmez. Sınıfa giren her çıktı senin imzanı taşır. Bu sayfada iki şey var: yapay zekâya ne verilmeyeceği ve çıktıyı sınıfa götürmeden önce ne kontrol edileceği.',
    yapma: [
      'Öğrenci adı, soyadı, okul numarası ya da fotoğrafı.',
      'Öğrenci notları, devamsızlık dökümü ya da sınav kâğıdı taraması.',
      'Sağlık, tanı, ilaç ya da rehberlik görüşme notları.',
      'Veli adı, telefon numarası, adres ya da e-posta bilgisi.',
      'Aile durumu, ekonomik durum ya da inanç bilgisi gibi özel nitelikli veriler.',
      'Kuruma ait yayımlanmamış sınav soruları ve resmî yazışmalar.'
    ],
    yap: [
      'İsim yerine köşeli parantez kullan: "[Öğrenci Adı] son haftalarda ödevlerini getirmiyor."',
      'Durumu genelleştir: "Sınıfımda okuma hızı düşük bir grup var" demek yeterlidir.',
      'Notları sayı olarak değil, düzey olarak anlat: "yarısı konuyu anlamadı".',
      'Kişisel bilgiyi yapay zekâdan aldığın taslağa sonradan, kendi bilgisayarında ekle.',
      'Belgeyi yüklemeden önce isim sütununu sil ya da anonimleştir.',
      'Mümkünse okul hesabıyla gir: kurumsal hesaplarda veri koruması daha güçlüdür.'
    ],
    ilkeler: [
      { baslik: 'Son söz öğretmenin', metin: 'Yapay zekâ taslak üretir, kararı sen verirsin. Not vermek, öğrenciyi değerlendirmek ve velisiyle konuşmak devredilemez.' },
      { baslik: 'Uydurabilir', metin: 'Yapay zekâ emin olmadığında da kendinden emin yazar. Kaynak, tarih, sayı ve isimleri mutlaka doğrula.' },
      { baslik: 'Şeffaf ol', metin: 'Yapay zekâ ile üretilen görsel, video ve metni öğrencilere söyle. Bu da bir dijital okuryazarlık dersidir.' },
      { baslik: 'Önyargı taşır', metin: 'Örnekler ve görseller belirli kültürleri ve cinsiyet rollerini öne çıkarabilir. Sınıfının çeşitliliğini yansıtıp yansıtmadığına bak.' },
      { baslik: 'Veri kalır', metin: 'Yazdığın her şey o şirketin sunucusuna gider. Silmek her zaman mümkün olmaz; girmemek en güvenli yoldur.' }
    ],
    kontrol: [
      'Bilgileri, tarihleri ve sayıları ikinci bir kaynaktan doğruladım.',
      'Metinde öğrenci, veli ya da çalışan bilgisi kalmadı.',
      'Dil ve örnekler sınıf düzeyine uygun; kültürel olarak sakıncalı bir şey yok.',
      'Görsel ve videodaki ayrıntılar gerçeğe uygun (parmak, yazı, harita, kıyafet).',
      'Yapay zekâ ile üretildiğini belirtmem gereken yerleri belirttim.',
      'Telif hakkı olan içeriği izinsiz çoğaltmıyorum.',
      'Öğrencilerin kullanacağı araçta yaş sınırını ve okul iznini kontrol ettim.'
    ],
    yasNot: 'Çoğu yapay zekâ aracı 13 yaş altı kullanıcıyı kabul etmez; birçoğu 18 yaş altı için veli onayı ister. Bu yüzden ilkokulda ve ortaokulda araç genellikle öğretmen tarafından, tahtada ve öğretmen hesabıyla kullanılır. Öğrenciye hesap açtıracaksan önce okul yönetiminin iznini ve veli bilgilendirmesini tamamla.',
    kaynaklar: [
      { ad: 'Kişisel Verileri Koruma Kurumu (KVKK)', url: 'https://www.kvkk.gov.tr', not: 'Öğrenci ve veli verilerinin korunmasıyla ilgili resmî çerçeve.' },
      { ad: 'Millî Eğitim Bakanlığı', url: 'https://www.meb.gov.tr', not: 'Okullarda teknoloji kullanımına dair güncel yönerge ve duyurular.' },
      { ad: 'EBA', url: 'https://www.eba.gov.tr', not: 'Bakanlığın öğretmen ve öğrenci içerik platformu.' },
      { ad: 'UNESCO – Eğitimde üretken yapay zekâ rehberi', url: 'https://www.unesco.org', not: 'Okullarda yapay zekâ kullanımı için uluslararası ilkeler.' },
      { ad: 'Avrupa Komisyonu – Dijital Eğitim', url: 'https://education.ec.europa.eu', not: 'Öğretmenler için yapay zekâ ve veri etiği rehberleri.' },
      { ad: 'Cumhurbaşkanlığı Dijital Dönüşüm Ofisi', url: 'https://cbddo.gov.tr', not: 'Ulusal Yapay Zekâ Stratejisi ve kamu kurumlarına yönelik ilkeler.' }
    ]
  },

  /* ------------------------- YENİ BAŞLAYANLAR ------------------------- */

  baslangic: {
    giris: 'Hiç kullanmadıysan doğru yerdesin. Yapay zekâ bir arama motoru değil; işini anlattığın, anlamadığında soru soran bir stajyer gibi düşün. Aşağıdaki 30 dakikada ilk gerçek işini çıkaracaksın.',
    adimlar: [
      'Bir metin aracı seç. Google hesabın varsa Gemini, yoksa ChatGPT en kolay başlangıçtır.',
      'Hesabını aç ve sohbet ekranını tanı: tek bir yazı kutusu göreceksin, orası her şeyin yeri.',
      'Aşağıdaki ilk promptu kopyala, kendi branşına göre köşeli parantezleri değiştir ve gönder.',
      'Gelen cevabı sıfırdan yazdırmaya çalışma. "Üçüncü soruyu zorlaştır", "daha kısa yaz" gibi tek cümlelik düzeltmeler yaz.',
      'Sonucu kopyalayıp Word ya da Google Dokümanlar’a al; son biçimlendirmeyi kendin yap.',
      'Her cümleyi oku. Hata bulursan düzelttir; bulamıyorsan bile sayıları ve tarihleri kontrol et.',
      'Hazır olduğunda "Yapacağın işi seç" bölümünden kendi işine uygun rehbere geç.'
    ],
    ilkPrompt: 'Ben [5.] sınıf [Sosyal Bilgiler] öğretmeniyim. "[Konu]" konusunu öğrencilerime anlatacağım. (1) Konuyu günlük yaşamdan örneklerle 150 kelimede açıkla. (2) Derse başlarken soracağım, merak uyandıran 3 soru yaz. (3) Öğrencilerin bu konuda en sık yaptığı 3 hatayı belirt. Sonucu başlıklar hâlinde ver.',
    turler: [
      {
        ad: 'Metinden metin',
        en: 'text to text',
        aciklama: 'Yazarsın, yazı alırsın. Plan, soru, özet, yazışma ve geri bildirim işlerinin tamamı burada yapılır. Öğretmenin en çok kullandığı tür budur.',
        araclar: ['chatgpt', 'gemini', 'claude', 'copilot']
      },
      {
        ad: 'Metinden görsel',
        en: 'text to image',
        aciklama: 'Sahneyi anlatırsın, resim alırsın. Hayal edilmesi zor olanı (hücre içi, hayali gezegen, tarihî ortam) göstermek için kullanılır.',
        araclar: ['canva', 'ideogram', 'leonardo', 'firefly']
      },
      {
        ad: 'Metinden ya da görselden video',
        en: 'text / image to video',
        aciklama: 'Senaryo ya da tek bir görsel verirsin, kısa video alırsın. Krediler çabuk tükendiği için 10-60 saniyelik parçalarla çalışılır.',
        araclar: ['canva', 'kling', 'runway', 'veo']
      },
      {
        ad: 'Metinden ses',
        en: 'text to speech / music',
        aciklama: 'Yazıyı sese ya da şarkıya çevirir. Dinleyerek öğrenen öğrenciler ve ezber konuları için çok etkilidir.',
        araclar: ['elevenlabs', 'suno', 'notebooklm']
      },
      {
        ad: 'Belgeden bilgi',
        en: 'document to answer',
        aciklama: 'Kendi dosyanı yüklersin, yalnızca o dosyaya dayanan cevap alırsın. Uydurma riski en düşük çalışma biçimidir.',
        araclar: ['notebooklm', 'claude', 'mapify']
      },
      {
        ad: 'Öğretmen için hazır araçlar',
        en: 'purpose-built for teachers',
        aciklama: 'Prompt yazmayı hiç öğrenmek istemiyorsan buradan başla: form doldurursun, çıktı hazır gelir.',
        araclar: ['magicschool', 'diffit', 'gamma', 'questionwell']
      }
    ],
    terimler: [
      ['Prompt', 'Yapay zekâya yazdığın yönerge. Ne kadar açık olursa sonuç o kadar işine yarar.'],
      ['Model', 'Yapay zekânın arkasındaki sistem. Aynı aracın hızlı ve güçlü gibi farklı modelleri olabilir.'],
      ['Üretken yapay zekâ', 'Var olanı bulmak yerine yeni metin, görsel ya da ses üreten yapay zekâ türü.'],
      ['Halüsinasyon', 'Yapay zekânın olmayan bir bilgiyi emin bir dille uydurması. En sık kaynak, tarih ve sayıda görülür.'],
      ['Jeton / kredi', 'Üretim hakkı. Ücretsiz planlarda günlük ya da aylık sınırlıdır, çoğu gece yenilenir.'],
      ['Bağlam penceresi', 'Aracın bir seferde akılda tutabildiği metin miktarı. Dolunca sohbetin başını unutur; uzun işte yeni sohbet aç.'],
      ['Klonlama', 'Bir kişinin sesini ya da yüzünü taklit etmek. İzinsiz yapılması hukuken suç oluşturur.'],
      ['Filigran', 'Ücretsiz planlarda çıktıya basılan şirket logosu ya da yazısı.'],
      ['Deşifre (transkript)', 'Ses ya da videonun yazıya dökülmüş hâli.'],
      ['Anonimleştirme', 'Kişiyi tanınmaz hâle getirmek için ad, numara gibi bilgileri silmek ya da değiştirmek.']
    ]
  }
};
