# Canlı Yayın (Vercel) URL: https://kampus-etkinlik-alp-avcu.vercel.app

# Kampüs Etkinlikleri

**Öğrenci Bilgileri:**
- **Ad Soyad:** Alp Avcu
- **Öğrenci Numarası:** 21210327744
- **Örnek Detay Bağlantısı:** https://kampus-etkinlik-alp-avcu.vercel.app/etkinlik-detay.html?id=event-3

---

## Proje Hakkında

Bu proje, üniversite kampüsündeki seminer, atölye ve söyleşi gibi etkinliklerin listelenmesi, detaylarının incelenmesi, filtreleme/arama yapılması, yeni etkinlik eklenmesi ve mevcut etkinliklerin güncellenmesi amacıyla hazırlanmış web uygulamasıdır.

---

## Sprint 1: HTML, Git ve Yayına Alma

Sprint 1 kapsamında hiçbir CSS ve JavaScript kullanılmadan, tamamen semantik HTML5 standartlarına uygun olarak projenin iskeleti kurulmuştur.

### Sayfalar ve Yapı (`sprint1/`)
1. **`index.html`**: Kampüs Etkinlikleri ana sayfası. Yaklaşan 2 etkinliği `<table border="1">` içinde listeler ve tüm etkinliklere bağlantı verir.
2. **`etkinlikler.html`**: Tüm kampüs etkinliklerinin `<table border="1">` ile semantik hücre yapısında listelendiği sayfa.
3. **`etkinlik-detay.html`**: Seçilen etkinliğin afişini (`<figure>`, `<img>`, `<figcaption>`) ve detaylı künyesini (`<dl>`, `<dt>`, `<dd>`) içeren detay sayfası.
4. **`etkinlik-ekle.html`**: Yeni etkinlik ekleme formu (`<form>`, `<label>`, `<input>`, `<select>`, `<textarea>`, `required`).
5. **`etkinlik-guncelle.html`**: Mevcut etkinliği güncelleme formu (alanlar `value` ve seçili değerlerle dolu gelir).

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

## Sprint 3: JavaScript ve DOM

Sprint 3 kapsamında statik HTML kartları silinmiş, tüm etkinlik verisi `js/data.js` modülüne taşınmış ve JavaScript modülleri (`type="module"`) ile dinamik olarak üretilmeye başlanmıştır.

### Modül Mimarisi (`sprint3/js/`)
1. **`data.js`**: En az 6 etkinlik içeren merkezi veri dizisi. Her etkinlikte `id`, `title`, `category`, `date`, `time`, `location`, `description` ve `capacity` alanları yer alır.
2. **`event-list.js`**:
   - `index.html` ve `etkinlikler.html` sayfaları tarafından ortak kullanılır.
   - `index.html` sayfasındaki `data-limit="2"` özniteliğini tespit ederek etkinlikleri tarihe göre sıralar ve yaklaşan 2 etkinliği listeler.
   - `etkinlikler.html` sayfasında tüm etkinlikleri kart olarak dinamik üretir.
   - Arama kutusu ve dinamik üretilen kategori filtresini (`new Set`) birlikte çalıştırır (`filter` + `&&`).
   - Türkçe karakter duyarlı arama (`toLocaleLowerCase("tr-TR")`) yapar.
   - Eşleşen etkinlik sayısını (`X etkinlik listeleniyor.`) veya sonuç yoksa `"Aramanıza uygun etkinlik bulunamadı."` mesajını yazar.
3. **`event-detail.js`**:
   - `etkinlik-detay.html` sayfasında URL'den `?id=` parametresini okur (`URLSearchParams`).
   - Etkinliği bulursa afiş, künye (`dl/dt/dd`), açıklama ve `"Bu etkinliği güncelle"` linkini üretir.
   - Geçersiz veya eksik id durumunda konsolda kırmızı hata vermeden kırmızı hata kutusu ve `"← Listeye dön"` butonu gösterir.
4. **`event-form.js`**:
   - `etkinlik-ekle.html` ve `etkinlik-guncelle.html` formlarının yönetimini üstlenir.
   - Tarayıcının varsayılan balonlarını kapatır (`novalidate`), sayfanın yenilenmesini engeller (`e.preventDefault()`).
   - İstemci taraflı doğrulama yapar:
     - Ad: En az 3 karakter
     - Kategori: Seçilmiş olmalı
     - Tarih ve Saat: Boş olamaz
     - Yer: Boş olamaz
     - Kontenjan: Girildiyse 1-1000 arasında olmalı
   - Hatalı alanlara `aria-invalid="true"` ve altlarına kırmızı hata mesajı ekler.
   - Başarılı gönderimde yeşil kutuda oluşan JSON nesnesini görüntüler.
   - Güncelleme modunda (`data-mode="guncelle"`) id ile gelen etkinliğin alanlarını doldurur; id'siz açılırsa uyarı kutusu gösterir.

### Menü Düzenlemesi
- Beş sayfanın tümünde menüden "Güncelle" linki kaldırılmış; menü **Ana Sayfa**, **Etkinlikler** ve **Ekle** olarak 3 linke sadeleştirilmiştir. Güncelleme sayfasına sadece detay sayfasındaki butonla erişilir.

---

## Git ve Teslim Bilgileri
- **Sprint 1 Etiketi:** `sprint-01`
- **Sprint 2 Etiketi:** `sprint-02`
- **Sprint 3 Etiketi:** `sprint-03`
- **Vercel Root Directory:** `sprint3`
