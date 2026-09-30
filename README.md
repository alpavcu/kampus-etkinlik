# Kampüs Etkinlikleri

**Öğrenci Bilgileri:**
- **Ad Soyad:** Alp Avcu
- **Öğrenci Numarası:** 21210327744

**Canlı Yayın (Vercel) URL:**
- Canlı Adres: https://kampus-etkinlik-alp-avcu.vercel.app

---

## Proje Hakkında

Bu proje, üniversite kampüsündeki seminer, atölye ve söyleşi gibi etkinliklerin listelenmesi, detaylarının incelenmesi, yeni etkinlik eklenmesi ve mevcut etkinliklerin güncellenmesi amacıyla hazırlanmış web uygulamasıdır.

---

## Sprint 1: HTML, Git ve Yayına Alma

Sprint 1 kapsamında hiçbir CSS ve JavaScript kullanılmadan, tamamen semantik HTML5 standartlarına uygun olarak projenin iskeleti kurulmuştur.

### Sayfalar ve Yapı (`sprint1/`)
1. **`index.html`**: Kampüs Etkinlikleri ana sayfası. Yaklaşan 2 etkinliği `<table border="1">` içinde listeler ve tüm etkinliklere bağlantı verir.
2. **`etkinlikler.html`**: Tüm kampüs etkinliklerinin `<table border="1">` ile semantik hücre yapısında listelendiği sayfa.
3. **`etkinlik-detay.html`**: Seçilen etkinliğin afişini (`<figure>`, `<img>`, `<figcaption>`) ve detaylı künyesini (`<dl>`, `<dt>`, `<dd>`) içeren detay sayfası.
4. **`etkinlik-ekle.html`**: Yeni etkinlik ekleme formu (`<form>`, `<label>`, `<input>`, `<select>`, `<textarea>`, `required`).
5. **`etkinlik-guncelle.html`**: Mevcut etkinliği güncelleme formu (alanlar `value` ve seçili değerlerle dolu gelir).

### Kurallar ve Doğrulamalar
- Beş sayfa arasında kırık bağlantı yoktur.
- Her sayfada tek bir `<h1>` başlığı ve hiyerarşik başlık sırası (`<h2>`, `<h3>`) kullanılmıştır.
- Form elemanlarının tamamı görünür `<label>` etiketleriyle eşleştirilmiştir.
- `required` zorunluluk doğrulamaları aktiftir.
- CSS veya JavaScript dosyası içermez.

---

## Sprint 2: CSS ve Responsive Tasarım

Sprint 2 kapsamında Sprint 1'deki HTML yapısı `sprint2/` klasörüne aktarılmış; semantik tablo yapısı `<section>` ve `<article>` kartlarına dönüştürülerek responsive CSS ile stillendirilmiştir.

### Öğrenciye Özel Renk ve Font Parametreleri
- **Öğrenci No:** `21210327744`
- **Son Hane:** `4` ➔ Font: **Georgia, serif**
- **Renk Tonu Hesabı:** `21210327744 mod 360 = 24`
- **Ana Renk (`--renk-ana`):** `hsl(24, 65%, 38%)` (Sıcak kiremit / pişmiş toprak tonu)
- **Zemin Rengi (`--renk-zemin`):** `hsl(24, 30%, 97%)` (Açık krem / sıcak beyaz zemin)

### Responsive Tasarım Özellikleri
- **Mobil Öncelikli (Mobile First):** Telefonda yatay kaydırma (overflow) yoktur, kartlar tek sütun halinde dizilir.
- **Masaüstü Görünüm:**
  - `etkinlikler.html` sayfasında etkinlikler 3 sütunlu grid kart yapısına dönüşür.
  - `index.html` sayfasında yaklaşan etkinlikler 2 sütun halinde yan yana gelir.
  - `etkinlik-detay.html` sayfasında afiş solda, etkinlik künyesi (`<dl>`) sağda konumlanır.
- **Formlar ve Butonlar:** Dokunmatik ekranlara uygun büyük tıklama alanları (en az 44-48px yükseklik), üstte konumlandırılmış etiketler ve boş/hatalı alanlarda kırmızı uyarı çerçevesi.
- **CSS Dosyaları:** `sprint2/css/numaran.css` ve `sprint2/css/21210327744.css`.

---

## Git ve Teslim Bilgileri
- **Sprint 1 Etiketi:** `sprint-01`
- **Sprint 2 Etiketi:** `sprint-02`
