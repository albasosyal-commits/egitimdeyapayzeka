/* SHA-256 özet alma. Panel girişinde şifreyi düz metin saklamamak için kullanılır.
   Sunucu çalışmadığında giriş kontrolü tarayıcıda bu fonksiyonla yapılır. */
(function () {
  'use strict';

  var K = [
    0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5, 0x3956c25b, 0x59f111f1, 0x923f82a4, 0xab1c5ed5,
    0xd807aa98, 0x12835b01, 0x243185be, 0x550c7dc3, 0x72be5d74, 0x80deb1fe, 0x9bdc06a7, 0xc19bf174,
    0xe49b69c1, 0xefbe4786, 0x0fc19dc6, 0x240ca1cc, 0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da,
    0x983e5152, 0xa831c66d, 0xb00327c8, 0xbf597fc7, 0xc6e00bf3, 0xd5a79147, 0x06ca6351, 0x14292967,
    0x27b70a85, 0x2e1b2138, 0x4d2c6dfc, 0x53380d13, 0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85,
    0xa2bfe8a1, 0xa81a664b, 0xc24b8b70, 0xc76c51a3, 0xd192e819, 0xd6990624, 0xf40e3585, 0x106aa070,
    0x19a4c116, 0x1e376c08, 0x2748774c, 0x34b0bcb5, 0x391c0cb3, 0x4ed8aa4a, 0x5b9cca4f, 0x682e6ff3,
    0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208, 0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2
  ];

  function dondur(x, n) { return (x >>> n) | (x << (32 - n)); }

  // Metni UTF-8 baytlarına çevirir.
  function baytlar(metin) {
    var kacirilmis = encodeURIComponent(String(metin)), dizi = [];
    for (var i = 0; i < kacirilmis.length; i++) {
      if (kacirilmis.charAt(i) === '%') {
        dizi.push(parseInt(kacirilmis.substr(i + 1, 2), 16));
        i += 2;
      } else {
        dizi.push(kacirilmis.charCodeAt(i));
      }
    }
    return dizi;
  }

  window.ozet256 = function (metin) {
    var b = baytlar(metin);
    var uzunluk = b.length;
    var blok = ((uzunluk + 8) >> 6) + 1;
    var m = new Array(blok * 16);
    for (var i = 0; i < m.length; i++) m[i] = 0;
    for (i = 0; i < uzunluk; i++) m[i >> 2] |= b[i] << ((3 - (i % 4)) * 8);
    m[uzunluk >> 2] |= 0x80 << ((3 - (uzunluk % 4)) * 8);
    m[blok * 16 - 2] = Math.floor(uzunluk * 8 / 4294967296);
    m[blok * 16 - 1] = (uzunluk * 8) >>> 0;

    var H = [0x6a09e667, 0xbb67ae85, 0x3c6ef372, 0xa54ff53a, 0x510e527f, 0x9b05688c, 0x1f83d9ab, 0x5be0cd19];
    var w = new Array(64);

    for (var j = 0; j < m.length; j += 16) {
      var a = H[0], bb = H[1], c = H[2], d = H[3], e = H[4], f = H[5], g = H[6], h = H[7];
      for (i = 0; i < 64; i++) {
        if (i < 16) {
          w[i] = m[j + i] | 0;
        } else {
          var s0 = dondur(w[i - 15], 7) ^ dondur(w[i - 15], 18) ^ (w[i - 15] >>> 3);
          var s1 = dondur(w[i - 2], 17) ^ dondur(w[i - 2], 19) ^ (w[i - 2] >>> 10);
          w[i] = (w[i - 16] + s0 + w[i - 7] + s1) | 0;
        }
        var E1 = dondur(e, 6) ^ dondur(e, 11) ^ dondur(e, 25);
        var sec = (e & f) ^ (~e & g);
        var t1 = (h + E1 + sec + K[i] + w[i]) | 0;
        var A0 = dondur(a, 2) ^ dondur(a, 13) ^ dondur(a, 22);
        var cok = (a & bb) ^ (a & c) ^ (bb & c);
        var t2 = (A0 + cok) | 0;
        h = g; g = f; f = e; e = (d + t1) | 0;
        d = c; c = bb; bb = a; a = (t1 + t2) | 0;
      }
      H[0] = (H[0] + a) | 0; H[1] = (H[1] + bb) | 0; H[2] = (H[2] + c) | 0; H[3] = (H[3] + d) | 0;
      H[4] = (H[4] + e) | 0; H[5] = (H[5] + f) | 0; H[6] = (H[6] + g) | 0; H[7] = (H[7] + h) | 0;
    }

    return H.map(function (x) { return ('00000000' + (x >>> 0).toString(16)).slice(-8); }).join('');
  };
})();
