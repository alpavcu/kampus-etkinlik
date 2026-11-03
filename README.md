# Canlı Yayın (Vercel) URL: https://kampus-etkinlik-sprint2-one.vercel.app/

# Kampüs Etkinlikleri — Sprint 6 + Vize

**Öğrenci Bilgileri:**
- **Ad Soyad:** Alp Avcu
- **Öğrenci Numarası:** 2121032744 (21210327744)
- **Tasarım Parametreleri:** Font: **Georgia, serif** | Ton: `224` (Mavi palet)
- **Canlı Vercel Adresi:**: https://kampus-etkinlik-sprint2-one.vercel.app/

---

## Proje Hakkında

Bu proje, üniversite kampüsündeki seminer, atölye, söyleşi ve yarışma gibi etkinliklerin listelenmesi, detaylarının incelenmesi, gerçek zamanlı aranması, filtrelenmesi ve yönetim paneli üzerinden tam yetkili olarak yönetilmesi (ekleme, güncelleme, silme ve onay) amacıyla geliştirilmiş modern bir Single Page Application (SPA) web uygulamasıdır.

---

## Kullanılan Teknolojiler

- **React 19**
- **TypeScript 5.9**
- **Vite 8**
- **React Router 7 (`react-router-dom`)**
- **React Context API** (Global state yönetimi)
- **CSS3 & Responsive Design** (Mobil ve masaüstü uyumlu)

---

## Kurulum ve Çalıştırma

Projeyi yerel makinenizde çalıştırmak için terminalde sırasıyla aşağıdaki komutları uygulayabilirsiniz:

```bash
# Frontend klasörüne geçin
cd frontend

# Bağımlılıkları yükleyin
npm install

# Geliştirme sunucusunu başlatın
npm run dev

# Canlı üretim (production) derlemesini oluşturun
npm run build

# Derlenen projeyi önizleyin
npm run preview
```

---

## Route Haritası (10 Adres, 10 Sayfa)

Uygulama `react-router-dom` ile 10 farklı rotayı eksiksiz desteklemektedir:

| URL | Sayfa Bileşeni | Açıklama |
|---|---|---|
| `/` | `HomePage` | Yaklaşan en yakın 2 etkinliği ve tüm etkinliklere geçiş butonunu listeler |
| `/events` | `EventsPage` | Tüm etkinlikleri gerçek zamanlı arama ve kategori filtresiyle sunar |
| `/events/:id` | `EventDetailPage` | URL'den dinamik `id` alarak etkinliğin künyesini ve afişini görüntüler |
| `/login` | `LoginPage` | Kontrollü e-posta ve şifre doğrulamalı giriş sayfası (demo) |
| `/register` | `RegisterPage` | Ad soyad, e-posta, şifre ve şifre tekrarı kontrollü kayıt sayfası (demo) |
| `/forgot-password` | `ForgotPasswordPage` | Şifre sıfırlama bağlantı talebi sayfası (demo) |
| `/admin` | `AdminPage` | Etkinlik yönetim tablosu, düzenleme ve onaylı silme işlemleri |
| `/admin/new` | `AddEventPage` | Yeni etkinlik ekleme formu (`addEvent` fonksiyonu) |
| `/admin/:id/edit` | `EditEventPage` | Mevcut etkinlik bilgilerini dolduran güncelleme formu (`updateEvent`) |
| `*` | `NotFoundPage` | Geçersiz adreslerde veya bulunamayan etkinliklerde gösterilen 404 sayfası |

---

## Dosya ve Klasör Yapısı

