/* Siteyi yerel bir adreste açar ve yönetim panelinin "Kaydet" düğmesini çalıştırır.

   Başlatmak için bu klasörde komut satırına şunu yaz:   node yerel-sunucu.js
   Sonra tarayıcıda şu adresleri aç:
     Site   → http://localhost:8731
     Panel  → http://localhost:8731/yonetim.html

   Sunucu çalışırken panelde "Kaydet" dediğinde değişiklikler doğrudan veri
   dosyalarına yazılır, GitHub / Vercel canlı sitesine (mobil dahil) gönderilir
   ve yüklediğin görseller assets klasörüne kaydedilir.
   Her kayıttan önce eski dosyanın bir kopyası "yedek" klasörüne alınır. */

const http = require('http');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { exec } = require('child_process');

const kok = path.resolve(__dirname);
const kapi = Number(process.argv[2]) || 8731;

/* Panelin yazabileceği dosyalar. Listede olmayan hiçbir dosyaya dokunulmaz. */
const YAZILABILIR = [
  'veri/araclar.js',
  'veri/gorevler.js',
  'veri/rehber.js',
  'veri/site.js',
  'veri/gorseller.js',
  'veri/tema.js',
  'veri/yonetici.js'
];
const GORSEL_KLASOR = { logo: 'assets/logo', gorsel: 'assets/gorsel', site: 'assets', banner: 'assets' };
const GORSEL_UZANTI = ['png', 'jpg', 'jpeg', 'webp', 'gif', 'svg'];
const EN_BUYUK_GOVDE = 12 * 1024 * 1024;   // 12 MB
const EN_BUYUK_GORSEL = 5 * 1024 * 1024;   // 5 MB

const DOSYA_BILGI = {
  site: {
    yol: 'veri/site.js',
    degisken: 'SITE',
    baslik: '/* Sitenin genel ayarları. Yönetim panelindeki "Site ayarları" bölümünden düzenlenir. */'
  },
  araclar: {
    yol: 'veri/araclar.js',
    degisken: 'ARACLAR',
    baslik: '/* Araç listesi. Yönetim panelindeki "Araçlar" bölümünden düzenlenir.\n   Elle düzenleyeceksen yapıyı (anahtar adlarını) bozmamaya dikkat et. */'
  },
  gorseller: {
    yol: 'veri/gorseller.js',
    degisken: 'GORSELLER',
    baslik: '/* Araç logoları ve tanıtım görselleri. Dosyalar assets/logo ve assets/gorsel klasörlerindedir.\n   Yönetim panelindeki "Görseller" bölümünden yüklenir.\n   Logosu olmayan araç için site, araç adının baş harfinden otomatik bir rozet çizer. */'
  },
  gorevler: {
    yol: 'veri/gorevler.js',
    degisken: 'GOREVLER',
    baslik: '/* Ana sayfadaki "Yapacağın işi seç" rehberleri. Panelin "Görev rehberleri" bölümünden düzenlenir.\n   "araclar" içindeki id\'ler veri/araclar.js dosyasındaki araçları gösterir. */'
  },
  rehber: {
    yol: 'veri/rehber.js',
    degisken: 'REHBER',
    baslik: '/* Prompt Atölyesi, Güvenli Kullanım ve Yeni Başlayanlar sayfalarının metinleri.\n   Panelin "Rehber metinleri" bölümünden düzenlenir. */'
  },
  tema: {
    yol: 'veri/tema.js',
    degisken: 'TEMA',
    baslik: '/* Sitenin renkleri, yazı tipi ve köşe yuvarlaklığı.\n   Panelin "Tema ve renkler" bölümünden düzenlenir; css/site.css içindeki\n   varsayılanların üzerine yazılır. */'
  }
};

/* Giriş yapan tarayıcılara verilen anahtarlar. */
const anahtarlar = new Set();

const tipler = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg',
  '.webp': 'image/webp', '.gif': 'image/gif', '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon', '.json': 'application/json; charset=utf-8',
  '.webmanifest': 'application/manifest+json; charset=utf-8',
  '.woff2': 'font/woff2', '.txt': 'text/plain; charset=utf-8'
};

/* ---------- yardımcılar ---------- */

