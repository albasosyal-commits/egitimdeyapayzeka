/* Sitenin genel ayarları, menü yapısı, sayfa yerleşimleri, aç/kapa anahtarları ve metinleri.
   Yönetim panelindeki "Sayfalar ve yerleşim" ile "Site ayarları" bölümlerinden düzenlenir. */
window.SITE = {
  "ad": "Öğretmenin Yapay Zekâ Rehberi",
  "okul": "Özel Ege Atabey Okulları Dijital",
  "logo": "assets/ikon.svg",
  "paylasimGorsel": "assets/og-banner.png",
  "siniflar": [
    "1.",
    "2.",
    "3.",
    "4.",
    "5.",
    "6.",
    "7.",
    "8.",
    "9.",
    "10.",
    "11.",
    "12."
  ],
  "menu": [
    { "id": "gorev", "ad": "Görevler", "adres": "#/", "durum": "acik" },
    { "id": "araclar", "ad": "Araçlar", "adres": "#/araclar", "durum": "acik" },
    { "id": "prompt", "ad": "Prompt Atölyesi", "adres": "#/prompt", "durum": "acik" },
    { "id": "guvenli", "ad": "Güvenli Kullanım", "adres": "#/guvenli", "durum": "acik" },
    { "id": "baslangic", "ad": "Yeni Başlayanlar", "adres": "#/baslangic", "durum": "acik" }
  ],
  "gorunum": {
    "aiArkaplan": "acik",
    "aiYogunluk": "normal",
    "camEfekt": "acik",
    "ustMenu": "acik",
    "altBilgi": "acik",
    "altPanelBaglanti": "acik",
    "altPanelYazi": "Yönetim paneli",
    "altNot": ""
  },
  "anasayfa": {
    "sira": [
      "defter",
      "serit",
      "gorevler",
      "aliskanliklar"
    ],
    "defterAcik": "acik",
    "ustEtiketAcik": "acik",
    "ustEtiket": "",
    "baslik": "Bugün ne hazırlıyorsun?",
    "giris": "Yapacağın işi seç. Hangi yapay zekâyı açacağını, ne yazacağını ve neyi kontrol edeceğini adım adım gösterelim.",
    "aramaAcik": "acik",
    "aramaYerTutucu": "Araç ya da iş ara: sınav, şarkı, Gemini…",
    "aramaDugme": "Ara",
    "sayilarAcik": "acik",
    "slaytAcik": "kapali",
    "slaytEtiket": "ÖNE ÇIKAN ARAÇ",
    "slaytKutuBaslik": "✦ Sınıfta ne işe yarar?",
    "slaytBaglantiYazi": "Rehberi ve promptu aç",
    "seritAcik": "acik",
    "seritEtiket": "Vitrin & Yeni Araçlar",
    "gorevlerAcik": "acik",
    "gorevlerBaslik": "Yapacağın işi seç",
    "gorevlerBaglantiAcik": "acik",
    "gorevlerBaglantiYazi": "Tüm araçları gör",
    "aliskanliklarAcik": "acik",
    "aliskanliklarBaslik": "Araçtan önce üç alışkanlık",
    "aliskanliklar": [
      {
        "no": "1",
        "baslik": "Aracın türünü bil",
        "metin": "Metinden görsele, görselden videoya: işin için doğru türü seç.",
        "adres": "#/baslangic"
      },
      {
        "no": "2",
        "baslik": "İyi prompt yaz",
        "metin": "Sınıf düzeyini, amacı ve biçimi söyle. Atölyede hazır formülle dene.",
        "adres": "#/prompt"
      },
      {
        "no": "3",
        "baslik": "Çıktıyı kontrol et",
        "metin": "Yapay zekâ yanılabilir. Öğrenci bilgisi girme, sonucu sınıfa götürmeden doğrula.",
        "adres": "#/guvenli"
      }
    ]
  },
  "sayfalar": {
    "araclar": {
      "baslik": "Araç rehberi",
      "giris": "Ücreti, yaş sınırı ve öğretmene faydası bir bakışta. Bir araca tıklayınca hazır prompt ve dikkat edilecekleri görürsün.",
      "aramaAcik": "acik",
      "aramaYerTutucu": "Ara: sunum, seslendirme, Kahoot…",
      "kategoriFiltreAcik": "acik",
      "ucretFiltreAcik": "acik",
      "kapananAcik": "acik"
    },
    "prompt": {
      "baslik": "Prompt Atölyesi",
      "giris": "Prompt, yapay zekâya ne istediğini anlatan yönergedir. Ne kadar açık yazarsan sonuç o kadar işine yarar: iyi bir prompt, yeni bir öğretmen stajyere verilen iyi bir talimat gibidir.",
      "kiyasAcik": "acik",
      "kiyasBaslik": "Aynı istek, iki farklı sonuç",
      "formulAcik": "acik",
      "formulBaslik": "Güçlü promptun beş parçası",
      "atolyeAcik": "acik",
      "atolyeBaslik": "Kendi promptunu oluştur",
      "atolyeAlt": "Formu doldur, prompt yanda yazılsın. Kopyala ve istediğin yapay zekâya yapıştır.",
      "hazirAcik": "acik",
      "hazirBaslik": "Hazır promptlar",
      "hazirAlt": "İşe göre seçip kopyala."
    },
    "guvenli": {
      "baslik": "Güvenli kullanım",
      "yapYapmaAcik": "acik",
      "yapmaBaslik": "Yapay zekâya girme",
      "yapBaslik": "Bunun yerine",
      "ilkelerAcik": "acik",
      "ilkelerBaslik": "Beş temel ilke",
      "kontrolAcik": "acik",
      "kontrolBaslik": "Sınıfa götürmeden önce",
      "yasAcik": "acik",
      "yasBaslik": "Araçların yaş sınırları",
      "kaynaklarAcik": "acik",
      "kaynaklarBaslik": "Resmî kaynaklar"
    },
    "baslangic": {
      "baslik": "Yapay zekâya yeni mi başlıyorsun?",
      "adimlarAcik": "acik",
      "adimlarBaslik": "İlk 30 dakikan",
      "turlerAcik": "acik",
      "turlerBaslik": "Yapay zekâ türleri",
      "turlerAlt": "Tür, verdiğin şey ile aldığın şeye göre adlandırılır.",
      "terimlerAcik": "acik",
      "terimlerBaslik": "Sık duyacağın kelimeler"
    }
  },
  "kategoriler": {
    "metin": { "ad": "Metin", "baslik": "Metin ve sohbet", "aciklama": "Soru sor, plan yaz, soru hazırla, belge özetle." },
    "gorsel": { "ad": "Görsel", "baslik": "Görsel üretim", "aciklama": "Anlattığın sahneyi resme dönüştür." },
    "video": { "ad": "Video", "baslik": "Video üretim", "aciklama": "Metinden ya da görselden kısa video oluştur." },
    "ses": { "ad": "Ses", "baslik": "Ses ve müzik", "aciklama": "Metni seslendir, ders şarkısı üret." },
    "egitim": { "ad": "Öğretmene özel", "baslik": "Öğretmenler için yapılmış araçlar", "aciklama": "Doğrudan sınıf işleri için tasarlandı." },
    "web20": { "ad": "Web 2.0", "baslik": "Web 2.0 araçları", "aciklama": "Yarışma, anket, kavram haritası ve sınıf yönetimi." }
  },
  "ucretler": {
    "ucretsiz": "Ücretsiz",
    "ogretmen": "Öğretmene ücretsiz",
    "kismen": "Ücretsiz + ücretli plan",
    "ucretli": "Ücretli"
  }
};
