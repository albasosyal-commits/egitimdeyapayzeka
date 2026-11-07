/* Siteyi yerel bir adreste açar ve yönetim panelinin "Kaydet" düğmesini çalıştırır.

   Başlatmak için bu klasörde komut satırına şunu yaz:   node yerel-sunucu.js
   Sonra tarayıcıda şu adresleri aç:
     Site   → http://localhost:8731
     Panel  → http://localhost:8731/yonetim.html

   Sunucu çalışırken panelde "Kaydet" dediğinde değişiklikler doğrudan veri
   dosyalarına yazılır ve yüklediğin görseller assets klasörüne kaydedilir.
   Her kayıttan önce eski dosyanın bir kopyası "yedek" klasörüne alınır.

   Sunucu olmadan da çalışır: index.html dosyasına çift tıklaman yeterli.
   O durumda panel dosyaları indirir, sen de veri klasörüne taşırsın. */

const http = require('http');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

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
const GORSEL_KLASOR = { logo: 'assets/logo', gorsel: 'assets/gorsel', site: 'assets' };
const GORSEL_UZANTI = ['png', 'jpg', 'jpeg', 'webp', 'gif', 'svg'];
const EN_BUYUK_GOVDE = 12 * 1024 * 1024;   // 12 MB
const EN_BUYUK_GORSEL = 5 * 1024 * 1024;   // 5 MB

/* Giriş yapan tarayıcılara verilen anahtarlar. Sunucu kapanınca hepsi silinir. */
const anahtarlar = new Set();

const tipler = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg',
  '.webp': 'image/webp', '.gif': 'image/gif', '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon', '.json': 'application/json; charset=utf-8',
  '.woff2': 'font/woff2', '.txt': 'text/plain; charset=utf-8'
};

/* ---------- yardımcılar ---------- */

function cevapla(cevap, kod, veri) {
  const govde = JSON.stringify(veri);
  cevap.writeHead(kod, { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' });
  cevap.end(govde);
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

/* Kullanıcı adı ve şifre özeti veri/yonetici.js dosyasından okunur.
   Dosyayı her girişte yeniden okuduğumuz için şifreyi değiştirince sunucuyu
   yeniden başlatmak gerekmez. */
function yonetici() {
  try {
    const metin = fs.readFileSync(path.join(kok, 'veri', 'yonetici.js'), 'utf8');
    const k = /kullanici:\s*'([^']*)'/.exec(metin);
    const o = /sifreOzet:\s*'([^']*)'/.exec(metin);
    return { kullanici: k ? k[1] : '', ozet: o ? o[1] : '' };
  } catch (e) {
    return { kullanici: '', ozet: '' };
  }
}

function esitMi(a, b) {
  const x = Buffer.from(String(a)), y = Buffer.from(String(b));
  return x.length === y.length && crypto.timingSafeEqual(x, y);
}

function anahtarGecerli(istek) {
  const a = istek.headers['x-anahtar'];
  return typeof a === 'string' && anahtarlar.has(a);
}

/* Yazmadan önce eski dosyanın kopyasını yedek/<tarih-saat>/ içine alır. */
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

/* ---------- panel servisleri ---------- */

