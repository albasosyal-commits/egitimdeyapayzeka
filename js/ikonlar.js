/* Görev kartlarının ikonları. Hepsi aynı kalemle çizilmiş 24x24 SVG'lerdir;
   rengi bulundukları yerden alırlar.

   Yeni bir ikon eklemek için aşağıya bir satır yaz; yönetim panelindeki ikon
   seçiciye kendiliğinden düşer. Anahtar adı yalnızca küçük harf ve tire olsun. */
window.IKONLAR = {
  soru: '<circle cx="12" cy="12" r="9"/><path d="M9.2 9.4a2.9 2.9 0 1 1 3.7 2.8c-.6.2-.9.7-.9 1.3v.6"/><circle cx="12" cy="17.2" r=".95" fill="currentColor" stroke="none"/>',
  plan: '<rect x="4.5" y="4.5" width="15" height="16" rx="2.5"/><path d="M9 4.5v-.7A1.8 1.8 0 0 1 10.8 2h2.4A1.8 1.8 0 0 1 15 3.8v.7"/><path d="M8.5 10h7M8.5 13.5h7M8.5 17h4.5"/>',
  katman: '<path d="M12 2.5 2.5 7 12 11.5 21.5 7 12 2.5Z"/><path d="m2.5 12 9.5 4.5 9.5-4.5"/><path d="m2.5 17 9.5 4.5 9.5-4.5"/>',
  belge: '<path d="M14 2.5H7.5a2 2 0 0 0-2 2v15a2 2 0 0 0 2 2h9a2 2 0 0 0 2-2V7l-4.5-4.5Z"/><path d="M14 2.5V7h4.5"/><path d="M8.5 12.5h7M8.5 16h5"/>',
  arama: '<circle cx="11" cy="11" r="6.5"/><path d="m15.8 15.8 4.7 4.7"/>',
  mektup: '<rect x="2.5" y="5" width="19" height="14" rx="2"/><path d="m3.2 7 8.8 6 8.8-6"/>',
  resim: '<rect x="3" y="4.5" width="18" height="15" rx="2"/><circle cx="8.5" cy="10" r="1.8"/><path d="m3.6 17.4 5.4-4.6 4 3.4 3-2.4 4.4 3.6"/>',
  sunum: '<rect x="3" y="3.5" width="18" height="12.5" rx="2"/><path d="M12 16v3"/><path d="m8.3 21.5 3.7-2.5 3.7 2.5"/><path d="M8 12.5v-3M12 12.5v-5M16 12.5v-2"/>',
  video: '<rect x="2.5" y="4.5" width="19" height="15" rx="2.5"/><path d="m10 9.2 5 2.8-5 2.8V9.2Z"/>',
  nota: '<path d="M9 17.5V5.4l10-2v12.1"/><circle cx="6.5" cy="17.8" r="2.6"/><circle cx="16.4" cy="15.5" r="2.6"/>',
  kitap: '<path d="M12 6.6S10 4.5 6.2 4.5H3v13h3.4c3.6 0 5.6 2 5.6 2s2-2 5.6-2H21v-13h-3.2C14 4.5 12 6.6 12 6.6Z"/><path d="M12 6.6v12.9"/>',
  oyun: '<rect x="2.5" y="7" width="19" height="10.5" rx="5.2"/><path d="M7.2 10.4v4.2M5.1 12.5h4.2"/><circle cx="15.8" cy="11.4" r="1.15" fill="currentColor" stroke="none"/><circle cx="18.2" cy="14" r="1.15" fill="currentColor" stroke="none"/>',
  tahta: '<rect x="3" y="3.5" width="18" height="13" rx="1.8"/><path d="M12 16.5v4M8 20.5h8"/><path d="M6.8 7.6h7M6.8 11.2h4"/>',
  ampul: '<path d="M9.2 17.4h5.6M10.2 20.4h3.6"/><path d="M8.1 13.4a5.6 5.6 0 1 1 7.8 0c-.9 1-1.4 2-1.5 3.2h-4.8c-.1-1.2-.6-2.2-1.5-3.2Z"/>',
  tablo: '<rect x="3" y="4.5" width="18" height="15" rx="2"/><path d="M3 9.6h18M3 14.6h18M9.2 9.6v10"/>',
  takvim: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10.2h18M8 3v4M16 3v4"/><circle cx="8.6" cy="14.4" r="1" fill="currentColor" stroke="none"/><circle cx="12" cy="14.4" r="1" fill="currentColor" stroke="none"/>',
  konusma: '<path d="M20.5 12.3a7.5 7.5 0 0 1-10.9 6.7L4.2 20.8l1.5-4.8A7.5 7.5 0 1 1 20.5 12.3Z"/><path d="M9 11.5h6M9 14.5h3.5"/>',
  mikrofon: '<rect x="9" y="2.5" width="6" height="11.5" rx="3"/><path d="M5.6 11.6a6.4 6.4 0 0 0 12.8 0"/><path d="M12 18v3.4M8.6 21.4h6.8"/>',
  kalem: '<path d="m16.4 3.4 4.2 4.2L8.2 20H4v-4.2L16.4 3.4Z"/><path d="m13.8 6 4.2 4.2"/>',
  harita: '<path d="M12 21.4s7-6.2 7-11.1a7 7 0 1 0-14 0c0 4.9 7 11.1 7 11.1Z"/><circle cx="12" cy="10.2" r="2.8"/>',
  saat: '<circle cx="12" cy="12" r="9"/><path d="M12 6.6V12l3.6 2.2"/>',
  yildiz: '<path d="m12 3 2.85 5.75 6.35.92-4.6 4.47 1.09 6.31L12 17.47 6.31 20.45 7.4 14.14 2.8 9.67l6.35-.92L12 3Z"/>',
  grup: '<circle cx="9.2" cy="8" r="3.6"/><path d="M2.6 20.2c0-3.65 2.95-6.6 6.6-6.6s6.6 2.95 6.6 6.6"/><path d="M16.6 5.2a3.6 3.6 0 0 1 0 6.8"/><path d="M18.2 13.9c2.05.85 3.4 2.9 3.4 5.2"/>',
  kontrol: '<path d="M9.5 5.5h10M9.5 12h10M9.5 18.5h10"/><path d="m3.2 5.4 1.4 1.4 2.3-2.7M3.2 11.9l1.4 1.4 2.3-2.7M3.2 18.4l1.4 1.4 2.3-2.7"/>',
  hedef: '<circle cx="12" cy="12" r="8.6"/><circle cx="12" cy="12" r="4.6"/><circle cx="12" cy="12" r="1.1" fill="currentColor" stroke="none"/>',
  kupa: '<path d="M7 4.5h10v5.2a5 5 0 0 1-10 0V4.5Z"/><path d="M7 6.6H4.5v1.6a3 3 0 0 0 3 3M17 6.6h2.5v1.6a3 3 0 0 1-3 3"/><path d="M12 14.7v2.9"/><path d="m8.4 20.6.9-3h5.4l.9 3H8.4Z"/>',
  pusula: '<circle cx="12" cy="12" r="9"/><path d="m15.6 8.4-2.1 5.1-5.1 2.1 2.1-5.1 5.1-2.1Z"/>',
  cark: '<circle cx="12" cy="12" r="3.3"/><path d="M12 2.5v3M12 18.5v3M21.5 12h-3M5.5 12h-3M18.7 5.3l-2.1 2.1M7.4 16.6l-2.1 2.1M18.7 18.7l-2.1-2.1M7.4 7.4 5.3 5.3"/>',
  bulut: '<path d="M7.4 18.5A4.4 4.4 0 0 1 7 9.8a5.8 5.8 0 0 1 11.1 1.4 3.7 3.7 0 0 1-.6 7.3H7.4Z"/>',
  kalp: '<path d="M12 20.3s-7.8-4.6-7.8-9.8a4.5 4.5 0 0 1 7.8-3.05A4.5 4.5 0 0 1 19.8 10.5c0 5.2-7.8 9.8-7.8 9.8Z"/>'
};

/* Bir ikonu hazır SVG olarak verir. Anahtar bulunamazsa yıldız çizilir. */
window.ikonCiz = function (ad) {
  var ic = window.IKONLAR[ad] || window.IKONLAR.yildiz;
  return '<svg class="ikon" viewBox="0 0 24 24" fill="none" stroke="currentColor" ' +
    'stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">' +
    ic + '</svg>';
};
