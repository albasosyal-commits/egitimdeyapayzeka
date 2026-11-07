/* veri/tema.js içindeki renkleri sayfaya uygular.
   Hem site hem yönetim paneli bu dosyayı kullanır, böylece panelde gördüğün
   renkler sitedeki renklerle aynı olur.

   Ayrıca veri/site.js içinde tanımlı her kategori için renk kuralı üretir;
   panelden yeni bir kategori eklediğinde CSS dosyasına dokunmak gerekmez. */
(function () {
  'use strict';

  // Değişkenlere yalnızca güvenli karakterler yazılsın; stil kaçışı olmasın.
  function temizRenk(d) {
    return /^[#a-zA-Z0-9(),.%\s-]{1,80}$/.test(String(d || '')) ? String(d).trim() : '';
  }
  function temizYazi(d) {
    return /^[a-zA-Z0-9\s,."'()-]{1,160}$/.test(String(d || '')) ? String(d).trim() : '';
  }

  window.temaUygula = function (T, hedef) {
    var kok = hedef || document.documentElement;
    T = T || {};
    var renkler = T.renkler || {};
    Object.keys(renkler).forEach(function (ad) {
      if (!/^[a-z0-9-]{1,40}$/.test(ad)) return;
      var d = temizRenk(renkler[ad]);
      if (d) kok.style.setProperty('--' + ad, d);
      else kok.style.removeProperty('--' + ad);
    });
    [['yaricap', 'yaricap'], ['yaziBoyu', 'yazi-boyu']].forEach(function (c) {
      var d = temizRenk(T[c[0]]);
      if (d) kok.style.setProperty('--' + c[1], d);
      else kok.style.removeProperty('--' + c[1]);
    });
    [['serif', 'serif'], ['sans', 'sans']].forEach(function (c) {
      var d = temizYazi(T[c[0]]);
      if (d) kok.style.setProperty('--' + c[1], d);
      else kok.style.removeProperty('--' + c[1]);
    });
    /* Koyu temada tarayıcının kendi kutuları (kaydırma çubuğu, açılır liste)
       da koyu görünsün. */
    kok.style.colorScheme = T.semasi === 'koyu' ? 'dark' : 'light';
  };

  /* Kategori renk kuralları. site.css içinde altı kategori için hazır kural var;
     burada tüm kategoriler için yeniden üretiyoruz ki sonradan eklenenler de
     renkli görünsün. */
  window.kategoriRenkleri = function (kategoriler) {
    var kutu = document.getElementById('kategori-renkleri');
    if (!kutu) {
      kutu = document.createElement('style');
      kutu.id = 'kategori-renkleri';
      document.head.appendChild(kutu);
    }
    kutu.textContent = Object.keys(kategoriler || {}).filter(function (k) {
      return /^[a-z0-9][a-z0-9-]*$/.test(k);
    }).map(function (k) {
      return '.r-' + k + '{background:var(--k-' + k + ',var(--soluk));}' +
        '.y-' + k + '{color:var(--k-' + k + ',var(--soluk));}';
    }).join('\n');
  };

  window.temaUygula(window.TEMA);
  if (window.SITE) window.kategoriRenkleri(window.SITE.kategoriler);
})();
