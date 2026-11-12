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

  var senkronCalisiyor = false;
  function tarayiciVerisiniSunucuyaAktar(paket) {
    if (senkronCalisiyor || !paket || !paket.veri || typeof fetch !== 'function') return;
    senkronCalisiyor = true;
    var adresler = [
      'http://localhost:8731/api/veri-senkron',
      'http://127.0.0.1:8731/api/veri-senkron',
      'api/veri-senkron'
    ];
    var govde = JSON.stringify({ _anahtar: 'yerel', veri: paket.veri });
    function dene(i) {
      if (i >= adresler.length) {
        senkronCalisiyor = false;
        return;
      }
      fetch(adresler[i], {
        method: 'POST',
        headers: { 'content-type': 'text/plain;charset=UTF-8' },
        body: govde
      }).then(function (c) {
        return c.json();
      }).then(function (v) {
        if (v && v.tamam) {
          senkronCalisiyor = false;
          try {
            paket.sunucuyaYazildi = Date.now();
            localStorage.setItem('rehber-canli-veri', JSON.stringify(paket));
          } catch (e) { /* yok say */ }
          return;
        }
        dene(i + 1);
      }).catch(function () {
        dene(i + 1);
      });
    }
    dene(0);
  }

  window.canliVeriUygula = function () {
    try {
      var ham = localStorage.getItem('rehber-canli-veri');
      if (!ham) return;
      var paket = JSON.parse(ham);
      if (!paket || !paket.veri) return;
      if (paket.sunucuyaYazildi && (Date.now() - Number(paket.sunucuyaYazildi) > 180000)) {
        localStorage.removeItem('rehber-canli-veri');
        return;
      }
      var ESLE = {
        site: 'SITE',
        araclar: 'ARACLAR',
        gorseller: 'GORSELLER',
        gorevler: 'GOREVLER',
        rehber: 'REHBER',
        tema: 'TEMA',
        yonetici: 'YONETICI'
      };
      Object.keys(paket.veri).forEach(function (k) {
        if (ESLE[k] && paket.veri[k] !== undefined) {
          window[ESLE[k]] = paket.veri[k];
        }
      });
      if (window.SITE) {
        if (!window.SITE.logo) window.SITE.logo = 'assets/ikon.svg';
        if (!window.SITE.paylasimGorsel) window.SITE.paylasimGorsel = 'assets/og-banner.png';
      }
      if (!paket.sunucuyaYazildi) {
        tarayiciVerisiniSunucuyaAktar(paket);
      }
    } catch (e) { /* yok say */ }
  };

  window.canliVeriUygula();
  window.temaUygula(window.TEMA);
  if (window.SITE) window.kategoriRenkleri(window.SITE.kategoriler);
})();