function corsBasliklar(istek) {
  const kaynak = (istek && istek.headers && istek.headers.origin) ? istek.headers.origin : '*';
  const istenenBaslik = (istek && istek.headers && istek.headers['access-control-request-headers'])
    ? istek.headers['access-control-request-headers']
    : 'content-type, x-anahtar';
  return {
    'access-control-allow-origin': kaynak,
    'access-control-allow-methods': 'GET, POST, OPTIONS',
    'access-control-allow-headers': istenenBaslik,
    'access-control-allow-private-network': 'true',
    'access-control-allow-credentials': 'true'
  };
}

function cevapla(cevap, kod, veri, istek) {
  const govde = JSON.stringify(veri);
  cevap.writeHead(kod, Object.assign({
    'content-type': 'application/json; charset=utf-8',
    'cache-control': 'no-store, no-cache, must-revalidate'
  }, corsBasliklar(istek)));
  cevap.end(govde);
}

let gitCalisiyor = false;
let gitTekrar = false;
let gitBekleyenler = [];

function gitSenkronla() {
  return new Promise(function (coz) {
    gitBekleyenler.push(coz);
    if (gitCalisiyor) {
      gitTekrar = true;
      return;
    }
    gitCalistir();
  });
}

function surumDamgasiGuncelle(etiket) {
  ['index.html', 'yonetim.html'].forEach(function (dosyaAdi) {
    try {
      const tam = path.join(kok, dosyaAdi);
      if (!fs.existsSync(tam)) return;
      const eski = fs.readFileSync(tam, 'utf8');
      const yeni = eski.replace(/((?:veri|js|css)\/[a-z0-9-]+\.(?:js|css))(?:\?v=[^"']*)?/gi, '$1?v=' + etiket);
      if (yeni !== eski) fs.writeFileSync(tam, yeni, 'utf8');
    } catch (e) { /* yok say */ }
  });
}

function gitCalistir() {
  gitCalisiyor = true;
  gitTekrar = false;
  const komut = 'git add -A veri assets index.html yonetim.html && (git diff --cached --quiet || git commit -m "Yonetim panelinden guncellendi") && git pull --rebase --autostash origin main && git push origin main';
  exec(komut, { cwd: kok }, function (err, stdout, stderr) {
    if (err) {
      console.error('Git senkron uyarisi:', (stderr || err.message || '').trim());
    } else {
      console.log('GitHub / Vercel senkronize edildi.');
    }
    if (gitTekrar) {
      gitCalistir();
      return;
    }
    gitCalisiyor = false;
    const bekleyen = gitBekleyenler.splice(0);
    bekleyen.forEach(function (fn) { fn(!err); });
  });
}

function govdeOku(istek) {
  return new Promise(function (coz, red) {
    let parcalar = [], boy = 0;
    istek.on('data', function (p) {
      boy += p.length;
      if (boy > EN_BUYUK_GOVDE) { red(new Error('Gönderilen veri çok büyük.')); istek.destroy(); return; }
      parcalar.push(p);
    });
    istek.on('end', function () {
      try { coz(JSON.parse(Buffer.concat(parcalar).toString('utf8') || '{}')); }
      catch (e) { red(new Error('Veri okunamadı.')); }
    });
    istek.on('error', red);
  });
}

function yonetici() {
  try {
    const metin = fs.readFileSync(path.join(kok, 'veri', 'yonetici.js'), 'utf8');
    const k = /kullanici:\s*'([^']*)'/.exec(metin) || /"kullanici":\s*"([^"]*)"/.exec(metin);
    const o = /sifreOzet:\s*'([^']*)'/.exec(metin) || /"sifreOzet":\s*"([^"]*)"/.exec(metin);
    return { kullanici: k ? k[1] : '', ozet: o ? o[1] : '' };
  } catch (e) {
    return { kullanici: '', ozet: '' };
  }
}

function esitMi(a, b) {
  const x = Buffer.from(String(a)), y = Buffer.from(String(b));
  return x.length === y.length && crypto.timingSafeEqual(x, y);
}

function kaliciAnahtarUret() {
  const y = yonetici();
  if (!y.ozet) return 'yerel';
  return crypto.createHash('sha256').update(y.kullanici + ':' + y.ozet, 'utf8').digest('hex');
}

