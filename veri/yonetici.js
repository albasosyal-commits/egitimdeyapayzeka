/* Yönetim panelinin kullanıcı adı ve şifresi.

   Şifre burada düz metin değil, SHA-256 özeti olarak tutulur. Şifreyi
   değiştirmek için panelde Ayarlar > Şifre bölümünü kullan; panel yeni özeti
   hesaplayıp bu dosyayı günceller.

   ÖNEMLİ: Bu giriş, paneli yanlışlıkla açmayı engelleyen bir kilittir; gerçek
   bir güvenlik duvarı değildir. Site dosyalarını okuyabilen biri bu dosyayı da
   okur. Bu yüzden yonetim.html sayfasını herkese açık bir sunucuya koymayın;
   panel okulun kendi bilgisayarında kullanılmak için yapılmıştır. */
window.YONETICI = {
  kullanici: 'atabey',
  // 'atabey09atabey' şifresinin SHA-256 özeti
  sifreOzet: '0d9b89bf2965f65ab60d74f65b4e3d11c0b2a8ae92c968f1747a9fbfd6b0b3d4'
};
