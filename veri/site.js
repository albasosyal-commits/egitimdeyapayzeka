/* Sitenin genel ayarları. Okul adını, site adını ve logoyu buradan değiştirebilirsiniz. */
window.SITE = {
  ad: 'Öğretmenin Yapay Zekâ Rehberi',
  okul: 'Özel Ege Atabey Okulları Dijital',
  // Logo eklemek için dosyayı "assets" klasörüne koyun ve yolunu yazın. Örnek: 'assets/logo.png'
  logo: '',
  siniflar: ['1.', '2.', '3.', '4.', '5.', '6.', '7.', '8.', '9.', '10.', '11.', '12.'],
  kategoriler: {
    metin: { ad: 'Metin', baslik: 'Metin ve sohbet', aciklama: 'Soru sor, plan yaz, soru hazırla, belge özetle.' },
    gorsel: { ad: 'Görsel', baslik: 'Görsel üretim', aciklama: 'Anlattığın sahneyi resme dönüştür.' },
    video: { ad: 'Video', baslik: 'Video üretim', aciklama: 'Metinden ya da görselden kısa video oluştur.' },
    ses: { ad: 'Ses', baslik: 'Ses ve müzik', aciklama: 'Metni seslendir, ders şarkısı üret.' },
    egitim: { ad: 'Öğretmene özel', baslik: 'Öğretmenler için yapılmış araçlar', aciklama: 'Doğrudan sınıf işleri için tasarlandı.' },
    web20: { ad: 'Web 2.0', baslik: 'Web 2.0 araçları', aciklama: 'Yarışma, anket, kavram haritası ve sınıf yönetimi.' }
  },
  ucretler: {
    ucretsiz: 'Ücretsiz',
    ogretmen: 'Öğretmene ücretsiz',
    kismen: 'Ücretsiz + ücretli plan',
    ucretli: 'Ücretli'
  }
};