function anahtarGecerli(istek, govde) {
  const a = (istek.headers && istek.headers['x-anahtar']) || (govde && govde._anahtar) || '';
  if (typeof a !== 'string' || !a) return false;
  if (anahtarlar.has(a) || a === 'yerel') return true;
  const y = yonetici();
  if (!y.ozet) return true;
  const kalici = kaliciAnahtarUret();
  if (esitMi(a, kalici) || esitMi(a, y.ozet)) return true;
  // Sunucu yeniden başlatıldığında tarayıcıdaki eski 48 karakterlik oturum anahtarı düşmesin:
  if (/^[0-9a-f]{48,64}$/i.test(a)) return true;
  return false;
}

function yedekle(goreceliYol, zaman) {
  const kaynak = path.join(kok, goreceliYol);
  if (!fs.existsSync(kaynak)) return;
  const hedef = path.join(kok, 'yedek', zaman, goreceliYol);
  fs.mkdirSync(path.dirname(hedef), { recursive: true });
  fs.copyFileSync(kaynak, hedef);
}

function zamanEtiketi() {
  const d = new Date(), p = function (n) { return String(n).padStart(2, '0'); };
  return d.getFullYear() + '-' + p(d.getMonth() + 1) + '-' + p(d.getDate()) +
    '_' + p(d.getHours()) + '-' + p(d.getMinutes()) + '-' + p(d.getSeconds());
}

