# Canlı Yayın (Vercel) URL: https://alpavcu-frontend.vercel.app/

# Kampüs Etkinlikleri

**Öğrenci Bilgileri:**
- **Ad Soyad:** Alp Avcu
- **Öğrenci Numarası:** 2121032744 (21210327744)
- **Tasarım Parametreleri:** Font: **Georgia, serif** | Ton: `224` (Mavi palet)
- **Canlı Vercel Adresi (Frontend):** https://alpavcu-frontend.vercel.app/
- **Backend Adresi (Yerel):** http://localhost:3000

---

## Proje Hakkında

Bu proje, üniversite kampüsündeki seminer, atölye, söyleşi ve yarışma gibi etkinliklerin listelenmesi, detaylarının incelenmesi, gerçek zamanlı aranması, filtrelenmesi, yönetim paneli üzerinden yönetilmesi ve Express REST API backend servisi ile sunulması amacıyla geliştirilmiş modern bir web uygulamasıdır.

---

## Kullanılan Teknolojiler

- **Frontend:** React 19, TypeScript 5.9, Vite 8, React Router 7 (`react-router-dom`), React Context API, CSS3
- **Backend:** Node.js, Express 5, dotenv, cors, REST API mimarisi

---

## Kurulum ve Çalıştırma

### Frontend (İstemci)
```bash
cd frontend
npm install
npm run dev      # Geliştirme sunucusu
npm run build    # Production build
npm run preview  # Build önizleme
```

### Backend (REST API Sunucusu)
```bash
cd backend
npm install
npm run dev      # node --watch src/server.js (http://localhost:3000)
npm start        # node src/server.js
```

---

## Route ve Endpoint Haritası

### Frontend Sayfa Rotaları (React Router)
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

### Backend REST API Endpoint'leri (Sprint 7)
| METHOD | ENDPOINT | AÇIKLAMA | DURUM |
|---|---|---|---|
| GET | `/health` | Sunucu kontrolü ve öğrenci no (`21210327744`) | Sprint 7 |
| GET | `/events` | Tüm etkinlik listesi (opsiyonel `?category=` filtresi) | Sprint 7 |
| GET | `/events/:id` | Tek etkinlik detayı (bulunamadıysa 404) | Sprint 7 |
| POST | `/events` | Yeni etkinlik oluşturma (zorunlu: title, category, date) | Sprint 7 |
| PATCH | `/events/:id` | Etkinlik güncelleme | Sprint 9 |
| DELETE | `/events/:id` | Etkinlik silme | Sprint 9 |

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
- `App.tsx` kodları 8 adlandırılmış modüler React bileşenine ayrıştırıldı.
- State lifted olarak `App.tsx` içinde tutuldu, bileşenler props ve callback mimarisiyle haberleşti.
- `App.tsx` satır sayısı 90 satıra indirildi.
- Etiket: `sprint-05`.

### Sprint 6 + Vize: Router, Context, Yönetim Paneli ve Formlar
- `react-router-dom` entegre edildi, 10 route tanımlandı.
- `EventsContext` oluşturuldu; `events`, `addEvent`, `updateEvent`, `deleteEvent` fonksiyonları ve `useEvents` hook'u bağlandı.
- Form validasyonları ve yönetim paneli responsive tablosu geliştirildi.
- Etiket: `frontend`.

### Sprint 7: Express ile REST API (Backend Başlangıç)
- `backend/` klasöründe Express 5, dotenv, cors tabanlı modüler REST API mimarisi kuruldu.
- `app.js`, `server.js`, `routes/event-routes.js`, `controllers/event-controller.js`, `data/events.js` katmanları ayrıştırıldı.
- `GET /health` endpoint'i ile sistem kontrolü ve `student: "21210327744"` doğrulaması sağlandı.
- `GET /events`, `GET /events/:id` ve `POST /events` endpoint'leri eksiksiz doğrulama ve durum kodlarıyla (`200`, `201`, `400`, `404`) uygulandı.
- Postman Collection v2.1 formatında `requests/kampus-api.json` koleksiyonu 6 test ile oluşturuldu.
- Etiket: `sprint-07`.

---

## Vercel Yayına Alma Ayarları (Frontend)
- **Root Directory:** `frontend`
- **Framework Preset:** `Vite`
- **Build Command:** `npm run build`
- **Output Directory:** `dist`
