# Canlı Yayın (Vercel) URL: https://kampus-etkinlik-alp-avcu.vercel.app

# Kampüs Etkinlikleri

**Öğrenci Bilgileri:**
- **Ad Soyad:** Alp Avcu
- **Öğrenci Numarası:** 2121032744
- **Örnek Detay Bağlantısı (Sprint 3):** https://kampus-etkinlik-alp-avcu.vercel.app/etkinlik-detay.html?id=event-3

---

## Proje Hakkında

Bu proje, üniversite kampüsündeki seminer, atölye ve söyleşi gibi etkinliklerin listelenmesi, detaylarının incelenmesi, filtreleme/arama yapılması, yeni etkinlik eklenmesi ve mevcut etkinliklerin güncellenmesi amacıyla hazırlanmış web uygulamasıdır.

---

## Dosya Yapısı ve Görevleri (Sprint 4 - Adım 2)

- **`frontend/package.json`**: Proje adı, komutlar (`dev`, `build`, `preview`) ve paket listesini tanımlar.
- **`frontend/package-lock.json`**: Yüklenen paketlerin tam sürümlerini kilitler.
- **`frontend/node_modules/`**: İndirilen paketler; `.gitignore` ile korunur, GitHub'a gitmez.
- **`frontend/tsconfig*.json`**: TypeScript derleyici ve tip kurallarını ayarlar.
- **`frontend/vite.config.ts`**: Vite geliştirme ve derleme ayarlarını barındırır.
- **`frontend/index.html`**: Tek HTML dosyası; içinde boş `<div id="root"></div>` bulunur.
- **`frontend/src/main.tsx`**: React'i başlatır, `App` bileşenini DOM'a bağlar.
- **`frontend/src/App.tsx`**: Uygulamanın ana bileşenidir; 5 sayfanın tamamını (`useState`) barındırır.
- **`frontend/src/App.css`**: Öğrenci numarasına özel renk ve fontları içeren CSS stilleridir.
- **`frontend/src/index.css`**: Genel stil dosyasıdır; Vite temasını sıfırlamak için bu sprintte boştur.
- **`frontend/public/`**: `afis.svg` gibi kopyalanan statik dosyaları içerir.

---

## Sprint Özeti

### Sprint 1: HTML, Git ve Yayına Alma
- Saf semantik HTML5 iskeleti (`sprint1/`).
- 5 sayfa, formlar, tablo yapısı ve etiket: `sprint-01`.

### Sprint 2: CSS ve Responsive Tasarım
- Numaraya özel CSS (`sprint2/css/numaran.css` ve `2121032744.css`).
- Son hane 4 ➔ Font: **Georgia, serif**, Ton: `224` (Mavi palet).
- Tablodan CSS Grid kart yapısına geçiş ve etiket: `sprint-02`.

### Sprint 3: JavaScript ve DOM
- Vanilla JS ES Modules mimarisi (`sprint3/js/`): `data.js`, `event-list.js`, `event-detail.js`, `event-form.js`.
- Dinamik kart üretimi, Türkçe duyarlı gerçek zamanlı arama, dinamik kategori filtresi, URL `?id=` detay sayfası ve istemci doğrulamalı formlar.
- Etiket: `sprint-03`.

### Sprint 4: Vite, TypeScript ve React
- `frontend/` klasöründe Vite + React + TypeScript mimarisi.
- Tipli veri (`CampusEvent`, `Category`), saf yardımcı fonksiyonlar (`searchEvents`, `filterByCategory`, `findEventById`).
- React Router kullanılmadan `useState` ile 5 sayfa (Ana Sayfa, Etkinlikler, Detay, Ekle, Güncelle).
- `useEffect` ile sekme başlığı (`document.title`) yönetimi.
- Formlar sadece görünüm (Adım 13: `preventDefault()`, state kaydetme yok).
- Etiket: `sprint-04`.

### Sprint 5: React Bileşenleri
- `App.tsx` kodları 8 adlandırılmış modüler React bileşenine ayrıştırıldı (`layout/Header`, `layout/Navigation`, `layout/Footer`, `events/EventCard`, `events/EventList`, `events/EventFilter`, `events/EventDetail`, `forms/EventForm`).
- `PageName` tipi `types/page.ts` dosyasına, `formatDate` yardımcı fonksiyonu `utils/format-date.ts` dosyasına taşındı.
- State lifted olarak `App.tsx` içinde tutuldu, bileşenler props ve callback mimarisiyle haberleşti.
- `App.tsx` satır sayısı 376'dan tam 90 satıra indirildi.
- Etiket: `sprint-05`.

---

## Vercel Yayına Alma (Sprint 4 Ayarları)
- **Root Directory:** `frontend`
- **Framework Preset:** `Vite`
- **Build Command:** `npm run build`
- **Output Directory:** `dist`