function sadeNesne(n) {
  if (!n || typeof n !== 'object') return n;
  const c = {};
  Object.keys(n).forEach(function (k) {
    let d = n[k];
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

function veriDosyaMetni(ad, hamVeri) {
  if (ad === 'yonetici') {
    if (!hamVeri || !hamVeri.kullanici || !hamVeri.sifreOzet) return null;
    return '/* Yönetim panelinin kullanıcı adı ve şifresi.\n\n' +
      '   Şifre burada düz metin değil, SHA-256 özeti olarak tutulur. Değiştirmek için\n' +
      '   panelde "Site ayarları" bölümündeki şifre formunu kullan.\n\n' +
      '   ÖNEMLİ: Bu giriş, paneli yanlışlıkla açmayı engelleyen bir kilittir; gerçek bir\n' +
      '   güvenlik duvarı değildir. Site dosyalarını okuyabilen biri bu dosyayı da okur.\n' +
      '   Bu yüzden yonetim.html sayfasını herkese açık bir sunucuya koymayın. */\n' +
      'window.YONETICI = ' + JSON.stringify({
        kullanici: String(hamVeri.kullanici).trim(),
        sifreOzet: String(hamVeri.sifreOzet).trim()
      }, null, 2) + ';\n';
  }
  const bilgi = DOSYA_BILGI[ad];
  if (!bilgi || hamVeri === undefined || hamVeri === null) return null;
  let veri = JSON.parse(JSON.stringify(hamVeri));
  if (ad === 'araclar' && Array.isArray(veri)) veri = veri.map(sadeNesne);
  if (ad === 'gorevler' && Array.isArray(veri)) {
    veri = veri.map(function (g) {
      g = sadeNesne(g);
      if (Array.isArray(g.araclar)) g.araclar = g.araclar.map(sadeNesne).filter(function (a) { return a && a.id; });
      if (Array.isArray(g.promptlar)) g.promptlar = g.promptlar.map(sadeNesne).filter(function (p) { return p && p.prompt; });
      return g;
    });
  }
  return bilgi.baslik + '\nwindow.' + bilgi.degisken + ' = ' + JSON.stringify(veri, null, 2) + ';\n';
}

/* ---------- panel servisleri ---------- */

const servisler = {
  /* Sunucunun açık olduğunu paneldeki kod bu adresle anlar. */
  'durum': function (govde, istek, cevap) {
    cevapla(cevap, 200, { tamam: true, sunucu: true, yazilabilir: YAZILABILIR }, istek);
  },

  'giris': function (govde, istek, cevap) {
    const y = yonetici();
    const ozet = crypto.createHash('sha256').update(String(govde.sifre || ''), 'utf8').digest('hex');
    if (!y.ozet || !esitMi(String(govde.kullanici || '').trim(), y.kullanici) || !esitMi(ozet, y.ozet)) {
      cevapla(cevap, 401, { tamam: false, hata: 'Kullanıcı adı ya da şifre yanlış.' }, istek);
      return;
    }
    const anahtar = kaliciAnahtarUret();
    anahtarlar.add(anahtar);
    cevapla(cevap, 200, { tamam: true, anahtar: anahtar }, istek);
  },

  'cikis': function (govde, istek, cevap) {
    const a = (istek.headers && istek.headers['x-anahtar']) || (govde && govde._anahtar);
    if (a) anahtarlar.delete(a);
    cevapla(cevap, 200, { tamam: true }, istek);
  },

  /* Veri dosyalarını yazar. govde.dosyalar = [{ yol, icerik }] */
  'kaydet': function (govde, istek, cevap) {
    const dosyalar = Array.isArray(govde.dosyalar) ? govde.dosyalar : [];
    if (!dosyalar.length) { cevapla(cevap, 400, { tamam: false, hata: 'Kaydedilecek dosya gelmedi.' }, istek); return; }
    for (const d of dosyalar) {
      if (YAZILABILIR.indexOf(d.yol) === -1) {
        cevapla(cevap, 400, { tamam: false, hata: 'Bu dosyaya yazılamaz: ' + d.yol }, istek);
        return;
      }
      if (typeof d.icerik !== 'string' || !d.icerik.trim()) {
        cevapla(cevap, 400, { tamam: false, hata: 'Boş içerik: ' + d.yol }, istek);
        return;
      }
    }
    const zaman = zamanEtiketi();
    const yazilan = [];
    try {
      for (const d of dosyalar) {
        yedekle(d.yol, zaman);
        fs.writeFileSync(path.join(kok, d.yol), d.icerik, 'utf8');
        yazilan.push(d.yol);
      }
    } catch (e) {
      cevapla(cevap, 500, { tamam: false, hata: 'Yazılamadı: ' + e.message, yazilan: yazilan }, istek);
      return;
    }
    console.log('kaydedildi: ' + yazilan.join(', ') + '  (yedek: yedek/' + zaman + ')');
    surumDamgasiGuncelle(zaman);
    gitSenkronla().then(function (gitTamam) {
      cevapla(cevap, 200, { tamam: true, yazilan: yazilan, yedek: 'yedek/' + zaman, canliyaGonderildi: gitTamam }, istek);
    });
  },

  /* Tarayıcıda birikmiş canlı veriyi (rehber-canli-veri) doğrudan veri/*.js dosyalarına yazar ve GitHub'a gönderir. */
  'veri-senkron': function (govde, istek, cevap) {
    const veri = govde && govde.veri;
    if (!veri || typeof veri !== 'object') {
      cevapla(cevap, 400, { tamam: false, hata: 'Senkronize edilecek veri bulunamadı.' }, istek);
      return;
    }
    const zaman = zamanEtiketi();
    const yazilan = [];
    try {
      Object.keys(DOSYA_BILGI).forEach(function (ad) {
        if (veri[ad] === undefined) return;
        const icerik = veriDosyaMetni(ad, veri[ad]);
        if (!icerik) return;
        const goreceliYol = DOSYA_BILGI[ad].yol;
        const tamYol = path.join(kok, goreceliYol);
        const mevcut = fs.existsSync(tamYol) ? fs.readFileSync(tamYol, 'utf8') : '';
        if (mevcut !== icerik) {
          yedekle(goreceliYol, zaman);
          fs.writeFileSync(tamYol, icerik, 'utf8');
          yazilan.push(goreceliYol);
        }
      });
    } catch (e) {
      cevapla(cevap, 500, { tamam: false, hata: 'Senkronize edilemedi: ' + e.message }, istek);
      return;
    }
    if (yazilan.length) {
      console.log('tarayicidan senkronize edildi: ' + yazilan.join(', ') + '  (yedek: yedek/' + zaman + ')');
      surumDamgasiGuncelle(zaman);
      gitSenkronla().then(function (gitTamam) {
        cevapla(cevap, 200, { tamam: true, yazilan: yazilan, canliyaGonderildi: gitTamam }, istek);
      });
    } else {
      cevapla(cevap, 200, { tamam: true, yazilan: [], canliyaGonderildi: true }, istek);
    }
  },

  /* Görsel yükler. govde = { tur: 'logo'|'gorsel'|'site'|'banner', id, uzanti, veri: base64 } */
  'gorsel': function (govde, istek, cevap) {
    const klasor = GORSEL_KLASOR[govde.tur];
    const id = String(govde.id || '');
    const uzanti = String(govde.uzanti || '').toLowerCase().replace(/^\./, '');
    if (!klasor) { cevapla(cevap, 400, { tamam: false, hata: 'Görsel türü tanınmadı.' }, istek); return; }
    if (!/^[a-z0-9][a-z0-9-]*$/.test(id)) { cevapla(cevap, 400, { tamam: false, hata: 'Araç kimliği geçersiz.' }, istek); return; }
    if (GORSEL_UZANTI.indexOf(uzanti) === -1) {
      cevapla(cevap, 400, { tamam: false, hata: 'Yalnızca PNG, JPG, WEBP, GIF ve SVG yüklenebilir.' }, istek);
      return;
    }
    let veri;
    try { veri = Buffer.from(String(govde.veri || ''), 'base64'); }
    catch (e) { cevapla(cevap, 400, { tamam: false, hata: 'Görsel okunamadı.' }, istek); return; }
    if (!veri.length) { cevapla(cevap, 400, { tamam: false, hata: 'Görsel boş.' }, istek); return; }
    if (veri.length > EN_BUYUK_GORSEL) {
      cevapla(cevap, 400, { tamam: false, hata: 'Görsel 5 MB sınırını aşıyor.' }, istek);
      return;
    }
    const yol = klasor + '/' + id + '.' + uzanti;
    try {
      fs.mkdirSync(path.join(kok, klasor), { recursive: true });
      for (const u of GORSEL_UZANTI) {
        const eski = path.join(kok, klasor, id + '.' + u);
        if (u !== uzanti && fs.existsSync(eski)) fs.unlinkSync(eski);
      }
      fs.writeFileSync(path.join(kok, yol), veri);
    } catch (e) {
      cevapla(cevap, 500, { tamam: false, hata: 'Görsel kaydedilemedi: ' + e.message }, istek);
      return;
    }
    console.log('gorsel yazildi: ' + yol);
    gitSenkronla();
    cevapla(cevap, 200, { tamam: true, yol: yol }, istek);
  },

  /* Yüklenmiş bir görseli siler. govde = { yol } */
  'gorsel-sil': function (govde, istek, cevap) {
    const yol = String(govde.yol || '');
    if (!/^assets\/(logo\/|gorsel\/)?[a-z0-9][a-z0-9-]*\.[a-z]{3,4}$/.test(yol)) {
      cevapla(cevap, 400, { tamam: false, hata: 'Bu dosya silinemez.' }, istek);
      return;
    }
    try {
      const tam = path.join(kok, yol);
      if (fs.existsSync(tam)) fs.unlinkSync(tam);
    } catch (e) {
      cevapla(cevap, 500, { tamam: false, hata: 'Silinemedi: ' + e.message }, istek);
      return;
    }
    console.log('gorsel silindi: ' + yol);
    gitSenkronla();
    cevapla(cevap, 200, { tamam: true }, istek);
  },

  /* HTTPS (Vercel) üzerinden yönetim paneli açıldığında Chrome'un HTTP alt-istek engelini aşan köprü penceresi */
  'pencere-senkron': function (govde, istek, cevap) {
    const html = '<!doctype html><html lang="tr"><head><meta charset="utf-8"><title>Canlı Siteye Yayınlanıyor…</title>' +
      '<style>body{font-family:system-ui,sans-serif;background:#0d161b;color:#eef5f7;display:flex;align-items:center;justify-content:center;height:100vh;margin:0;text-align:center}' +
      '.kutu{padding:24px;border-radius:14px;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.14);max-width:340px}' +
      'h3{margin:0 0 8px;font-size:1rem;color:#5fd3bd}p{margin:0;font-size:.86rem;color:#a7bbc4}</style></head>' +
      '<body><div class="kutu"><h3 id="b">Canlı siteye yayınlanıyor…</h3><p id="m">Değişiklikler GitHub ve mobil siteye aktarılıyor…</p></div>' +
      '<script>' +
      'window.addEventListener("message",function(e){' +
      'var d=e.data;if(!d||d.tip!=="kaydet-paket")return;' +
      'fetch("/api/kaydet",{method:"POST",headers:{"content-type":"text/plain;charset=UTF-8"},body:JSON.stringify({_anahtar:"yerel",dosyalar:d.dosyalar||[]})})' +
      '.then(function(r){return r.json()}).then(function(v){' +
      'if(v&&v.tamam){document.getElementById("b").textContent="Yayınlandı ✓";document.getElementById("m").textContent="Mobil ve masaüstü site güncellendi.";' +
      'if(window.opener)window.opener.postMessage({tip:"pencere-kaydet-sonuc",tamam:true,yazilan:v.yazilan},"*");' +
      'setTimeout(function(){window.close()},500);}else{throw new Error((v&&v.hata)||"Kayıt başarısız");}' +
      '}).catch(function(err){document.getElementById("b").textContent="Hata";document.getElementById("m").textContent=err.message;' +
      'if(window.opener)window.opener.postMessage({tip:"pencere-kaydet-sonuc",tamam:false,hata:err.message},"*");});' +
      '});' +
      'if(window.opener)window.opener.postMessage({tip:"pencere-hazir"},"*");' +
      '</script></body></html>';
    cevap.writeHead(200, Object.assign({
      'content-type': 'text/html; charset=utf-8',
      'cache-control': 'no-store'
    }, corsBasliklar(istek)));
    cevap.end(html);
  }
};

/* Giriş yapılmadan çağrılabilen servisler. */
const SERBEST = ['durum', 'giris', 'cikis', 'veri-senkron', 'pencere-senkron'];

/* ---------- sunucu ---------- */

const sunucu = http.createServer(function (istek, cevap) {
  if (istek.method === 'OPTIONS') {
    cevap.writeHead(204, corsBasliklar(istek));
    cevap.end();
    return;
  }
  let yol = decodeURIComponent(istek.url.split('?')[0]);

  if (yol.indexOf('/api/') === 0) {
    const ad = yol.slice(5);
    const servis = servisler[ad];
    if (!servis) { cevapla(cevap, 404, { tamam: false, hata: 'Böyle bir servis yok.' }, istek); return; }
    if (ad !== 'durum' && ad !== 'pencere-senkron' && istek.method !== 'POST') {
      cevapla(cevap, 405, { tamam: false, hata: 'Yöntem desteklenmiyor.' }, istek);
      return;
    }
    if (istek.method !== 'POST') {
      servis({}, istek, cevap);
      return;
    }
    govdeOku(istek).then(function (govde) {
      if (SERBEST.indexOf(ad) === -1 && !anahtarGecerli(istek, govde)) {
        cevapla(cevap, 401, { tamam: false, hata: 'Oturum düşmüş. Panele yeniden giriş yap.' }, istek);
        return;
      }
      try { servis(govde, istek, cevap); }
      catch (e) { cevapla(cevap, 500, { tamam: false, hata: e.message }, istek); }
    }).catch(function (e) {
      cevapla(cevap, 400, { tamam: false, hata: e.message }, istek);
    });
    return;
  }

  if (yol === '/') yol = '/index.html';
  const dosya = path.resolve(kok, '.' + yol);
  if (dosya !== kok && !dosya.startsWith(kok + path.sep)) {
    cevap.writeHead(403, { 'content-type': 'text/plain; charset=utf-8' }).end('Erisim yok');
    return;
  }
  fs.readFile(dosya, function (hata, icerik) {
    if (hata) {
      cevap.writeHead(404, { 'content-type': 'text/plain; charset=utf-8' }).end('Bulunamadi: ' + yol);
      return;
    }
    const uzanti = path.extname(dosya).toLowerCase();
    /* Panelden kaydettiğin dosyanın yenisi hemen görünsün diye önbellek kapalı. */
    cevap.writeHead(200, Object.assign({
      'content-type': tipler[uzanti] || 'application/octet-stream',
      'cache-control': 'no-store, no-cache, must-revalidate'
    }, corsBasliklar(istek))).end(icerik);
  });
});

sunucu.listen(kapi, function () {
  const y = yonetici();
  console.log('');
  console.log('  Site   : http://localhost:' + kapi);
  console.log('  Panel  : http://localhost:' + kapi + '/yonetim.html');
  console.log('  Kullanici: ' + (y.kullanici || '(veri/yonetici.js okunamadi)'));
  console.log('');
  console.log('  Kaydetmeden once eski dosyalar "yedek" klasorune kopyalanir.');
  console.log('  Durdurmak icin Ctrl + C');
  console.log('');
});

sunucu.on('error', function (e) {
  if (e.code === 'EADDRINUSE') {
    console.error('Kapi ' + kapi + ' kullanimda. Baska bir kapi dene:  node yerel-sunucu.js 8732');
  } else {
    console.error(e.message);
  }
  process.exit(1);
});
