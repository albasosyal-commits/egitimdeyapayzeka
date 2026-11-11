/* Sitenin motoru. İçerik değişikliği için burası değil, veri/ klasöründeki dosyalar düzenlenir. */
(function () {
  'use strict';

  var S = window.SITE;
  /* Panelden "gizli" işaretlenenler siteye hiç çıkmaz: ne listede, ne aramada,
     ne de görev rehberlerinin araç önerilerinde görünürler. */
  var ARACLAR = (window.ARACLAR || []).filter(function (a) { return !a.gizli; });
  var GOREVLER = (window.GOREVLER || []).filter(function (g) { return !g.gizli; });
  var GORSELLER = window.GORSELLER || {};
  var R = window.REHBER || {};
  var ana = document.getElementById('ana');

  var aktif = ARACLAR.filter(function (a) { return a.durum !== 'kapandi'; });
  var kapanan = ARACLAR.filter(function (a) { return a.durum === 'kapandi'; });

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
    if (g.logo) {
      return '<span class="logo' + ek + '"><img src="' + esc(g.logo) + '" alt="" loading="lazy"></span>';
    }
    return '<span class="logo' + ek + ' logo-harf r-' + esc(a.kategori[0]) + '">' +
      esc(a.ad.trim().charAt(0).toLocaleUpperCase('tr')) + '</span>';
  }

  // Araç sayfasının başındaki tanıtım görseli (aracın kendi sitesinden indirilmiştir).
  function onizleme(a) {
    var g = GORSELLER[a.id] || {};
    if (!g.gorsel || a.durum === 'kapandi') return '';
    return '<figure class="onizleme"><img src="' + esc(g.gorsel) + '" alt="' + esc(a.ad) + ' arayüzünden bir görüntü" loading="lazy">' +
      '<figcaption>Tanıtım görseli · Kaynak: ' + esc(a.ad) + '</figcaption></figure>';
  }

  function aracKart(a) {
    var k = a.kategori[0];
    return '<a class="sekmeli" href="#/arac/' + esc(a.id) + '">' +
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
    return '<a class="is-kart m-' + esc(g.id) + '" href="#/gorev/' + esc(g.id) + '" title="' + esc(g.ozet) + '">' +
      '<span class="is-madalyon y-' + esc(g.kategori) + ' m-' + esc(g.id) + '">' + window.ikonCiz(g.ikon) + '</span>' +
      '<span class="is-yazi"><b>' + esc(g.baslik) + '</b>' + (alt ? '<small>' + esc(alt) + '</small>' : '') + '</span></a>';
  }

  /* Kutucukların biçimi panelin Tema bölümünden seçilir. */
  function kutucukSekli() {
    var s = (window.TEMA || {}).sekil;
    return 'sekil-' + (['yuvarlak', 'altigen', 'yumusak'].indexOf(s) !== -1 ? s : 'yuvarlak');
  }

  /* Panelde "yeni eklendi" işaretlenen araçlar, kahraman bölümünün hemen
     altında küçük bir şeritte sırayla belirir. */
  function yeniSerit() {
    var yeniler = aktif.filter(function (a) { return a.vitrin; }).slice(0, 10);
    if (!yeniler.length) return '';
    return '<section class="yeni-serit"><div class="kap"><div class="yeni-ic">' +
      '<span class="yeni-etiket">Yeni eklendi</span>' +
      '<ul class="yeni-liste">' + yeniler.map(function (a, i) {
        return '<li style="--s:' + i + '"><a class="yeni-rozet" href="#/arac/' + esc(a.id) + '">' +
          logoKutu(a, 'mini') + esc(a.ad) + '</a></li>';
      }).join('') + '</ul></div></div></section>';
  }

  /* ---------- Sayfalar ---------- */

  function sayfaAnasayfa() {
    var gorevPromptSay = GOREVLER.reduce(function (t, g) {
      return t + (g.promptlar && g.promptlar.length ? g.promptlar.length : (g.prompt ? 1 : 0));
    }, 0);
    var promptSay = gorevPromptSay + aktif.filter(function (a) { return a.prompt; }).length;
    return {
      baslik: '',
      nav: 'gorev',
      html:
        '<section class="defter"><div class="kap"><div class="defter-ic">' +
        '<p class="ust-etiket">' + esc(S.okul) + '</p>' +
        '<h1>Bugün ne hazırlıyorsun?</h1>' +
        '<p class="giris">Yapacağın işi seç. Hangi yapay zekâyı açacağını, ne yazacağını ve neyi kontrol edeceğini adım adım gösterelim.</p>' +
        '<form class="ara-form" data-ara role="search"><input type="search" name="q" aria-label="Araç ara" placeholder="Araç ya da iş ara: sınav, şarkı, Gemini…"><button class="dugme" type="submit">Ara</button></form>' +
        '<p class="sayilar">' + aktif.length + ' araç · ' + GOREVLER.length + ' hazır görev rehberi · ' + promptSay + ' kopyalanabilir prompt</p>' +
        '</div></div></section>' +

        yeniSerit() +

        '<section class="bolum"><div class="kap">' +
        '<div class="bolum-bas"><h2>Yapacağın işi seç</h2><a href="#/araclar">Tüm araçları gör</a></div>' +
        '<div class="is-izgara ' + kutucukSekli() + '">' + GOREVLER.map(isKutucuk).join('') + '</div></div></section>' +

        '<section class="bolum"><div class="kap">' +
        '<div class="bolum-bas"><h2>Araçtan önce üç alışkanlık</h2></div>' +
        '<div class="uc-adim">' +
        '<a href="#/baslangic"><span class="no">1</span><h3>Aracın türünü bil</h3><p>Metinden görsele, görselden videoya: işin için doğru türü seç.</p></a>' +
        '<a href="#/prompt"><span class="no">2</span><h3>İyi prompt yaz</h3><p>Sınıf düzeyini, amacı ve biçimi söyle. Atölyede hazır formülle dene.</p></a>' +
        '<a href="#/guvenli"><span class="no">3</span><h3>Çıktıyı kontrol et</h3><p>Yapay zekâ yanılabilir. Öğrenci bilgisi girme, sonucu sınıfa götürmeden doğrula.</p></a>' +
        '</div></div></section>'
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
      return '<section class="grup"><div class="grup-bas"><h2>' + esc(S.kategoriler[k].baslik) + '</h2><span>' + esc(S.kategoriler[k].aciklama) + '</span></div>' +
        '<div class="arac-izgara">' + ic.map(aracKart).join('') + '</div></section>';
    }).join('');
  }

  function cipler(ad, secenekler, secili) {
    return '<div class="cipler" role="group" aria-label="' + esc(ad === 'kat' ? 'Kategori' : 'Ücret') + '">' + secenekler.map(function (s) {
      return '<button type="button" class="cip" data-filtre="' + ad + '" data-deger="' + esc(s[0]) + '" aria-pressed="' + (s[0] === secili) + '">' + esc(s[1]) + '</button>';
    }).join('') + '</div>';
  }

  function sayfaAraclar(sorgu) {
    filtre.q = sorgu.get('q') || '';
    filtre.kat = sorgu.get('kat') || 'hepsi';
    filtre.ucret = sorgu.get('ucret') || 'hepsi';
    var katlar = [['hepsi', 'Hepsi']].concat(Object.keys(S.kategoriler).map(function (k) { return [k, S.kategoriler[k].ad]; }));
    var kapananHtml = kapanan.length ? '<details class="kapanan"><summary>Artık kullanılamayan araçlar (' + kapanan.length + ')</summary>' +
      '<ul>' + kapanan.map(function (a) {
        var yer = aracBul(a.yerine);
        return '<li><strong>' + esc(a.ad) + '</strong>: ' + esc(a.ozet) + (yer ? ' <a href="#/arac/' + esc(yer.id) + '">Yerine ' + esc(yer.ad) + ' kullanılabilir.</a>' : '') + '</li>';
      }).join('') + '</ul></details>' : '';
    return {
      baslik: 'Araçlar',
      nav: 'araclar',
      html: '<div class="kap"><div class="sayfa-bas"><h1>Araç rehberi</h1>' +
        '<p class="giris">Ücreti, yaş sınırı ve öğretmene faydası bir bakışta. Bir araca tıklayınca hazır prompt ve dikkat edilecekleri görürsün.</p>' +
        '<div class="filtre"><input class="girdi" id="arac-ara" type="search" aria-label="Araçlarda ara" placeholder="Ara: sunum, seslendirme, Kahoot…" value="' + esc(filtre.q) + '">' +
        cipler('kat', katlar, filtre.kat) +
        cipler('ucret', [['hepsi', 'Tüm ücretler'], ['ucretsiz', 'Ücretsiz başlanabilir'], ['tamamen', 'Tamamen ücretsiz']], filtre.ucret) +
        '</div></div><div id="arac-sonuc" aria-live="polite">' + aracSonuc() + '</div>' + kapananHtml + '</div>'
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
      html: '<div class="kap"><div class="sayfa-bas"><p class="kirinti"><a href="#/araclar">Araçlar</a> / ' + esc(a.alt || katAd(a.kategori[0])) + '</p>' +
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
      html: '<div class="kap"><div class="sayfa-bas"><p class="kirinti"><a href="#/">Görevler</a> / ' + esc(katAd(g.kategori)) + '</p>' +
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
    return { brans: f.brans.value.trim(), sinif: f.sinif.value, konu: f.konu.value.trim(), tur: f.tur.value, bicim: f.bicim.value, ek: f.ek.value.trim() };
  }
  function atolyeCiz() {
    var parcalar = promptParcalar(atolyeOku());
    var duz = parcalar.map(function (p) { return p[1]; }).join(' ');
    document.getElementById('atolye-cikti').innerHTML = '<div class="tahta"><div class="tahta-bas"><span>Senin promptun</span>' +
      '<button class="kopyala" type="button" data-kopyala="' + esc(duz) + '">Kopyala</button></div><pre>' +
      parcalar.map(function (p) {
        return '<span class="parca p-' + p[0] + '">' + esc(p[1]).replace(/\[[^\]\n]+\]/g, function (m) { return '<mark>' + m + '</mark>'; }) + '</span>';
      }).join(' ') + '</pre></div>';
  }

  function sayfaPrompt() {
    var o = R.promptOrnek;
    var sinifSec = S.siniflar.map(function (s) { return '<option value="' + esc(s) + '"' + (s === '5.' ? ' selected' : '') + '>' + esc(s) + ' sınıf</option>'; }).join('');
    var turSec = Object.keys(SABLONLAR).map(function (k) { return '<option value="' + k + '">' + esc(SABLONLAR[k].ad) + '</option>'; }).join('');
    return {
      baslik: 'Prompt Atölyesi',
      nav: 'prompt',
      sonra: atolyeCiz,
      html: '<div class="kap"><div class="sayfa-bas"><h1>Prompt Atölyesi</h1>' +
        '<p class="giris">Prompt, yapay zekâya ne istediğini anlatan yönergedir. Ne kadar açık yazarsan sonuç o kadar işine yarar: iyi bir prompt, yeni bir öğretmen stajyere verilen iyi bir talimat gibidir.</p></div>' +

        '<section class="bolum" style="padding-top:26px"><h2 style="margin-bottom:16px">Aynı istek, iki farklı sonuç</h2>' +
        '<div class="kiyas"><div class="zayif"><h3>Zayıf prompt</h3><p>' + esc(o.zayif) + '</p><p class="acik">' + esc(o.zayifNeden) + '</p></div>' +
        '<div class="guclu"><h3>Güçlü prompt</h3><p>' + o.guclu.map(function (p) { return '<span class="parca p-' + p[0] + '">' + esc(p[1]) + '</span>'; }).join(' ') + '</p>' +
        '<ul class="gosterge">' + R.promptFormul.filter(function (f) { return o.guclu.some(function (p) { return p[0] === f.id; }); }).map(function (f) { return '<li><span class="parca p-' + f.id + '">' + esc(f.ad) + '</span></li>'; }).join('') + '</ul></div></div></section>' +

        '<section class="bolum"><h2 style="margin-bottom:16px">Güçlü promptun beş parçası</h2><div class="formul">' +
        R.promptFormul.map(function (f) { return '<div class="p-' + f.id + '"><strong>' + esc(f.ad) + '</strong><span>' + esc(f.aciklama) + '</span></div>'; }).join('') +
        '</div></section>' +

        '<section class="bolum"><h2>Kendi promptunu oluştur</h2><p style="color:var(--soluk);margin:6px 0 18px">Formu doldur, prompt yanda yazılsın. Kopyala ve istediğin yapay zekâya yapıştır.</p>' +
        '<div class="atolye"><form id="atolye-form" autocomplete="off">' +
        '<div class="alan-cift"><label class="alan"><span>Branşın</span><input class="girdi" name="brans" placeholder="Sosyal Bilgiler"></label>' +
        '<label class="alan"><span>Sınıf</span><select class="girdi" name="sinif">' + sinifSec + '</select></label></div>' +
        '<label class="alan"><span>Konu</span><input class="girdi" name="konu" placeholder="Kaynaklarımızın Verimli Kullanımı"></label>' +
        '<div class="alan-cift"><label class="alan"><span>Ne istiyorsun?</span><select class="girdi" name="tur">' + turSec + '</select></label>' +
        '<label class="alan"><span>Biçim</span><select class="girdi" name="bicim"><option value="madde">Maddeler</option><option value="tablo">Tablo</option><option value="metin">Akıcı metin</option><option value="slayt">Slayt başlıkları</option></select></label></div>' +
        '<label class="alan"><span>Ek isteğin (isteğe bağlı)</span><input class="girdi" name="ek" placeholder="Görsel okuryazarlık içeren örnekler kullan"></label>' +
        '</form><div class="atolye-sonuc" id="atolye-cikti"></div></div></section>' +

        '<section class="bolum"><div class="bolum-bas"><h2>Hazır promptlar</h2><p>İşe göre seçip kopyala.</p></div><div class="kutuphane dar">' +
        GOREVLER.map(function (g) {
          var liste = (g.promptlar && g.promptlar.length) ? g.promptlar : [{ baslik: katAd(g.kategori), prompt: g.prompt }];
          return '<div class="kutuphane-oge"><h3><a href="#/gorev/' + esc(g.id) + '">' + esc(g.baslik) + '</a></h3>' +
            '<div class="prompt-yigin">' + liste.map(function (p) { return tahta(p.prompt, p.baslik || katAd(g.kategori)); }).join('') + '</div></div>';
        }).join('') + '</div></section></div>'
    };
  }

  function sayfaGuvenli() {
    var g = R.guvenlik;
    var yaslar = aktif.filter(function (a) { return a.yas && a.kategori[0] !== 'web20'; });
    return {
      baslik: 'Güvenli Kullanım',
      nav: 'guvenli',
      html: '<div class="kap"><div class="sayfa-bas"><h1>Güvenli kullanım</h1><p class="giris">' + esc(g.giris) + '</p></div>' +
        '<section class="bolum" style="padding-top:26px"><div class="yap-yapma">' +
        '<div class="yapma"><h3>Yapay zekâya girme</h3>' + liste(g.yapma) + '</div>' +
        '<div class="yap"><h3>Bunun yerine</h3>' + liste(g.yap) + '</div></div></section>' +
        '<section class="bolum"><h2 style="margin-bottom:14px">Beş temel ilke</h2><div class="ilkeler">' +
        g.ilkeler.map(function (i) { return '<div><h3>' + esc(i.baslik) + '</h3><p>' + esc(i.metin) + '</p></div>'; }).join('') + '</div></section>' +
        '<section class="bolum"><h2 style="margin-bottom:14px">Sınıfa götürmeden önce</h2><div class="dar"><ul class="kontrol">' +
        g.kontrol.map(function (x) { return '<li><label><input type="checkbox"><span>' + esc(x) + '</span></label></li>'; }).join('') + '</ul></div></section>' +
        '<section class="bolum"><h2>Araçların yaş sınırları</h2><p style="color:var(--soluk);margin:6px 0 14px">' + esc(g.yasNot) + '</p>' +
        '<div class="tablo-sar"><table><thead><tr><th>Araç</th><th>Yaş sınırı</th><th>Ücret</th></tr></thead><tbody>' +
        yaslar.map(function (a) { return '<tr><td><a href="#/arac/' + esc(a.id) + '">' + esc(a.ad) + '</a></td><td>' + esc(a.yas) + '</td><td>' + esc(S.ucretler[a.ucret] || a.ucret) + '</td></tr>'; }).join('') +
        '</tbody></table></div></section>' +
        '<section class="bolum"><h2 style="margin-bottom:10px">Resmî kaynaklar</h2><ul class="kaynak dar">' +
        g.kaynaklar.map(function (k) { return '<li><a href="' + esc(guvenliUrl(k.url)) + '" target="_blank" rel="noopener">' + esc(k.ad) + ' ↗</a><small>' + esc(k.not) + '</small></li>'; }).join('') +
        '</ul></section></div>'
    };
  }

  function sayfaBaslangic() {
    var b = R.baslangic;
    return {
      baslik: 'Yeni Başlayanlar',
      nav: 'baslangic',
      html: '<div class="kap"><div class="sayfa-bas"><h1>Yapay zekâya yeni mi başlıyorsun?</h1><p class="giris">' + esc(b.giris) + '</p></div>' +
        '<section class="bolum" style="padding-top:26px"><div class="dar"><h2 style="margin-bottom:16px">İlk 30 dakikan</h2><ol class="adimlar">' +
        b.adimlar.map(function (x) { return '<li>' + esc(x) + '</li>'; }).join('') + '</ol>' +
        tahta(b.ilkPrompt, 'İlk promptun') + '</div></section>' +
        '<section class="bolum"><h2>Yapay zekâ türleri</h2><p style="color:var(--soluk);margin:6px 0 16px">Tür, verdiğin şey ile aldığın şeye göre adlandırılır.</p><div class="turler">' +
        b.turler.map(function (t) {
          var arac = t.araclar.map(function (id) { var a = aracBul(id); return a ? '<a href="#/arac/' + esc(a.id) + '">' + esc(a.ad) + '</a>' : ''; }).filter(Boolean).join(', ');
          return '<div class="tur"><h3>' + esc(t.ad) + '</h3><p class="en">' + esc(t.en) + '</p><p>' + esc(t.aciklama) + '</p><p class="araclar-kisa">' + arac + '</p></div>';
        }).join('') + '</div></section>' +
        '<section class="bolum"><h2 style="margin-bottom:12px">Sık duyacağın kelimeler</h2><dl class="terimler dar">' +
        b.terimler.map(function (t) { return '<dt>' + esc(t[0]) + '</dt><dd>' + esc(t[1]) + '</dd>'; }).join('') + '</dl></section></div>'
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

  function yonlendir() {
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
    window.scrollTo(0, 0);
    if (yonlendirildi) ana.focus({ preventScroll: true });
    yonlendirildi = true;
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

  document.getElementById('marka-ad').textContent = S.ad;
  document.getElementById('marka-okul').textContent = S.okul;
  document.getElementById('alt-okul').textContent = S.okul;
  var enYeni = ARACLAR.map(function (a) { return a.kontrol || ''; }).sort().pop();
  document.getElementById('alt-not').textContent = 'Ücretler ve koşullar sık değişir; araç bilgileri ' + (enYeni ? tarih(enYeni) + ' itibarıyla kontrol edildi' : 'düzenli olarak kontrol edilir') + '. Kullanmadan önce aracın kendi sayfasına bakın. Logolar ve tanıtım görselleri araçların kendi sitelerinden alınmıştır; markalar sahiplerine aittir.';
  if (S.logo) {
    var l = document.getElementById('marka-logo');
    l.src = S.logo;
    l.hidden = false;
  }
  window.addEventListener('hashchange', yonlendir);
  yonlendir();
})();