```
frontend/
  ├── public/
  │   └── afis.svg
  ├── src/
  │   ├── assets/
  │   ├── components/
  │   │   ├── events/
  │   │   │   ├── EventCard.tsx      (Tekil kart; Link to /events/:id)
  │   │   │   ├── EventDetail.tsx    (Detay görünümü; Link to /events & /admin/:id/edit)
  │   │   │   ├── EventFilter.tsx    (Arama ve kategori filtre formu)
  │   │   │   └── EventList.tsx      (Etkinlik ızgara listesi)
  │   │   ├── forms/
  │   │   │   └── EventForm.tsx      (Ortak kontrollü form, 7 kural doğrulama)
  │   │   └── layout/
  │   │       ├── Footer.tsx         (Öğrenci künyesi ve telif alanı)
  │   │       ├── Header.tsx         (Site başlığı ve alt başlığı)
  │   │       └── Navigation.tsx     (NavLink ile aktif sayfa işaretlemeli menü)
  │   ├── context/
  │   │   └── EventsContext.tsx      (EventsProvider & useEvents hook: add, update, delete)
  │   ├── data/
  │   │   └── events.ts              (Başlangıç 6 mock etkinlik verisi)
  │   ├── pages/
  │   │   ├── AddEventPage.tsx
  │   │   ├── AdminPage.tsx
  │   │   ├── EditEventPage.tsx
  │   │   ├── EventDetailPage.tsx
  │   │   ├── EventsPage.tsx
  │   │   ├── ForgotPasswordPage.tsx
  │   │   ├── HomePage.tsx
  │   │   ├── LoginPage.tsx
  │   │   ├── NotFoundPage.tsx
  │   │   └── RegisterPage.tsx
  │   ├── types/
  │   │   ├── campus-event.ts        (CampusEvent, Category)
  │   │   └── EventFormData.ts       (EventFormData, EventFormErrors)
  │   ├── utils/
  │   │   ├── filter-events.ts       (searchEvents, filterByCategory, findEventById)
  │   │   ├── format-date.ts         (formatDate saf fonksiyonu)
  │   │   └── validate-event.ts      (validateEvent saf doğrulama fonksiyonu)
  │   ├── App.css                    (Öğrenci numarasına özel renk/font ve responsive CSS)
  │   ├── App.tsx                    (Ortak iskelet ve Routes haritası)
  │   ├── index.css
  │   └── main.tsx                   (BrowserRouter > EventsProvider > App)
  ├── vercel.json                    (SPA derin linkler için rewrite kuralı)
  ├── package.json
  ├── tsconfig.json
  └── vite.config.ts
```

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
- Etiket: `sprint-04`.

### Sprint 5: React Bileşenleri
- `App.tsx` kodları 8 adlandırılmış modüler React bileşenine ayrıştırıldı (`layout/Header`, `layout/Navigation`, `layout/Footer`, `events/EventCard`, `events/EventList`, `events/EventFilter`, `events/EventDetail`, `forms/EventForm`).
- `PageName` tipi `types/page.ts` dosyasına, `formatDate` yardımcı fonksiyonu `utils/format-date.ts` dosyasına taşındı.
- State lifted olarak `App.tsx` içinde tutuldu, bileşenler props ve callback mimarisiyle haberleşti.
- `App.tsx` satır sayısı 376'dan 90 satıra indirildi.
- Etiket: `sprint-05`.

### Sprint 6 + Vize: Router, Context, Yönetim Paneli ve Formlar
- `react-router-dom` entegre edildi, 10 route tanımlandı (`/`, `/events`, `/events/:id`, `/login`, `/register`, `/forgot-password`, `/admin`, `/admin/new`, `/admin/:id/edit`, `*`).
- `EventsContext` oluşturuldu; `events`, `addEvent`, `updateEvent`, `deleteEvent` fonksiyonları ve `useEvents` hook'u bağlandı.
- Etkinlik formu gerçek kontrollü form durumuna geçirildi (`EventFormData`), `validateEvent` ile 7 alanın validasyonu sağlandı ve hata mesajları kutu altına yerleştirildi.
- Yönetim paneli (`/admin`) masaüstünde şık bir tablo, mobilde (360-390px) kart görünümüne dönüşecek şekilde responsive olarak geliştirildi (`data-baslik` öznitelikleri).
- Silme işleminde `window.confirm` ile onay mekanizması kuruldu.
- Giriş, kayıt ve şifremi unuttum sayfaları istemci tarafı validasyonlarıyla geliştirildi.
- `vercel.json` SPA yönlendirmeleri eklendi.
- Etiket: `frontend`.

---

## Vercel Yayına Alma Ayarları
- **Root Directory:** `frontend`
- **Framework Preset:** `Vite`
- **Build Command:** `npm run build`
- **Output Directory:** `dist`