const servisler = {
  /* Sunucunun açık olduğunu paneldeki kod bu adresle anlar. */
  'durum': function (govde, istek, cevap) {
    cevapla(cevap, 200, { tamam: true, sunucu: true, yazilabilir: YAZILABILIR });
  },

  'giris': function (govde, istek, cevap) {
    const y = yonetici();
    const ozet = crypto.createHash('sha256').update(String(govde.sifre || ''), 'utf8').digest('hex');
    if (!y.ozet || !esitMi(String(govde.kullanici || '').trim(), y.kullanici) || !esitMi(ozet, y.ozet)) {
      cevapla(cevap, 401, { tamam: false, hata: 'Kullanıcı adı ya da şifre yanlış.' });
      return;
    }
    const anahtar = crypto.randomBytes(24).toString('hex');
    anahtarlar.add(anahtar);
    cevapla(cevap, 200, { tamam: true, anahtar: anahtar });
  },

  'cikis': function (govde, istek, cevap) {
    anahtarlar.delete(istek.headers['x-anahtar']);
    cevapla(cevap, 200, { tamam: true });
  },

  /* Veri dosyalarını yazar. govde.dosyalar = [{ yol, icerik }] */
  'kaydet': function (govde, istek, cevap) {
    const dosyalar = Array.isArray(govde.dosyalar) ? govde.dosyalar : [];
    if (!dosyalar.length) { cevapla(cevap, 400, { tamam: false, hata: 'Kaydedilecek dosya gelmedi.' }); return; }
    for (const d of dosyalar) {
      if (YAZILABILIR.indexOf(d.yol) === -1) {
        cevapla(cevap, 400, { tamam: false, hata: 'Bu dosyaya yazılamaz: ' + d.yol });
        return;
      }
      if (typeof d.icerik !== 'string' || !d.icerik.trim()) {
        cevapla(cevap, 400, { tamam: false, hata: 'Boş içerik: ' + d.yol });
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
      cevapla(cevap, 500, { tamam: false, hata: 'Yazılamadı: ' + e.message, yazilan: yazilan });
      return;
    }
    console.log('kaydedildi: ' + yazilan.join(', ') + '  (yedek: yedek/' + zaman + ')');
    cevapla(cevap, 200, { tamam: true, yazilan: yazilan, yedek: 'yedek/' + zaman });
  },

  /* Görsel yükler. govde = { tur: 'logo'|'gorsel', id, uzanti, veri: base64 } */
  'gorsel': function (govde, istek, cevap) {
    const klasor = GORSEL_KLASOR[govde.tur];
    const id = String(govde.id || '');
    const uzanti = String(govde.uzanti || '').toLowerCase().replace(/^\./, '');
    if (!klasor) { cevapla(cevap, 400, { tamam: false, hata: 'Görsel türü tanınmadı.' }); return; }
    if (!/^[a-z0-9][a-z0-9-]*$/.test(id)) { cevapla(cevap, 400, { tamam: false, hata: 'Araç kimliği geçersiz.' }); return; }
    if (GORSEL_UZANTI.indexOf(uzanti) === -1) {
      cevapla(cevap, 400, { tamam: false, hata: 'Yalnızca PNG, JPG, WEBP, GIF ve SVG yüklenebilir.' });
      return;
    }
    let veri;
    try { veri = Buffer.from(String(govde.veri || ''), 'base64'); }
    catch (e) { cevapla(cevap, 400, { tamam: false, hata: 'Görsel okunamadı.' }); return; }
    if (!veri.length) { cevapla(cevap, 400, { tamam: false, hata: 'Görsel boş.' }); return; }
    if (veri.length > EN_BUYUK_GORSEL) {
      cevapla(cevap, 400, { tamam: false, hata: 'Görsel 5 MB sınırını aşıyor.' });
      return;
    }
    const yol = klasor + '/' + id + '.' + uzanti;
    try {
      fs.mkdirSync(path.join(kok, klasor), { recursive: true });
      /* Aynı araç için başka uzantıda eski bir dosya varsa kaldırıyoruz;
         yoksa klasörde aynı aracın iki logosu birikir. */
      for (const u of GORSEL_UZANTI) {
        const eski = path.join(kok, klasor, id + '.' + u);
        if (u !== uzanti && fs.existsSync(eski)) fs.unlinkSync(eski);
      }
      fs.writeFileSync(path.join(kok, yol), veri);
    } catch (e) {
      cevapla(cevap, 500, { tamam: false, hata: 'Görsel kaydedilemedi: ' + e.message });
      return;
    }
    console.log('gorsel yazildi: ' + yol);
    cevapla(cevap, 200, { tamam: true, yol: yol });
  },

  /* Yüklenmiş bir görseli siler. govde = { yol } */
  'gorsel-sil': function (govde, istek, cevap) {
    const yol = String(govde.yol || '');
    if (!/^assets\/(logo\/|gorsel\/)?[a-z0-9][a-z0-9-]*\.[a-z]{3,4}$/.test(yol)) {
      cevapla(cevap, 400, { tamam: false, hata: 'Bu dosya silinemez.' });
      return;
    }
    try {
      const tam = path.join(kok, yol);
      if (fs.existsSync(tam)) fs.unlinkSync(tam);
    } catch (e) {
      cevapla(cevap, 500, { tamam: false, hata: 'Silinemedi: ' + e.message });
      return;
    }
    console.log('gorsel silindi: ' + yol);
    cevapla(cevap, 200, { tamam: true });
  }
};

/* Giriş yapılmadan çağrılabilen servisler. */
const SERBEST = ['durum', 'giris', 'cikis'];

/* ---------- sunucu ---------- */

const sunucu = http.createServer(function (istek, cevap) {
  let yol = decodeURIComponent(istek.url.split('?')[0]);

  if (yol.indexOf('/api/') === 0) {
    const ad = yol.slice(5);
    const servis = servisler[ad];
    if (!servis) { cevapla(cevap, 404, { tamam: false, hata: 'Böyle bir servis yok.' }); return; }
    if (ad !== 'durum' && istek.method !== 'POST') {
      cevapla(cevap, 405, { tamam: false, hata: 'Yöntem desteklenmiyor.' });
      return;
    }
    if (SERBEST.indexOf(ad) === -1 && !anahtarGecerli(istek)) {
      cevapla(cevap, 401, { tamam: false, hata: 'Oturum düşmüş. Panele yeniden giriş yap.' });
      return;
    }
    if (istek.method !== 'POST') { servis({}, istek, cevap); return; }
    govdeOku(istek).then(function (govde) {
      try { servis(govde, istek, cevap); }
      catch (e) { cevapla(cevap, 500, { tamam: false, hata: e.message }); }
    }).catch(function (e) {
      cevapla(cevap, 400, { tamam: false, hata: e.message });
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
    cevap.writeHead(200, {
      'content-type': tipler[uzanti] || 'application/octet-stream',
      'cache-control': 'no-store'
    }).end(icerik);
  });
});

sunucu.listen(kapi, '127.0.0.1', function () {
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
