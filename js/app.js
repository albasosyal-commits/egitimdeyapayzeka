/* Sitenin motoru. İçerik değişikliği için burası değil, veri/ klasöründeki dosyalar düzenlenir. */
(function () {
  'use strict';

  if (window.canliVeriUygula) window.canliVeriUygula();
  var S = window.SITE || {};
  var G = S.gorunum || {};
  var A = S.anasayfa || {};
  var SF = S.sayfalar || {};
  /* Panelden "gizli" işaretlenenler siteye hiç çıkmaz: ne listede, ne aramada,
     ne de görev rehberlerinin araç önerilerinde görünürler. */
  var ARACLAR = (window.ARACLAR || []).filter(function (a) { return !a.gizli; });
  var GOREVLER = (window.GOREVLER || []).filter(function (g) { return !g.gizli; });
  var GORSELLER = window.GORSELLER || {};
  var R = window.REHBER || {};
  var ana = document.getElementById('ana');

  var aktif = ARACLAR.filter(function (a) { return a.durum !== 'kapandi'; });
  var kapanan = ARACLAR.filter(function (a) { return a.durum === 'kapandi'; });

  function acikMi(v) { return v !== 'kapali' && v !== false; }

  function esc(m) {
    return String(m == null ? '' : m).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  // Türkçe harflere duyarsız arama: "sinav", "sınav" ve "SINAV" aynı sonucu verir.
  function sade(m) {
    return String(m || '').toLocaleLowerCase('tr')
      .replace(/ı/g, 'i').replace(/ş/g, 's').replace(/ğ/g, 'g')
      .replace(/ü/g, 'u').replace(/ö/g, 'o').replace(/ç/g, 'c')
      .normalize('NFD').replace(/[̀-ͯ]/g, '');
  }
  var ESKI_GOREV = { 'sinav': 'metin', 'ders-plani': 'metin', 'uyarlama': 'metin', 'yazisma': 'metin', 'hikaye': 'metin', 'belge': 'arastirma' };
  function aracBul(id) { return ARACLAR.find(function (a) { return a.id === id; }); }
  function gorevBul(id) {
    var hedef = ESKI_GOREV[id] || id;
    return GOREVLER.find(function (g) { return g.id === hedef; });
  }
  function katAd(k) { return (S.kategoriler[k] || {}).ad || k; }
  function guvenliUrl(u) { return /^https?:\/\//i.test(u || '') ? u : '#'; }
  function ucretRozet(a) { return '<span class="rozet ' + esc(a.ucret) + '">' + esc(S.ucretler[a.ucret] || a.ucret) + '</span>'; }

  function liste(xs) { return '<ul>' + xs.map(function (x) { return '<li>' + esc(x) + '</li>'; }).join('') + '</ul>'; }

  function tahta(metin, baslik) {
    var govde = esc(metin).replace(/\[[^\]\n]+\]/g, function (p) { return '<mark>' + p + '</mark>'; });
    return '<div class="tahta"><div class="tahta-bas"><span>' + esc(baslik || 'Hazır prompt') + '</span>' +
      '<button class="kopyala" type="button" data-kopyala="' + esc(metin) + '">Kopyala</button></div><pre>' + govde + '</pre></div>';
  }

  // Logosu indirilememiş araçlar için adının baş harfinden rozet çizilir.
  function logoKutu(a, sinif) {
    var g = GORSELLER[a.id] || {};
    var ek = sinif ? ' ' + sinif : '';
    var duzenOzellik = ' data-duzen="arac-gorsel" data-duzen-id="' + esc(a.id) + '" data-duzen-ad="Logo ve Görsel: ' + esc(a.ad) + '"';
    if (g.logo) {
      return '<span class="logo' + ek + '"' + duzenOzellik + '><img src="' + esc(g.logo) + '" alt="" loading="lazy"></span>';
    }
    return '<span class="logo' + ek + ' logo-harf r-' + esc((a.kategori || [])[0] || 'metin') + '"' + duzenOzellik + '>' +
      esc((a.ad || '?').trim().charAt(0).toLocaleUpperCase('tr')) + '</span>';
  }

  // Araç sayfasının başındaki tanıtım görseli (aracın kendi sitesinden indirilmiştir).
  function onizleme(a) {
    var g = GORSELLER[a.id] || {};
    if (!g.gorsel || a.durum === 'kapandi') return '';
    return '<figure class="onizleme" data-duzen="arac-gorsel" data-duzen-id="' + esc(a.id) + '" data-duzen-ad="Tanıtım Görseli: ' + esc(a.ad) + '"><img src="' + esc(g.gorsel) + '" alt="' + esc(a.ad) + ' arayüzünden bir görüntü" loading="lazy">' +
      '<figcaption>Tanıtım görseli · Kaynak: ' + esc(a.ad) + '</figcaption></figure>';
  }

  function aracKart(a) {
    var k = a.kategori[0];
    return '<a class="sekmeli" href="#/arac/' + esc(a.id) + '" data-duzen="arac-kart" data-duzen-id="' + esc(a.id) + '" data-duzen-ad="Araç: ' + esc(a.ad) + '">' +
      '<span class="sekme r-' + esc(k) + '">' + esc(a.alt || katAd(k)) + '</span>' +
      '<div class="sekmeli-ic"><div class="kart-bas">' + logoKutu(a) + '<h3>' + esc(a.ad) + '</h3></div>' +
      '<p>' + esc(a.ozet) + '</p>' +
      '<div class="rozetler" style="margin-top:auto">' + ucretRozet(a) +
      (a.yas ? '<span class="rozet">' + esc(a.yas) + '</span>' : '') +
      (a.yeni ? '<span class="rozet yeni">Öğretmene özel</span>' : '') + '</div></div></a>';
  }

  /* Ana sayfadaki iş kutucuğu: zengin ikon grafiği, altında başlık ve kısa açıklama. */
  function isKutucuk(g) {
    var alt = g.kisa || g.sure || '';
    return '<a class="is-kart m-' + esc(g.id) + '" href="#/gorev/' + esc(g.id) + '" title="' + esc(g.ozet) + '" data-duzen="gorev-kart" data-duzen-id="' + esc(g.id) + '" data-duzen-ad="Görev Kartı: ' + esc(g.baslik) + '">' +
      '<span class="is-madalyon y-' + esc(g.kategori) + ' m-' + esc(g.id) + '">' + window.ikonCiz(g.ikon) + '</span>' +
      '<span class="is-yazi"><b>' + esc(g.baslik) + '</b>' + (alt ? '<small>' + esc(alt) + '</small>' : '') + '</span></a>';
  }

  /* Kutucukların biçimi panelin Tema bölümünden seçilir. */
  function kutucukSekli() {
    var s = (window.TEMA || {}).sekil;
    return 'sekil-' + (['yuvarlak', 'altigen', 'yumusak'].indexOf(s) !== -1 ? s : 'yuvarlak');
  }

  /* Panelde "yeni eklendi" işaretlenen araçlar, kahraman bölümünün hemen
     altında sonsuz kayan premium bir vitrin şeridinde süzülür. */
  function yeniSerit() {
    if (!acikMi(A.seritAcik)) return '';
    var vitrin = aktif.filter(function (a) { return a.vitrin; });
    var liste = vitrin.length >= 6 ? vitrin.slice(0, 12) : vitrin.concat(aktif.filter(function (a) { return !a.vitrin; })).slice(0, 10);
    if (!liste.length) return '';
    var ikili = liste.concat(liste);
    var etiketYazi = A.seritEtiket || 'Vitrin & Yeni Araçlar';
    return '<section class="yeni-serit" aria-label="Öne çıkan araçlar şeridi" data-duzen="serit" data-duzen-ad="Kayan Vitrin & Yeni Araçlar Şeridi"><div class="kap"><div class="yeni-ic">' +
      '<span class="yeni-etiket"><i></i>' + esc(etiketYazi) + '</span>' +
      '<div class="yeni-pencere"><ul class="yeni-liste">' + ikili.map(function (a, i) {
        var k = a.kategori[0];
        return '<li style="--s:' + (i % liste.length) + '" aria-hidden="' + (i >= liste.length) + '">' +
          '<a class="yeni-rozet" href="#/arac/' + esc(a.id) + '" tabindex="' + (i >= liste.length ? '-1' : '0') + '" data-duzen="arac-kart" data-duzen-id="' + esc(a.id) + '" data-duzen-ad="Araç: ' + esc(a.ad) + '">' +
          logoKutu(a, 'mini') +
          '<span class="yeni-rozet-ad">' + esc(a.ad) + '</span>' +
          '<span class="yeni-rozet-kat y-' + esc(k) + '">' + esc(a.alt || katAd(k)) + '</span>' +
          '</a></li>';
      }).join('') + '</ul></div></div></div></section>';
  }

  /* Kahraman (hero) bölümünün sağ tarafındaki interaktif 3B cam slayt vitrini. */
  var slaytZaman = null;
  var slaytIndeks = 0;

  function vitrinSlaytListe() {
    var sec = aktif.filter(function (a) { return a.vitrin; });
    if (sec.length < 4) {
      sec = sec.concat(aktif.filter(function (a) { return !a.vitrin; })).slice(0, 6);
    }
    return sec.slice(0, 6);
  }

  function vitrinSlayt() {
    if (!acikMi(A.slaytAcik)) return '';
    var slaytlar = vitrinSlaytListe();
    if (!slaytlar.length) return '';
    var slaytEtiket = A.slaytEtiket || 'ÖNE ÇIKAN ARAÇ';
    var kutuBaslik = A.slaytKutuBaslik || '✦ Sınıfta ne işe yarar?';
    var bagYazi = A.slaytBaglantiYazi || 'Rehberi ve promptu aç';
    return '<div class="vitrin-sahne" id="vitrin-sahne" aria-roledescription="carousel" aria-label="Öne çıkan yapay zekâ araçları">' +
      '<div class="vitrin-kartlar">' +
      slaytlar.map(function (a, i) {
        var k = a.kategori[0];
        var ipucu = (a.neIcin && a.neIcin[0]) ? a.neIcin[0] : a.ozet;
        var no = (i + 1 < 10 ? '0' : '') + (i + 1) + ' / ' + (slaytlar.length < 10 ? '0' : '') + slaytlar.length;
        return '<article class="vitrin-slayt' + (i === 0 ? ' aktif' : (i === 1 ? ' sonraki' : '')) + '" data-slayt="' + i + '" aria-hidden="' + (i !== 0) + '">' +
          '<div class="vitrin-ust">' +
          '<span class="vitrin-cip"><span class="nokta"></span>' + esc(slaytEtiket) + '</span>' +
          '<span class="vitrin-kat r-' + esc(k) + '">' + esc(a.alt || katAd(k)) + '</span>' +
          '<span class="vitrin-no">' + no + '</span>' +
          '</div>' +
          '<div class="vitrin-bas">' +
          logoKutu(a, 'buyuk') +
          '<div class="vitrin-bas-yazi">' +
          '<h3><a href="#/arac/' + esc(a.id) + '">' + esc(a.ad) + '</a></h3>' +
          '<div class="rozetler">' + ucretRozet(a) + (a.yeni ? '<span class="rozet yeni">Öğretmene özel</span>' : '') + '</div>' +
          '</div></div>' +
          '<p class="vitrin-ozet">' + esc(a.ozet) + '</p>' +
          '<div class="vitrin-kutu"><span class="vitrin-kutu-etiket">' + esc(kutuBaslik) + '</span><p>' + esc(ipucu) + '</p></div>' +
          '<div class="vitrin-alt">' +
          '<a class="vitrin-bag" href="#/arac/' + esc(a.id) + '">' + esc(bagYazi) + ' <span aria-hidden="true">→</span></a>' +
          (a.url ? '<a class="vitrin-dis" href="' + esc(guvenliUrl(a.url)) + '" target="_blank" rel="noopener">Site ↗</a>' : '') +
          '</div></article>';
      }).join('') +
      '</div>' +
      '<div class="vitrin-cubuk">' +
      '<button type="button" class="vitrin-ok" data-slayt-yon="-1" aria-label="Önceki araç">‹</button>' +
      '<div class="vitrin-noktalar" role="tablist">' +
      slaytlar.map(function (a, i) {
        return '<button type="button" class="vitrin-nokta' + (i === 0 ? ' aktif' : '') + '" data-slayt-git="' + i + '" aria-label="' + esc(a.ad) + '"><span class="vitrin-dolum"></span></button>';
      }).join('') +
      '</div>' +
      '<button type="button" class="vitrin-ok" data-slayt-yon="1" aria-label="Sonraki araç">›</button>' +
      '</div></div>';
  }

  function slaytGuncelle(yeniIndeks) {
    var sahne = document.getElementById('vitrin-sahne');
    if (!sahne) return;
    var kartlar = sahne.querySelectorAll('.vitrin-slayt');
    var noktalar = sahne.querySelectorAll('.vitrin-nokta');
    var toplam = kartlar.length;
    if (!toplam) return;
    slaytIndeks = ((yeniIndeks % toplam) + toplam) % toplam;
    var sonraki = (slaytIndeks + 1) % toplam;
    var onceki = (slaytIndeks - 1 + toplam) % toplam;
    kartlar.forEach(function (k, i) {
      k.classList.toggle('aktif', i === slaytIndeks);
      k.classList.toggle('sonraki', i === sonraki && toplam > 1);
      k.classList.toggle('onceki', i === onceki && toplam > 2);
      k.setAttribute('aria-hidden', String(i !== slaytIndeks));
    });
    noktalar.forEach(function (n, i) {
      n.classList.toggle('aktif', i === slaytIndeks);
    });
  }

  function slaytBaslat() {
    clearInterval(slaytZaman);
    slaytIndeks = 0;
    var sahne = document.getElementById('vitrin-sahne');
    if (!sahne) return;
    function kur() {
      clearInterval(slaytZaman);
      slaytZaman = setInterval(function () {
        if (!document.hidden && document.getElementById('vitrin-sahne')) {
          slaytGuncelle(slaytIndeks + 1);
        }
      }, 4800);
    }
    kur();
    sahne.addEventListener('mouseenter', function () { clearInterval(slaytZaman); sahne.classList.add('duraklat'); });
    sahne.addEventListener('mouseleave', function () { sahne.classList.remove('duraklat'); kur(); });
  }

  /* ---------- Sayfalar ---------- */

  function sayfaAnasayfa() {
    var gorevPromptSay = GOREVLER.reduce(function (t, g) {
      return t + (g.promptlar && g.promptlar.length ? g.promptlar.length : (g.prompt ? 1 : 0));
    }, 0);
    var promptSay = gorevPromptSay + aktif.filter(function (a) { return a.prompt; }).length;
    var slaytHtml = vitrinSlayt();
    var ustEtiketMetin = (A.ustEtiket && A.ustEtiket.trim()) ? A.ustEtiket : S.okul;
    var aliskanlikListesi = Array.isArray(A.aliskanliklar) ? A.aliskanliklar : [
      { no: '1', baslik: 'Aracın türünü bil', metin: 'Metinden görsele, görselden videoya: işin için doğru türü seç.', adres: '#/baslangic' },
      { no: '2', baslik: 'İyi prompt yaz', metin: 'Sınıf düzeyini, amacı ve biçimi söyle. Atölyede hazır formülle dene.', adres: '#/prompt' },
      { no: '3', baslik: 'Çıktıyı kontrol et', metin: 'Yapay zekâ yanılabilir. Öğrenci bilgisi girme, sonucu sınıfa götürmeden doğrula.', adres: '#/guvenli' }
    ];

    var parcalar = {
      defter: function () {
        if (!acikMi(A.defterAcik)) return '';
        return '<section class="defter"><div class="kap"><div class="defter-ic' + (slaytHtml ? '' : ' tek-sutun') + '">' +
          '<div class="defter-sol" data-duzen="defter-sol" data-duzen-ad="Kahraman Sol Sütun (Başlık, Arama ve İstatistikler)">' +
          (acikMi(A.ustEtiketAcik) && ustEtiketMetin ? '<p class="ust-etiket"><span class="canli-nokta"></span>' + esc(ustEtiketMetin) + '</p>' : '') +
          '<h1>' + esc(A.baslik || 'Bugün ne hazırlıyorsun?') + '</h1>' +
          (A.giris !== '' ? '<p class="giris">' + esc(A.giris || 'Yapacağın işi seç. Hangi yapay zekâyı açacağını, ne yazacağını ve neyi kontrol edeceğini adım adım gösterelim.') + '</p>' : '') +
          (acikMi(A.aramaAcik) ? '<form class="ara-form" data-ara role="search"><input type="search" name="q" aria-label="Araç ara" placeholder="' + esc(A.aramaYerTutucu || 'Araç ya da iş ara: sınav, şarkı, Gemini…') + '"><button class="dugme" type="submit">' + esc(A.aramaDugme || 'Ara') + '</button></form>' : '') +
          (acikMi(A.sayilarAcik) ? '<div class="sayilar-kapsul">' +
            '<span class="sayi-cip"><b>' + aktif.length + '</b> yapay zekâ aracı</span>' +
            '<span class="sayi-cip"><b>' + GOREVLER.length + '</b> ana kategori rehberi</span>' +
            '<span class="sayi-cip"><b>' + promptSay + '</b> hazır prompt</span>' +
            '</div>' : '') +
          '</div>' +
          (slaytHtml ? '<div class="defter-sag" data-duzen="defter-sag" data-duzen-ad="Sağ Sütun: 3B Vitrin Slaytı">' + slaytHtml + '</div>' : '') +
          '</div></div></section>';
      },
      serit: function () {
        return yeniSerit();
      },
      gorevler: function () {
        if (!acikMi(A.gorevlerAcik)) return '';
        return '<section class="bolum" data-duzen="gorevler-bolum" data-duzen-ad="Yapacağın İşi Seç Bölümü"><div class="kap">' +
          '<div class="bolum-bas"><h2>' + esc(A.gorevlerBaslik || 'Yapacağın işi seç') + '</h2>' +
          (acikMi(A.gorevlerBaglantiAcik) ? '<a href="#/araclar">' + esc(A.gorevlerBaglantiYazi || 'Tüm araçları gör') + '</a>' : '') +
          '</div>' +
          '<div class="is-izgara ' + kutucukSekli() + '">' + GOREVLER.map(isKutucuk).join('') + '</div></div></section>';
      },
      aliskanliklar: function () {
        if (!acikMi(A.aliskanliklarAcik) || !aliskanlikListesi.length) return '';
        return '<section class="bolum" data-duzen="aliskanliklar" data-duzen-ad="Üç Alışkanlık Bölümü ve Kartları"><div class="kap">' +
          '<div class="bolum-bas"><h2>' + esc(A.aliskanliklarBaslik || 'Araçtan önce üç alışkanlık') + '</h2></div>' +
          '<div class="uc-adim">' +
          aliskanlikListesi.map(function (adim, i) {
            return '<a href="' + esc(adim.adres || '#/') + '" data-duzen="aliskanliklar" data-duzen-id="' + i + '" data-duzen-ad="Alışkanlık Kartı ' + esc(adim.no || (i + 1)) + '"><span class="no">' + esc(adim.no || (i + 1)) + '</span><h3>' + esc(adim.baslik || '') + '</h3><p>' + esc(adim.metin || '') + '</p></a>';
          }).join('') +
          '</div></div></section>';
      }
    };

    var sira = Array.isArray(A.sira) && A.sira.length ? A.sira : ['defter', 'serit', 'gorevler', 'aliskanliklar'];
    return {
      baslik: '',
      nav: 'gorev',
      sonra: slaytBaslat,
      html: sira.map(function (k) { return parcalar[k] ? parcalar[k]() : ''; }).join('')
    };
  }

  var filtre = { q: '', kat: 'hepsi', ucret: 'hepsi' };

  function aracSonuc() {
    var q = sade(filtre.q).trim();
    var bulunan = aktif.filter(function (a) {
      if (filtre.kat !== 'hepsi' && a.kategori.indexOf(filtre.kat) === -1) return false;
      if (filtre.ucret === 'ucretsiz' && a.ucret === 'ucretli') return false;
      if (filtre.ucret === 'tamamen' && a.ucret !== 'ucretsiz' && a.ucret !== 'ogretmen') return false;
      if (!q) return true;
      var hedef = sade([a.ad, a.ozet, a.alt, (a.neIcin || []).join(' '), (a.etiket || []).join(' '),
        a.kategori.map(katAd).join(' ')].join(' '));
      return q.split(/\s+/).every(function (p) { return hedef.indexOf(p) !== -1; });
    });

    var cikti = '<p class="sonuc-say">' + bulunan.length + ' araç</p>';
    if (!bulunan.length) {
      return cikti + '<p class="bos">Bu aramayla eşleşen araç yok. Filtreleri temizlemeyi ya da başka bir kelimeyi dene.</p>';
    }
    var gruplu = filtre.kat === 'hepsi' && !q && filtre.ucret === 'hepsi';
    if (!gruplu) return cikti + '<div class="arac-izgara" style="margin-top:26px">' + bulunan.map(aracKart).join('') + '</div>';

    return cikti + Object.keys(S.kategoriler).map(function (k) {
      var ic = bulunan.filter(function (a) { return a.kategori[0] === k; });
      if (!ic.length) return '';
      return '<section class="grup"><div class="grup-bas" data-duzen="kategori-grup" data-duzen-id="' + esc(k) + '" data-duzen-ad="Kategori: ' + esc(S.kategoriler[k].baslik) + '"><h2>' + esc(S.kategoriler[k].baslik) + '</h2><span>' + esc(S.kategoriler[k].aciklama) + '</span></div>' +
        '<div class="arac-izgara">' + ic.map(aracKart).join('') + '</div></section>';
    }).join('');
  }

  function cipler(ad, secenekler, secili) {
    return '<div class="cipler" role="group" aria-label="' + esc(ad === 'kat' ? 'Kategori' : 'Ücret') + '">' + secenekler.map(function (s) {
      return '<button type="button" class="cip" data-filtre="' + ad + '" data-deger="' + esc(s[0]) + '" aria-pressed="' + (s[0] === secili) + '">' + esc(s[1]) + '</button>';
    }).join('') + '</div>';
  }

  function sayfaAraclar(sorgu) {
    var sa = SF.araclar || {};
    filtre.q = sorgu.get('q') || '';
    filtre.kat = sorgu.get('kat') || 'hepsi';
    filtre.ucret = sorgu.get('ucret') || 'hepsi';
    var katlar = [['hepsi', 'Hepsi']].concat(Object.keys(S.kategoriler).map(function (k) { return [k, S.kategoriler[k].ad]; }));
    var kapananHtml = (acikMi(sa.kapananAcik) && kapanan.length) ? '<details class="kapanan" data-duzen="araclar-ust" data-duzen-ad="Kapanan Araçlar Kutusu"><summary>Artık kullanılamayan araçlar (' + kapanan.length + ')</summary>' +
      '<ul>' + kapanan.map(function (a) {
        var yer = aracBul(a.yerine);
        return '<li><strong>' + esc(a.ad) + '</strong>: ' + esc(a.ozet) + (yer ? ' <a href="#/arac/' + esc(yer.id) + '">Yerine ' + esc(yer.ad) + ' kullanılabilir.</a>' : '') + '</li>';
      }).join('') + '</ul></details>' : '';
    var filtreParcalar =
      (acikMi(sa.aramaAcik) ? '<input class="girdi" id="arac-ara" type="search" aria-label="Araçlarda ara" placeholder="' + esc(sa.aramaYerTutucu || 'Ara: sunum, seslendirme, Kahoot…') + '" value="' + esc(filtre.q) + '">' : '') +
      (acikMi(sa.kategoriFiltreAcik) ? cipler('kat', katlar, filtre.kat) : '') +
      (acikMi(sa.ucretFiltreAcik) ? cipler('ucret', [['hepsi', 'Tüm ücretler'], ['ucretsiz', 'Ücretsiz başlanabilir'], ['tamamen', 'Tamamen ücretsiz']], filtre.ucret) : '');
    return {
      baslik: sa.baslik || 'Araçlar',
      nav: 'araclar',
      html: '<div class="kap"><div class="sayfa-bas" data-duzen="araclar-ust" data-duzen-ad="Araçlar Sayfası Başlık ve Filtre Ayarları"><h1>' + esc(sa.baslik || 'Araç rehberi') + '</h1>' +
        '<p class="giris">' + esc(sa.giris || 'Ücreti, yaş sınırı ve öğretmene faydası bir bakışta. Bir araca tıklayınca hazır prompt ve dikkat edilecekleri görürsün.') + '</p>' +
        (filtreParcalar ? '<div class="filtre">' + filtreParcalar + '</div>' : '') +
        '</div><div id="arac-sonuc" aria-live="polite">' + aracSonuc() + '</div>' + kapananHtml + '</div>'
    };
  }

  function sayfaArac(id) {
    var a = aracBul(id);
    if (!a) return sayfaYok();
    var gorevler = GOREVLER.filter(function (g) { return g.araclar.some(function (x) { return x.id === a.id; }); });
    var benzer = aktif.filter(function (b) { return b.id !== a.id && b.kategori[0] === a.kategori[0]; }).slice(0, 3);
    var yerine = aracBul(a.yerine);
    var icerik = '';
    if (a.durum === 'kapandi') {
      icerik += '<section><div class="dikkat"><strong>Bu araç artık kullanılamıyor</strong>' + esc(a.ozet) +
        (yerine ? ' <a href="#/arac/' + esc(yerine.id) + '">Yerine ' + esc(yerine.ad) + ' kullanılabilir.</a>' : '') + '</div></section>';
    }
    if (a.neIcin && a.neIcin.length) icerik += '<section><h2>Öğretmen olarak ne yapabilirsin?</h2>' + liste(a.neIcin) + '</section>';
    if (a.ipucu) icerik += '<section><div class="not"><strong>Püf noktası</strong>' + esc(a.ipucu) + '</div></section>';
    if (a.prompt) icerik += '<section><h2>Hemen dene</h2>' + tahta(a.prompt) + '<p class="alt-not">Köşeli parantezli yerleri kendi dersine göre değiştir.</p></section>';
    if (a.ornek) icerik += '<section><h2>Örnek çalışma</h2><p><a href="' + esc(guvenliUrl(a.ornek.url)) + '" target="_blank" rel="noopener">' + esc(a.ornek.ad) + ' ↗</a></p></section>';
    if (a.dikkat) icerik += '<section><div class="dikkat"><strong>Dikkat</strong>' + esc(a.dikkat) + '</div></section>';
    if (gorevler.length) {
      icerik += '<section><h2>Bu aracı önerdiğimiz işler</h2><ul>' + gorevler.map(function (g) { return '<li><a href="#/gorev/' + esc(g.id) + '">' + esc(g.baslik) + '</a></li>'; }).join('') + '</ul></section>';
    }
    if (benzer.length) {
      icerik += '<section><h2>Benzer araçlar</h2><ul class="logolu">' + benzer.map(function (b) {
        return '<li>' + logoKutu(b, 'mini') + '<a href="#/arac/' + esc(b.id) + '">' + esc(b.ad) + '</a></li>';
      }).join('') + '</ul></section>';
    }
    var kunye =
      '<dt>Ücret</dt><dd>' + esc(S.ucretler[a.ucret] || a.ucret) + (a.ucretNot ? '<br><span style="color:var(--soluk);font-size:.9rem">' + esc(a.ucretNot) + '</span>' : '') + '</dd>' +
      (a.yas ? '<dt>Yaş sınırı</dt><dd>' + esc(a.yas) + '</dd>' : '') +
      (a.turkce ? '<dt>Türkçe</dt><dd>' + esc(a.turkce) + '</dd>' : '') +
      (a.kontrol ? '<dt>Bilgi kontrol tarihi</dt><dd>' + esc(tarih(a.kontrol)) + '</dd>' : '');
    return {
      baslik: a.ad,
      nav: 'araclar',
      html: '<div class="kap" data-duzen="arac-kart" data-duzen-id="' + esc(a.id) + '" data-duzen-ad="Araç Ayarları ve Görselleri: ' + esc(a.ad) + '"><div class="sayfa-bas"><p class="kirinti"><a href="#/araclar">Araçlar</a> / ' + esc(a.alt || katAd(a.kategori[0])) + '</p>' +
        '<div class="baslik-satir">' + logoKutu(a, 'buyuk') + '<h1>' + esc(a.ad) + '</h1></div>' +
        '<p class="giris">' + esc(a.ozet) + '</p></div>' +
        '<div class="iki-sutun"><div class="icerik">' + onizleme(a) + (icerik || '<p>Bu araç için henüz ayrıntı eklenmedi.</p>') + '</div>' +
        '<aside class="kunye" aria-label="Araç bilgileri"><dl>' + kunye + '</dl>' +
        (a.durum !== 'kapandi' && a.url ? '<a class="dugme" href="' + esc(guvenliUrl(a.url)) + '" target="_blank" rel="noopener">Siteye git ↗</a>' : '') +
        '</aside></div></div>'
    };
  }

  function sayfaGorev(id) {
    var g = gorevBul(id);
    if (!g) return sayfaYok();
    var siralar = ['İlk tercih', 'Alternatif', 'Alternatif', 'Alternatif'];
    var araclar = g.araclar.map(function (x, i) {
      var a = aracBul(x.id);
      if (!a) return '';
      return '<li><a class="satir" href="#/arac/' + esc(a.id) + '"><span class="sira">' + (siralar[i] || 'Alternatif') + '</span>' +
        logoKutu(a) +
        '<span><strong>' + esc(a.ad) + '</strong><small>' + esc(x.neden) + '</small></span>' + ucretRozet(a) + '</a></li>';
    }).join('');
    var promptListesi = (g.promptlar && g.promptlar.length)
      ? g.promptlar
      : (g.prompt ? [{ baslik: 'Hazır prompt', prompt: g.prompt }] : []);
    var promptBolumu = promptListesi.length
      ? '<section><h2>' + (promptListesi.length > 1 ? 'Hazır promptlar' : 'Bu promptu kopyala') + '</h2>' +
        '<div class="prompt-yigin">' + promptListesi.map(function (p) {
          return tahta(p.prompt, p.baslik || 'Hazır prompt');
        }).join('') + '</div><p class="alt-not">Köşeli parantezli yerleri kendi dersine göre değiştir.</p></section>'
      : '';
    var diger = GOREVLER.filter(function (o) { return o.id !== g.id; });
    return {
      baslik: g.baslik,
      nav: 'gorev',
      html: '<div class="kap" data-duzen="gorev-kart" data-duzen-id="' + esc(g.id) + '" data-duzen-ad="Görev Rehberi: ' + esc(g.baslik) + '"><div class="sayfa-bas"><p class="kirinti"><a href="#/">Görevler</a> / ' + esc(katAd(g.kategori)) + '</p>' +
        '<div class="baslik-satir"><span class="is-madalyon kucuk-madalyon y-' + esc(g.kategori) + ' m-' + esc(g.id) + '">' + window.ikonCiz(g.ikon) + '</span><h1>' + esc(g.baslik) + '</h1></div>' +
        '<p class="giris">' + esc(g.ozet) + (g.sure ? ' Tahminî süre: ' + esc(g.sure) + '.' : '') + '</p></div>' +
        '<div class="icerik dar" style="padding:26px 0 40px">' +
        '<section><h2>Hangi aracı açmalısın?</h2><ul class="tercih">' + araclar + '</ul></section>' +
        '<section><h2>Adım adım</h2><ol class="adimlar">' + g.adimlar.map(function (x) { return '<li>' + esc(x) + '</li>'; }).join('') + '</ol></section>' +
        promptBolumu +
        '<section><h2>Kullanmadan önce kontrol et</h2><ul class="kontrol">' + g.kontrol.map(function (x) { return '<li><label><input type="checkbox"><span>' + esc(x) + '</span></label></li>'; }).join('') + '</ul></section>' +
        (diger.length ? '<section><h2>Diğer işler</h2><div class="diger-gorevler">' + diger.map(function (o) {
          return '<a class="diger-cip" href="#/gorev/' + esc(o.id) + '"><span class="y-' + esc(o.kategori) + ' m-' + esc(o.id) + '">' + window.ikonCiz(o.ikon) + '</span>' + esc(o.baslik) + '</a>';
        }).join('') + '</div></section>' : '') +
        '</div></div>'
    };
  }

  /* Prompt oluşturucu */
  var SABLONLAR = {
    anlatim: { ad: 'Konu anlatımı', gorev: function (k, e) { return '"' + k + '" konusunu günlük yaşamdan örneklerle, kolayca anlaşılacak şekilde açıkla.' + e + ' Sonuna öğrencileri düşündürecek 3 açık uçlu soru ekle.'; } },
    test: { ad: 'Çoktan seçmeli test', gorev: function (k, e) { return '"' + k + '" konusunda 10 soruluk, 4 seçenekli bir test hazırla.' + e + ' Sorular kolaydan zora sıralansın, sonuna cevap anahtarını ve her cevabın kısa gerekçesini ekle.'; } },
    acik: { ad: 'Açık uçlu sorular', gorev: function (k, e) { return '"' + k + '" konusunda düşünmeye yönelten 5 açık uçlu soru hazırla.' + e + ' Her soru için beklenen cevabın ana hatlarını ve 3 düzeyli bir puanlama ölçütü yaz.'; } },
    plan: { ad: 'Ders planı', gorev: function (k, e) { return '"' + k + '" konusu için 40 dakikalık bir ders planı hazırla.' + e + ' Giriş, etkinlik, değerlendirme ve kapanış bölümlerini süreleriyle yaz; gerekli materyalleri belirt.'; } },
    etkinlik: { ad: 'Sınıf etkinliği', gorev: function (k, e) { return '"' + k + '" konusunu pekiştiren, 20 dakikada tamamlanacak, grup çalışmasına uygun bir sınıf etkinliği tasarla.' + e + ' Öğrenci yönergesini ayrıca yaz.'; } },
    uyarlama: { ad: 'Metni seviyeye uyarlama', gorev: function (k, e) { return 'Aşağıya ekleyeceğim "' + k + '" metnini, anlamını koruyarak üç ayrı okuma düzeyine (destek gereken, sınıf düzeyi, ileri düzey) uyarla.' + e; } },
    rubrik: { ad: 'Değerlendirme ölçeği', gorev: function (k, e) { return '"' + k + '" çalışması için 4 ölçütlü ve 4 düzeyli bir dereceli puanlama anahtarı (rubrik) hazırla.' + e; } },
    veli: { ad: 'Veli bilgilendirme yazısı', gorev: function (k, e) { return '"' + k + '" konusunda velilere gönderilecek kısa, nazik ve anlaşılır bir bilgilendirme yazısı hazırla.' + e + ' Öğrenci ismi kullanma; isim gereken yerlere [Öğrenci Adı] yaz.'; } }
  };
  var BICIMLER = { tablo: 'Sonucu tablo olarak ver.', madde: 'Sonucu kısa maddeler hâlinde ver.', metin: 'Sonucu akıcı bir metin olarak ver.', slayt: 'Sonucu her slayt için başlık ve en fazla 3 maddeyle ver.' };

  function promptParcalar(d) {
    var konu = d.konu || '[konu]';
    var ek = d.ek ? ' ' + d.ek.replace(/[.\s]+$/, '') + '.' : '';
    var sinif = d.sinif || '[sınıf]';
    return [
      ['rol', 'Ben ' + sinif + ' sınıf öğrencilerinin derslerine giren bir ' + (d.brans || '[branş]') + ' öğretmeniyim.'],
      ['gorev', SABLONLAR[d.tur].gorev(konu, ek)],
      ['hedef', 'Dili ve örnekleri ' + sinif + ' sınıf öğrencilerinin düzeyine uygun olsun.'],
      ['bicim', BICIMLER[d.bicim]],
      ['sinir', 'Emin olmadığın bilgileri uydurma, "emin değilim" diye belirt.']
    ];
  }

  function atolyeOku() {
    var f = document.getElementById('atolye-form');
    if (!f) return { brans: '', sinif: '5.', konu: '', tur: 'anlatim', bicim: 'madde', ek: '' };
    return { brans: f.brans.value.trim(), sinif: f.sinif.value, konu: f.konu.value.trim(), tur: f.tur.value, bicim: f.bicim.value, ek: f.ek.value.trim() };
  }
  function atolyeCiz() {
    var ciktiEl = document.getElementById('atolye-cikti');
    if (!ciktiEl) return;
    var parcalar = promptParcalar(atolyeOku());
    var duz = parcalar.map(function (p) { return p[1]; }).join(' ');
    ciktiEl.innerHTML = '<div class="tahta"><div class="tahta-bas"><span>Senin promptun</span>' +
      '<button class="kopyala" type="button" data-kopyala="' + esc(duz) + '">Kopyala</button></div><pre>' +
      parcalar.map(function (p) {
        return '<span class="parca p-' + p[0] + '">' + esc(p[1]).replace(/\[[^\]\n]+\]/g, function (m) { return '<mark>' + m + '</mark>'; }) + '</span>';
      }).join(' ') + '</pre></div>';
  }

  function sayfaPrompt() {
    var sp = SF.prompt || {};
    var o = R.promptOrnek;
    var sinifSec = S.siniflar.map(function (s) { return '<option value="' + esc(s) + '"' + (s === '5.' ? ' selected' : '') + '>' + esc(s) + ' sınıf</option>'; }).join('');
    var turSec = Object.keys(SABLONLAR).map(function (k) { return '<option value="' + k + '">' + esc(SABLONLAR[k].ad) + '</option>'; }).join('');
    return {
      baslik: sp.baslik || 'Prompt Atölyesi',
      nav: 'prompt',
      sonra: atolyeCiz,
      html: '<div class="kap"><div class="sayfa-bas" data-duzen="prompt-ust" data-duzen-ad="Prompt Atölyesi Başlık ve Giriş"><h1>' + esc(sp.baslik || 'Prompt Atölyesi') + '</h1>' +
        '<p class="giris">' + esc(sp.giris || 'Prompt, yapay zekâya ne istediğini anlatan yönergedir. Ne kadar açık yazarsan sonuç o kadar işine yarar: iyi bir prompt, yeni bir öğretmen stajyere verilen iyi bir talimat gibidir.') + '</p></div>' +

        (acikMi(sp.kiyasAcik) ? '<section class="bolum" style="padding-top:26px" data-duzen="prompt-kiyas" data-duzen-ad="Zayıf ve Güçlü Prompt Karşılaştırması"><h2 style="margin-bottom:16px">' + esc(sp.kiyasBaslik || 'Aynı istek, iki farklı sonuç') + '</h2>' +
          '<div class="kiyas"><div class="zayif"><h3>Zayıf prompt</h3><p>' + esc(o.zayif) + '</p><p class="acik">' + esc(o.zayifNeden) + '</p></div>' +
          '<div class="guclu"><h3>Güçlü prompt</h3><p>' + o.guclu.map(function (p) { return '<span class="parca p-' + p[0] + '">' + esc(p[1]) + '</span>'; }).join(' ') + '</p>' +
          '<ul class="gosterge">' + R.promptFormul.filter(function (f) { return o.guclu.some(function (p) { return p[0] === f.id; }); }).map(function (f) { return '<li><span class="parca p-' + f.id + '">' + esc(f.ad) + '</span></li>'; }).join('') + '</ul></div></div></section>' : '') +

        (acikMi(sp.formulAcik) ? '<section class="bolum" data-duzen="prompt-formul" data-duzen-ad="Güçlü Promptun Beş Parçası"><h2 style="margin-bottom:16px">' + esc(sp.formulBaslik || 'Güçlü promptun beş parçası') + '</h2><div class="formul">' +
          R.promptFormul.map(function (f) { return '<div class="p-' + f.id + '"><strong>' + esc(f.ad) + '</strong><span>' + esc(f.aciklama) + '</span></div>'; }).join('') +
          '</div></section>' : '') +

        (acikMi(sp.atolyeAcik) ? '<section class="bolum" data-duzen="prompt-atolye" data-duzen-ad="İnteraktif Prompt Oluşturucu"><h2 style="margin-bottom:0">' + esc(sp.atolyeBaslik || 'Kendi promptunu oluştur') + '</h2><p style="color:var(--soluk);margin:6px 0 18px">' + esc(sp.atolyeAlt || 'Formu doldur, prompt yanda yazılsın. Kopyala ve istediğin yapay zekâya yapıştır.') + '</p>' +
          '<div class="atolye"><form id="atolye-form" autocomplete="off">' +
          '<div class="alan-cift"><label class="alan"><span>Branşın</span><input class="girdi" name="brans" placeholder="Sosyal Bilgiler"></label>' +
          '<label class="alan"><span>Sınıf</span><select class="girdi" name="sinif">' + sinifSec + '</select></label></div>' +
          '<label class="alan"><span>Konu</span><input class="girdi" name="konu" placeholder="Kaynaklarımızın Verimli Kullanımı"></label>' +
          '<div class="alan-cift"><label class="alan"><span>Ne istiyorsun?</span><select class="girdi" name="tur">' + turSec + '</select></label>' +
          '<label class="alan"><span>Biçim</span><select class="girdi" name="bicim"><option value="madde">Maddeler</option><option value="tablo">Tablo</option><option value="metin">Akıcı metin</option><option value="slayt">Slayt başlıkları</option></select></label></div>' +
          '<label class="alan"><span>Ek isteğin (isteğe bağlı)</span><input class="girdi" name="ek" placeholder="Görsel okuryazarlık içeren örnekler kullan"></label>' +
          '</form><div class="atolye-sonuc" id="atolye-cikti"></div></div></section>' : '') +

        (acikMi(sp.hazirAcik) ? '<section class="bolum" data-duzen="prompt-hazir" data-duzen-ad="Hazır Promptlar Kütüphanesi"><div class="bolum-bas"><h2>' + esc(sp.hazirBaslik || 'Hazır promptlar') + '</h2><p>' + esc(sp.hazirAlt || 'İşe göre seçip kopyala.') + '</p></div><div class="kutuphane dar">' +
          GOREVLER.map(function (g) {
            var liste = (g.promptlar && g.promptlar.length) ? g.promptlar : [{ baslik: katAd(g.kategori), prompt: g.prompt }];
            return '<div class="kutuphane-oge" data-duzen="gorev-kart" data-duzen-id="' + esc(g.id) + '" data-duzen-ad="Görev Promptları: ' + esc(g.baslik) + '"><h3><a href="#/gorev/' + esc(g.id) + '">' + esc(g.baslik) + '</a></h3>' +
              '<div class="prompt-yigin">' + liste.map(function (p) { return tahta(p.prompt, p.baslik || katAd(g.kategori)); }).join('') + '</div></div>';
          }).join('') + '</div></section>' : '') +
        '</div>'
    };
  }

  function sayfaGuvenli() {
    var sg = SF.guvenli || {};
    var g = R.guvenlik;
    var yaslar = aktif.filter(function (a) { return a.yas && a.kategori[0] !== 'web20'; });
    return {
      baslik: sg.baslik || 'Güvenli Kullanım',
      nav: 'guvenli',
      html: '<div class="kap"><div class="sayfa-bas" data-duzen="guvenli-ust" data-duzen-ad="Güvenli Kullanım Başlık ve Giriş"><h1>' + esc(sg.baslik || 'Güvenli kullanım') + '</h1><p class="giris">' + esc(g.giris) + '</p></div>' +
        (acikMi(sg.yapYapmaAcik) ? '<section class="bolum" style="padding-top:26px" data-duzen="guvenli-yapyapma" data-duzen-ad="Yap / Yapma Sütunları"><div class="yap-yapma">' +
          '<div class="yapma"><h3>' + esc(sg.yapmaBaslik || 'Yapay zekâya girme') + '</h3>' + liste(g.yapma) + '</div>' +
          '<div class="yap"><h3>' + esc(sg.yapBaslik || 'Bunun yerine') + '</h3>' + liste(g.yap) + '</div></div></section>' : '') +
        (acikMi(sg.ilkelerAcik) ? '<section class="bolum" data-duzen="guvenli-ilkeler" data-duzen-ad="Beş Temel İlke Bölümü"><h2 style="margin-bottom:14px">' + esc(sg.ilkelerBaslik || 'Beş temel ilke') + '</h2><div class="ilkeler">' +
          g.ilkeler.map(function (i) { return '<div><h3>' + esc(i.baslik) + '</h3><p>' + esc(i.metin) + '</p></div>'; }).join('') + '</div></section>' : '') +
        (acikMi(sg.kontrolAcik) ? '<section class="bolum" data-duzen="guvenli-kontrol" data-duzen-ad="Sınıfa Götürmeden Önce Kontrol Listesi"><h2 style="margin-bottom:14px">' + esc(sg.kontrolBaslik || 'Sınıfa götürmeden önce') + '</h2><div class="dar"><ul class="kontrol">' +
          g.kontrol.map(function (x) { return '<li><label><input type="checkbox"><span>' + esc(x) + '</span></label></li>'; }).join('') + '</ul></div></section>' : '') +
        (acikMi(sg.yasAcik) ? '<section class="bolum" data-duzen="guvenli-yas" data-duzen-ad="Araçların Yaş Sınırları Tablosu"><h2>' + esc(sg.yasBaslik || 'Araçların yaş sınırları') + '</h2><p style="color:var(--soluk);margin:6px 0 14px">' + esc(g.yasNot) + '</p>' +
          '<div class="tablo-sar"><table><thead><tr><th>Araç</th><th>Yaş sınırı</th><th>Ücret</th></tr></thead><tbody>' +
          yaslar.map(function (a) { return '<tr><td><a href="#/arac/' + esc(a.id) + '">' + esc(a.ad) + '</a></td><td>' + esc(a.yas) + '</td><td>' + esc(S.ucretler[a.ucret] || a.ucret) + '</td></tr>'; }).join('') +
          '</tbody></table></div></section>' : '') +
        (acikMi(sg.kaynaklarAcik) ? '<section class="bolum" data-duzen="guvenli-kaynaklar" data-duzen-ad="Resmî Kaynaklar Bölümü"><h2 style="margin-bottom:10px">' + esc(sg.kaynaklarBaslik || 'Resmî kaynaklar') + '</h2><ul class="kaynak dar">' +
          g.kaynaklar.map(function (k) { return '<li><a href="' + esc(guvenliUrl(k.url)) + '" target="_blank" rel="noopener">' + esc(k.ad) + ' ↗</a><small>' + esc(k.not) + '</small></li>'; }).join('') +
          '</ul></section>' : '') +
        '</div>'
    };
  }

  function sayfaBaslangic() {
    var sb = SF.baslangic || {};
    var b = R.baslangic;
    return {
      baslik: sb.baslik || 'Yeni Başlayanlar',
      nav: 'baslangic',
      html: '<div class="kap"><div class="sayfa-bas" data-duzen="baslangic-ust" data-duzen-ad="Yeni Başlayanlar Başlık ve Giriş"><h1>' + esc(sb.baslik || 'Yapay zekâya yeni mi başlıyorsun?') + '</h1><p class="giris">' + esc(b.giris) + '</p></div>' +
        (acikMi(sb.adimlarAcik) ? '<section class="bolum" style="padding-top:26px" data-duzen="baslangic-adimlar" data-duzen-ad="İlk 30 Dakikan ve İlk Prompt"><div class="dar"><h2 style="margin-bottom:16px">' + esc(sb.adimlarBaslik || 'İlk 30 dakikan') + '</h2><ol class="adimlar">' +
          b.adimlar.map(function (x) { return '<li>' + esc(x) + '</li>'; }).join('') + '</ol>' +
          tahta(b.ilkPrompt, 'İlk promptun') + '</div></section>' : '') +
        (acikMi(sb.turlerAcik) ? '<section class="bolum" data-duzen="baslangic-turler" data-duzen-ad="Yapay Zekâ Türleri Kartları"><h2>' + esc(sb.turlerBaslik || 'Yapay zekâ türleri') + '</h2><p style="color:var(--soluk);margin:6px 0 16px">' + esc(sb.turlerAlt || 'Tür, verdiğin şey ile aldığın şeye göre adlandırılır.') + '</p><div class="turler">' +
          b.turler.map(function (t) {
            var arac = t.araclar.map(function (id) { var a = aracBul(id); return a ? '<a href="#/arac/' + esc(a.id) + '">' + esc(a.ad) + '</a>' : ''; }).filter(Boolean).join(', ');
            return '<div class="tur"><h3>' + esc(t.ad) + '</h3><p class="en">' + esc(t.en) + '</p><p>' + esc(t.aciklama) + '</p><p class="araclar-kisa">' + arac + '</p></div>';
          }).join('') + '</div></section>' : '') +
        (acikMi(sb.terimlerAcik) ? '<section class="bolum" data-duzen="baslangic-terimler" data-duzen-ad="Sık Duyacağın Kelimeler (Sözlük)"><h2 style="margin-bottom:12px">' + esc(sb.terimlerBaslik || 'Sık duyacağın kelimeler') + '</h2><dl class="terimler dar">' +
          b.terimler.map(function (t) { return '<dt>' + esc(t[0]) + '</dt><dd>' + esc(t[1]) + '</dd>'; }).join('') + '</dl></section>' : '') +
        '</div>'
    };
  }

  function sayfaYok() {
    return { baslik: 'Sayfa bulunamadı', nav: '', html: '<div class="kap"><div class="sayfa-bas"><h1>Bu sayfayı bulamadık</h1><p class="giris">Aradığın araç kaldırılmış ya da bağlantı değişmiş olabilir.</p><p style="margin-top:18px"><a class="dugme" href="#/">Görevlere dön</a></p></div></div>' };
  }

  function tarih(k) {
    var p = String(k).split('-');
    var aylar = ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran', 'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'];
    return (aylar[+p[1] - 1] || '') + ' ' + p[0];
  }

  /* ---------- Yönlendirme ---------- */

  var onizlemeModu = /[?&]onizleme=1/.test(location.search);
  var seciliDuzenAnahtar = { odak: '', id: '' };

  function seciliVurgula() {
    if (!onizlemeModu) return;
    document.querySelectorAll('.duzen-secili').forEach(function (el) { el.classList.remove('duzen-secili'); });
    if (!seciliDuzenAnahtar.odak) return;
    var secici = '[data-duzen="' + seciliDuzenAnahtar.odak + '"]' +
      (seciliDuzenAnahtar.id ? '[data-duzen-id="' + seciliDuzenAnahtar.id + '"]' : '');
    var bulunan = document.querySelector(secici);
    if (bulunan) bulunan.classList.add('duzen-secili');
  }

  function yonlendir(koruKaydirma) {
    var ham = location.hash.replace(/^#\/?/, '');
    if (ham === 'ana') return;
    var bol = ham.split('?');
    var yol = bol[0].split('/').filter(Boolean);
    var sorgu = new URLSearchParams(bol[1] || '');
    var s;
    if (!yol.length) s = sayfaAnasayfa();
    else if (yol[0] === 'araclar') s = sayfaAraclar(sorgu);
    else if (yol[0] === 'arac') s = sayfaArac(decodeURIComponent(yol[1] || ''));
    else if (yol[0] === 'gorev') s = sayfaGorev(decodeURIComponent(yol[1] || ''));
    else if (yol[0] === 'prompt') s = sayfaPrompt();
    else if (yol[0] === 'guvenli') s = sayfaGuvenli();
    else if (yol[0] === 'baslangic') s = sayfaBaslangic();
    else s = sayfaYok();

    ana.innerHTML = s.html;
    if (s.sonra) s.sonra();
    document.title = (s.baslik ? s.baslik + ' · ' : '') + S.ad;
    document.querySelectorAll('[data-nav]').forEach(function (a) {
      if (a.getAttribute('data-nav') === s.nav) a.setAttribute('aria-current', 'page');
      else a.removeAttribute('aria-current');
    });
    menuKapat();
    if (koruKaydirma !== true) {
      window.scrollTo(0, 0);
      if (yonlendirildi) ana.focus({ preventScroll: true });
    }
    yonlendirildi = true;
    seciliVurgula();
    if (onizlemeModu && window.parent && window.parent !== window) {
      window.parent.postMessage({ tip: 'onizleme-sayfa', hash: location.hash || '#/' }, '*');
    }
  }
  var yonlendirildi = false;

  function filtreYaz() {
    var p = new URLSearchParams();
    if (filtre.q) p.set('q', filtre.q);
    if (filtre.kat !== 'hepsi') p.set('kat', filtre.kat);
    if (filtre.ucret !== 'hepsi') p.set('ucret', filtre.ucret);
    var q = p.toString();
    history.replaceState(null, '', '#/araclar' + (q ? '?' + q : ''));
    document.getElementById('arac-sonuc').innerHTML = aracSonuc();
  }

  /* ---------- Etkileşim ---------- */

  var bildirim = document.getElementById('bildirim');
  var bildirimZaman;
  function bildir(m) {
    bildirim.textContent = m;
    bildirim.classList.add('acik');
    clearTimeout(bildirimZaman);
    bildirimZaman = setTimeout(function () { bildirim.classList.remove('acik'); }, 2000);
  }

  // file:// üzerinden açıldığında Clipboard API kapalı olabilir, bu yüzden eski yöntem de deneniyor.
  function kopyala(metin) {
    function eski() {
      var t = document.createElement('textarea');
      t.value = metin;
      t.style.position = 'fixed';
      t.style.opacity = '0';
      document.body.appendChild(t);
      t.select();
      var oldu = false;
      try { oldu = document.execCommand('copy'); } catch (e) { oldu = false; }
      t.remove();
      bildir(oldu ? 'Kopyalandı. Yapay zekâya yapıştırabilirsin.' : 'Kopyalanamadı. Metni seçip elle kopyala.');
    }
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(metin).then(function () { bildir('Kopyalandı. Yapay zekâya yapıştırabilirsin.'); }, eski);
    } else {
      eski();
    }
  }

  function menuKapat() {
    document.getElementById('ana-menu').classList.remove('acik');
    document.querySelector('.menu-dugme').setAttribute('aria-expanded', 'false');
  }

  document.addEventListener('click', function (e) {
    var k = e.target.closest('[data-kopyala]');
    if (k) { kopyala(k.getAttribute('data-kopyala')); return; }
    var f = e.target.closest('[data-filtre]');
    if (f) {
      var ad = f.getAttribute('data-filtre');
      filtre[ad] = f.getAttribute('data-deger');
      document.querySelectorAll('[data-filtre="' + ad + '"]').forEach(function (b) {
        b.setAttribute('aria-pressed', String(b === f));
      });
      filtreYaz();
      return;
    }
    var sg = e.target.closest('[data-slayt-git]');
    if (sg) {
      slaytGuncelle(Number(sg.getAttribute('data-slayt-git')));
      return;
    }
    var sy = e.target.closest('[data-slayt-yon]');
    if (sy) {
      slaytGuncelle(slaytIndeks + Number(sy.getAttribute('data-slayt-yon')));
      return;
    }
    var m = e.target.closest('.menu-dugme');
    if (m) {
      var acik = document.getElementById('ana-menu').classList.toggle('acik');
      m.setAttribute('aria-expanded', String(acik));
    }
  });

  document.addEventListener('input', function (e) {
    if (e.target.id === 'arac-ara') { filtre.q = e.target.value; filtreYaz(); }
    else if (e.target.closest && e.target.closest('#atolye-form')) atolyeCiz();
  });

  document.addEventListener('submit', function (e) {
    if (e.target.matches('[data-ara]')) {
      e.preventDefault();
      location.hash = '#/araclar?q=' + encodeURIComponent(e.target.q.value.trim());
    } else if (e.target.id === 'atolye-form') {
      e.preventDefault();
    }
  });

  /* ---------- Başlangıç ---------- */

  function cerceveUygula() {
    document.body.classList.toggle('cam-kapali', !acikMi(G.camEfekt));
    var ustEl = document.querySelector('.ust');
    if (ustEl) ustEl.hidden = !acikMi(G.ustMenu);
    var menuEl = document.getElementById('ana-menu');
    if (menuEl && Array.isArray(S.menu) && S.menu.length) {
      menuEl.innerHTML = S.menu.filter(function (m) { return acikMi(m.durum); }).map(function (m) {
        return '<a href="' + esc(m.adres || '#/') + '" data-nav="' + esc(m.id || '') + '">' + esc(m.ad || '') + '</a>';
      }).join('');
    }
    var altEl = document.querySelector('.alt');
    if (altEl) altEl.hidden = !acikMi(G.altBilgi);
    var altEkleEl = document.querySelector('.alt-ekle');
    if (altEkleEl) {
      altEkleEl.hidden = !acikMi(G.altPanelBaglanti);
      altEkleEl.textContent = G.altPanelYazi || 'Yönetim paneli';
    }

    document.getElementById('marka-ad').textContent = S.ad || '';
    document.getElementById('marka-okul').textContent = S.okul || '';
    document.getElementById('alt-okul').textContent = S.okul || '';
    var enYeni = ARACLAR.map(function (a) { return a.kontrol || ''; }).sort().pop();
    var varsayilanAltNot = 'Ücretler ve koşullar sık değişir; araç bilgileri ' + (enYeni ? tarih(enYeni) + ' itibarıyla kontrol edildi' : 'düzenli olarak kontrol edilir') + '. Kullanmadan önce aracın kendi sayfasına bakın. Logolar ve tanıtım görselleri araçların kendi sitelerinden alınmıştır; markalar sahiplerine aittir.';
    document.getElementById('alt-not').textContent = (G.altNot && G.altNot.trim()) ? G.altNot : varsayilanAltNot;
    var l = document.getElementById('marka-logo');
    var logoYol = S.logo === 'yok' ? '' : (S.logo || 'assets/ikon.svg');
    if (l) {
      if (logoYol) {
        l.src = logoYol;
        l.hidden = false;
      } else {
        l.hidden = true;
      }
    }
    var altLogo = document.getElementById('alt-logo');
    if (altLogo) {
      if (logoYol) {
        altLogo.src = logoYol;
        altLogo.hidden = false;
      } else {
        altLogo.hidden = true;
      }
    }
    var evren = document.querySelector('canvas.ai-evren');
    if (evren) evren.style.display = acikMi(G.aiArkaplan) ? '' : 'none';
  }
  cerceveUygula();
  /* ---------- Yapay Zekâ Veri Çipleri ve İnce Veri Çizgileri Arka Planı ---------- */
  function baslatAiArkaplan() {
    if (!acikMi(G.aiArkaplan)) return;
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    var c = document.createElement('canvas');
    c.className = 'ai-evren';
    c.setAttribute('aria-hidden', 'true');
    document.body.insertBefore(c, document.body.firstChild);
    var ctx = c.getContext('2d');
    if (!ctx) return;

    var w = 0, h = 0, dpr = 1;
    var cipler = [], hatlar = [], paketler = [];
    var ETIKETLER = ['AI·01', 'LLM', 'NPU', 'SYN', 'VEC', 'GEN', 'CTX', 'TOK'];

    function renkOku() {
      var st = getComputedStyle(document.documentElement);
      var koyuMu = st.colorScheme === 'dark';
      return {
        koyu: koyuMu,
        vurgu: (st.getPropertyValue('--altin') || '#0f8a7a').trim(),
        mavi: (st.getPropertyValue('--k-metin') || '#1f5fa8').trim(),
        mor: (st.getPropertyValue('--k-video') || '#76398a').trim()
      };
    }
    var palet = renkOku();

    function boyutla() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      c.width = w * dpr;
      c.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      olustur();
    }

    function olustur() {
      palet = renkOku();
      var carpan = G.aiYogunluk === 'hafif' ? 0.55 : (G.aiYogunluk === 'yogun' ? 1.45 : 1);
      var adet = Math.max(8, Math.min(42, Math.round(Math.floor((w * h) / 52000) * carpan)));
      cipler = [];
      for (var i = 0; i < adet; i++) {
        var tip = i % 3; // 0: kare mikroçip, 1: veri kapsülü, 2: elmas düğüm
        cipler.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.28,
          vy: (Math.random() - 0.5) * 0.24 - 0.06,
          tip: tip,
          etiket: ETIKETLER[i % ETIKETLER.length],
          faz: Math.random() * Math.PI * 2,
          boy: tip === 1 ? 38 : (tip === 0 ? 22 : 14),
          renkTip: i % 2 === 0 ? 'vurgu' : 'mavi'
        });
      }

      /* Arka planda sabit devre veri hatları (ince 90° ve 45° kırılımlı çizgiler) */
      hatlar = [];
      var hatSay = Math.max(3, Math.min(15, Math.round(Math.floor(w / 180) * carpan)));
      for (var j = 0; j < hatSay; j++) {
        var x1 = ((j + 0.5) / hatSay) * w + (Math.random() - 0.5) * 80;
        var y1 = Math.random() * h * 0.3;
        var kırX = x1 + (j % 2 === 0 ? 55 : -55);
        var kırY = y1 + 90 + Math.random() * 120;
        var y2 = Math.min(h - 30, kırY + 140 + Math.random() * 220);
        hatlar.push({
          pts: [
            { x: x1, y: y1 },
            { x: x1, y: kırY - 35 },
            { x: kırX, y: kırY },
            { x: kırX, y: y2 }
          ],
          ilerleme: Math.random(),
          hiz: 0.0014 + Math.random() * 0.0016,
          renkTip: j % 2 === 0 ? 'vurgu' : 'mavi'
        });
      }
      paketler = [];
    }

    function cipCiz(p, t) {
      var nabiz = 0.5 + 0.5 * Math.sin(t * 0.002 + p.faz);
      var anaRenk = palet[p.renkTip];
      ctx.save();
      ctx.translate(p.x, p.y);

      if (p.tip === 0) {
        /* Kare AI Mikroçip + Kenar Pinleri */
        var s = p.boy;
        var yari = s / 2;
        ctx.globalAlpha = (palet.koyu ? 0.14 : 0.09) + nabiz * 0.04;
        ctx.strokeStyle = anaRenk;
        ctx.fillStyle = anaRenk;
        ctx.lineWidth = 1;

        // Çip gövdesi
        ctx.beginPath();
        ctx.roundRect(-yari, -yari, s, s, 4);
        ctx.stroke();

        // İç çekirdek
        ctx.globalAlpha = (palet.koyu ? 0.08 : 0.045) + nabiz * 0.03;
        ctx.fillRect(-yari + 5, -yari + 5, s - 10, s - 10);

        // Pin bacakları (üst, alt, sol, sağ)
        ctx.globalAlpha = (palet.koyu ? 0.15 : 0.10);
        for (var k = -1; k <= 1; k++) {
          var ofset = k * 5;
          ctx.beginPath();
          ctx.moveTo(ofset, -yari); ctx.lineTo(ofset, -yari - 3.5);
          ctx.moveTo(ofset, yari); ctx.lineTo(ofset, yari + 3.5);
          ctx.moveTo(-yari, ofset); ctx.lineTo(-yari - 3.5, ofset);
          ctx.moveTo(yari, ofset); ctx.lineTo(yari + 3.5, ofset);
          ctx.stroke();
        }
      } else if (p.tip === 1) {
        /* Şeffaf Veri Çipi Kapsülü (AI·01 / LLM / NPU) */
        var gw = 42, gh = 17;
        ctx.globalAlpha = (palet.koyu ? 0.13 : 0.085) + nabiz * 0.035;
        ctx.strokeStyle = anaRenk;
        ctx.lineWidth = 0.9;
        ctx.beginPath();
        ctx.roundRect(-gw / 2, -gh / 2, gw, gh, 5);
        ctx.stroke();

        ctx.globalAlpha = (palet.koyu ? 0.05 : 0.025);
        ctx.fillStyle = anaRenk;
        ctx.fill();

        // Küçük durum noktası + veri etiketi
        ctx.globalAlpha = (palet.koyu ? 0.22 : 0.15);
        ctx.beginPath();
        ctx.arc(-gw / 2 + 6, 0, 1.8, 0, Math.PI * 2);
        ctx.fill();

        ctx.font = '600 7.5px ui-monospace, SFMono-Regular, Consolas, monospace';
        ctx.textAlign = 'left';
        ctx.textBaseline = 'middle';
        ctx.fillText(p.etiket, -gw / 2 + 11, 0.5);
      } else {
        /* Elmas Sinir Ağı Düğümü */
        var r = 5.5;
        ctx.globalAlpha = (palet.koyu ? 0.14 : 0.09) + nabiz * 0.04;
        ctx.strokeStyle = anaRenk;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(0, -r); ctx.lineTo(r, 0); ctx.lineTo(0, r); ctx.lineTo(-r, 0);
        ctx.closePath();
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(0, 0, 1.6, 0, Math.PI * 2);
        ctx.fillStyle = anaRenk;
        ctx.fill();
      }

      ctx.restore();
    }

    function hatCiz(hObj) {
      var pts = hObj.pts;
      var renk = palet[hObj.renkTip];
      ctx.save();
      ctx.strokeStyle = renk;
      ctx.lineWidth = 0.85;
      ctx.globalAlpha = palet.koyu ? 0.07 : 0.045;
      ctx.beginPath();
      ctx.moveTo(pts[0].x, pts[0].y);
      for (var i = 1; i < pts.length; i++) ctx.lineTo(pts[i].x, pts[i].y);
      ctx.stroke();

      // Uç düğüm noktaları
      ctx.fillStyle = renk;
      ctx.globalAlpha = palet.koyu ? 0.13 : 0.08;
      ctx.beginPath();
      ctx.arc(pts[0].x, pts[0].y, 2, 0, Math.PI * 2);
      ctx.arc(pts[pts.length - 1].x, pts[pts.length - 1].y, 2, 0, Math.PI * 2);
      ctx.fill();

      // Hat üzerinde akan veri ışığı (pulse)
      hObj.ilerleme = (hObj.ilerleme + hObj.hiz) % 1;
      var segSay = pts.length - 1;
      var tam = hObj.ilerleme * segSay;
      var seg = Math.min(segSay - 1, Math.floor(tam));
      var lokal = tam - seg;
      var px = pts[seg].x + (pts[seg + 1].x - pts[seg].x) * lokal;
      var py = pts[seg].y + (pts[seg + 1].y - pts[seg].y) * lokal;

      ctx.globalAlpha = palet.koyu ? 0.32 : 0.22;
      ctx.beginPath();
      ctx.arc(px, py, 2.2, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }

    function kare(t) {
      if (!document.hidden) {
        ctx.clearRect(0, 0, w, h);

        // 1. Sabit ince devre veri hatları
        for (var j = 0; j < hatlar.length; j++) hatCiz(hatlar[j]);

        // 2. Çiplerin hareketi ve birbirine yaklaşan çipler arasındaki ince veri bağları
        var maxMesafe = 195;
        for (var i = 0; i < cipler.length; i++) {
          var a = cipler[i];
          a.x += a.vx;
          a.y += a.vy;
          if (a.x < -40) a.x = w + 40;
          else if (a.x > w + 40) a.x = -40;
          if (a.y < -40) a.y = h + 40;
          else if (a.y > h + 40) a.y = -40;

          for (var k = i + 1; k < cipler.length; k++) {
            var b = cipler[k];
            var dx = b.x - a.x, dy = b.y - a.y;
            var mes = Math.sqrt(dx * dx + dy * dy);
            if (mes < maxMesafe) {
              var oran = 1 - mes / maxMesafe;
              ctx.save();
              ctx.strokeStyle = palet[a.renkTip];
              ctx.lineWidth = 0.75;
              ctx.globalAlpha = oran * (palet.koyu ? 0.11 : 0.065);
              ctx.beginPath();
              // İnce veri çizgisi
              ctx.moveTo(a.x, a.y);
              ctx.lineTo(b.x, b.y);
              ctx.stroke();

              // Çizgi üzerinde kayan küçük veri sinyali
              if ((i + k) % 4 === 0) {
                var akis = ((t * 0.00035 + i * 0.17) % 1);
                var sx = a.x + dx * akis;
                var sy = a.y + dy * akis;
                ctx.fillStyle = palet[a.renkTip];
                ctx.globalAlpha = oran * (palet.koyu ? 0.28 : 0.18);
                ctx.beginPath();
                ctx.arc(sx, sy, 1.6, 0, Math.PI * 2);
                ctx.fill();
              }
              ctx.restore();
            }
          }
        }

        // 3. Veri çiplerini çiz
        for (var m = 0; m < cipler.length; m++) cipCiz(cipler[m], t);
      }
      requestAnimationFrame(kare);
    }

    boyutla();
    window.addEventListener('resize', boyutla);
    requestAnimationFrame(kare);
  }

  /* ---------- Yönetim Paneli Canlı Önizleme ve Tıkla-Düzenle Köprüsü ---------- */
  if (onizlemeModu) {
    var st = document.createElement('style');
    st.textContent =
      '[data-duzen] { position: relative; transition: outline-color .15s, box-shadow .15s; cursor: pointer !important; }' +
      '[data-duzen]:hover { outline: 2px dashed var(--altin); outline-offset: 4px; }' +
      '[data-duzen].duzen-secili { outline: 2.5px solid var(--altin) !important; outline-offset: 4px; box-shadow: 0 0 0 4px color-mix(in srgb, var(--altin) 18%, transparent); }' +
      '[data-duzen]:hover::after, [data-duzen].duzen-secili::after {' +
      '  content: "✎ " attr(data-duzen-ad); position: absolute; top: -11px; right: 8px; z-index: 40;' +
      '  background: var(--altin); color: var(--koyu-yazi); font-family: var(--sans); font-size: 11px; font-weight: 700;' +
      '  line-height: 1.2; padding: 3px 8px; border-radius: 999px; pointer-events: none; white-space: nowrap;' +
      '  box-shadow: 0 4px 12px rgba(0,0,0,.18); letter-spacing: .01em;' +
      '}';
    document.head.appendChild(st);

    document.addEventListener('click', function (e) {
      if (e.target.closest('[data-slayt-git], [data-slayt-yon], [data-filtre], [data-kopyala], .menu-dugme')) return;
      var d = e.target.closest('[data-duzen]');
      if (!d) return;
      var odak = d.getAttribute('data-duzen') || '';
      var id = d.getAttribute('data-duzen-id') || '';
      var ad = d.getAttribute('data-duzen-ad') || odak;
      seciliDuzenAnahtar = { odak: odak, id: id };
      seciliVurgula();
      if (window.parent && window.parent !== window) {
        window.parent.postMessage({
          tip: 'onizleme-sec',
          odak: odak,
          id: id,
          ad: ad,
          hash: location.hash || '#/'
        }, '*');
      }
      var bag = e.target.closest('a');
      if (bag) {
        var href = bag.getAttribute('href') || '';
        // Üst menü bağlantılarına tıklanınca hem o sayfaya geçsin hem üst menü ayarları açılsın
        if (d.getAttribute('data-duzen') === 'ust-menu' && href.indexOf('#') === 0) return;
        // Kartlara veya dış bağlantılara tek tıklamada sayfadan ayrılmasın, solda ayarları açılsın (çift tıklamada içine girer)
        e.preventDefault();
      }
    }, true);

    document.addEventListener('dblclick', function (e) {
      var bag = e.target.closest('a[href^="#/"]');
      if (bag) {
        location.hash = bag.getAttribute('href');
      }
    });

    window.addEventListener('message', function (e) {
      var msg = e.data;
      if (!msg || typeof msg !== 'object') return;
      if (msg.tip === 'veri-guncelle' && msg.veri) {
        var v = msg.veri;
        if (v.site) window.SITE = v.site;
        if (v.araclar) window.ARACLAR = v.araclar;
        if (v.gorseller) window.GORSELLER = v.gorseller;
        if (v.gorevler) window.GOREVLER = v.gorevler;
        if (v.rehber) window.REHBER = v.rehber;
        if (v.tema) window.TEMA = v.tema;

        S = window.SITE || {};
        G = S.gorunum || {};
        A = S.anasayfa || {};
        SF = S.sayfalar || {};
        ARACLAR = (window.ARACLAR || []).filter(function (a) { return !a.gizli; });
        GOREVLER = (window.GOREVLER || []).filter(function (g) { return !g.gizli; });
        GORSELLER = window.GORSELLER || {};
        R = window.REHBER || {};
        aktif = ARACLAR.filter(function (a) { return a.durum !== 'kapandi'; });
        kapanan = ARACLAR.filter(function (a) { return a.durum === 'kapandi'; });

        if (window.temaUygula && window.TEMA) window.temaUygula(window.TEMA);
        if (window.kategoriRenkleri && S.kategoriler) window.kategoriRenkleri(S.kategoriler);
        cerceveUygula();
        yonlendir(true);
      } else if (msg.tip === 'sayfa-git' && msg.hash) {
        if (location.hash !== msg.hash) location.hash = msg.hash;
        else yonlendir(true);
      } else if (msg.tip === 'odak-vurgula') {
        seciliDuzenAnahtar = { odak: msg.odak || '', id: msg.id || '' };
        seciliVurgula();
      }
    });
  }

  window.addEventListener('hashchange', function () { yonlendir(false); });
  yonlendir(false);
  baslatAiArkaplan();
})();
