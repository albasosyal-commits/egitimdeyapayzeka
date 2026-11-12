/* Yönetim paneli.

   Çalışma biçimi: sayfa açılırken veri/ klasöründeki dosyalar belleğe alınır.
   Yaptığın her değişiklik önce bellekte ve tarayıcı taslağında tutulur;
   "Kaydet" dediğinde veri dosyalarına yazılır.

   node yerel-sunucu.js çalışıyorsa kayıt tek tıkla yapılır. Çalışmıyorsa panel
   dosyaları indirir, sen de veri klasörüne taşırsın. */
(function () {
  'use strict';

  /* ===================== 1. Durum ===================== */

  var TASLAK = 'rehber-panel-taslak';
  var CANLI = 'rehber-canli-veri';
  var OTURUM = 'rehber-panel-oturum';

  if (window.canliVeriUygula) window.canliVeriUygula();

  function kopya(x) { return x === undefined ? undefined : JSON.parse(JSON.stringify(x)); }

  var DOSYA = {
    site: { yol: 'veri/site.js', degisken: 'SITE', ad: 'Site ayarları' },
    araclar: { yol: 'veri/araclar.js', degisken: 'ARACLAR', ad: 'Araç listesi' },
    gorseller: { yol: 'veri/gorseller.js', degisken: 'GORSELLER', ad: 'Görsel eşleşmeleri' },
    gorevler: { yol: 'veri/gorevler.js', degisken: 'GOREVLER', ad: 'Görev rehberleri' },
    rehber: { yol: 'veri/rehber.js', degisken: 'REHBER', ad: 'Rehber metinleri' },
    tema: { yol: 'veri/tema.js', degisken: 'TEMA', ad: 'Tema ve renkler' },
    yonetici: { yol: 'veri/yonetici.js', degisken: 'YONETICI', ad: 'Panel girişi' }
  };

  var BASLIK = {
    site: '/* Sitenin genel ayarları. Yönetim panelindeki "Site ayarları" bölümünden düzenlenir. */',
    araclar: '/* Araç listesi. Yönetim panelindeki "Araçlar" bölümünden düzenlenir.\n' +
      '   Elle düzenleyeceksen yapıyı (anahtar adlarını) bozmamaya dikkat et. */',
    gorseller: '/* Araç logoları ve tanıtım görselleri. Dosyalar assets/logo ve assets/gorsel klasörlerindedir.\n' +
      '   Yönetim panelindeki "Görseller" bölümünden yüklenir.\n' +
      '   Logosu olmayan araç için site, araç adının baş harfinden otomatik bir rozet çizer. */',
    gorevler: '/* Ana sayfadaki "Yapacağın işi seç" rehberleri. Panelin "Görev rehberleri" bölümünden düzenlenir.\n' +
      '   "araclar" içindeki id\'ler veri/araclar.js dosyasındaki araçları gösterir. */',
    rehber: '/* Prompt Atölyesi, Güvenli Kullanım ve Yeni Başlayanlar sayfalarının metinleri.\n' +
      '   Panelin "Rehber metinleri" bölümünden düzenlenir. */',
    tema: '/* Sitenin renkleri, yazı tipi ve köşe yuvarlaklığı.\n' +
      '   Panelin "Tema ve renkler" bölümünden düzenlenir; css/site.css içindeki\n' +
      '   varsayılanların üzerine yazılır. */'
  };

  var D = {
    site: kopya(window.SITE) || {},
    araclar: kopya(window.ARACLAR) || [],
    gorseller: kopya(window.GORSELLER) || {},
    gorevler: kopya(window.GOREVLER) || [],
    rehber: kopya(window.REHBER) || {},
    tema: kopya(window.TEMA) || {},
    yonetici: kopya(window.YONETICI) || {}
  };

  function siteVarsayilanlariTamamla(s) {
    if (!s) return;
    if (!s.logo) s.logo = 'assets/ikon.svg';
    if (!s.paylasimGorsel) s.paylasimGorsel = 'assets/og-banner.png';
    if (!Array.isArray(s.menu) || !s.menu.length) {
      s.menu = [
        { id: 'gorev', ad: 'Görevler', adres: '#/', durum: 'acik' },
        { id: 'araclar', ad: 'Araçlar', adres: '#/araclar', durum: 'acik' },
        { id: 'prompt', ad: 'Prompt Atölyesi', adres: '#/prompt', durum: 'acik' },
        { id: 'guvenli', ad: 'Güvenli Kullanım', adres: '#/guvenli', durum: 'acik' },
        { id: 'baslangic', ad: 'Yeni Başlayanlar', adres: '#/baslangic', durum: 'acik' }
      ];
    }
    s.gorunum = Object.assign({
      aiArkaplan: 'acik',
      aiYogunluk: 'normal',
      camEfekt: 'acik',
      ustMenu: 'acik',
      altBilgi: 'acik',
      altPanelBaglanti: 'acik',
      altPanelYazi: 'Yönetim paneli',
      altNot: ''
    }, s.gorunum || {});
    s.anasayfa = Object.assign({
      sira: ['defter', 'serit', 'gorevler', 'aliskanliklar'],
      defterAcik: 'acik',
      ustEtiketAcik: 'acik',
      ustEtiket: '',
      baslik: 'Bugün ne hazırlıyorsun?',
      giris: 'Yapacağın işi seç. Hangi yapay zekâyı açacağını, ne yazacağını ve neyi kontrol edeceğini adım adım gösterelim.',
      aramaAcik: 'acik',
      aramaYerTutucu: 'Araç ya da iş ara: sınav, şarkı, Gemini…',
      aramaDugme: 'Ara',
      sayilarAcik: 'acik',
      slaytAcik: 'acik',
      slaytEtiket: 'ÖNE ÇIKAN ARAÇ',
      slaytKutuBaslik: '✦ Sınıfta ne işe yarar?',
      slaytBaglantiYazi: 'Rehberi ve promptu aç',
      seritAcik: 'acik',
      seritEtiket: 'Vitrin & Yeni Araçlar',
      gorevlerAcik: 'acik',
      gorevlerBaslik: 'Yapacağın işi seç',
      gorevlerBaglantiAcik: 'acik',
      gorevlerBaglantiYazi: 'Tüm araçları gör',
      aliskanliklarAcik: 'acik',
      aliskanliklarBaslik: 'Araçtan önce üç alışkanlık',
      aliskanliklar: [
        { no: '1', baslik: 'Aracın türünü bil', metin: 'Metinden görsele, görselden videoya: işin için doğru türü seç.', adres: '#/baslangic' },
        { no: '2', baslik: 'İyi prompt yaz', metin: 'Sınıf düzeyini, amacı ve biçimi söyle. Atölyede hazır formülle dene.', adres: '#/prompt' },
        { no: '3', baslik: 'Çıktıyı kontrol et', metin: 'Yapay zekâ yanılabilir. Öğrenci bilgisi girme, sonucu sınıfa götürmeden doğrula.', adres: '#/guvenli' }
      ]
    }, s.anasayfa || {});
    if (!Array.isArray(s.anasayfa.sira) || !s.anasayfa.sira.length) {
      s.anasayfa.sira = ['defter', 'serit', 'gorevler', 'aliskanliklar'];
    }
    s.sayfalar = s.sayfalar || {};
    s.sayfalar.araclar = Object.assign({
      baslik: 'Araç rehberi',
      giris: 'Ücreti, yaş sınırı ve öğretmene faydası bir bakışta. Bir araca tıklayınca hazır prompt ve dikkat edilecekleri görürsün.',
      aramaAcik: 'acik',
      aramaYerTutucu: 'Ara: sunum, seslendirme, Kahoot…',
      kategoriFiltreAcik: 'acik',
      ucretFiltreAcik: 'acik',
      kapananAcik: 'acik'
    }, s.sayfalar.araclar || {});
    s.sayfalar.prompt = Object.assign({
      baslik: 'Prompt Atölyesi',
      giris: 'Prompt, yapay zekâya ne istediğini anlatan yönergedir. Ne kadar açık yazarsan sonuç o kadar işine yarar: iyi bir prompt, yeni bir öğretmen stajyere verilen iyi bir talimat gibidir.',
      kiyasAcik: 'acik',
      kiyasBaslik: 'Aynı istek, iki farklı sonuç',
      formulAcik: 'acik',
      formulBaslik: 'Güçlü promptun beş parçası',
      atolyeAcik: 'acik',
      atolyeBaslik: 'Kendi promptunu oluştur',
      atolyeAlt: 'Formu doldur, prompt yanda yazılsın. Kopyala ve istediğin yapay zekâya yapıştır.',
      hazirAcik: 'acik',
      hazirBaslik: 'Hazır promptlar',
      hazirAlt: 'İşe göre seçip kopyala.'
    }, s.sayfalar.prompt || {});
    s.sayfalar.guvenli = Object.assign({
      baslik: 'Güvenli kullanım',
      yapYapmaAcik: 'acik',
      yapmaBaslik: 'Yapay zekâya girme',
      yapBaslik: 'Bunun yerine',
      ilkelerAcik: 'acik',
      ilkelerBaslik: 'Beş temel ilke',
      kontrolAcik: 'acik',
      kontrolBaslik: 'Sınıfa götürmeden önce',
      yasAcik: 'acik',
      yasBaslik: 'Araçların yaş sınırları',
      kaynaklarAcik: 'acik',
      kaynaklarBaslik: 'Resmî kaynaklar'
    }, s.sayfalar.guvenli || {});
    s.sayfalar.baslangic = Object.assign({
      baslik: 'Yapay zekâya yeni mi başlıyorsun?',
      adimlarAcik: 'acik',
      adimlarBaslik: 'İlk 30 dakikan',
      turlerAcik: 'acik',
      turlerBaslik: 'Yapay zekâ türleri',
      turlerAlt: 'Tür, verdiğin şey ile aldığın şeye göre adlandırılır.',
      terimlerAcik: 'acik',
      terimlerBaslik: 'Sık duyacağın kelimeler'
    }, s.sayfalar.baslangic || {});
  }
  siteVarsayilanlariTamamla(D.site);

  var degisen = {};
  var sunucuVar = false;
  var anahtar = null;
  var bolumAdi = 'panel';
  var duzenArac = null;    // düzenlenen aracın id'si, yeni araçta '*yeni*'
  var duzenGorev = null;
  var filtre = { q: '', kat: '', durum: '' };
  var gorselFiltre = 'hepsi';
  var gorselSurum = {};    // yüklenen görselin tarayıcıda önbelleğe takılmaması için
  var kaydedilen = {};     // sunucusuz kipte: elle kaydedilmiş dosyalar

  /* ===================== 2. Yardımcılar ===================== */

  function esc(m) {
    return String(m == null ? '' : m).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function sade(m) {
    return String(m || '').toLocaleLowerCase('tr')
      .replace(/ı/g, 'i').replace(/ş/g, 's').replace(/ğ/g, 'g')
      .replace(/ü/g, 'u').replace(/ö/g, 'o').replace(/ç/g, 'c')
      .normalize('NFD').replace(/[̀-ͯ]/g, '');
  }
  function kimlik(ad) { return sade(ad).replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''); }
  function kirp(s) { return String(s == null ? '' : s).trim(); }
  function el(id) { return document.getElementById(id); }

  var bildirZaman;
  function bildir(m) {
    var b = el('bildirim');
    b.textContent = m;
    b.classList.add('acik');
    clearTimeout(bildirZaman);
    bildirZaman = setTimeout(function () { b.classList.remove('acik'); }, 3000);
  }

  function oku(yol) {
    return String(yol).split('.').reduce(function (o, k) {
      return (o === null || o === undefined) ? undefined : o[k];
    }, D);
  }
  function yaz(yol, deger) {
    var p = String(yol).split('.');
    var son = p.pop();
    var o = D;
    for (var i = 0; i < p.length; i++) {
      if (o[p[i]] === null || o[p[i]] === undefined) o[p[i]] = /^\d+$/.test(p[i + 1] || son) ? [] : {};
      o = o[p[i]];
    }
    o[son] = deger;
  }

  function kirlet(ad) {
    degisen[ad] = true;
    kaydedilen[ad] = false;
    taslakYaz();
    durumCiz();
  }
  function kirliMi() {
    return Object.keys(degisen).some(function (k) { return degisen[k]; });
  }
  function kirliDosyalar() {
    return Object.keys(DOSYA).filter(function (k) { return degisen[k]; });
  }

  /* Taslak: tarayıcı kapanırsa değişiklikler kaybolmasın. */
  function taslakYaz() {
    try {
      localStorage.setItem(TASLAK, JSON.stringify({ veri: D, degisen: degisen }));
    } catch (e) { /* depolama kapalıysa yalnızca taslak tutulamaz */ }
  }
  function taslakOku() {
    try {
      var t = localStorage.getItem(TASLAK);
      return t ? JSON.parse(t) : null;
    } catch (e) { return null; }
  }
  function taslakSil() {
    try { localStorage.removeItem(TASLAK); } catch (e) { /* yok say */ }
  }

  /* ===================== 3. Dosya metni ===================== */

  // Boş alanlar dosyaya yazılmasın; veri dosyası okunaklı kalsın.
  function sadeNesne(n) {
    var c = {};
    Object.keys(n).forEach(function (k) {
      var d = n[k];
      if (typeof d === 'string') d = d.trim();
      if (d === '' || d === null || d === undefined) return;
      if (Array.isArray(d)) {
        d = d.filter(function (x) { return x !== '' && x !== null && x !== undefined; });
        if (!d.length) return;
      }
      c[k] = d;
    });
    return c;
  }

  function dosyaMetni(ad) {
    if (ad === 'yonetici') {
      return '/* Yönetim panelinin kullanıcı adı ve şifresi.\n\n' +
        '   Şifre burada düz metin değil, SHA-256 özeti olarak tutulur. Değiştirmek için\n' +
        '   panelde "Site ayarları" bölümündeki şifre formunu kullan.\n\n' +
        '   ÖNEMLİ: Bu giriş, paneli yanlışlıkla açmayı engelleyen bir kilittir; gerçek bir\n' +
        '   güvenlik duvarı değildir. Site dosyalarını okuyabilen biri bu dosyayı da okur.\n' +
        '   Bu yüzden yonetim.html sayfasını herkese açık bir sunucuya koymayın. */\n' +
        'window.YONETICI = ' + JSON.stringify({
          kullanici: kirp(D.yonetici.kullanici),
          sifreOzet: kirp(D.yonetici.sifreOzet)
        }, null, 2) + ';\n';
    }
    var veri = kopya(D[ad]);
    if (ad === 'araclar') veri = veri.map(sadeNesne);
    if (ad === 'gorevler') veri = veri.map(function (g) {
      g = sadeNesne(g);
      if (g.araclar) g.araclar = g.araclar.map(sadeNesne).filter(function (a) { return a.id; });
      if (g.promptlar) g.promptlar = g.promptlar.map(sadeNesne).filter(function (p) { return p.prompt; });
      return g;
    });
    return BASLIK[ad] + '\nwindow.' + DOSYA[ad].degisken + ' = ' + JSON.stringify(veri, null, 2) + ';\n';
  }

  /* ===================== 4. Sunucu ile konuşma ===================== */

  var apiKok = 'api';

  function kaliciAnahtar() {
    var k = kirp((D.yonetici || {}).kullanici);
    var o = kirp((D.yonetici || {}).sifreOzet);
    return (k && o && window.ozet256) ? window.ozet256(k + ':' + o) : 'yerel';
  }

  function canliVeriKaydet(dosyalar) {
    try {
      var mevcut = {};
      var ham = localStorage.getItem(CANLI);
      if (ham) {
        var parsed = JSON.parse(ham);
        if (parsed && parsed.veri) mevcut = parsed.veri;
      }
      (dosyalar || Object.keys(DOSYA)).forEach(function (k) {
        if (D[k] !== undefined) mevcut[k] = kopya(D[k]);
      });
      localStorage.setItem(CANLI, JSON.stringify({ tarih: new Date().toISOString(), veri: mevcut }));
    } catch (e) { /* depolama doluysa yok say */ }
  }

  function istek(adres, govde) {
    var secenek = {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'x-anahtar': (anahtar && anahtar !== 'yerel') ? anahtar : kaliciAnahtar()
      },
      body: JSON.stringify(govde || {})
    };
    return fetch(apiKok + '/' + adres, secenek).then(function (c) {
      return c.json().then(function (v) {
        if (!c.ok || !v.tamam) throw new Error(v.hata || 'Sunucu hatası (' + c.status + ')');
        return v;
      });
    });
  }

  function sunucuBak() {
    var adaylar = ['api', 'http://localhost:8731/api', 'http://127.0.0.1:8731/api'];
    function dene(indeks) {
      if (indeks >= adaylar.length) {
        sunucuVar = false;
        return Promise.resolve(false);
      }
      var kokAday = adaylar[indeks];
      return fetch(kokAday + '/durum').then(function (c) {
        return c.json();
      }).then(function (v) {
        if (v && v.sunucu) {
          apiKok = kokAday;
          sunucuVar = true;
          return true;
        }
        return dene(indeks + 1);
      }).catch(function () {
        return dene(indeks + 1);
      });
    }
    return dene(0);
  }

  /* ===================== 5. Giriş ===================== */

  function girisAc() {
    el('giris-perde').hidden = false;
    el('panel').hidden = true;
  }
  function panelAc() {
    el('giris-perde').hidden = true;
    el('panel').hidden = false;
    catiCiz();
    ciz();
  }

  function girisDene(kullanici, sifre) {
    var k = kirp(kullanici), s = String(sifre || '');
    if (sunucuVar) {
      return istek('giris', { kullanici: k, sifre: s }).then(function (v) {
        anahtar = v.anahtar || kaliciAnahtar();
        try { sessionStorage.setItem(OTURUM, anahtar); } catch (e) { /* yok say */ }
      });
    }
    return new Promise(function (coz, red) {
      var dogru = k === kirp(D.yonetici.kullanici) &&
        window.ozet256(s) === kirp(D.yonetici.sifreOzet);
      if (!dogru) { red(new Error('Kullanıcı adı ya da şifre yanlış.')); return; }
      anahtar = kaliciAnahtar();
      try { sessionStorage.setItem(OTURUM, anahtar); } catch (e) { /* yok say */ }
      coz();
    });
  }

  el('giris-form').addEventListener('submit', function (e) {
    e.preventDefault();
    var h = el('g-hata');
    h.hidden = true;
    el('g-gonder').disabled = true;
    girisDene(el('g-kullanici').value, el('g-sifre').value).then(function () {
      el('g-sifre').value = '';
      panelAc();
    }).catch(function (err) {
      h.textContent = err.message;
      h.hidden = false;
      el('g-sifre').select();
    }).then(function () {
      el('g-gonder').disabled = false;
    });
  });

  el('cikis').addEventListener('click', function () {
    if (kirliMi() && !confirm('Kaydedilmemiş değişiklikler var. Yine de çıkmak istiyor musun?')) return;
    try { sessionStorage.removeItem(OTURUM); } catch (e) { /* yok say */ }
    if (sunucuVar && anahtar && anahtar !== 'yerel') istek('cikis').catch(function () { });
    anahtar = null;
    girisAc();
  });

  /* ===================== 6. Çatı ===================== */

  var BOLUMLER = [
    { ad: 'panel', baslik: 'Panel', im: '▦' },
    { ad: 'yerlesim', baslik: 'Sayfalar ve yerleşim', im: '⊞' },
    { ad: 'araclar', baslik: 'Araçlar', im: '✦', say: function () { return D.araclar.length; } },
    { ad: 'gorseller', baslik: 'Görseller', im: '▣', say: function () { return logolu(); } },
    { ad: 'gorevler', baslik: 'Görev rehberleri', im: '☰', say: function () { return D.gorevler.length; } },
    { ad: 'tema', baslik: 'Tema ve renkler', im: '◗' },
    { ad: 'ayarlar', baslik: 'Site ayarları', im: '⚙' },
    { ad: 'rehber', baslik: 'Rehber metinleri', im: '✎' },
    { ad: 'yedek', baslik: 'Yedek ve aktarma', im: '↓' }
  ];

  function logolu() {
    return D.araclar.filter(function (a) { return (D.gorseller[a.id] || {}).logo; }).length;
  }

  function catiCiz() {
    el('yan-menu').innerHTML = BOLUMLER.map(function (b) {
      return '<button type="button" data-bolum="' + b.ad + '">' +
        '<span class="im" aria-hidden="true">' + b.im + '</span>' + esc(b.baslik) +
        (b.say ? '<span class="say">' + b.say() + '</span>' : '') + '</button>';
    }).join('');
    el('yan-ad').textContent = D.site.ad || 'Rehber';
    el('yan-im').innerHTML = '<img src="' + esc(D.site.logo || 'assets/ikon.svg') + '" alt="" style="width:100%;height:100%;object-fit:contain">';
    el('sunucu-durum').innerHTML = sunucuVar
      ? '<b>Sunucu açık.</b> Kaydet dediğinde dosyalar doğrudan yazılır.'
      : '<b>Anlık kayıt etkin.</b> Kaydet dediğinde değişiklikler doğrudan uygulanır.';
    durumCiz();
  }

  function durumCiz() {
    var kirli = kirliDosyalar().length;
    var k = el('kayit-durum');
    k.className = 'kayit-durum ' + (kirli ? 'bekler' : 'temiz');
    el('kayit-yazi').textContent = kirli
      ? kirli + ' dosya kaydedilmeyi bekliyor'
      : 'Her şey kayıtlı';
    el('kaydet-dugme').disabled = !kirli;
    document.querySelectorAll('#yan-menu [data-bolum]').forEach(function (b) {
      var tanim = BOLUMLER.find(function (x) { return x.ad === b.getAttribute('data-bolum'); });
      b.setAttribute('aria-current', String(b.getAttribute('data-bolum') === bolumAdi));
      var say = b.querySelector('.say');
      if (say && tanim && tanim.say) say.textContent = tanim.say();
    });
  }

  function git(ad) {
    bolumAdi = ad;
    duzenArac = null;
    duzenGorev = null;
    ciz();
    basaDon();
  }

  function basaDon() { window.scrollTo({ top: 0, behavior: 'auto' }); }

  function ciz() {
    var b = BOLUMLER.find(function (x) { return x.ad === bolumAdi; });
    el('bolum-baslik').textContent = b ? b.baslik : 'Kaydet';
    el('bolum').classList.toggle('genis-govde', bolumAdi === 'yerlesim');
    if (bolumAdi === 'yerlesim' && el('canli-onizleme') && el('gd-sol-panel')) {
      el('gd-sol-panel').innerHTML = solPanelCiz();
      yerlesimCubukGuncelle();
      onizlemeGonder();
      durumCiz();
      return;
    }
    el('bolum').innerHTML = (CIZERLER[bolumAdi] || CIZERLER.panel)();
    if (bolumAdi === 'yerlesim') {
      var cerceve = el('canli-onizleme');
      if (cerceve) {
        cerceve.addEventListener('load', function () {
          onizlemeGonder();
        });
      }
    }
    durumCiz();
  }

  /* ===================== 7. Ortak form parçaları ===================== */

  function alan(etiket, yol, secenek) {
    secenek = secenek || {};
    var d = oku(yol);
    var deger = secenek.tip === 'satirlar' ? (d || []).join('\n')
      : secenek.tip === 'virgul' ? (d || []).join(', ')
        : (d == null ? '' : d);
    var ozellik = 'data-yol="' + esc(yol) + '"' +
      (secenek.tip ? ' data-tip="' + secenek.tip + '"' : '') +
      (secenek.yerTutucu ? ' placeholder="' + esc(secenek.yerTutucu) + '"' : '');
    var girdi = secenek.satir
      ? '<textarea class="girdi" rows="' + secenek.satir + '" ' + ozellik + '>' + esc(deger) + '</textarea>'
      : '<input class="girdi" ' + ozellik + ' value="' + esc(deger) + '">';
    return '<label class="alan"><span>' + esc(etiket) + '</span>' + girdi +
      (secenek.ipucu ? '<small>' + secenek.ipucu + '</small>' : '') + '</label>';
  }

  /* tip 'evet' verilirse seçim evet/hayır olarak saklanır: '1' -> true, '' -> silinir. */
  function secim(etiket, yol, secenekler, ipucu, tip) {
    var ham = oku(yol);
    var d = tip === 'evet' ? (ham ? '1' : '') : ham;
    return '<label class="alan"><span>' + esc(etiket) + '</span>' +
      '<select class="girdi" data-yol="' + esc(yol) + '"' + (tip ? ' data-tip="' + tip + '"' : '') + '>' +
      secenekler.map(function (s) {
        return '<option value="' + esc(s[0]) + '"' + (String(d || '') === String(s[0]) ? ' selected' : '') +
          '>' + esc(s[1]) + '</option>';
      }).join('') + '</select>' +
      (ipucu ? '<small>' + ipucu + '</small>' : '') + '</label>';
  }

  /* Görev kutucuklarının ikonunu seçtiren küçük ızgara. */
  function ikonSecici(yol, secili) {
    return '<fieldset><legend>Kutucuk ikonu</legend><div class="ikon-izgara">' +
      Object.keys(window.IKONLAR).map(function (k) {
        return '<button class="ikon-sec" type="button" data-eylem="ikon-sec" data-yol="' + esc(yol) +
          '" data-id="' + esc(k) + '" aria-pressed="' + (k === secili) + '" title="' + esc(k) + '">' +
          window.ikonCiz(k) + '</button>';
      }).join('') + '</div></fieldset>';
  }

  /* Tekrarlanan satır listesi: her satırda bir ya da iki alan ve bir sil düğmesi. */
  function satirListesi(yol, alanlar, ekleYazi, sinif) {
    var dizi = oku(yol) || [];
    var govde = dizi.map(function (satir, i) {
      return '<div class="satir ' + (sinif || (alanlar.length === 1 ? 'tekli' : 'ikili')) + '">' +
        alanlar.map(function (a) {
          var p = yol + '.' + i + (a.anahtar === null ? '' : '.' + a.anahtar);
          var d = a.anahtar === null ? satir : satir[a.anahtar];
          if (a.secenekler) {
            return '<select class="girdi" data-yol="' + esc(p) + '">' + a.secenekler().map(function (s) {
              return '<option value="' + esc(s[0]) + '"' + (String(d || '') === String(s[0]) ? ' selected' : '') +
                '>' + esc(s[1]) + '</option>';
            }).join('') + '</select>';
          }
          if (a.satir) {
            return '<textarea class="girdi" rows="' + a.satir + '" data-yol="' + esc(p) + '" placeholder="' +
              esc(a.yerTutucu || '') + '">' + esc(d == null ? '' : d) + '</textarea>';
          }
          return '<input class="girdi" data-yol="' + esc(p) + '" placeholder="' + esc(a.yerTutucu || '') +
            '" value="' + esc(d == null ? '' : d) + '">';
        }).join('') +
        '<button class="mini sil" type="button" data-eylem="liste-sil" data-yol="' + esc(yol) +
        '" data-i="' + i + '" title="Satırı sil">Sil</button></div>';
    }).join('');
    return '<div class="satir-liste">' + (govde || '<p class="yardim">Henüz satır yok.</p>') + '</div>' +
      '<button class="mini ekle-satir" type="button" data-eylem="liste-ekle" data-yol="' + esc(yol) +
      '" data-sablon="' + esc(alanlar.map(function (a) { return a.anahtar; }).join('|')) + '">+ ' +
      esc(ekleYazi || 'Satır ekle') + '</button>';
  }

  function kategoriSecenekleri() {
    return Object.keys(D.site.kategoriler || {}).map(function (k) {
      return [k, D.site.kategoriler[k].ad];
    });
  }
  function ucretSecenekleri() {
    return Object.keys(D.site.ucretler || {}).map(function (k) { return [k, D.site.ucretler[k]]; });
  }
  function aracSecenekleri() {
    return [['', '— araç seç —']].concat(D.araclar.slice().sort(function (a, b) {
      return a.ad.localeCompare(b.ad, 'tr');
    }).map(function (a) {
      return [a.id, a.ad + (a.durum === 'kapandi' ? ' (kapandı)' : '')];
    }));
  }

  function logoKutu(a, sinif) {
    var g = D.gorseller[a.id] || {};
    var ek = sinif ? ' ' + sinif : '';
    if (g.logo) {
      return '<span class="logo' + ek + '"><img src="' + esc(g.logo) +
        (gorselSurum[a.id] ? '?v=' + gorselSurum[a.id] : '') + '" alt=""></span>';
    }
    return '<span class="logo' + ek + ' logo-harf r-' + esc((a.kategori || [])[0] || 'metin') + '">' +
      esc(String(a.ad || '?').trim().charAt(0).toLocaleUpperCase('tr')) + '</span>';
  }

  /* ===================== 8. Bölüm: Panel ===================== */

  var CIZERLER = {};

  CIZERLER.panel = function () {
    var aktif = D.araclar.filter(function (a) { return a.durum !== 'kapandi' && !a.gizli; }).length;
    var kapanan = D.araclar.filter(function (a) { return a.durum === 'kapandi'; }).length;
    var gizli = D.araclar.filter(function (a) { return a.gizli; }).length +
      D.gorevler.filter(function (g) { return g.gizli; }).length;
    var vitrin = D.araclar.filter(function (a) { return a.vitrin && !a.gizli; }).length;
    var gorselli = D.araclar.filter(function (a) { return (D.gorseller[a.id] || {}).gorsel; }).length;
    var logosuz = D.araclar.filter(function (a) { return !(D.gorseller[a.id] || {}).logo; });
    var promptlu = D.araclar.filter(function (a) { return a.prompt; }).length;

    return (kirliMi() ? '<div class="uyari-serit"><b>Kaydedilmemiş değişiklikler var.</b> ' +
      'Sağ üstteki <b>Kaydet</b> düğmesine basmadan siteye yansımaz. Değişiklikler bu tarayıcıda ' +
      'saklandı; sekmeyi kapatsan da kaybolmaz.</div>' : '') +

      '<div class="sayilar">' +
      sayiKutu(aktif, 'yayındaki araç') +
      sayiKutu(gizli, 'gizli araç / görev') +
      sayiKutu(kapanan, 'kapanmış araç') +
      sayiKutu(D.gorevler.filter(function (g) { return !g.gizli; }).length, 'görev kutucuğu') +
      sayiKutu(vitrin, 'yeni eklendi şeridinde') +
      sayiKutu(logolu() + '/' + D.araclar.length, 'logo') +
      sayiKutu(gorselli, 'tanıtım görseli') +
      sayiKutu(promptlu, 'hazır prompt') +
      '</div>' +

      '<div class="p-kart" style="margin-top:18px">' +
      '<h2>Ne yapmak istiyorsun?</h2>' +
      '<p class="tanim">Sık yapılan işler için kısa yollar.</p>' +
      '<div class="dugmeler" style="margin-top:0">' +
      '<button class="dugme" type="button" data-eylem="arac-yeni">+ Yeni araç ekle</button>' +
      '<button class="dugme ikincil" type="button" data-bolum="yerlesim">Sayfalar ve yerleşim</button>' +
      '<button class="dugme ikincil" type="button" data-bolum="gorseller">Görsel yükle</button>' +
      '<button class="dugme ikincil" type="button" data-bolum="tema">Renkleri değiştir</button>' +
      '<button class="dugme ikincil" type="button" data-bolum="gorevler">Görev rehberi düzenle</button>' +
      '<button class="dugme ikincil" type="button" data-bolum="yedek">Yedek al</button>' +
      '</div></div>' +

      (logosuz.length ? '<div class="p-kart sari"><h2>Logosu olmayan araçlar (' + logosuz.length + ')</h2>' +
        '<p class="tanim">Bu araçlar sitede adının baş harfiyle gösteriliyor. Görseller bölümünden logo yükleyebilirsin.</p>' +
        '<p>' + logosuz.map(function (a) { return esc(a.ad); }).join(' · ') + '</p>' +
        '<button class="dugme kucuk" type="button" data-eylem="gorsel-logosuz">Logosuzları göster</button></div>' : '') +

      '<div class="p-kart"><h2>Dosyalar</h2>' +
      '<p class="tanim">Sitenin tüm içeriği bu dosyalarda durur. Panel bunları senin için yazar.</p>' +
      '<table class="p-tablo"><thead><tr><th>Dosya</th><th>İçerik</th><th class="sag">Durum</th></tr></thead><tbody>' +
      Object.keys(DOSYA).map(function (k) {
        return '<tr><td><code>' + esc(DOSYA[k].yol) + '</code></td><td>' + esc(DOSYA[k].ad) + '</td>' +
          '<td class="sag">' + (degisen[k]
            ? '<span class="durum-kapandi">bekliyor</span>'
            : '<span style="color:var(--basari);font-weight:600;font-size:.85rem">kayıtlı</span>') + '</td></tr>';
      }).join('') +
      '</tbody></table></div>';
  };

  function sayiKutu(d, etiket) {
    return '<div class="sayi-kutu"><b>' + esc(d) + '</b><span>' + esc(etiket) + '</span></div>';
  }

  /* ===================== 9. Bölüm: Araçlar ===================== */

  CIZERLER.araclar = function () {
    if (duzenArac) return aracFormu();
    return '<div class="p-kart">' +
      '<div class="arac-cubugu">' +
      '<input class="girdi" id="arac-ara" type="search" placeholder="Araç ara" value="' + esc(filtre.q) + '">' +
      '<select class="girdi" id="arac-kat"><option value="">Tüm kategoriler</option>' +
      kategoriSecenekleri().map(function (k) {
        return '<option value="' + esc(k[0]) + '"' + (filtre.kat === k[0] ? ' selected' : '') + '>' + esc(k[1]) + '</option>';
      }).join('') + '</select>' +
      '<select class="girdi" id="arac-durum">' +
      [['', 'Hepsi'], ['aktif', 'Yayında'], ['gizli', 'Gizli'], ['kapandi', 'Kapanmış']].map(function (s) {
        return '<option value="' + s[0] + '"' + (filtre.durum === s[0] ? ' selected' : '') + '>' + s[1] + '</option>';
      }).join('') + '</select>' +
      '<button class="dugme" type="button" data-eylem="arac-yeni" style="margin-left:auto">+ Yeni araç</button>' +
      '</div>' +
      '<div id="arac-tablo">' + aracTablosu() + '</div></div>';
  };

  function suzulmus() {
    var q = sade(filtre.q).trim();
    return D.araclar.filter(function (a) {
      if (filtre.kat && (a.kategori || []).indexOf(filtre.kat) === -1) return false;
      if (filtre.durum === 'aktif' && (a.durum === 'kapandi' || a.gizli)) return false;
      if (filtre.durum === 'gizli' && !a.gizli) return false;
      if (filtre.durum === 'kapandi' && a.durum !== 'kapandi') return false;
      if (!q) return true;
      return sade([a.ad, a.ozet, a.alt, (a.etiket || []).join(' ')].join(' ')).indexOf(q) !== -1;
    });
  }

  function aracTablosu() {
    var liste = suzulmus();
    if (!liste.length) return '<p class="bos-liste">Aramaya uyan araç yok.</p>';
    return '<p class="yardim">' + liste.length + ' araç gösteriliyor. Sıra, sitedeki görünme sırasıdır.</p>' +
      '<table class="p-tablo"><thead><tr><th>Araç</th><th class="gizle-kucuk">Kategori</th>' +
      '<th class="gizle-kucuk">Ücret</th><th class="sag">İşlem</th></tr></thead><tbody>' +
      liste.map(function (a) {
        var sira = D.araclar.indexOf(a);
        return '<tr' + (a.gizli ? ' class="satir-gizli"' : '') + '><td><div class="ad-hucre">' + logoKutu(a, 'mini') +
          '<span><b>' + esc(a.ad) + '</b>' +
          (a.gizli ? ' <span class="durum-kapandi">gizli</span>' : '') +
          (a.vitrin ? ' <span class="etiket-kutu" style="background:var(--altin)">yeni</span>' : '') +
          '<small>' + esc(a.id) + (a.durum === 'kapandi' ? ' · kapandı' : '') + '</small></span></div></td>' +
          '<td class="gizle-kucuk">' + (a.kategori || []).map(function (k) {
            return '<span class="etiket-kutu r-' + esc(k) + '">' + esc((D.site.kategoriler[k] || {}).ad || k) + '</span>';
          }).join(' ') + '</td>' +
          '<td class="gizle-kucuk"><span class="rozet ' + esc(a.ucret) + '">' +
          esc((D.site.ucretler || {})[a.ucret] || a.ucret) + '</span></td>' +
          '<td class="sag"><span class="mini-grup">' +
          '<button class="mini" type="button" data-eylem="arac-tasi" data-id="' + esc(a.id) + '" data-yon="-1"' +
          (sira === 0 ? ' disabled' : '') + ' title="Yukarı taşı">↑</button>' +
          '<button class="mini" type="button" data-eylem="arac-tasi" data-id="' + esc(a.id) + '" data-yon="1"' +
          (sira === D.araclar.length - 1 ? ' disabled' : '') + ' title="Aşağı taşı">↓</button>' +
          '<button class="mini" type="button" data-eylem="arac-yayin" data-id="' + esc(a.id) + '" title="' +
          (a.gizli ? 'Sitede yayınla' : 'Siteden gizle') + '">' + (a.gizli ? 'Yayınla' : 'Gizle') + '</button>' +
          '<button class="mini" type="button" data-eylem="arac-duzenle" data-id="' + esc(a.id) + '">Düzenle</button>' +
          '<button class="mini sil" type="button" data-eylem="arac-sil" data-id="' + esc(a.id) + '">Sil</button>' +
          '</span></td></tr>';
      }).join('') + '</tbody></table>';
  }

  function aracBul(id) { return D.araclar.find(function (a) { return a.id === id; }); }

  function aracFormu() {
    var yeni = duzenArac === '*yeni*';
    var i = yeni ? D.araclar.length - 1 : D.araclar.findIndex(function (a) { return a.id === duzenArac; });
    if (i < 0) { duzenArac = null; return CIZERLER.araclar(); }
    var a = D.araclar[i];
    var y = 'araclar.' + i;
    var kapandi = a.durum === 'kapandi';

    return '<div class="p-kart">' +
      '<div class="p-baslik-satir">' +
      logoKutu(a, 'buyuk') +
      '<h2>' + (yeni ? 'Yeni araç' : esc(a.ad)) + '</h2>' +
      '<button class="dugme" type="button" data-eylem="arac-bitti">Listeye dön</button>' +
      '</div>' +

      '<div class="alan-cift">' +
      alan('Araç adı', y + '.ad', { yerTutucu: 'Örnek: Yeni Araç' }) +
      alan('Web adresi', y + '.url', { yerTutucu: 'https://…' }) +
      '</div>' +

      '<fieldset><legend>Kategori <small style="font-weight:400;color:var(--soluk)">(ilk işaretlediğin ana kategori olur, kart sekmesinde o görünür)</small></legend>' +
      '<div class="onay-grup">' + kategoriSecenekleri().map(function (k) {
        return '<label><input type="checkbox" data-kat="' + esc(k[0]) + '" data-i="' + i + '"' +
          ((a.kategori || []).indexOf(k[0]) !== -1 ? ' checked' : '') + '>' + esc(k[1]) + '</label>';
      }).join('') + '</div>' +
      '<p class="yardim">Sıra: ' + ((a.kategori || []).map(function (k) {
        return esc((D.site.kategoriler[k] || {}).ad || k);
      }).join(' → ') || 'seçilmedi') + '</p></fieldset>' +

      '<div class="alan-cift">' +
      secim('Ücret', y + '.ucret', ucretSecenekleri()) +
      alan('Ücret notu', y + '.ucretNot', { yerTutucu: 'Günlük 5 üretim ücretsiz' }) +
      '</div>' +

      alan('Kısa açıklama', y + '.ozet', { satir: 2, yerTutucu: 'Öğretmene ne kazandırır? Tek cümleyle yaz.' }) +

      '<div class="alan-uc">' +
      alan('Alt başlık', y + '.alt', { yerTutucu: 'Sunum, Ölçme…', ipucu: 'Kart sekmesinde kategori yerine görünür.' }) +
      alan('Yaş sınırı', y + '.yas', { yerTutucu: '13+ (veli izniyle)' }) +
      alan('Türkçe desteği', y + '.turkce', { yerTutucu: 'Arayüz ve çıktı Türkçe' }) +
      '</div>' +

      alan('Öğretmen ne yapabilir?', y + '.neIcin', { tip: 'satirlar', satir: 5, ipucu: 'Her satıra bir madde yaz.' }) +
      alan('Hazır prompt', y + '.prompt', { satir: 4, ipucu: 'Değişecek yerleri [köşeli parantez] içine yaz; sitede vurgulu görünür.' }) +
      alan('Püf noktası', y + '.ipucu', { satir: 2 }) +
      alan('Dikkat edilecek şey', y + '.dikkat', { satir: 2, ipucu: 'Veri, yaş ya da güvenlikle ilgili uyarı.' }) +
      alan('Arama kelimeleri', y + '.etiket', { tip: 'virgul', yerTutucu: 'sınav, test, ölçme', ipucu: 'Virgülle ayır.' }) +

      '<div class="alan-uc">' +
      secim('Yayın durumu', y + '.gizli', [['', 'Yayında'], ['1', 'Gizli']],
        'Gizli araç sitede hiç görünmez: ne listede, ne aramada, ne de görev önerilerinde.', 'evet') +
      secim('Durum', y + '.durum', [['', 'Etkin'], ['kapandi', 'Kapandı / kullanılamıyor']],
        'Kapanan araç sitede ayrı bir bölümde, üstü çizili gösterilir.') +
      alan('Bilgi kontrol tarihi', y + '.kontrol', { yerTutucu: '2026-11', ipucu: 'Yıl-ay. Site alt bilgisinde en yeni tarih görünür.' }) +
      '</div>' +
      '<div class="alan-cift">' +
      secim('Yeni eklenenler şeridi', y + '.vitrin', [['', 'Gösterme'], ['1', 'Ana sayfada şeritte göster']],
        'Şerit, "Bugün ne hazırlıyorsun?" ile "Yapacağın işi seç" arasında, animasyonla belirir.', 'evet') +
      (kapandi ? secim('Yerine önerilen araç', y + '.yerine', aracSecenekleri()) : '') +
      '</div>' +

      '<p class="yardim">Kimlik (id): <code>' + esc(a.id) + '</code> — görsel dosya adı ve bağlantılar buna bağlı olduğu için değiştirilmez.</p>' +
      '</div>' +

      '<div class="p-kart"><h2>Görseller</h2>' +
      '<p class="tanim">Logo kartlarda ve araç sayfasında görünür. Tanıtım görseli yalnızca araç sayfasının başında çıkar.</p>' +
      gorselYuva('logo', a) + gorselYuva('gorsel', a) +
      '</div>' +

      '<div class="dugmeler"><button class="dugme" type="button" data-eylem="arac-bitti">Listeye dön</button>' +
      '<button class="dugme ikincil" type="button" data-eylem="arac-kopya" data-id="' + esc(a.id) + '">Bu aracı kopyala</button>' +
      '<button class="dugme tehlike" type="button" data-eylem="arac-sil" data-id="' + esc(a.id) + '">Aracı sil</button></div>';
  };

  /* ===================== 10. Bölüm: Görseller ===================== */

  function gorselYuva(tur, a) {
    var g = D.gorseller[a.id] || {};
    var yol = g[tur];
    var surum = gorselSurum[a.id] ? '?v=' + gorselSurum[a.id] : '';
    var veriMi = /^data:/.test(yol || '');
    return '<div class="yuva"><span>' + (tur === 'logo' ? 'Logo' : 'Tanıtım görseli') + '</span>' +
      '<div class="yuva-ic">' +
      '<span class="onizleme-kare' + (tur === 'gorsel' ? ' genis' : '') + (yol ? '' : ' yok') + '">' +
      (yol ? '<img src="' + esc(yol) + surum + '" alt="">' : 'yok') + '</span>' +
      '<span>' +
      '<span class="yuva-dugmeler">' +
      '<span class="mini dosya-sec">' + (yol ? 'Değiştir' : 'Dosya seç') +
      '<input type="file" accept="image/png,image/jpeg,image/webp,image/gif,image/svg+xml" ' +
      'data-yukle="' + tur + '" data-id="' + esc(a.id) + '"></span>' +
      (yol ? '<button class="mini sil" type="button" data-eylem="gorsel-sil" data-tur="' + tur +
        '" data-id="' + esc(a.id) + '">Kaldır</button>' : '') +
      '</span>' +
      '<small style="display:block;color:var(--soluk);font-size:.76rem;margin-top:5px;word-break:break-all">' +
      (yol ? (veriMi ? 'dosyaya gömülü görsel' : esc(yol)) : 'PNG, JPG, WEBP, GIF ya da SVG') + '</small>' +
      '</span></div></div>';
  }

  CIZERLER.gorseller = function () {
    var liste = D.araclar.filter(function (a) {
      var g = D.gorseller[a.id] || {};
      if (gorselFiltre === 'logosuz') return !g.logo;
      if (gorselFiltre === 'gorselsiz') return !g.gorsel;
      return true;
    });
    return '<div class="p-kart">' +
      '<h2>Logolar ve tanıtım görselleri</h2>' +
      '<p class="tanim">' + (sunucuVar
        ? 'Seçtiğin dosya <code>assets/logo</code> ya da <code>assets/gorsel</code> klasörüne kaydedilir; dosya adı aracın kimliği olur.'
        : 'Sunucu kapalı olduğu için seçtiğin görsel veri dosyasının içine gömülür. Büyük görseller dosyayı şişirir; 400 KB üstü kabul edilmez. ' +
        'Daha iyisi: <code>node yerel-sunucu.js</code> ile sunucuyu başlat.') + '</p>' +
      '<div class="arac-cubugu">' +
      [['hepsi', 'Hepsi (' + D.araclar.length + ')'],
      ['logosuz', 'Logosu olmayanlar (' + D.araclar.filter(function (a) { return !(D.gorseller[a.id] || {}).logo; }).length + ')'],
      ['gorselsiz', 'Tanıtım görseli olmayanlar (' + D.araclar.filter(function (a) { return !(D.gorseller[a.id] || {}).gorsel; }).length + ')']]
        .map(function (s) {
          return '<button class="cip" type="button" data-gorsel-filtre="' + s[0] + '" aria-pressed="' +
            (gorselFiltre === s[0]) + '">' + esc(s[1]) + '</button>';
        }).join('') +
      '</div>' +
      (liste.length ? '<div class="gorsel-izgara">' + liste.map(function (a) {
        return '<div class="gorsel-kutu"><div class="bas">' + logoKutu(a, 'mini') +
          '<span><b>' + esc(a.ad) + '</b><small>' + esc(a.id) + '</small></span></div>' +
          gorselYuva('logo', a) + gorselYuva('gorsel', a) + '</div>';
      }).join('') + '</div>' : '<p class="bos-liste">Bu süzgece uyan araç yok.</p>') +
      '</div>';
  };

  /* ===================== 11. Bölüm: Görev rehberleri ===================== */

  CIZERLER.gorevler = function () {
    if (duzenGorev) return gorevFormu();
    return '<div class="p-kart">' +
      '<div class="p-baslik-satir"><h2>Görev rehberleri</h2>' +
      '<button class="dugme" type="button" data-eylem="gorev-yeni">+ Yeni görev</button></div>' +
      '<p class="tanim">Ana sayfadaki "Yapacağın işi seç" kutucukları. Sıra, ana sayfadaki sıradır. ' +
      'Kutucukların biçimini (yuvarlak, altıgen, yumuşak kare) "Tema ve renkler" bölümünden değiştirebilirsin.</p>' +
      (D.gorevler.length ? '<table class="p-tablo"><thead><tr><th>Görev</th><th class="gizle-kucuk">Kategori</th>' +
        '<th class="gizle-kucuk">Araç</th><th class="sag">İşlem</th></tr></thead><tbody>' +
        D.gorevler.map(function (g, i) {
          var eksik = (g.araclar || []).filter(function (x) { return !aracBul(x.id); });
          return '<tr' + (g.gizli ? ' class="satir-gizli"' : '') + '><td><div class="ad-hucre">' +
            '<span class="ikon-kutu y-' + esc(g.kategori) + '">' + window.ikonCiz(g.ikon) + '</span>' +
            '<span><b>' + esc(g.baslik) + '</b>' + (g.gizli ? ' <span class="durum-kapandi">gizli</span>' : '') +
            '<small>' + esc(g.id) + ' · ' + esc(g.sure || '') + '</small></span></div></td>' +
            '<td class="gizle-kucuk"><span class="etiket-kutu r-' + esc(g.kategori) + '">' +
            esc((D.site.kategoriler[g.kategori] || {}).ad || g.kategori) + '</span></td>' +
            '<td class="gizle-kucuk">' + (g.araclar || []).length +
            (eksik.length ? ' <span class="durum-kapandi">' + eksik.length + ' eksik</span>' : '') + '</td>' +
            '<td class="sag"><span class="mini-grup">' +
            '<button class="mini" type="button" data-eylem="gorev-tasi" data-i="' + i + '" data-yon="-1"' +
            (i === 0 ? ' disabled' : '') + '>↑</button>' +
            '<button class="mini" type="button" data-eylem="gorev-tasi" data-i="' + i + '" data-yon="1"' +
            (i === D.gorevler.length - 1 ? ' disabled' : '') + '>↓</button>' +
            '<button class="mini" type="button" data-eylem="gorev-yayin" data-i="' + i + '">' +
            (g.gizli ? 'Yayınla' : 'Gizle') + '</button>' +
            '<button class="mini" type="button" data-eylem="gorev-duzenle" data-id="' + esc(g.id) + '">Düzenle</button>' +
            '<button class="mini sil" type="button" data-eylem="gorev-sil" data-i="' + i + '">Sil</button>' +
            '</span></td></tr>';
        }).join('') + '</tbody></table>' : '<p class="bos-liste">Henüz görev yok.</p>') +
      '</div>';
  };

  function gorevFormu() {
    var i = duzenGorev === '*yeni*' ? D.gorevler.length - 1
      : D.gorevler.findIndex(function (g) { return g.id === duzenGorev; });
    if (i < 0) { duzenGorev = null; return CIZERLER.gorevler(); }
    var g = D.gorevler[i];
    var y = 'gorevler.' + i;

    return '<div class="p-kart">' +
      '<div class="p-baslik-satir"><h2>' + esc(g.baslik || 'Yeni görev') + '</h2>' +
      '<button class="dugme" type="button" data-eylem="gorev-bitti">Listeye dön</button></div>' +
      '<div class="alan-cift">' +
      alan('Görev başlığı', y + '.baslik', { yerTutucu: 'Metin oluştur' }) +
      alan('Kart alt başlığı', y + '.kisa', { yerTutucu: 'Soru, plan, hikâye, yazı', ipucu: 'Ana sayfadaki kartta başlığın altında görünür.' }) +
      '</div>' +
      '<div class="alan-cift">' +
      secim('Kategori', y + '.kategori', kategoriSecenekleri(), 'Kart sekmesinin rengi buna göre olur.') +
      alan('Süre', y + '.sure', { yerTutucu: '10 dk' }) +
      '</div>' +
      '<div class="alan-cift">' +
      alan('Kimlik (id)', y + '.id', { ipucu: 'Bağlantıda görünür: #/gorev/' + esc(g.id) + '. Değiştirirsen eski bağlantı çalışmaz.' }) +
      secim('Yayın durumu', y + '.gizli', [['', 'Yayında'], ['1', 'Gizli']],
        'Gizli görev ana sayfada ve Prompt Atölyesi listesinde görünmez.', 'evet') +
      '</div>' +
      alan('Kısa özet', y + '.ozet', { satir: 2, yerTutucu: 'Kutucuğun üzerine gelince ve görev sayfasının başında görünen cümle.' }) +
      ikonSecici(y + '.ikon', g.ikon) +
      '</div>' +

      '<div class="p-kart"><h2>Hangi aracı açmalı?</h2>' +
      '<p class="tanim">İlk sıradaki araç "önerilen" olarak öne çıkar. Kapanmış bir araç seçmemeye dikkat et.</p>' +
      satirListesi(y + '.araclar', [
        { anahtar: 'id', secenekler: aracSecenekleri },
        { anahtar: 'neden', yerTutucu: 'Bu araç bu iş için neden uygun?' }
      ], 'Araç ekle') +
      '</div>' +

      '<div class="p-kart"><h2>Adımlar ve prompt</h2>' +
      alan('Adımlar', y + '.adimlar', { tip: 'satirlar', satir: 7, ipucu: 'Her satıra bir adım. Sitede numaralı liste olur.' }) +
      alan('Ana hazır prompt', y + '.prompt', { satir: 5, ipucu: 'Değişecek yerleri [köşeli parantez] içine yaz.' }) +
      '<fieldset><legend>Hazır prompt şablonları (birden fazla iş için)</legend>' +
      satirListesi(y + '.promptlar', [
        { anahtar: 'baslik', yerTutucu: 'Örn: Sınav ve soru hazırla' },
        { anahtar: 'prompt', yerTutucu: 'Prompt metni', satir: 3 }
      ], 'Prompt şablonu ekle') + '</fieldset>' +
      alan('Göndermeden önce kontrol listesi', y + '.kontrol', { tip: 'satirlar', satir: 5, ipucu: 'Her satıra bir kontrol maddesi.' }) +
      '</div>' +

      '<div class="dugmeler"><button class="dugme" type="button" data-eylem="gorev-bitti">Listeye dön</button>' +
      '<button class="dugme tehlike" type="button" data-eylem="gorev-sil" data-i="' + i + '">Görevi sil</button></div>';
  }

  /* ===================== 12. Bölüm: Tema ===================== */

  var RENK_ADLARI = [
    ['kagit', 'Sayfa zemini'],
    ['kart', 'Kart zemini'],
    ['murekkep', 'Ana yazı rengi'],
    ['soluk', 'İkincil yazı'],
    ['cizgi', 'İnce çizgi'],
    ['cizgi-koyu', 'Koyu çizgi'],
    ['altin', 'Vurgu rengi'],
    ['altin-koyu', 'Koyu vurgu'],
    ['altin-acik', 'Açık vurgu zemini'],
    ['koyu', 'Düğme ve alt bilgi zemini'],
    ['koyu-yazi', 'Düğme yazısı'],
    ['koyu-soluk', 'Alt bilgi yazısı'],
    ['tahta', 'Prompt kutusu zemini'],
    ['tahta-yazi', 'Prompt kutusu yazısı'],
    ['tahta-soluk', 'Prompt kutusu başlığı'],
    ['tebesir', 'Kopyala düğmesi'],
    ['tehlike', 'Uyarı rengi'],
    ['tehlike-acik', 'Uyarı zemini'],
    ['basari', 'Olumlu renk'],
    ['pastel-yesil', 'Ücretsiz rozeti'],
    ['pastel-sari', 'Karma rozet'],
    ['pastel-kirmizi', 'Ücretli rozeti']
  ];

  var YAZI_TIPLERI = [
    ['Fraunces + Figtree', '"Fraunces", Georgia, "Times New Roman", serif', '"Figtree", "Segoe UI", system-ui, -apple-system, sans-serif'],
    ['Georgia + Segoe UI', 'Georgia, "Times New Roman", serif', '"Segoe UI", system-ui, -apple-system, sans-serif'],
    ['Tek tip (Figtree)', '"Figtree", "Segoe UI", system-ui, sans-serif', '"Figtree", "Segoe UI", system-ui, -apple-system, sans-serif'],
    ['Sistem yazı tipi', 'system-ui, -apple-system, "Segoe UI", sans-serif', 'system-ui, -apple-system, "Segoe UI", sans-serif']
  ];

  var HAZIR = {
    deniz: {
      ad: 'Deniz', aciklama: 'Turkuaz ve soğuk gri', semasi: 'acik',
      renkler: {
        kagit: '#f3f6f9', kart: '#ffffff', murekkep: '#14202c', soluk: '#5a6775',
        cizgi: '#e1e8ef', 'cizgi-koyu': '#c5d0dc', altin: '#0f8a7a', 'altin-koyu': '#0a6256',
        'altin-acik': '#e2f3f0', kenar: '#0f8a7a', koyu: '#14202c', 'koyu-yazi': '#ffffff',
        'koyu-soluk': '#dfe5ea', tahta: '#152430', 'tahta-yazi': '#e9f0f5', 'tahta-soluk': '#9db1c0',
        tebesir: '#5fd3bd', 'k-metin': '#1f5fa8', 'k-gorsel': '#b0541f', 'k-video': '#76398a',
        'k-ses': '#11796a', 'k-egitim': '#8a6414', 'k-web20': '#475a6b',
        'pastel-yesil': '#e4f2ea', 'pastel-sari': '#fdf3dc', 'pastel-kirmizi': '#f2e9e6',
        tehlike: '#9c2f2b', 'tehlike-acik': '#fcecea', basari: '#11796a'
      }
    },
    defter: {
      ad: 'Defter', aciklama: 'Krem kâğıt ve altın', semasi: 'acik',
      renkler: {
        kagit: '#faf6ef', kart: '#fffdf8', murekkep: '#2a2420', soluk: '#6d6256',
        cizgi: '#e8e0d2', 'cizgi-koyu': '#d3c7b2', altin: '#a8761f', 'altin-koyu': '#7a5413',
        'altin-acik': '#f7eeda', kenar: '#a8761f', koyu: '#2a2420', 'koyu-yazi': '#fffdf8',
        'koyu-soluk': '#e6ded0', tahta: '#2f3b31', 'tahta-yazi': '#eef3ea', 'tahta-soluk': '#a9b9a7',
        tebesir: '#f2d38a', 'k-metin': '#2c5c8f', 'k-gorsel': '#a85a24', 'k-video': '#7a3f85',
        'k-ses': '#1f6f5e', 'k-egitim': '#8a6414', 'k-web20': '#5d6450',
        'pastel-yesil': '#e7f1e4', 'pastel-sari': '#fbf0d6', 'pastel-kirmizi': '#f4e9e3',
        tehlike: '#9c3a2b', 'tehlike-acik': '#fbece7', basari: '#1f6f5e'
      }
    },
    orman: {
      ad: 'Orman', aciklama: 'Koyu yeşil ve açık gri', semasi: 'acik',
      renkler: {
        kagit: '#f2f6f1', kart: '#ffffff', murekkep: '#16231a', soluk: '#566157',
        cizgi: '#dde6dc', 'cizgi-koyu': '#c0cfbf', altin: '#2f7a4a', 'altin-koyu': '#1e5533',
        'altin-acik': '#e3f2e8', kenar: '#2f7a4a', koyu: '#16231a', 'koyu-yazi': '#ffffff',
        'koyu-soluk': '#dfe8df', tahta: '#152319', 'tahta-yazi': '#e9f2ea', 'tahta-soluk': '#9fb5a3',
        tebesir: '#7fd79b', 'k-metin': '#22608f', 'k-gorsel': '#a5551f', 'k-video': '#6f3a85',
        'k-ses': '#137061', 'k-egitim': '#806012', 'k-web20': '#4c5d50',
        'pastel-yesil': '#e2f1e6', 'pastel-sari': '#fbf1d8', 'pastel-kirmizi': '#f3e9e5',
        tehlike: '#96322c', 'tehlike-acik': '#fbeae8', basari: '#137061'
      }
    },
    lacivert: {
      ad: 'Lacivert', aciklama: 'Resmî mavi ve amber', semasi: 'acik',
      renkler: {
        kagit: '#f4f6fa', kart: '#ffffff', murekkep: '#121c33', soluk: '#58617a',
        cizgi: '#e0e5f0', 'cizgi-koyu': '#c2cadc', altin: '#2b4fa0', 'altin-koyu': '#1b357a',
        'altin-acik': '#e5eaf8', kenar: '#2b4fa0', koyu: '#121c33', 'koyu-yazi': '#ffffff',
        'koyu-soluk': '#dde3f0', tahta: '#121c33', 'tahta-yazi': '#e9eef7', 'tahta-soluk': '#9aa6c0',
        tebesir: '#ffc864', 'k-metin': '#2b4fa0', 'k-gorsel': '#a85a24', 'k-video': '#6e3d93',
        'k-ses': '#15705f', 'k-egitim': '#8a6414', 'k-web20': '#4c5670',
        'pastel-yesil': '#e3f0ea', 'pastel-sari': '#fdf2db', 'pastel-kirmizi': '#f2e9e7',
        tehlike: '#9c2f2b', 'tehlike-acik': '#fcecea', basari: '#15705f'
      }
    },
    bordo: {
      ad: 'Bordo', aciklama: 'Sıcak şarap tonu', semasi: 'acik',
      renkler: {
        kagit: '#f9f5f4', kart: '#ffffff', murekkep: '#2a1a1c', soluk: '#6b595b',
        cizgi: '#ebe0e0', 'cizgi-koyu': '#d6c4c5', altin: '#8d2a3c', 'altin-koyu': '#6a1b2b',
        'altin-acik': '#f7e7ea', kenar: '#8d2a3c', koyu: '#2a1a1c', 'koyu-yazi': '#ffffff',
        'koyu-soluk': '#ece0e1', tahta: '#2a1a1c', 'tahta-yazi': '#f3eaea', 'tahta-soluk': '#b79fa1',
        tebesir: '#e9a2ae', 'k-metin': '#2f5a94', 'k-gorsel': '#a4521f', 'k-video': '#74347f',
        'k-ses': '#166b5c', 'k-egitim': '#86610f', 'k-web20': '#5e5253',
        'pastel-yesil': '#e5f0e7', 'pastel-sari': '#fbf0d9', 'pastel-kirmizi': '#f6e8e6',
        tehlike: '#8d2a3c', 'tehlike-acik': '#fbeaed', basari: '#166b5c'
      }
    },
    mor: {
      ad: 'Mürdüm', aciklama: 'Mor ve menekşe', semasi: 'acik',
      renkler: {
        kagit: '#f6f4fb', kart: '#ffffff', murekkep: '#1d1830', soluk: '#605a78',
        cizgi: '#e5e0f0', 'cizgi-koyu': '#cac2de', altin: '#5b3fb5', 'altin-koyu': '#412b8c',
        'altin-acik': '#ebe5fa', kenar: '#5b3fb5', koyu: '#1d1830', 'koyu-yazi': '#ffffff',
        'koyu-soluk': '#e3ddf1', tahta: '#1d1830', 'tahta-yazi': '#ece7f7', 'tahta-soluk': '#a79dc4',
        tebesir: '#b9a2ff', 'k-metin': '#3a52a8', 'k-gorsel': '#a85524', 'k-video': '#6f2f9e',
        'k-ses': '#15705f', 'k-egitim': '#86651c', 'k-web20': '#55506b',
        'pastel-yesil': '#e4f0e9', 'pastel-sari': '#fbf1dc', 'pastel-kirmizi': '#f3e9e8',
        tehlike: '#9c2f3f', 'tehlike-acik': '#fbeaee', basari: '#15705f'
      }
    },
    gece: {
      ad: 'Gece', aciklama: 'Koyu tema', semasi: 'koyu',
      renkler: {
        kagit: '#10161d', kart: '#171f29', murekkep: '#e8eef4', soluk: '#9aa9b8',
        cizgi: '#26313d', 'cizgi-koyu': '#3a4753', altin: '#2fb79f', 'altin-koyu': '#7ad9c6',
        'altin-acik': '#15302c', kenar: '#2fb79f', koyu: '#2fb79f', 'koyu-yazi': '#06241f',
        'koyu-soluk': '#0c3d35', tahta: '#0b1117', 'tahta-yazi': '#e4ecf3', 'tahta-soluk': '#8fa1b1',
        tebesir: '#5fd3bd', 'k-metin': '#4a8bd0', 'k-gorsel': '#bd7340', 'k-video': '#9a66ba',
        'k-ses': '#2f9b89', 'k-egitim': '#ab8824', 'k-web20': '#76889a',
        'pastel-yesil': '#14302a', 'pastel-sari': '#302a16', 'pastel-kirmizi': '#2f1f1c',
        tehlike: '#ef8c86', 'tehlike-acik': '#331d1c', basari: '#58c9b4'
      }
    }
  };

  CIZERLER.tema = function () {
    var T = D.tema;
    var kategoriler = Object.keys(D.site.kategoriler || {});
    var yaziSecili = YAZI_TIPLERI.findIndex(function (f) { return f[1] === T.serif && f[2] === T.sans; });

    return '<div class="p-kart"><h2>Hazır temalar</h2>' +
      '<p class="tanim">Bir temaya bas, bütün renkler birden değişir. Aşağıdan tek tek de ayarlayabilirsin. ' +
      'Panelin kendisi de aynı renkleri kullanır, böylece sonucu hemen görürsün.</p>' +
      '<div class="hazir-izgara">' + Object.keys(HAZIR).map(function (k) {
        var h = HAZIR[k];
        return '<button class="hazir-tema" type="button" data-eylem="tema-hazir" data-id="' + k + '" ' +
          'aria-pressed="' + (T.hazir === k) + '"><span class="seritler">' +
          ['kagit', 'altin', 'murekkep', 'tebesir'].map(function (r) {
            return '<i style="background:' + esc(h.renkler[r]) + '"></i>';
          }).join('') + '</span><b>' + esc(h.ad) + '</b><small>' + esc(h.aciklama) + '</small></button>';
      }).join('') + '</div></div>' +

      '<div class="p-kart"><h2>İş kutucuklarının biçimi</h2>' +
      '<p class="tanim">Ana sayfadaki "Yapacağın işi seç" ikonlarının şekli.</p>' +
      '<div class="hazir-izgara">' +
      [['yuvarlak', 'Yuvarlak'], ['altigen', 'Altıgen'], ['yumusak', 'Yumuşak kare']].map(function (s) {
        return '<button class="hazir-tema sekil-' + s[0] + '" type="button" data-eylem="tema-sekil" data-id="' +
          s[0] + '" aria-pressed="' + ((T.sekil || 'yuvarlak') === s[0]) + '">' +
          '<span class="is-madalyon y-metin">' + window.ikonCiz('soru') + '</span>' +
          '<b>' + s[1] + '</b></button>';
      }).join('') + '</div></div>' +

      '<div class="p-kart"><h2>Yazı ve ölçü</h2>' +
      '<div class="alan-uc">' +
      '<label class="alan"><span>Yazı tipi</span><select class="girdi" data-eylem="tema-yazi">' +
      YAZI_TIPLERI.map(function (f, i) {
        return '<option value="' + i + '"' + (i === yaziSecili ? ' selected' : '') + '>' + esc(f[0]) + '</option>';
      }).join('') + (yaziSecili < 0 ? '<option value="-1" selected>Özel (elle yazılmış)</option>' : '') +
      '</select><small>İlk seçenek sitenin kendi yazı tipidir; internet yoksa yerine Georgia ve Segoe UI kullanılır.</small></label>' +
      alan('Yazı boyutu', 'tema.yaziBoyu', { yerTutucu: '17px', ipucu: '16px – 19px arası iyi sonuç verir.' }) +
      alan('Köşe yuvarlaklığı', 'tema.yaricap', { yerTutucu: '12px', ipucu: '0px keskin, 18px yumuşak.' }) +
      '</div></div>' +

      '<div class="p-kart"><h2>Kategori renkleri</h2>' +
      '<p class="tanim">Kart sekmelerinde ve logo rozetlerinde kullanılır.</p>' +
      '<div class="renk-izgara">' + kategoriler.map(function (k) {
        return renkSatiri('k-' + k, (D.site.kategoriler[k] || {}).ad || k);
      }).join('') + '</div></div>' +

      '<div class="p-kart"><h2>Tüm renkler</h2>' +
      '<p class="tanim">Renk kutusuna basarak seçebilir ya da yanındaki kutuya kod yazabilirsin.</p>' +
      '<div class="renk-izgara">' + RENK_ADLARI.map(function (r) {
        return renkSatiri(r[0], r[1]);
      }).join('') + '</div>' +
      '<div class="dugmeler">' +
      '<button class="dugme ikincil" type="button" data-eylem="tema-sifirla">Deniz temasına dön</button>' +
      '</div></div>' +

      '<div class="p-kart"><h2>Önizleme</h2>' +
      '<div class="tema-onizleme"><div class="ob-ust">' + esc(D.site.ad || 'Site') +
      '<span style="margin-left:auto;font-family:var(--sans);font-size:.8rem;font-weight:500;background:var(--koyu);color:var(--koyu-yazi);padding:5px 11px;border-radius:7px">Görevler</span></div>' +
      '<div class="ob-govde">' +
      '<div class="is-izgara ' + 'sekil-' + esc(T.sekil || 'yuvarlak') + '" style="grid-template-columns:repeat(4,1fr);gap:18px 6px">' +
      D.gorevler.filter(function (g) { return !g.gizli; }).slice(0, 4).map(function (g) {
        return '<span class="is-kart"><span class="is-madalyon y-' + esc(g.kategori) + '">' +
          window.ikonCiz(g.ikon) + '</span><span><b>' + esc(g.baslik) + '</b></span></span>';
      }).join('') + '</div>' +
      '<h3>Sınav ve soru hazırla</h3>' +
      '<p style="margin:0;color:var(--soluk);font-size:.94rem">Kazanıma uygun test, açık uçlu soru ve cevap anahtarı.</p>' +
      '<div class="ob-satir">' +
      kategoriler.slice(0, 4).map(function (k) {
        return '<span class="etiket-kutu r-' + esc(k) + '">' + esc((D.site.kategoriler[k] || {}).ad || k) + '</span>';
      }).join('') +
      '<span class="rozet ucretsiz">Ücretsiz</span><span class="rozet kismen">Ücretsiz + ücretli</span>' +
      '<span class="rozet ucretli">Ücretli</span></div>' +
      '<div class="ob-tahta">Ben <b>[5.]</b> sınıf <b>[Matematik]</b> öğretmeniyim. 10 soruluk bir test hazırla.</div>' +
      '<div class="ob-satir"><button class="dugme kucuk" type="button" disabled>Araca git</button>' +
      '<button class="dugme ikincil kucuk" type="button" disabled>Promptu kopyala</button></div>' +
      '<div class="not"><strong>Püf noktası</strong>Çeldiricileri öğrencilerin yaptığı yaygın yanlışlardan seç.</div>' +
      '<div class="dikkat"><strong>Dikkat</strong>Öğrenci adı yazmadan çalış.</div>' +
      '</div></div></div>';
  };

  function renkSatiri(ad, etiket) {
    var d = (D.tema.renkler || {})[ad] || '';
    var kod = /^#[0-9a-fA-F]{6}$/.test(d) ? d : '#888888';
    return '<div class="renk-satir">' +
      '<input type="color" value="' + esc(kod) + '" data-renk="' + esc(ad) + '" aria-label="' + esc(etiket) + ' seç">' +
      '<input class="girdi" data-renk-kod="' + esc(ad) + '" value="' + esc(d) + '" aria-label="' + esc(etiket) + ' kodu">' +
      '<label>' + esc(etiket) + '<small>--' + esc(ad) + '</small></label></div>';
  }

  /* ===================== 13. Bölüm: Sayfalar ve yerleşim (Canlı Önizlemeli Görsel Düzenleyici) ===================== */

  var ANASAYFA_BLOK_ADLARI = {
    defter: { ad: 'Kahraman Alanı & 3B Vitrin Slaytı', acikAnahtar: 'defterAcik', aciklama: 'Üst karşılama başlığı, arama kutusu, istatistikler ve sağdaki 3B vitrin slaytı.' },
    serit: { ad: 'Kayan Vitrin & Yeni Araçlar Şeridi', acikAnahtar: 'seritAcik', aciklama: 'Öne çıkan araçların sonsuz kayan rozet şeridi.' },
    gorevler: { ad: 'Yapacağın İşi Seç (7 Ana Kategori)', acikAnahtar: 'gorevlerAcik', aciklama: 'Öğretmenlerin işe göre seçim yaptığı 7 ana kategori kartı.' },
    aliskanliklar: { ad: 'Araçtan Önce Üç Alışkanlık', acikAnahtar: 'aliskanliklarAcik', aciklama: 'Sayfa altındaki 1-2-3 numaralı rehber kartları.' }
  };

  var onizlemeSayfa = '#/';
  var onizlemeCihaz = 'masaustu';
  var seciliOdak = {
    odak: 'defter-sol',
    id: '',
    ad: 'Kahraman Sol Sütun (Başlık, Arama ve İstatistikler)'
  };

  var ANA_SAYFALAR = [
    { hash: '#/', ad: 'Ana Sayfa', odak: 'defter-sol', odakAd: 'Kahraman Sol Sütun (Başlık, Arama ve İstatistikler)' },
    { hash: '#/araclar', ad: 'Araçlar', odak: 'araclar-ust', odakAd: 'Araçlar Sayfası Başlık ve Filtre Ayarları' },
    { hash: '#/prompt', ad: 'Prompt Atölyesi', odak: 'prompt-ust', odakAd: 'Prompt Atölyesi Başlık ve Giriş' },
    { hash: '#/guvenli', ad: 'Güvenli Kullanım', odak: 'guvenli-ust', odakAd: 'Güvenli Kullanım Başlık ve Giriş' },
    { hash: '#/baslangic', ad: 'Yeni Başlayanlar', odak: 'baslangic-ust', odakAd: 'Yeni Başlayanlar Başlık ve Giriş' }
  ];

  function onizlemeGonder() {
    var cerceve = el('canli-onizleme');
    if (!cerceve || !cerceve.contentWindow) return;
    try {
      cerceve.contentWindow.postMessage({
        tip: 'veri-guncelle',
        veri: D
      }, '*');
      cerceve.contentWindow.postMessage({
        tip: 'odak-vurgula',
        odak: seciliOdak.odak,
        id: seciliOdak.id
      }, '*');
    } catch (e) { /* yok say */ }
  }

  function onizlemeSayfaGit(hash, odakGuncelle) {
    onizlemeSayfa = hash || '#/';
    if (odakGuncelle) {
      var anaSayfa = ANA_SAYFALAR.find(function (s) { return s.hash === onizlemeSayfa; });
      if (anaSayfa) {
        seciliOdak = { odak: anaSayfa.odak, id: '', ad: anaSayfa.odakAd };
      } else if (onizlemeSayfa.indexOf('#/gorev/') === 0) {
        var gid = decodeURIComponent(onizlemeSayfa.slice('#/gorev/'.length));
        var gr = D.gorevler.find(function (g) { return g.id === gid; });
        seciliOdak = { odak: 'gorev-kart', id: gid, ad: 'Görev Rehberi: ' + (gr ? gr.baslik : gid) };
      } else if (onizlemeSayfa.indexOf('#/arac/') === 0) {
        var aid = decodeURIComponent(onizlemeSayfa.slice('#/arac/'.length));
        var ar = aracBul(aid);
        seciliOdak = { odak: 'arac-kart', id: aid, ad: 'Araç Ayarları ve Görselleri: ' + (ar ? ar.ad : aid) };
      }
    }
    var cerceve = el('canli-onizleme');
    if (cerceve && cerceve.contentWindow) {
      try {
        cerceve.contentWindow.postMessage({ tip: 'sayfa-git', hash: onizlemeSayfa }, '*');
        cerceve.contentWindow.postMessage({ tip: 'odak-vurgula', odak: seciliOdak.odak, id: seciliOdak.id }, '*');
      } catch (e) { /* yok say */ }
    }
    if (el('gd-sol-panel')) el('gd-sol-panel').innerHTML = solPanelCiz();
    yerlesimCubukGuncelle();
  }

  function yerlesimCubukGuncelle() {
    document.querySelectorAll('[data-onizleme-sayfa]').forEach(function (b) {
      var h = b.getAttribute('data-onizleme-sayfa');
      b.setAttribute('aria-pressed', String(h === onizlemeSayfa));
    });
    var altSec = el('onizleme-alt-secim');
    if (altSec) {
      altSec.value = (onizlemeSayfa.indexOf('#/gorev/') === 0 || onizlemeSayfa.indexOf('#/arac/') === 0) ? onizlemeSayfa : '';
    }
    document.querySelectorAll('[data-onizleme-cihaz]').forEach(function (b) {
      b.setAttribute('aria-pressed', String(b.getAttribute('data-onizleme-cihaz') === onizlemeCihaz));
    });
    var sar = el('gd-cerceve-sar');
    if (sar) sar.className = 'gd-cerceve-sar cihaz-' + onizlemeCihaz;
  }

  function odakFormuCiz() {
    siteVarsayilanlariTamamla(D.site);
    var acKapa = [['acik', 'Açık (Göster)'], ['kapali', 'Kapalı (Gizle)']];
    var odak = seciliOdak.odak || 'defter-sol';
    var id = seciliOdak.id || '';

    /* 1. Araç Kartı, Logo veya Tanıtım Görseli tıklandığında */
    if (odak === 'arac-kart' || odak === 'arac-gorsel') {
      var aIndeks = D.araclar.findIndex(function (x) { return x.id === id; });
      if (aIndeks < 0) aIndeks = 0;
      var a = D.araclar[aIndeks];
      if (!a) return '<p class="yardim">Araç bulunamadı.</p>';
      var ay = 'araclar.' + aIndeks;
      var gorselKutuHtml =
        '<div class="gd-grup Vurgulu">' +
        '<h3>🖼 Logo ve Tanıtım Görseli (' + esc(a.ad) + ')</h3>' +
        '<p class="yardim">Yeni görsel seçtiğinde sağdaki önizlemede anında güncellenir.</p>' +
        gorselYuva('logo', a) +
        gorselYuva('gorsel', a) +
        '</div>';

      return '<div class="gd-ust-eylem">' +
        '<button class="dugme kucuk" type="button" data-eylem="onizleme-sayfa" data-hash="#/arac/' + esc(a.id) + '">Bu aracın iç sayfasını önizlemede aç →</button>' +
        '<button class="mini" type="button" data-eylem="arac-yayin" data-id="' + esc(a.id) + '">' + (a.gizli ? 'Yayına Al' : 'Siteden Gizle') + '</button>' +
        '</div>' +
        gorselKutuHtml +
        '<div class="gd-grup">' +
        '<h3>Temel Araç Bilgileri</h3>' +
        alan('Araç adı', ay + '.ad') +
        alan('Web adresi', ay + '.url', { yerTutucu: 'https://…' }) +
        '<div class="alan-cift">' +
        secim('Ücret durumu', ay + '.ucret', ucretSecenekleri()) +
        alan('Ücret notu', ay + '.ucretNot', { yerTutucu: 'Günlük 5 üretim ücretsiz' }) +
        '</div>' +
        alan('Kısa açıklama (kart özeti)', ay + '.ozet', { satir: 2 }) +
        '<div class="alan-cift">' +
        alan('Kart üst sekme başlığı', ay + '.alt', { yerTutucu: 'Sunum, Ölçme…' }) +
        alan('Yaş sınırı', ay + '.yas', { yerTutucu: '13+' }) +
        '</div>' +
        alan('Türkçe desteği', ay + '.turkce', { yerTutucu: 'Arayüz ve çıktı Türkçe' }) +
        '<fieldset><legend>Kategoriler</legend><div class="onay-grup">' +
        kategoriSecenekleri().map(function (k) {
          return '<label><input type="checkbox" data-kat="' + esc(k[0]) + '" data-i="' + aIndeks + '"' +
            ((a.kategori || []).indexOf(k[0]) !== -1 ? ' checked' : '') + '>' + esc(k[1]) + '</label>';
        }).join('') + '</div></fieldset>' +
        '</div>' +
        '<div class="gd-grup">' +
        '<h3>Rehber İçeriği & Hazır Prompt</h3>' +
        alan('Öğretmen ne yapabilir? (her satıra bir madde)', ay + '.neIcin', { tip: 'satirlar', satir: 4 }) +
        alan('Hazır prompt', ay + '.prompt', { satir: 4, ipucu: '[köşeli parantez] içindekiler vurgulu görünür.' }) +
        alan('Püf noktası', ay + '.ipucu', { satir: 2 }) +
        alan('Dikkat uyarısı', ay + '.dikkat', { satir: 2 }) +
        '<div class="alan-cift">' +
        secim('Vitrin slaytı ve şeridinde göster', ay + '.vitrin', [['', 'Gösterme'], ['1', 'Vitrinde göster']], '', 'evet') +
        secim('Durum', ay + '.durum', [['', 'Etkin'], ['kapandi', 'Kapandı']]) +
        '</div></div>';
    }

    /* 2. Görev Kartı veya Görev Sayfası tıklandığında */
    if (odak === 'gorev-kart') {
      var gIndeks = D.gorevler.findIndex(function (x) { return x.id === id; });
      if (gIndeks < 0) gIndeks = 0;
      var g = D.gorevler[gIndeks];
      if (!g) return '<p class="yardim">Görev bulunamadı.</p>';
      var gy = 'gorevler.' + gIndeks;
      return '<div class="gd-ust-eylem">' +
        '<button class="dugme kucuk" type="button" data-eylem="onizleme-sayfa" data-hash="#/gorev/' + esc(g.id) + '">Bu görevin sayfasını önizlemede aç →</button>' +
        '<button class="mini" type="button" data-eylem="gorev-yayin" data-i="' + gIndeks + '">' + (g.gizli ? 'Yayına Al' : 'Gizle') + '</button>' +
        '</div>' +
        '<div class="gd-grup">' +
        '<h3>Görev Kutucuğu ve Başlık</h3>' +
        alan('Görev başlığı', gy + '.baslik') +
        alan('Kart alt başlığı (kısa açıklama)', gy + '.kisa') +
        '<div class="alan-cift">' +
        secim('Renk kategorisi', gy + '.kategori', kategoriSecenekleri()) +
        alan('Tahminî süre', gy + '.sure', { yerTutucu: '10 dk' }) +
        '</div>' +
        alan('Görev sayfası giriş özeti', gy + '.ozet', { satir: 2 }) +
        ikonSecici(gy + '.ikon', g.ikon) +
        '</div>' +
        '<div class="gd-grup">' +
        '<h3>Önerilen Araçlar</h3>' +
        satirListesi(gy + '.araclar', [
          { anahtar: 'id', secenekler: aracSecenekleri },
          { anahtar: 'neden', yerTutucu: 'Neden uygun?' }
        ], 'Araç ekle') +
        '</div>' +
        '<div class="gd-grup">' +
        '<h3>Adımlar, Promptlar ve Kontrol Listesi</h3>' +
        alan('Adımlar (her satıra bir adım)', gy + '.adimlar', { tip: 'satirlar', satir: 5 }) +
        '<fieldset><legend>Hazır prompt şablonları</legend>' +
        satirListesi(gy + '.promptlar', [
          { anahtar: 'baslik', yerTutucu: 'Alt iş başlığı' },
          { anahtar: 'prompt', yerTutucu: 'Prompt metni', satir: 3 }
        ], 'Prompt şablonu ekle') + '</fieldset>' +
        alan('Kontrol listesi (her satıra bir madde)', gy + '.kontrol', { tip: 'satirlar', satir: 4 }) +
        '</div>';
    }

    /* 3. Üst Marka (Logo, Site Adı, Kurum Adı ve WhatsApp Paylaşım Banner'ı) */
    if (odak === 'ust-marka') {
      var bYol = D.site.paylasimGorsel || 'assets/og-banner.png';
      return '<div class="gd-grup">' +
        '<h3>Site Kimliği, İkon ve Logo</h3>' +
        '<div class="yuva"><span>Site logosu ve sekme ikonu</span><div class="yuva-ic">' +
        '<span class="onizleme-kare' + (D.site.logo ? '' : ' yok') + '">' +
        (D.site.logo ? '<img src="' + esc(D.site.logo) + (gorselSurum['site-logo'] ? '?v=' + gorselSurum['site-logo'] : '') + '" alt="">' : 'yok') +
        '</span><span><span class="yuva-dugmeler">' +
        '<span class="mini dosya-sec">' + (D.site.logo ? 'Değiştir' : 'Logo yükle') +
        '<input type="file" accept="image/png,image/jpeg,image/webp,image/svg+xml" data-yukle="site" data-id="site-logo"></span>' +
        (D.site.logo && D.site.logo !== 'assets/ikon.svg' ? '<button class="mini sil" type="button" data-eylem="site-logo-sil">Varsayılana dön</button>' : '') +
        '</span><small style="display:block;color:var(--soluk);font-size:.76rem;margin-top:5px">' + esc(D.site.logo || 'assets/ikon.svg') + '</small></span></div></div>' +
        alan('Site adı', 'site.ad') +
        alan('Okul / kurum adı', 'site.okul') +
        secim('Üst menü çubuğu görünürlüğü', 'site.gorunum.ustMenu', acKapa) +
        '</div>' +
        '<div class="gd-grup">' +
        '<h3>WhatsApp / Sosyal Medya Paylaşım Banner\'ı (1200×630)</h3>' +
        '<div class="yuva"><span>Paylaşım Önizleme Kartı</span>' +
        '<div style="margin-bottom:8px;border-radius:8px;overflow:hidden;border:1px solid var(--cizgi)">' +
        '<img src="' + esc(bYol) + (gorselSurum['og-banner'] ? '?v=' + gorselSurum['og-banner'] : '') + '" alt="WhatsApp paylaşım bannerı" style="width:100%;height:auto;display:block">' +
        '</div>' +
        '<span class="yuva-dugmeler">' +
        '<span class="mini dosya-sec">Banner değiştir (1200×630 PNG)<input type="file" accept="image/png,image/jpeg,image/webp" data-yukle="banner" data-id="og-banner"></span>' +
        '</span><small style="display:block;color:var(--soluk);font-size:.75rem;margin-top:5px">WhatsApp link önizlemesi için ideal ölçü: 1200×630 piksel (<code>' + esc(bYol) + '</code>).</small>' +
        '</div></div>';
    }

    /* 4. Üst Menü Bağlantıları */
    if (odak === 'ust-menu') {
      var menuListesi = D.site.menu || [];
      return '<div class="gd-grup">' +
        '<div class="p-baslik-satir"><h3>Üst Menü Öğeleri</h3>' +
        '<button class="mini" type="button" data-eylem="menu-ekle">+ Menü ekle</button></div>' +
        secim('Üst menü şeridi', 'site.gorunum.ustMenu', acKapa) +
        '<div class="gd-menu-liste">' +
        menuListesi.map(function (m, i) {
          var kapaliMi = m.durum === 'kapali';
          return '<div class="gd-menu-oge' + (kapaliMi ? ' pasif' : '') + '">' +
            '<div class="alan-cift">' +
            '<label class="alan"><span>Menü adı</span><input class="girdi" data-yol="site.menu.' + i + '.ad" value="' + esc(m.ad || '') + '"></label>' +
            '<label class="alan"><span>Adres</span><input class="girdi" data-yol="site.menu.' + i + '.adres" value="' + esc(m.adres || '#/') + '"></label>' +
            '</div>' +
            '<div class="gd-menu-alt">' +
            '<select class="girdi" data-yol="site.menu.' + i + '.durum" style="max-width:150px">' +
            '<option value="acik"' + (!kapaliMi ? ' selected' : '') + '>Açık (Göster)</option>' +
            '<option value="kapali"' + (kapaliMi ? ' selected' : '') + '>Kapalı (Gizle)</option>' +
            '</select>' +
            '<span class="mini-grup" style="margin-left:auto">' +
            '<button class="mini" type="button" data-eylem="menu-tasi" data-i="' + i + '" data-yon="-1"' + (i === 0 ? ' disabled' : '') + '>↑</button>' +
            '<button class="mini" type="button" data-eylem="menu-tasi" data-i="' + i + '" data-yon="1"' + (i === menuListesi.length - 1 ? ' disabled' : '') + '>↓</button>' +
            '<button class="mini sil" type="button" data-eylem="menu-sil" data-i="' + i + '"' + (menuListesi.length <= 1 ? ' disabled' : '') + '>Sil</button>' +
            '</span></div></div>';
        }).join('') +
        '</div></div>';
    }

    /* 5. Alt Bilgi (Footer) */
    if (odak === 'alt-bilgi') {
      return '<div class="gd-grup">' +
        '<h3>Alt Bilgi (Footer) Ayarları</h3>' +
        secim('Alt bilgi alanı görünürlüğü', 'site.gorunum.altBilgi', acKapa) +
        alan('Kurum adı', 'site.okul') +
        alan('Alt bilgi açıklama metni', 'site.gorunum.altNot', { satir: 4, ipucu: 'Boş bırakırsan otomatik oluşturulur.' }) +
        secim('Sağ alt "Yönetim paneli" bağlantısı', 'site.gorunum.altPanelBaglanti', acKapa) +
        alan('Yönetim paneli bağlantı yazısı', 'site.gorunum.altPanelYazi') +
        '</div>';
    }

    /* 6. Ana Sayfa: Kahraman Sol Sütun */
    if (odak === 'defter-sol') {
      return '<div class="gd-grup">' +
        '<h3>Kahraman (Hero) Sol Sütun Ayarları</h3>' +
        secim('Kahraman bölümü tamamı', 'site.anasayfa.defterAcik', acKapa) +
        '<div class="alan-cift">' +
        secim('Üst rozet (okul etiketi)', 'site.anasayfa.ustEtiketAcik', acKapa) +
        alan('Üst rozet özel metni', 'site.anasayfa.ustEtiket', { yerTutucu: 'Boşsa okul adı yazar' }) +
        '</div>' +
        alan('Ana başlık (H1)', 'site.anasayfa.baslik') +
        alan('Giriş açıklaması', 'site.anasayfa.giris', { satir: 3 }) +
        '</div>' +
        '<div class="gd-grup">' +
        '<h3>Arama Çubuğu ve İstatistikler</h3>' +
        secim('Arama kutusu', 'site.anasayfa.aramaAcik', acKapa) +
        alan('Arama kutusu ipucu yazısı', 'site.anasayfa.aramaYerTutucu') +
        alan('Arama düğmesi yazısı', 'site.anasayfa.aramaDugme') +
        secim('Alt istatistik kapsülleri', 'site.anasayfa.sayilarAcik', acKapa) +
        '</div>';
    }

    /* 7. Ana Sayfa: Sağ Sütun 3B Vitrin Slaytı */
    if (odak === 'defter-sag') {
      var vitrinAraclar = D.araclar.filter(function (a) { return !a.gizli && a.durum !== 'kapandi'; });
      return '<div class="gd-grup">' +
        '<h3>Sağ Sütun: 3B Vitrin Slaytı</h3>' +
        secim('3B vitrin slaytı görünürlüğü', 'site.anasayfa.slaytAcik', acKapa, 'Kapatılırsa sol başlık sütunu tam genişlik olur.') +
        alan('Slayt üst rozet yazısı', 'site.anasayfa.slaytEtiket', { yerTutucu: 'ÖNE ÇIKAN ARAÇ' }) +
        alan('Slayt ipucu kutusu başlığı', 'site.anasayfa.slaytKutuBaslik', { yerTutucu: '✦ Sınıfta ne işe yarar?' }) +
        alan('Slayt alt bağlantı yazısı', 'site.anasayfa.slaytBaglantiYazi', { yerTutucu: 'Rehberi ve promptu aç' }) +
        '</div>' +
        '<div class="gd-grup">' +
        '<h3>Slaytta ve Vitrinde Gösterilen Araçlar</h3>' +
        '<p class="yardim">İşaretlediğin araçlar 3B vitrin slaytında ve kayan şeritte döner. Bir aracın logosunu/yazısını düzenlemek için yanındaki düğmeye bas.</p>' +
        '<div class="gd-arac-secim">' +
        vitrinAraclar.map(function (a) {
          var idx = D.araclar.indexOf(a);
          return '<div class="gd-arac-satir">' +
            '<label><input type="checkbox" data-yol="araclar.' + idx + '.vitrin" data-tip="evet-onay"' + (a.vitrin ? ' checked' : '') + '> ' +
            logoKutu(a, 'mini') + ' <b>' + esc(a.ad) + '</b></label>' +
            '<button class="mini" type="button" data-eylem="odak-sec" data-odak="arac-gorsel" data-id="' + esc(a.id) + '" data-ad="Araç: ' + esc(a.ad) + '">Görsel / Düzenle</button>' +
            '</div>';
        }).join('') +
        '</div></div>';
    }

    /* 8. Ana Sayfa: Kayan Vitrin Şeridi */
    if (odak === 'serit') {
      var tumAktif = D.araclar.filter(function (a) { return !a.gizli && a.durum !== 'kapandi'; });
      return '<div class="gd-grup">' +
        '<h3>Kayan Vitrin & Yeni Araçlar Şeridi</h3>' +
        secim('Kayan şerit görünürlüğü', 'site.anasayfa.seritAcik', acKapa) +
        alan('Şerit sol etiket yazısı', 'site.anasayfa.seritEtiket', { yerTutucu: 'Vitrin & Yeni Araçlar' }) +
        '</div>' +
        '<div class="gd-grup">' +
        '<h3>Şeritte Kayan Araçları Seç</h3>' +
        '<div class="gd-arac-secim">' +
        tumAktif.map(function (a) {
          var idx = D.araclar.indexOf(a);
          return '<div class="gd-arac-satir">' +
            '<label><input type="checkbox" data-yol="araclar.' + idx + '.vitrin" data-tip="evet-onay"' + (a.vitrin ? ' checked' : '') + '> ' +
            logoKutu(a, 'mini') + ' <b>' + esc(a.ad) + '</b></label>' +
            '<button class="mini" type="button" data-eylem="odak-sec" data-odak="arac-gorsel" data-id="' + esc(a.id) + '" data-ad="Araç: ' + esc(a.ad) + '">Düzenle</button>' +
            '</div>';
        }).join('') +
        '</div></div>';
    }

    /* 9. Ana Sayfa: Görevler Bölümü */
    if (odak === 'gorevler-bolum') {
      return '<div class="gd-grup">' +
        '<h3>"Yapacağın İşi Seç" Bölümü</h3>' +
        secim('Görevler bölümü görünürlüğü', 'site.anasayfa.gorevlerAcik', acKapa) +
        alan('Bölüm başlığı', 'site.anasayfa.gorevlerBaslik') +
        '<div class="alan-cift">' +
        secim('Sağ bağlantı görünürlüğü', 'site.anasayfa.gorevlerBaglantiAcik', acKapa) +
        alan('Sağ bağlantı yazısı', 'site.anasayfa.gorevlerBaglantiYazi') +
        '</div>' +
        '<fieldset><legend>Kutucuk İkonlarının Biçimi</legend><div class="hazir-izgara">' +
        [['yuvarlak', 'Yuvarlak'], ['altigen', 'Altıgen'], ['yumusak', 'Yumuşak kare']].map(function (s) {
          return '<button class="hazir-tema" type="button" data-eylem="tema-sekil" data-id="' + s[0] + '" aria-pressed="' + ((D.tema.sekil || 'yuvarlak') === s[0]) + '"><b>' + s[1] + '</b></button>';
        }).join('') + '</div></fieldset>' +
        '</div>' +
        '<div class="gd-grup">' +
        '<div class="p-baslik-satir"><h3>Görev Kartları Sıralaması</h3>' +
        '<button class="mini" type="button" data-eylem="gorev-yeni">+ Yeni görev</button></div>' +
        '<p class="yardim">Bir görev kartına önizlemede tıklayarak veya buradan "Düzenle" diyerek ayarlarını açabilirsin.</p>' +
        D.gorevler.map(function (g, i) {
          return '<div class="gd-arac-satir' + (g.gizli ? ' pasif' : '') + '">' +
            '<span><b>' + (i + 1) + '. ' + esc(g.baslik) + '</b>' + (g.gizli ? ' <small>(gizli)</small>' : '') + '</span>' +
            '<span class="mini-grup">' +
            '<button class="mini" type="button" data-eylem="gorev-tasi" data-i="' + i + '" data-yon="-1"' + (i === 0 ? ' disabled' : '') + '>↑</button>' +
            '<button class="mini" type="button" data-eylem="gorev-tasi" data-i="' + i + '" data-yon="1"' + (i === D.gorevler.length - 1 ? ' disabled' : '') + '>↓</button>' +
            '<button class="mini" type="button" data-eylem="odak-sec" data-odak="gorev-kart" data-id="' + esc(g.id) + '" data-ad="Görev Kartı: ' + esc(g.baslik) + '">Düzenle</button>' +
            '</span></div>';
        }).join('') +
        '</div>';
    }

    /* 10. Ana Sayfa: Üç Alışkanlık Bölümü */
    if (odak === 'aliskanliklar') {
      return '<div class="gd-grup">' +
        '<h3>"Araçtan Önce Üç Alışkanlık" Bölümü</h3>' +
        secim('Alışkanlıklar bölümü görünürlüğü', 'site.anasayfa.aliskanliklarAcik', acKapa) +
        alan('Bölüm başlığı', 'site.anasayfa.aliskanliklarBaslik') +
        '<fieldset><legend>Alışkanlık Kartları (Numara, Başlık, Açıklama, Bağlantı)</legend>' +
        satirListesi('site.anasayfa.aliskanliklar', [
          { anahtar: 'no', yerTutucu: '1' },
          { anahtar: 'baslik', yerTutucu: 'Başlık' },
          { anahtar: 'metin', yerTutucu: 'Açıklama', satir: 2 },
          { anahtar: 'adres', yerTutucu: '#/baslangic' }
        ], 'Kart ekle', 'tekli') + '</fieldset>' +
        '</div>';
    }

    /* 11. Araçlar Sayfası Başlık ve Filtreler */
    if (odak === 'araclar-ust') {
      return '<div class="gd-grup">' +
        '<h3>Araçlar Sayfası Başlık ve Filtre Ayarları</h3>' +
        alan('Sayfa başlığı (H1)', 'site.sayfalar.araclar.baslik') +
        alan('Giriş açıklaması', 'site.sayfalar.araclar.giris', { satir: 3 }) +
        secim('Arama kutusu', 'site.sayfalar.araclar.aramaAcik', acKapa) +
        alan('Arama kutusu ipucu yazısı', 'site.sayfalar.araclar.aramaYerTutucu') +
        secim('Kategori filtre çipleri', 'site.sayfalar.araclar.kategoriFiltreAcik', acKapa) +
        secim('Ücret filtre çipleri', 'site.sayfalar.araclar.ucretFiltreAcik', acKapa) +
        secim('Kapanan araçlar alt kutusu', 'site.sayfalar.araclar.kapananAcik', acKapa) +
        '</div>';
    }

    /* 12. Kategori Grubu Başlığı (Araçlar sayfasında bir kategoriye tıklandığında) */
    if (odak === 'kategori-grup') {
      var katId = id && D.site.kategoriler[id] ? id : Object.keys(D.site.kategoriler)[0];
      var kat = D.site.kategoriler[katId] || {};
      return '<div class="gd-grup">' +
        '<h3>Kategori Ayarları: ' + esc(kat.ad || katId) + '</h3>' +
        alan('Kısa ad (sekme ve filtre adı)', 'site.kategoriler.' + katId + '.ad') +
        alan('Grup başlığı', 'site.kategoriler.' + katId + '.baslik') +
        alan('Grup alt açıklaması', 'site.kategoriler.' + katId + '.aciklama', { satir: 2 }) +
        '<div style="margin-top:10px">' + renkSatiri('k-' + katId, 'Kategori rengi') + '</div>' +
        '</div>';
    }

    /* 13. Prompt Atölyesi Bölümleri */
    if (odak.indexOf('prompt-') === 0) {
      var formulSecenek = function () {
        return (D.rehber.promptFormul || []).map(function (f) { return [f.id, f.ad]; });
      };
      return '<div class="gd-grup">' +
        '<h3>Prompt Atölyesi Başlık ve Bölüm Görünürlüğü</h3>' +
        alan('Sayfa başlığı', 'site.sayfalar.prompt.baslik') +
        alan('Sayfa giriş metni', 'site.sayfalar.prompt.giris', { satir: 3 }) +
        '<div class="alan-cift">' +
        secim('Zayıf / Güçlü prompt karşılaştırması', 'site.sayfalar.prompt.kiyasAcik', acKapa) +
        alan('Karşılaştırma başlığı', 'site.sayfalar.prompt.kiyasBaslik') +
        '</div>' +
        '<div class="alan-cift">' +
        secim('Güçlü promptun 5 parçası', 'site.sayfalar.prompt.formulAcik', acKapa) +
        alan('5 parça başlığı', 'site.sayfalar.prompt.formulBaslik') +
        '</div>' +
        '<div class="alan-cift">' +
        secim('Prompt oluşturucu aracı', 'site.sayfalar.prompt.atolyeAcik', acKapa) +
        alan('Oluşturucu başlığı', 'site.sayfalar.prompt.atolyeBaslik') +
        '</div>' +
        alan('Oluşturucu alt açıklaması', 'site.sayfalar.prompt.atolyeAlt') +
        '<div class="alan-cift">' +
        secim('Hazır promptlar kütüphanesi', 'site.sayfalar.prompt.hazirAcik', acKapa) +
        alan('Hazır promptlar başlığı', 'site.sayfalar.prompt.hazirBaslik') +
        '</div>' +
        alan('Hazır promptlar alt açıklaması', 'site.sayfalar.prompt.hazirAlt') +
        '</div>' +
        '<div class="gd-grup">' +
        '<h3>Zayıf / Güçlü Prompt Örneği ve 5 Parça İçeriği</h3>' +
        alan('Zayıf prompt örneği', 'rehber.promptOrnek.zayif', { satir: 2 }) +
        alan('Neden zayıf açıklaması', 'rehber.promptOrnek.zayifNeden', { satir: 2 }) +
        '<fieldset><legend>Güçlü prompt cümleleri</legend>' +
        satirListesi('rehber.promptOrnek.guclu', [
          { anahtar: 0, secenekler: formulSecenek },
          { anahtar: 1, yerTutucu: 'Cümle', satir: 2 }
        ], 'Cümle ekle') + '</fieldset>' +
        '<fieldset><legend>Prompt formülü 5 parçası</legend>' +
        satirListesi('rehber.promptFormul', [
          { anahtar: 'ad', yerTutucu: 'Parça adı' },
          { anahtar: 'aciklama', yerTutucu: 'Açıklama' }
        ], 'Parça ekle') + '</fieldset>' +
        '</div>';
    }

    /* 14. Güvenli Kullanım Bölümleri */
    if (odak.indexOf('guvenli-') === 0) {
      return '<div class="gd-grup">' +
        '<h3>Güvenli Kullanım Başlık ve Bölüm Ayarları</h3>' +
        alan('Sayfa başlığı', 'site.sayfalar.guvenli.baslik') +
        alan('Sayfa giriş metni', 'rehber.guvenlik.giris', { satir: 3 }) +
        secim('Yap / Yapma karşılaştırma sütunları', 'site.sayfalar.guvenli.yapYapmaAcik', acKapa) +
        '<div class="alan-cift">' +
        alan('Sol sütun başlığı (Yapma)', 'site.sayfalar.guvenli.yapmaBaslik') +
        alan('Sağ sütun başlığı (Yap)', 'site.sayfalar.guvenli.yapBaslik') +
        '</div>' +
        alan('Yapay zekâya girilmeyecekler (her satıra bir madde)', 'rehber.guvenlik.yapma', { tip: 'satirlar', satir: 5 }) +
        alan('Bunun yerine yapılacaklar (her satıra bir madde)', 'rehber.guvenlik.yap', { tip: 'satirlar', satir: 5 }) +
        '</div>' +
        '<div class="gd-grup">' +
        '<h3>İlkeler, Kontrol Listesi, Yaş Sınırı ve Kaynaklar</h3>' +
        '<div class="alan-cift">' +
        secim('Beş temel ilke bölümü', 'site.sayfalar.guvenli.ilkelerAcik', acKapa) +
        alan('İlkeler başlığı', 'site.sayfalar.guvenli.ilkelerBaslik') +
        '</div>' +
        '<fieldset><legend>İlkeler maddeleri</legend>' +
        satirListesi('rehber.guvenlik.ilkeler', [
          { anahtar: 'baslik', yerTutucu: 'İlke başlığı' },
          { anahtar: 'metin', yerTutucu: 'Açıklama', satir: 2 }
        ], 'İlke ekle') + '</fieldset>' +
        '<div class="alan-cift">' +
        secim('Kontrol listesi bölümü', 'site.sayfalar.guvenli.kontrolAcik', acKapa) +
        alan('Kontrol listesi başlığı', 'site.sayfalar.guvenli.kontrolBaslik') +
        '</div>' +
        alan('Kontrol maddeleri (her satıra bir madde)', 'rehber.guvenlik.kontrol', { tip: 'satirlar', satir: 5 }) +
        '<div class="alan-cift">' +
        secim('Yaş sınırları tablosu', 'site.sayfalar.guvenli.yasAcik', acKapa) +
        alan('Yaş sınırları başlığı', 'site.sayfalar.guvenli.yasBaslik') +
        '</div>' +
        alan('Yaş sınırı açıklama notu', 'rehber.guvenlik.yasNot', { satir: 2 }) +
        '<div class="alan-cift">' +
        secim('Resmî kaynaklar bölümü', 'site.sayfalar.guvenli.kaynaklarAcik', acKapa) +
        alan('Kaynaklar başlığı', 'site.sayfalar.guvenli.kaynaklarBaslik') +
        '</div>' +
        '<fieldset><legend>Resmî kaynaklar</legend>' +
        satirListesi('rehber.guvenlik.kaynaklar', [
          { anahtar: 'ad', yerTutucu: 'Kurum adı' },
          { anahtar: 'url', yerTutucu: 'https://…' },
          { anahtar: 'not', yerTutucu: 'Kısa not' }
        ], 'Kaynak ekle', 'tekli') + '</fieldset>' +
        '</div>';
    }

    /* 15. Yeni Başlayanlar Bölümleri */
    if (odak.indexOf('baslangic-') === 0) {
      var R = D.rehber;
      return '<div class="gd-grup">' +
        '<h3>Yeni Başlayanlar Başlık ve İlk 30 Dakika</h3>' +
        alan('Sayfa başlığı', 'site.sayfalar.baslangic.baslik') +
        alan('Sayfa giriş metni', 'rehber.baslangic.giris', { satir: 3 }) +
        '<div class="alan-cift">' +
        secim('İlk 30 dakikan bölümü', 'site.sayfalar.baslangic.adimlarAcik', acKapa) +
        alan('Adımlar başlığı', 'site.sayfalar.baslangic.adimlarBaslik') +
        '</div>' +
        alan('Adımlar (her satıra bir adım)', 'rehber.baslangic.adimlar', { tip: 'satirlar', satir: 5 }) +
        alan('İlk prompt kutusu metni', 'rehber.baslangic.ilkPrompt', { satir: 4 }) +
        '</div>' +
        '<div class="gd-grup">' +
        '<h3>Yapay Zekâ Türleri ve Terimler Sözlüğü</h3>' +
        '<div class="alan-cift">' +
        secim('Yapay zekâ türleri bölümü', 'site.sayfalar.baslangic.turlerAcik', acKapa) +
        alan('Türler başlığı', 'site.sayfalar.baslangic.turlerBaslik') +
        '</div>' +
        alan('Türler alt açıklaması', 'site.sayfalar.baslangic.turlerAlt') +
        (R.baslangic && R.baslangic.turler ? R.baslangic.turler.map(function (t, i) {
          var y = 'rehber.baslangic.turler.' + i;
          return '<div class="yuva" style="padding:10px;margin-bottom:8px"><div class="p-baslik-satir" style="margin-bottom:6px">' +
            '<b>' + esc(t.ad || 'Tür ' + (i + 1)) + '</b>' +
            '<button class="mini sil" type="button" data-eylem="liste-sil" data-yol="rehber.baslangic.turler" data-i="' + i + '">Sil</button></div>' +
            '<div class="alan-cift">' + alan('Adı', y + '.ad') + alan('İngilizcesi', y + '.en') + '</div>' +
            alan('Açıklama', y + '.aciklama', { satir: 2 }) +
            alan('Önerilen araçlar (virgülle id)', y + '.araclar', { tip: 'virgul' }) +
            '</div>';
        }).join('') : '') +
        '<button class="mini ekle-satir" type="button" data-eylem="liste-ekle" data-yol="rehber.baslangic.turler" data-sablon="ad|en|aciklama|araclar">+ Tür ekle</button>' +
        '<div class="alan-cift" style="margin-top:14px">' +
        secim('Terimler sözlüğü bölümü', 'site.sayfalar.baslangic.terimlerAcik', acKapa) +
        alan('Sözlük başlığı', 'site.sayfalar.baslangic.terimlerBaslik') +
        '</div>' +
        '<fieldset><legend>Terimler sözlüğü</legend>' +
        satirListesi('rehber.baslangic.terimler', [
          { anahtar: 0, yerTutucu: 'Terim' },
          { anahtar: 1, yerTutucu: 'Açıklama', satir: 2 }
        ], 'Terim ekle') + '</fieldset>' +
        '</div>';
    }

    /* 16. Genel Görünüm, AI Arka Plan ve Ana Sayfa Bölüm Sıralaması ('genel') */
    var sira = D.site.anasayfa.sira || ['defter', 'serit', 'gorevler', 'aliskanliklar'];
    return '<div class="gd-grup">' +
      '<h3>Ana Sayfa Bölüm Sıralaması ve Aç/Kapa</h3>' +
      '<p class="yardim">Ana sayfadaki 4 ana bölümün sırasını <b>↑ / ↓</b> ile değiştirebilir veya kapatabilirsin.</p>' +
      sira.map(function (k, i) {
        var b = ANASAYFA_BLOK_ADLARI[k] || { ad: k, acikAnahtar: k + 'Acik', aciklama: '' };
        var d = D.site.anasayfa[b.acikAnahtar];
        var kapaliMi = d === 'kapali';
        return '<div class="gd-menu-oge' + (kapaliMi ? ' pasif' : '') + '">' +
          '<b>' + (i + 1) + '. ' + esc(b.ad) + '</b>' +
          '<small style="display:block;color:var(--soluk);margin:2px 0 8px">' + esc(b.aciklama) + '</small>' +
          '<div class="gd-menu-alt">' +
          '<select class="girdi" data-yol="site.anasayfa.' + esc(b.acikAnahtar) + '" style="max-width:155px">' +
          '<option value="acik"' + (!kapaliMi ? ' selected' : '') + '>Açık (Göster)</option>' +
          '<option value="kapali"' + (kapaliMi ? ' selected' : '') + '>Kapalı (Gizle)</option>' +
          '</select>' +
          '<span class="mini-grup" style="margin-left:auto">' +
          '<button class="mini" type="button" data-eylem="anasayfa-tasi" data-i="' + i + '" data-yon="-1"' + (i === 0 ? ' disabled' : '') + '>↑</button>' +
          '<button class="mini" type="button" data-eylem="anasayfa-tasi" data-i="' + i + '" data-yon="1"' + (i === sira.length - 1 ? ' disabled' : '') + '>↓</button>' +
          '</span></div></div>';
      }).join('') +
      '</div>' +
      '<div class="gd-grup">' +
      '<h3>AI Arka Plan ve Cam Efekti</h3>' +
      secim('AI veri çipleri arka planı', 'site.gorunum.aiArkaplan', acKapa) +
      secim('AI arka plan yoğunluğu', 'site.gorunum.aiYogunluk', [['hafif', 'Hafif'], ['normal', 'Normal'], ['yogun', 'Yoğun']]) +
      secim('Buzlu cam (glass) efekti', 'site.gorunum.camEfekt', acKapa) +
      '</div>' +
      '<div class="gd-grup">' +
      '<h3>Hızlı Renk Teması</h3>' +
      '<div class="hazir-izgara">' + Object.keys(HAZIR).map(function (k) {
        var h = HAZIR[k];
        return '<button class="hazir-tema" type="button" data-eylem="tema-hazir" data-id="' + k + '" aria-pressed="' + (D.tema.hazir === k) + '">' +
          '<span class="seritler">' + ['kagit', 'altin', 'murekkep', 'tebesir'].map(function (r) {
            return '<i style="background:' + esc(h.renkler[r]) + '"></i>';
          }).join('') + '</span><b>' + esc(h.ad) + '</b></button>';
      }).join('') + '</div></div>';
  }

  function solPanelCiz() {
    var hizliDugmeler = [
      { odak: 'genel', ad: '⊞ Sıralama & Genel' },
      { odak: 'ust-marka', ad: '⌂ Logo & Başlık' },
      { odak: 'ust-menu', ad: '☰ Üst Menü' },
      { odak: 'defter-sol', ad: '◧ Sol Sütun' },
      { odak: 'defter-sag', ad: '◨ Sağ 3B Slayt' },
      { odak: 'alt-bilgi', ad: '▤ Alt Bilgi' }
    ];
    return '<div class="gd-sol-ust">' +
      '<div class="gd-secili-rozet"><span>SEÇİLİ BÖLÜM / ÖĞE</span><b>✎ ' + esc(seciliOdak.ad || 'Bölüm Ayarları') + '</b></div>' +
      '<div class="gd-hizli-cubuk">' +
      hizliDugmeler.map(function (h) {
        return '<button type="button" class="cip kucuk-cip" data-eylem="odak-sec" data-odak="' + h.odak + '" data-id="" data-ad="' + esc(h.ad.slice(2)) + '" aria-pressed="' + (seciliOdak.odak === h.odak) + '">' + esc(h.ad) + '</button>';
      }).join('') +
      '</div></div>' +
      '<div class="gd-sol-icerik" id="gd-sol-icerik">' +
      odakFormuCiz() +
      '</div>';
  }

  CIZERLER.yerlesim = function () {
    siteVarsayilanlariTamamla(D.site);
    var altSecenekler =
      '<optgroup label="Görev Rehberi Sayfaları">' +
      D.gorevler.map(function (g) {
        var h = '#/gorev/' + g.id;
        return '<option value="' + esc(h) + '"' + (onizlemeSayfa === h ? ' selected' : '') + '>Görev: ' + esc(g.baslik) + '</option>';
      }).join('') +
      '</optgroup>' +
      '<optgroup label="Araç İç Sayfaları">' +
      D.araclar.slice().sort(function (a, b) { return (a.ad || '').localeCompare(b.ad || '', 'tr'); }).map(function (a) {
        var h = '#/arac/' + a.id;
        return '<option value="' + esc(h) + '"' + (onizlemeSayfa === h ? ' selected' : '') + '>Araç: ' + esc(a.ad) + '</option>';
      }).join('') +
      '</optgroup>';

    return '<div class="gorsel-duzenleyici">' +
      '<aside class="gd-sol" id="gd-sol-panel" aria-label="Seçili bölüm ayarları">' +
      solPanelCiz() +
      '</aside>' +
      '<section class="gd-sag" aria-label="Canlı sayfa önizlemesi">' +
      '<div class="gd-sag-ust">' +
      '<div class="gd-sayfa-sekmeler" role="tablist" aria-label="Önizlenecek sayfa">' +
      ANA_SAYFALAR.map(function (s) {
        return '<button type="button" class="gd-sekme" data-eylem="onizleme-sayfa" data-onizleme-sayfa="' + esc(s.hash) + '" data-hash="' + esc(s.hash) + '" aria-pressed="' + (onizlemeSayfa === s.hash) + '">' + esc(s.ad) + '</button>';
      }).join('') +
      '</div>' +
      '<select class="girdi gd-alt-secim" id="onizleme-alt-secim" aria-label="Görev veya araç sayfası seç">' +
      '<option value="">— Görev / Araç sayfası aç —</option>' +
      altSecenekler +
      '</select>' +
      '<div class="gd-cihaz-grup">' +
      '<button type="button" class="mini" data-eylem="onizleme-cihaz" data-onizleme-cihaz="masaustu" data-id="masaustu" aria-pressed="' + (onizlemeCihaz === 'masaustu') + '">Masaüstü</button>' +
      '<button type="button" class="mini" data-eylem="onizleme-cihaz" data-onizleme-cihaz="mobil" data-id="mobil" aria-pressed="' + (onizlemeCihaz === 'mobil') + '">Mobil</button>' +
      '</div>' +
      '</div>' +
      '<div class="gd-ipucu">' +
      '<span>💡 <b>Canlı Tıkla & Düzenle:</b> Önizlemedeki herhangi bir sütuna, başlığa, karta, logoya veya görsele tıkla; ayarları hemen solda açılsın. (Kartların iç sayfasına girmek için çift tıkla.)</span>' +
      '</div>' +
      '<div class="gd-cerceve-sar cihaz-' + esc(onizlemeCihaz) + '" id="gd-cerceve-sar">' +
      '<iframe id="canli-onizleme" src="index.html?onizleme=1' + esc(onizlemeSayfa) + '" title="Canlı Site Önizlemesi"></iframe>' +
      '</div>' +
      '</section>' +
      '</div>';
  };

  /* ===================== 14. Bölüm: Site ayarları ===================== */

  CIZERLER.ayarlar = function () {
    var bYol = D.site.paylasimGorsel || 'assets/og-banner.png';
    return '<div class="p-kart"><h2>Site kimliği, sekme ikonu ve WhatsApp paylaşım banner\'ı</h2>' +
      '<div class="alan-cift">' +
      alan('Site adı', 'site.ad') +
      alan('Okul / kurum adı', 'site.okul', { ipucu: 'Üst menüde ve alt bilgide görünür.' }) +
      '</div>' +
      '<div class="alan-cift">' +
      '<div class="yuva"><span>Site logosu ve yeni sekme ikonu</span><div class="yuva-ic">' +
      '<span class="onizleme-kare' + (D.site.logo ? '' : ' yok') + '">' +
      (D.site.logo ? '<img src="' + esc(D.site.logo) + (gorselSurum['site-logo'] ? '?v=' + gorselSurum['site-logo'] : '') + '" alt="">' : 'yok') +
      '</span><span><span class="yuva-dugmeler">' +
      '<span class="mini dosya-sec">' + (D.site.logo ? 'Değiştir' : 'Dosya seç') +
      '<input type="file" accept="image/png,image/jpeg,image/webp,image/svg+xml" data-yukle="site" data-id="site-logo"></span>' +
      (D.site.logo && D.site.logo !== 'assets/ikon.svg' ? '<button class="mini sil" type="button" data-eylem="site-logo-sil">Varsayılan ikona dön</button>' : '') +
      '</span><small style="display:block;color:var(--soluk);font-size:.76rem;margin-top:5px">' +
      esc(D.site.logo || 'assets/ikon.svg') + ' — Üst menüde, alt bilgide ve sekme ikonunda görünür.</small></span></div></div>' +

      '<div class="yuva"><span>WhatsApp / Sosyal Medya Bağlantı Banner\'ı (1200×630)</span><div class="yuva-ic">' +
      '<span class="onizleme-kare genis"><img src="' + esc(bYol) + (gorselSurum['og-banner'] ? '?v=' + gorselSurum['og-banner'] : '') + '" alt=""></span>' +
      '<span><span class="yuva-dugmeler">' +
      '<span class="mini dosya-sec">Banner değiştir<input type="file" accept="image/png,image/jpeg,image/webp" data-yukle="banner" data-id="og-banner"></span>' +
      '</span><small style="display:block;color:var(--soluk);font-size:.76rem;margin-top:5px">' +
      esc(bYol) + ' — WhatsApp, Telegram ve sosyal medyada link paylaşıldığında çıkan 1200×630 önizleme kartı.</small></span></div></div>' +
      '</div>' +
      alan('Sınıf düzeyleri', 'site.siniflar', { tip: 'virgul', ipucu: 'Virgülle ayır. Prompt Atölyesi listelerinde kullanılır.' }) +
      '</div>' +

      '<div class="p-kart"><h2>Kategoriler</h2>' +
      '<p class="tanim">Araçlar bu kategorilere göre gruplanır. Bir kategoriyi silmeden önce o kategorideki araçlara ' +
      'başka kategori ver. Yeni kategorinin rengini Tema bölümünden ayarlayabilirsin.</p>' +
      '<table class="p-tablo"><thead><tr><th>Kimlik</th><th>Kısa ad</th><th>Sayfa başlığı</th>' +
      '<th class="gizle-kucuk">Açıklama</th><th class="sag"></th></tr></thead><tbody>' +
      Object.keys(D.site.kategoriler || {}).map(function (k) {
        var say = D.araclar.filter(function (a) { return (a.kategori || []).indexOf(k) !== -1; }).length;
        return '<tr><td><code>' + esc(k) + '</code><small style="display:block;color:var(--soluk);font-size:.78rem">' +
          say + ' araç</small></td>' +
          '<td><input class="girdi" data-yol="site.kategoriler.' + esc(k) + '.ad" value="' +
          esc(D.site.kategoriler[k].ad || '') + '"></td>' +
          '<td><input class="girdi" data-yol="site.kategoriler.' + esc(k) + '.baslik" value="' +
          esc(D.site.kategoriler[k].baslik || '') + '"></td>' +
          '<td class="gizle-kucuk"><input class="girdi" data-yol="site.kategoriler.' + esc(k) + '.aciklama" value="' +
          esc(D.site.kategoriler[k].aciklama || '') + '"></td>' +
          '<td class="sag"><button class="mini sil" type="button" data-eylem="kat-sil" data-id="' + esc(k) +
          '"' + (say ? ' disabled title="Önce bu kategorideki araçları değiştir"' : '') + '>Sil</button></td></tr>';
      }).join('') + '</tbody></table>' +
      '<div class="satir ikili ekle-satir">' +
      '<input class="girdi" id="yeni-kat-ad" placeholder="Yeni kategori adı: Sunum">' +
      '<input class="girdi" id="yeni-kat-baslik" placeholder="Sayfa başlığı: Sunum araçları">' +
      '<button class="mini" type="button" data-eylem="kat-ekle">+ Ekle</button></div>' +
      '</div>' +

      '<div class="p-kart"><h2>Ücret etiketleri</h2>' +
      '<p class="tanim">Araç kartlarındaki rozetlerin yazısı. Kimlikleri değiştirme; rozet renkleri bunlara bağlı.</p>' +
      '<table class="p-tablo"><tbody>' +
      Object.keys(D.site.ucretler || {}).map(function (k) {
        return '<tr><td style="width:140px"><code>' + esc(k) + '</code></td><td>' +
          '<input class="girdi" data-yol="site.ucretler.' + esc(k) + '" value="' + esc(D.site.ucretler[k]) + '"></td>' +
          '<td style="width:170px"><span class="rozet ' + esc(k) + '">' + esc(D.site.ucretler[k]) + '</span></td></tr>';
      }).join('') + '</tbody></table></div>' +

      '<div class="p-kart"><h2>Panel girişi</h2>' +
      '<p class="tanim">Şifre bu dosyada düz metin tutulmaz, SHA-256 özeti olarak yazılır. ' +
      'Bu giriş paneli yanlışlıkla açmayı engeller; siteyi internette yayımlarsan ' +
      '<code>yonetim.html</code> ve <code>veri</code> klasörünü dışarıya açma.</p>' +
      '<div class="alan-uc">' +
      alan('Kullanıcı adı', 'yonetici.kullanici') +
      '<label class="alan"><span>Yeni şifre</span><input class="girdi" id="yeni-sifre" type="password" autocomplete="new-password" placeholder="En az 8 karakter"></label>' +
      '<label class="alan"><span>Yeni şifre (yine)</span><input class="girdi" id="yeni-sifre-2" type="password" autocomplete="new-password"></label>' +
      '</div>' +
      '<p class="hata" id="sifre-hata" role="alert" hidden></p>' +
      '<div class="dugmeler" style="margin-top:4px">' +
      '<button class="dugme" type="button" data-eylem="sifre-degistir">Şifreyi değiştir</button></div>' +
      '</div>';
  };

  /* ===================== 14. Bölüm: Rehber metinleri ===================== */

  CIZERLER.rehber = function () {
    var R = D.rehber;
    var formulSecenek = function () {
      return (R.promptFormul || []).map(function (f) { return [f.id, f.ad]; });
    };
    return '<div class="p-kart"><h2>Prompt formülü</h2>' +
      '<p class="tanim">Prompt Atölyesi sayfasındaki beş parça. Kimlikler renkleri belirler, değiştirmeden ad ve açıklamayı düzenle.</p>' +
      satirListesi('rehber.promptFormul', [
        { anahtar: 'ad', yerTutucu: 'Kim soruyor' },
        { anahtar: 'aciklama', yerTutucu: 'Kısa açıklama' }
      ], 'Parça ekle') +
      '</div>' +

      '<div class="p-kart"><h2>Zayıf ve güçlü prompt örneği</h2>' +
      alan('Zayıf prompt', 'rehber.promptOrnek.zayif', { satir: 2 }) +
      alan('Neden zayıf?', 'rehber.promptOrnek.zayifNeden', { satir: 3 }) +
      '<fieldset><legend>Güçlü promptun parçaları</legend>' +
      satirListesi('rehber.promptOrnek.guclu', [
        { anahtar: 0, secenekler: formulSecenek },
        { anahtar: 1, yerTutucu: 'Bu parçaya karşılık gelen cümle', satir: 2 }
      ], 'Cümle ekle') + '</fieldset></div>' +

      '<div class="p-kart"><h2>Güvenli kullanım</h2>' +
      alan('Giriş metni', 'rehber.guvenlik.giris', { satir: 4 }) +
      alan('Yapay zekâya verilmeyecekler', 'rehber.guvenlik.yapma', { tip: 'satirlar', satir: 7, ipucu: 'Her satıra bir madde.' }) +
      alan('Bunun yerine şunu yap', 'rehber.guvenlik.yap', { tip: 'satirlar', satir: 7 }) +
      alan('Sınıfa götürmeden önce kontrol listesi', 'rehber.guvenlik.kontrol', { tip: 'satirlar', satir: 8 }) +
      alan('Yaş sınırı notu', 'rehber.guvenlik.yasNot', { satir: 4 }) +
      '<fieldset><legend>Değişmeyen ilkeler</legend>' +
      satirListesi('rehber.guvenlik.ilkeler', [
        { anahtar: 'baslik', yerTutucu: 'Son söz öğretmenin' },
        { anahtar: 'metin', yerTutucu: 'Açıklama', satir: 3 }
      ], 'İlke ekle') + '</fieldset>' +
      '<fieldset><legend>Resmî kaynaklar</legend>' +
      satirListesi('rehber.guvenlik.kaynaklar', [
        { anahtar: 'ad', yerTutucu: 'Kurum adı' },
        { anahtar: 'url', yerTutucu: 'https://…' },
        { anahtar: 'not', yerTutucu: 'Kısa not' }
      ], 'Kaynak ekle', 'satir') + '</fieldset></div>' +

      '<div class="p-kart"><h2>Yeni başlayanlar</h2>' +
      alan('Giriş metni', 'rehber.baslangic.giris', { satir: 4 }) +
      alan('Adımlar', 'rehber.baslangic.adimlar', { tip: 'satirlar', satir: 8 }) +
      alan('İlk prompt', 'rehber.baslangic.ilkPrompt', { satir: 5 }) +
      '<fieldset><legend>Terimler sözlüğü</legend>' +
      satirListesi('rehber.baslangic.terimler', [
        { anahtar: 0, yerTutucu: 'Terim' },
        { anahtar: 1, yerTutucu: 'Açıklama', satir: 2 }
      ], 'Terim ekle') + '</fieldset></div>' +

      '<div class="p-kart"><h2>Yapay zekâ türleri</h2>' +
      '<p class="tanim">"Yeni Başlayanlar" sayfasındaki tür kartları.</p>' +
      (R.baslangic && R.baslangic.turler ? R.baslangic.turler.map(function (t, i) {
        var y = 'rehber.baslangic.turler.' + i;
        return '<div class="yuva" style="padding:14px"><div class="p-baslik-satir" style="margin-bottom:10px">' +
          '<h2 style="font-size:1.02rem">' + esc(t.ad || 'Tür ' + (i + 1)) + '</h2>' +
          '<button class="mini sil" type="button" data-eylem="liste-sil" data-yol="rehber.baslangic.turler" data-i="' + i + '">Sil</button></div>' +
          '<div class="alan-cift">' + alan('Adı', y + '.ad') + alan('İngilizcesi', y + '.en') + '</div>' +
          alan('Açıklama', y + '.aciklama', { satir: 3 }) +
          '<label class="alan"><span>Önerilen araçlar</span>' +
          '<input class="girdi" data-yol="' + y + '.araclar" data-tip="virgul" value="' +
          esc((t.araclar || []).join(', ')) + '"><small>Araç kimlikleri, virgülle: ' +
          esc(D.araclar.slice(0, 3).map(function (a) { return a.id; }).join(', ')) + '…</small></label>' +
          ((t.araclar || []).filter(function (x) { return !aracBul(x); }).length
            ? '<p class="hata">Bulunamayan kimlik: ' + esc((t.araclar || []).filter(function (x) { return !aracBul(x); }).join(', ')) + '</p>' : '') +
          '</div>';
      }).join('') : '') +
      '<button class="mini ekle-satir" type="button" data-eylem="liste-ekle" data-yol="rehber.baslangic.turler" data-sablon="ad|en|aciklama|araclar">+ Tür ekle</button>' +
      '</div>';
  };

  /* ===================== 15. Bölüm: Yedek ===================== */

  CIZERLER.yedek = function () {
    return '<div class="p-kart"><h2>Yedek al</h2>' +
      '<p class="tanim">Sitenin bütün içeriğini tek bir dosyaya indirir. Bilgisayar değiştirirken ya da ' +
      'bir şeyi bozduğunu düşündüğünde bu dosyadan geri dönebilirsin.</p>' +
      '<div class="dugmeler" style="margin-top:0">' +
      '<button class="dugme" type="button" data-eylem="yedek-indir">Yedek dosyasını indir</button>' +
      '<span class="mini dosya-sec" style="padding:9px 16px">Yedekten geri yükle<input type="file" accept="application/json,.json" data-yedek-al></span>' +
      '</div>' +
      (sunucuVar ? '<p class="yardim">Sunucu her kayıttan önce eski dosyaları <code>yedek/</code> klasörüne de kopyalıyor.</p>' : '') +
      '</div>' +

      '<div class="p-kart"><h2>Dosyaları tek tek indir</h2>' +
      '<p class="tanim">Siteyi bir sunucuya elle yüklüyorsan buradan tek tek alabilirsin.</p>' +
      '<table class="p-tablo"><tbody>' +
      Object.keys(DOSYA).map(function (k) {
        return '<tr><td><code>' + esc(DOSYA[k].yol) + '</code></td><td class="gizle-kucuk">' + esc(DOSYA[k].ad) + '</td>' +
          '<td class="sag"><button class="mini" type="button" data-eylem="dosya-indir" data-id="' + k + '">İndir</button></td></tr>';
      }).join('') + '</tbody></table></div>' +

      (kirliMi() ? '<div class="p-kart"><h2>Kaydedilmemiş değişiklikleri at</h2>' +
        '<p class="tanim">Bu tarayıcıda tuttuğun taslak silinir, dosyalardaki hâle geri dönülür.</p>' +
        '<button class="dugme tehlike" type="button" data-eylem="taslak-at">Değişiklikleri at</button></div>' : '');
  };

  /* ===================== 16. Kaydetme ===================== */

  CIZERLER.kaydet = function () {
    var dosyalar = kirliDosyalar();
    if (!dosyalar.length) {
      return '<div class="p-kart"><h2>Her şey kayıtlı</h2>' +
        '<p class="tanim">Kaydedilmeyi bekleyen bir değişiklik yok.</p>' +
        '<button class="dugme" type="button" data-bolum="panel">Panele dön</button></div>';
    }
    return '<div class="uyari-serit"><b>Sunucu kapalı.</b> Dosyaları tarayıcı üzerinden kaydediyoruz. ' +
      'Her dosya için aşağıdaki düğmeye bas; açılan pencerede aynı adlı dosyayı seçip üzerine yaz. ' +
      'Pencere açılmazsa dosya İndirilenler klasörüne iner, onu <code>veri</code> klasörüne taşı.</div>' +
      '<div class="p-kart"><h2>Kaydedilecek dosyalar (' + dosyalar.length + ')</h2>' +
      '<table class="p-tablo"><tbody>' +
      dosyalar.map(function (k) {
        return '<tr><td><code>' + esc(DOSYA[k].yol) + '</code><small style="display:block;color:var(--soluk);font-size:.78rem">' +
          esc(DOSYA[k].ad) + '</small></td>' +
          '<td class="sag">' + (kaydedilen[k]
            ? '<span style="color:var(--basari);font-weight:600;font-size:.86rem">kaydedildi ✓</span>'
            : '<button class="dugme kucuk" type="button" data-eylem="dosya-kaydet" data-id="' + k + '">Kaydet</button>') +
          '</td></tr>';
      }).join('') + '</tbody></table>' +
      '<div class="dugmeler">' +
      '<button class="dugme ikincil" type="button" data-eylem="hepsini-indir">Hepsini indir</button>' +
      '<button class="dugme ikincil" type="button" data-eylem="kayit-bitti">Bitirdim</button>' +
      '</div>' +
      '<p class="yardim">Bitirdikten sonra siteyi yenile. Sunucuyu başlatırsan (<code>node yerel-sunucu.js</code>) ' +
      'bu adımların hiçbirine gerek kalmaz.</p></div>';
  };

  function kaydet() {
    var dosyalar = kirliDosyalar();
    if (!dosyalar.length) { bildir('Kaydedilecek bir değişiklik yok.'); return; }

    el('kaydet-dugme').disabled = true;
    canliVeriKaydet(dosyalar);

    function yerelKayitTamamla(mesaj) {
      dosyalar.forEach(function (k) { degisen[k] = false; });
      taslakSil();
      taslakYaz();
      catiCiz();
      ciz();
      bildir(mesaj);
    }

    var kontrol = sunucuVar ? Promise.resolve(true) : sunucuBak();
    kontrol.then(function (acik) {
      if (!acik) {
        yerelKayitTamamla(dosyalar.length + ' değişiklik kaydedildi ve sitede etkinleştirildi.');
        return;
      }
      return istek('kaydet', {
        dosyalar: dosyalar.map(function (k) { return { yol: DOSYA[k].yol, icerik: dosyaMetni(k) }; })
      }).then(function (v) {
        yerelKayitTamamla(v.yazilan.length + ' dosya kaydedildi. Siteyi yenileyince görünür.');
      }).catch(function () {
        yerelKayitTamamla(dosyalar.length + ' değişiklik kaydedildi ve sitede etkinleştirildi.');
      });
    });
  }

  function indir(adiyla, metin, tip) {
    var a = document.createElement('a');
    a.href = URL.createObjectURL(new Blob([metin], { type: tip || 'text/javascript' }));
    a.download = adiyla;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(function () { URL.revokeObjectURL(a.href); }, 4000);
  }

  function dosyaKaydet(k) {
    var metin = dosyaMetni(k);
    var ad = DOSYA[k].yol.split('/').pop();
    function bitti() {
      kaydedilen[k] = true;
      degisen[k] = false;
      taslakYaz();
      ciz();
    }
    if (window.showSaveFilePicker) {
      window.showSaveFilePicker({
        suggestedName: ad,
        types: [{ description: 'JavaScript dosyası', accept: { 'text/javascript': ['.js'] } }]
      }).then(function (h) {
        return h.createWritable().then(function (w) {
          return w.write(metin).then(function () { return w.close(); });
        });
      }).then(bitti).catch(function (err) {
        if (err && err.name === 'AbortError') return;
        indir(ad, metin);
        bitti();
      });
    } else {
      indir(ad, metin);
      bitti();
    }
  }

  /* ===================== 17. Görsel yükleme ===================== */

  var UZANTI = { 'image/png': 'png', 'image/jpeg': 'jpg', 'image/webp': 'webp', 'image/gif': 'gif', 'image/svg+xml': 'svg' };

  function gorselYukleSec(girdi) {
    var dosya = girdi.files && girdi.files[0];
    girdi.value = '';
    if (!dosya) return;
    var tur = girdi.getAttribute('data-yukle');
    var id = girdi.getAttribute('data-id');
    /* Yeni araçta kimlik henüz yok; görsel dosyasının adı kimliğe bağlı olduğu
       için önce aracı tamamlayıp kimliği oluşturuyoruz. */
    if (!id && duzenArac) {
      if (!aracBitir()) return;
      id = (D.araclar[D.araclar.length - 1] || {}).id;
      duzenArac = id;
      ciz();
    }
    if (!id) { alert('Önce araç adını yaz.'); return; }
    var uzanti = UZANTI[dosya.type] || (dosya.name.split('.').pop() || '').toLowerCase();
    if (['png', 'jpg', 'jpeg', 'webp', 'gif', 'svg'].indexOf(uzanti) === -1) {
      alert('Yalnızca PNG, JPG, WEBP, GIF ve SVG yüklenebilir.');
      return;
    }
    if (dosya.size > 5 * 1024 * 1024) { alert('Görsel 5 MB sınırını aşıyor.'); return; }
    if (!sunucuVar && dosya.size > 400 * 1024) {
      alert('Sunucu kapalıyken görsel veri dosyasına gömülür; bu yüzden en çok 400 KB olabilir.\n\n' +
        'Görseli küçült ya da "node yerel-sunucu.js" ile sunucuyu başlat.');
      return;
    }

    var okuyucu = new FileReader();
    okuyucu.onerror = function () { alert('Dosya okunamadı.'); };
    okuyucu.onload = function () {
      var veriUrl = String(okuyucu.result);
      if (!sunucuVar) {
        gorselAta(tur, id, veriUrl);
        bildir('Görsel veri dosyasına gömüldü. Kaydetmeyi unutma.');
        return;
      }
      istek('gorsel', {
        tur: tur, id: id, uzanti: uzanti,
        veri: veriUrl.slice(veriUrl.indexOf(',') + 1)
      }).then(function (v) {
        gorselSurum[id] = Date.now();
        gorselAta(tur, id, v.yol);
        bildir('Görsel kaydedildi: ' + v.yol);
      }).catch(function (err) {
        if (/Oturum/.test(err.message)) { girisAc(); return; }
        alert('Görsel yüklenemedi: ' + err.message);
      });
    };
    okuyucu.readAsDataURL(dosya);
  }

  function gorselAta(tur, id, yol) {
    if (tur === 'site') {
      D.site.logo = yol;
      kirlet('site');
    } else if (tur === 'banner') {
      D.site.paylasimGorsel = yol;
      kirlet('site');
    } else {
      if (!D.gorseller[id]) D.gorseller[id] = {};
      D.gorseller[id][tur] = yol;
      kirlet('gorseller');
    }
    ciz();
  }

  function gorselKaldir(tur, id) {
    var g = D.gorseller[id] || {};
    var yol = g[tur];
    delete g[tur];
    if (!Object.keys(g).length) delete D.gorseller[id];
    kirlet('gorseller');
    if (sunucuVar && yol && !/^data:/.test(yol)) {
      istek('gorsel-sil', { yol: yol }).catch(function () {
        bildir('Eşleşme kaldırıldı; dosya diskten silinemedi.');
      });
    }
    ciz();
  }

  /* ===================== 18. Olaylar ===================== */

  document.addEventListener('input', alanDegisti);
  document.addEventListener('change', function (e) {
    if (e.target.id === 'onizleme-alt-secim') {
      if (e.target.value) onizlemeSayfaGit(e.target.value, true);
      return;
    }
    if (e.target.matches('[data-yukle]')) { gorselYukleSec(e.target); return; }
    if (e.target.matches('[data-yedek-al]')) { yedektenAl(e.target); return; }
    if (e.target.matches('[data-eylem="tema-yazi"]')) {
      var f = YAZI_TIPLERI[Number(e.target.value)];
      if (f) { D.tema.serif = f[1]; D.tema.sans = f[2]; kirlet('tema'); window.temaUygula(D.tema); onizlemeGonder(); }
      return;
    }
    if (e.target.matches('[data-kat]')) { kategoriSec(e.target); return; }
    alanDegisti(e);
  });

  function alanDegisti(e) {
    var hedef = e.target;

    if (hedef.id === 'arac-ara') { filtre.q = hedef.value; el('arac-tablo').innerHTML = aracTablosu(); return; }
    if (hedef.id === 'arac-kat') { filtre.kat = hedef.value; el('arac-tablo').innerHTML = aracTablosu(); return; }
    if (hedef.id === 'arac-durum') { filtre.durum = hedef.value; el('arac-tablo').innerHTML = aracTablosu(); return; }

    if (hedef.hasAttribute && hedef.hasAttribute('data-renk')) {
      renkYaz(hedef.getAttribute('data-renk'), hedef.value, hedef);
      return;
    }
    if (hedef.hasAttribute && hedef.hasAttribute('data-renk-kod')) {
      renkYaz(hedef.getAttribute('data-renk-kod'), hedef.value, hedef);
      return;
    }

    var alanEl = hedef.closest ? hedef.closest('[data-yol]') : null;
    if (!alanEl) return;
    var yol = alanEl.getAttribute('data-yol');
    var tip = alanEl.getAttribute('data-tip') || 'metin';
    var d;
    if (tip === 'satirlar') {
      d = alanEl.value.split('\n').map(kirp).filter(Boolean);
    } else if (tip === 'virgul') {
      d = alanEl.value.split(',').map(kirp).filter(Boolean);
    } else if (tip === 'evet') {
      d = alanEl.value === '1' ? true : '';
    } else if (tip === 'evet-onay') {
      d = alanEl.checked ? true : '';
    } else {
      d = alanEl.value;
    }
    yaz(yol, d);
    var dosya = yol.split('.')[0];
    kirlet(dosya);
    if (dosya === 'tema') window.temaUygula(D.tema);
    if (dosya === 'site') {
      el('yan-ad').textContent = D.site.ad || 'Rehber';
      if (/kategoriler/.test(yol)) window.kategoriRenkleri(D.site.kategoriler);
    }
    onizlemeGonder();
  }

  function renkYaz(ad, deger, hedef) {
    var d = kirp(deger);
    if (!D.tema.renkler) D.tema.renkler = {};
    D.tema.renkler[ad] = d;
    kirlet('tema');
    window.temaUygula(D.tema);
    onizlemeGonder();
    // Renk kutusu ile kod kutusunu birbirine eşitle (sayfayı yeniden çizmeden).
    var satir = hedef.closest('.renk-satir');
    if (!satir) return;
    var kutu = satir.querySelector('[data-renk]');
    var kod = satir.querySelector('[data-renk-kod]');
    if (hedef === kutu && kod) kod.value = d;
    if (hedef === kod && kutu && /^#[0-9a-fA-F]{6}$/.test(d)) kutu.value = d;
  }

  function kategoriSec(kutu) {
    var i = Number(kutu.getAttribute('data-i'));
    var k = kutu.getAttribute('data-kat');
    var a = D.araclar[i];
    if (!a) return;
    a.kategori = a.kategori || [];
    if (kutu.checked) {
      if (a.kategori.indexOf(k) === -1) a.kategori.push(k);
    } else {
      a.kategori = a.kategori.filter(function (x) { return x !== k; });
    }
    kirlet('araclar');
    ciz();
  }

  document.addEventListener('click', function (e) {
    var b = e.target.closest('[data-bolum]');
    if (b) { git(b.getAttribute('data-bolum')); return; }

    var f = e.target.closest('[data-gorsel-filtre]');
    if (f) { gorselFiltre = f.getAttribute('data-gorsel-filtre'); ciz(); return; }

    var d = e.target.closest('[data-eylem]');
    if (!d || d.disabled) return;
    var eylem = d.getAttribute('data-eylem');
    var id = d.getAttribute('data-id');
    var i = Number(d.getAttribute('data-i'));

    /* --- Araçlar --- */
    if (eylem === 'arac-yeni') {
      bolumAdi = 'araclar';
      D.araclar.push({
        id: '', ad: '', url: '', kategori: ['metin'], ucret: 'kismen', ozet: '',
        kontrol: yilAy(), vitrin: true
      });
      duzenArac = '*yeni*';
      kirlet('araclar');
      ciz();
      return;
    }
    if (eylem === 'arac-duzenle') { bolumAdi = 'araclar'; duzenArac = id; ciz(); basaDon(); return; }
    if (eylem === 'arac-bitti') {
      if (!aracBitir()) return;
      duzenArac = null;
      ciz();
      basaDon();
      return;
    }
    if (eylem === 'arac-kopya') {
      var kay = aracBul(id);
      if (!kay) return;
      var yeni = kopya(kay);
      yeni.ad = kay.ad + ' (kopya)';
      yeni.id = benzersizKimlik(kimlik(yeni.ad));
      D.araclar.splice(D.araclar.indexOf(kay) + 1, 0, yeni);
      duzenArac = yeni.id;
      kirlet('araclar');
      ciz();
      bildir('Kopya oluşturuldu. Adını ve adresini değiştir.');
      return;
    }
    if (eylem === 'arac-sil') {
      var a = aracBul(id);
      if (!a) return;
      var kullanan = D.gorevler.filter(function (g) {
        return (g.araclar || []).some(function (x) { return x.id === id; });
      });
      var uyari = a.ad + ' silinsin mi?';
      if (kullanan.length) {
        uyari += '\n\nDikkat: şu görev rehberlerinde kullanılıyor:\n' +
          kullanan.map(function (g) { return '· ' + g.baslik; }).join('\n') +
          '\n\nSilerse o rehberlerden de çıkarılacak.';
      }
      if (!confirm(uyari)) return;
      D.araclar = D.araclar.filter(function (x) { return x.id !== id; });
      // Aracın logosu ve tanıtım görseli de diskten kaldırılsın.
      var g = D.gorseller[id] || {};
      if (sunucuVar) {
        ['logo', 'gorsel'].forEach(function (tur) {
          if (g[tur] && !/^data:/.test(g[tur])) istek('gorsel-sil', { yol: g[tur] }).catch(function () { });
        });
      }
      delete D.gorseller[id];
      D.gorevler.forEach(function (g) {
        if (!g.araclar) return;
        g.araclar = g.araclar.filter(function (x) { return x.id !== id; });
      });
      D.araclar.forEach(function (x) { if (x.yerine === id) delete x.yerine; });
      duzenArac = null;
      kirlet('araclar');
      kirlet('gorseller');
      kirlet('gorevler');
      ciz();
      bildir(a.ad + ' silindi.');
      return;
    }
    if (eylem === 'arac-tasi') { tasi(D.araclar, D.araclar.findIndex(function (x) { return x.id === id; }), Number(d.getAttribute('data-yon')), 'araclar'); return; }
    if (eylem === 'arac-yayin') {
      var ay = aracBul(id);
      if (!ay) return;
      if (ay.gizli) delete ay.gizli; else ay.gizli = true;
      kirlet('araclar');
      ciz();
      bildir(ay.ad + (ay.gizli ? ' gizlendi.' : ' yayına alındı.') + ' Kaydetmeyi unutma.');
      return;
    }

    /* --- Görseller --- */
    if (eylem === 'gorsel-sil') { gorselKaldir(d.getAttribute('data-tur'), id); return; }
    if (eylem === 'gorsel-logosuz') { gorselFiltre = 'logosuz'; git('gorseller'); return; }
    if (eylem === 'site-logo-sil') {
      D.site.logo = 'assets/ikon.svg';
      kirlet('site');
      ciz();
      return;
    }

    /* --- Görevler --- */
    if (eylem === 'gorev-yeni') {
      bolumAdi = 'gorevler';
      D.gorevler.push({
        id: '', baslik: '', kisa: '', ikon: 'yildiz', kategori: Object.keys(D.site.kategoriler)[0] || 'metin',
        sure: '10 dk', ozet: '', araclar: [], adimlar: [], prompt: '', promptlar: [], kontrol: []
      });
      duzenGorev = '*yeni*';
      kirlet('gorevler');
      ciz();
      return;
    }
    if (eylem === 'gorev-duzenle') { bolumAdi = 'gorevler'; duzenGorev = id; ciz(); basaDon(); return; }
    if (eylem === 'gorev-bitti') {
      if (!gorevBitir()) return;
      duzenGorev = null;
      ciz();
      basaDon();
      return;
    }
    if (eylem === 'gorev-sil') {
      var g = D.gorevler[i];
      if (!g || !confirm((g.baslik || 'Bu görev') + ' silinsin mi?')) return;
      D.gorevler.splice(i, 1);
      duzenGorev = null;
      kirlet('gorevler');
      ciz();
      return;
    }
    if (eylem === 'gorev-tasi') { tasi(D.gorevler, i, Number(d.getAttribute('data-yon')), 'gorevler'); return; }
    if (eylem === 'gorev-yayin') {
      var gy = D.gorevler[i];
      if (!gy) return;
      if (gy.gizli) delete gy.gizli; else gy.gizli = true;
      kirlet('gorevler');
      ciz();
      bildir(gy.baslik + (gy.gizli ? ' gizlendi.' : ' yayına alındı.') + ' Kaydetmeyi unutma.');
      return;
    }
    if (eylem === 'ikon-sec') {
      yaz(d.getAttribute('data-yol'), id);
      kirlet(d.getAttribute('data-yol').split('.')[0]);
      ciz();
      return;
    }

    /* --- Genel liste --- */
    if (eylem === 'liste-ekle') {
      var yol = d.getAttribute('data-yol');
      var sablon = (d.getAttribute('data-sablon') || '').split('|');
      var dizi = oku(yol);
      if (!Array.isArray(dizi)) { yaz(yol, []); dizi = oku(yol); }
      if (sablon.length === 1 && sablon[0] === 'null') dizi.push('');
      else if (sablon.every(function (s) { return /^\d+$/.test(s); })) dizi.push(sablon.map(function () { return ''; }));
      else {
        var n = {};
        sablon.forEach(function (s) { n[s] = s === 'araclar' ? [] : ''; });
        dizi.push(n);
      }
      kirlet(yol.split('.')[0]);
      ciz();
      return;
    }
    if (eylem === 'liste-sil') {
      var yol2 = d.getAttribute('data-yol');
      var dizi2 = oku(yol2);
      if (!Array.isArray(dizi2)) return;
      dizi2.splice(i, 1);
      kirlet(yol2.split('.')[0]);
      ciz();
      return;
    }

    /* --- Tema --- */
    if (eylem === 'tema-sekil') {
      D.tema.sekil = id;
      kirlet('tema');
      ciz();
      return;
    }
    if (eylem === 'tema-hazir' || eylem === 'tema-sifirla') {
      var secilen = eylem === 'tema-sifirla' ? 'deniz' : id;
      var h = HAZIR[secilen];
      if (!h) return;
      D.tema.renkler = kopya(h.renkler);
      D.tema.hazir = secilen;
      D.tema.semasi = h.semasi;
      kirlet('tema');
      window.temaUygula(D.tema);
      ciz();
      bildir(h.ad + ' teması uygulandı. Kaydetmeyi unutma.');
      return;
    }

    /* --- Sayfalar ve yerleşim (Canlı Önizleme & Tıkla-Düzenle) --- */
    if (eylem === 'onizleme-sayfa') {
      onizlemeSayfaGit(d.getAttribute('data-hash') || '#/', true);
      return;
    }
    if (eylem === 'onizleme-cihaz') {
      onizlemeCihaz = id || 'masaustu';
      yerlesimCubukGuncelle();
      return;
    }
    if (eylem === 'odak-sec') {
      seciliOdak = {
        odak: d.getAttribute('data-odak') || 'genel',
        id: d.getAttribute('data-id') || '',
        ad: d.getAttribute('data-ad') || 'Bölüm Ayarları'
      };
      if (el('gd-sol-panel')) {
        el('gd-sol-panel').innerHTML = solPanelCiz();
        el('gd-sol-panel').scrollTo({ top: 0, behavior: 'smooth' });
      }
      onizlemeGonder();
      return;
    }
    if (eylem === 'menu-tasi') {
      tasi(D.site.menu, i, Number(d.getAttribute('data-yon')), 'site');
      return;
    }
    if (eylem === 'menu-ekle') {
      D.site.menu = D.site.menu || [];
      D.site.menu.push({ id: 'menu-' + (D.site.menu.length + 1), ad: 'Yeni Sayfa', adres: '#/', durum: 'acik' });
      kirlet('site');
      ciz();
      return;
    }
    if (eylem === 'menu-sil') {
      if (!D.site.menu || D.site.menu.length <= 1) return;
      D.site.menu.splice(i, 1);
      kirlet('site');
      ciz();
      return;
    }
    if (eylem === 'anasayfa-tasi') {
      tasi(D.site.anasayfa.sira, i, Number(d.getAttribute('data-yon')), 'site');
      return;
    }

    /* --- Ayarlar --- */
    if (eylem === 'kat-ekle') { kategoriEkle(); return; }
    if (eylem === 'kat-sil') {
      if (!confirm('"' + ((D.site.kategoriler[id] || {}).ad || id) + '" kategorisi silinsin mi?')) return;
      delete D.site.kategoriler[id];
      D.gorevler.forEach(function (gv) {
        if (gv.kategori === id) gv.kategori = Object.keys(D.site.kategoriler)[0] || 'metin';
      });
      kirlet('site');
      kirlet('gorevler');
      window.kategoriRenkleri(D.site.kategoriler);
      ciz();
      return;
    }
    if (eylem === 'sifre-degistir') { sifreDegistir(); return; }

    /* --- Yedek ve kayıt --- */
    if (eylem === 'yedek-indir') {
      var tarih = new Date().toISOString().slice(0, 10);
      indir('rehber-yedek-' + tarih + '.json', JSON.stringify({
        surum: 1, tarih: new Date().toISOString(), veri: D
      }, null, 2), 'application/json');
      bildir('Yedek indirildi.');
      return;
    }
    if (eylem === 'dosya-indir') { indir(DOSYA[id].yol.split('/').pop(), dosyaMetni(id)); return; }
    if (eylem === 'dosya-kaydet') { dosyaKaydet(id); return; }
    if (eylem === 'hepsini-indir') {
      kirliDosyalar().forEach(function (k, n) {
        setTimeout(function () { indir(DOSYA[k].yol.split('/').pop(), dosyaMetni(k)); }, n * 350);
      });
      bildir('Dosyalar indiriliyor. Hepsini veri klasörüne taşı.');
      return;
    }
    if (eylem === 'kayit-bitti') {
      kirliDosyalar().forEach(function (k) { degisen[k] = false; });
      taslakYaz();
      git('panel');
      return;
    }
    if (eylem === 'taslak-at') {
      if (!confirm('Kaydedilmemiş bütün değişiklikler silinsin mi? Bu geri alınamaz.')) return;
      taslakSil();
      location.reload();
      return;
    }
  });

  function tasi(dizi, i, yon, dosya) {
    var j = i + yon;
    if (i < 0 || j < 0 || j >= dizi.length) return;
    var x = dizi[i];
    dizi[i] = dizi[j];
    dizi[j] = x;
    kirlet(dosya);
    ciz();
  }

  function yilAy() {
    var t = new Date();
    return t.getFullYear() + '-' + String(t.getMonth() + 1).padStart(2, '0');
  }

  function benzersizKimlik(temel) {
    var k = temel || 'arac';
    var n = 2;
    while (D.araclar.some(function (a) { return a.id === k; })) { k = temel + '-' + n; n++; }
    return k;
  }

  /* Araç formundan çıkarken zorunlu alanları kontrol edip kimliği oluşturur. */
  function aracBitir() {
    var i = duzenArac === '*yeni*' ? D.araclar.length - 1
      : D.araclar.findIndex(function (a) { return a.id === duzenArac; });
    var a = D.araclar[i];
    if (!a) return true;
    a.ad = kirp(a.ad);
    a.url = kirp(a.url);
    a.ozet = kirp(a.ozet);
    if (!a.ad) { alert('Araç adını yazmadan çıkamazsın. Vazgeçtiysen aracı sil.'); return false; }
    if (!/^https?:\/\/\S+\.\S+/i.test(a.url)) { alert('Web adresini https:// ile başlayacak şekilde yaz.'); return false; }
    if (!(a.kategori || []).length) { alert('En az bir kategori seç.'); return false; }
    if (!a.ozet) { alert('Kısa açıklamayı yaz.'); return false; }
    if (!a.id) {
      var temel = kimlik(a.ad);
      if (!temel) { alert('Araç adında en az bir harf ya da rakam olmalı.'); return false; }
      a.id = benzersizKimlik(temel);
      bildir(a.ad + ' eklendi (kimlik: ' + a.id + ').');
    }
    if (a.durum !== 'kapandi') delete a.yerine;
    kirlet('araclar');
    return true;
  }

  function gorevBitir() {
    var i = duzenGorev === '*yeni*' ? D.gorevler.length - 1
      : D.gorevler.findIndex(function (g) { return g.id === duzenGorev; });
    var g = D.gorevler[i];
    if (!g) return true;
    g.baslik = kirp(g.baslik);
    g.ozet = kirp(g.ozet);
    if (!g.baslik) { alert('Görev başlığını yazmadan çıkamazsın. Vazgeçtiysen görevi sil.'); return false; }
    if (!g.ozet) { alert('Kısa özeti yaz.'); return false; }
    g.id = kimlik(kirp(g.id) || g.baslik);
    if (!g.id) { alert('Görev başlığında en az bir harf ya da rakam olmalı.'); return false; }
    if (D.gorevler.some(function (x, n) { return n !== i && x.id === g.id; })) {
      alert('Bu kimlikte bir görev zaten var: ' + g.id);
      return false;
    }
    g.araclar = (g.araclar || []).filter(function (x) { return x.id; });
    if (g.promptlar) g.promptlar = g.promptlar.filter(function (p) { return kirp(p.prompt); });
    kirlet('gorevler');
    return true;
  }

  function kategoriEkle() {
    var ad = kirp(el('yeni-kat-ad').value);
    var baslik = kirp(el('yeni-kat-baslik').value) || ad;
    if (!ad) { alert('Kategori adını yaz.'); return; }
    var k = kimlik(ad);
    if (!k) { alert('Kategori adında en az bir harf ya da rakam olmalı.'); return; }
    if (D.site.kategoriler[k]) { alert('Bu kimlikte bir kategori var: ' + k); return; }
    D.site.kategoriler[k] = { ad: ad, baslik: baslik, aciklama: '' };
    if (!D.tema.renkler['k-' + k]) D.tema.renkler['k-' + k] = '#475a6b';
    kirlet('site');
    kirlet('tema');
    window.kategoriRenkleri(D.site.kategoriler);
    window.temaUygula(D.tema);
    ciz();
    bildir(ad + ' kategorisi eklendi. Rengini Tema bölümünden ayarlayabilirsin.');
  }

  function sifreDegistir() {
    var h = el('sifre-hata');
    var s1 = el('yeni-sifre').value, s2 = el('yeni-sifre-2').value;
    h.hidden = true;
    if (s1.length < 8) { h.textContent = 'Şifre en az 8 karakter olmalı.'; h.hidden = false; return; }
    if (s1 !== s2) { h.textContent = 'İki şifre aynı değil.'; h.hidden = false; return; }
    D.yonetici.sifreOzet = window.ozet256(s1);
    kirlet('yonetici');
    el('yeni-sifre').value = '';
    el('yeni-sifre-2').value = '';
    ciz();
    bildir('Şifre değişti. Kaydet dedikten sonra geçerli olur.');
  }

  function yedektenAl(girdi) {
    var dosya = girdi.files && girdi.files[0];
    girdi.value = '';
    if (!dosya) return;
    var okuyucu = new FileReader();
    okuyucu.onload = function () {
      var y;
      try { y = JSON.parse(String(okuyucu.result)); } catch (e) { alert('Bu dosya okunamadı; geçerli bir yedek değil.'); return; }
      var v = y && y.veri;
      if (!v || !Array.isArray(v.araclar) || !v.site) { alert('Bu dosya bir rehber yedeği değil.'); return; }
      if (!confirm('Yedek yüklenirse şu andaki bütün içerik değişir.\n\nYedek tarihi: ' +
        (y.tarih || 'bilinmiyor') + '\nAraç sayısı: ' + v.araclar.length + '\n\nDevam edilsin mi?')) return;
      Object.keys(DOSYA).forEach(function (k) {
        if (v[k] !== undefined) { D[k] = v[k]; degisen[k] = true; }
      });
      taslakYaz();
      window.temaUygula(D.tema);
      window.kategoriRenkleri(D.site.kategoriler);
      catiCiz();
      git('panel');
      bildir('Yedek yüklendi. Siteye işlemek için Kaydet.');
    };
    okuyucu.readAsText(dosya);
  }

  window.addEventListener('message', function (e) {
    var msg = e.data;
    if (!msg || typeof msg !== 'object') return;
    if (msg.tip === 'onizleme-sec') {
      seciliOdak = {
        odak: msg.odak || 'genel',
        id: msg.id || '',
        ad: msg.ad || msg.odak || 'Bölüm Ayarları'
      };
      if (msg.hash) onizlemeSayfa = msg.hash;
      if (bolumAdi === 'yerlesim' && el('gd-sol-panel')) {
        el('gd-sol-panel').innerHTML = solPanelCiz();
        el('gd-sol-panel').scrollTo({ top: 0, behavior: 'smooth' });
        el('gd-sol-panel').classList.remove('vurgu-darbe');
        void el('gd-sol-panel').offsetWidth;
        el('gd-sol-panel').classList.add('vurgu-darbe');
        yerlesimCubukGuncelle();
      }
      bildir('✎ ' + seciliOdak.ad + ' ayarları solda açıldı.');
    } else if (msg.tip === 'onizleme-sayfa' && msg.hash) {
      onizlemeSayfa = msg.hash;
      if (bolumAdi === 'yerlesim') yerlesimCubukGuncelle();
    }
  });

  el('kaydet-dugme').addEventListener('click', kaydet);

  window.addEventListener('beforeunload', function (e) {
    if (kirliMi()) { e.preventDefault(); e.returnValue = ''; }
  });

  /* ===================== 19. Başlangıç ===================== */

  /* Taslaktan yalnızca KAYDEDİLMEMİŞ dosyalar geri alınır. Kaydedilmiş olanlar
     diskten okunduğu gibi kalsın; yoksa dosyayı panel dışında düzenlediğinde
     eski taslak onu geri yazar. */
  var taslak = taslakOku();
  if (taslak && taslak.veri && taslak.degisen) {
    Object.keys(DOSYA).forEach(function (k) {
      if (taslak.degisen[k] && taslak.veri[k] !== undefined) D[k] = taslak.veri[k];
    });
    siteVarsayilanlariTamamla(D.site);
    degisen = taslak.degisen;
    if (kirliMi()) {
      window.temaUygula(D.tema);
      taslakYaz();
    } else {
      taslakSil();
    }
  }

  sunucuBak().then(function () {
    var oturum = null;
    try { oturum = sessionStorage.getItem(OTURUM); } catch (e) { /* yok say */ }
    if (oturum) {
      anahtar = oturum === 'yerel' ? kaliciAnahtar() : oturum;
      panelAc();
    } else {
      girisAc();
      el('g-kullanici').focus();
    }
  });
})();
