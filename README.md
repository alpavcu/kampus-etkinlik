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
- **Backend:** Node.js, Express 5, Mongoose 9, MongoDB (Atlas / Yerel), dotenv, cors, REST API mimarisi

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

### Backend (REST API Sunucusu & MongoDB)
```bash
cd backend
npm install
npm run seed     # Veritabanını 6 başlangıç etkinliğiyle doldurur (idempotent)
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

### Backend REST API Endpoint'leri (Sprint 9: Tam CRUD)
| METHOD | ENDPOINT | AÇIKLAMA | DURUM |
|---|---|---|---|
| GET | `/health` | Sunucu kontrolü ve öğrenci no (`21210327744`) | Çalışıyor |
| GET | `/events` | MongoDB etkinlik listesi (opsiyonel `?search=` ve `?category=` filtreleri) | Çalışıyor |
| GET | `/events/upcoming` | Yaklaşan etkinlikler (tarih ve saate göre sıralı, geçmiş etkinlikler hariç) | Çalışıyor |
| GET | `/events/:id` | Tek etkinlik detayı (MongoDB `_id`, bulunamadıysa 404) | Çalışıyor |
| POST | `/events` | Yeni etkinlik oluşturma (Mongoose validasyonu, 201 Created) | Çalışıyor |
| PATCH | `/events/:id` | Etkinlik kısmi güncelleme (`_id`, `createdAt` korumalı, 200 OK) | Çalışıyor |
| DELETE | `/events/:id` | Etkinlik silme (`204 No Content`, gövde yok) | Çalışıyor |

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

### Sprint 8: MongoDB ve Mongoose (Kalıcı Veri)
- Backend uygulamasına Mongoose ODM (`mongoose`) eklendi.
- `src/config/database.js` ile güvenli ve esnek (yerel MongoDB veya Atlas) veritabanı bağlantı modülü kuruldu.
- `src/models/event-model.js` içinde şema validasyonları (min/max karakter, enum, varsayılanlar) ve zaman damgaları (`timestamps: true`) ile `Event` modeli oluşturuldu.
- `src/data/seed-events.js` ve `src/seed.js` modülleri hazırlanarak `npm run seed` komutu idempotent (tekrar çalıştırılabilir ve her seferinde 6 özgün etkinliği sıfırlayıp yükleyen) hale getirildi.
- `server.js` veritabanı bağlantısı kurulmadan sunucu dinlemeye başlamayacak şekilde güncellendi.
- Kontrolör katmanı (`event-controller.js`) MongoDB üzerinde sorgu, sıralama (`date: 1`), `mongoose.isValidObjectId` kontrolü ile 404 yönetimi ve `ValidationError` 400 yakalamasıyla refactor edildi.
- `app.js` içine 500 genel hata yakalama middleware'i eklendi.
- Etiket: `sprint-08`.

### Sprint 9: Tam CRUD (PATCH, DELETE ve Sorgular)
- `src/utils/date.js` modülü ile `GG-AA-YYYY` biçiminde tarih ayrıştırma (`parseDate`), biçimlendirme (`formatDate`) ve bugünün başlangıcı (`todayStart`) fonksiyonları uygulandı.
- `Event` modelinde tarih alanı veritabanında gerçek `Date` (UTC), JSON çıktısında `GG-AA-YYYY` metin formatı olacak şekilde getter/setter ile yapılandırıldı.
- `seed-events.js` dosyasında en az 2 geçmiş tarihli etkinlik tanımlandı; seed işlemi güncellendi.
- `event-routes.js` üzerinde `/events/upcoming` rotası `/:id` rotasının önüne yerleştirildi.
- `PATCH /events/:id` endpoint'i `runValidators: true`, `returnDocument: "after"`, boş body kontrolü (`Body is empty`) ve korunan alan (`_id`, `createdAt`, `updatedAt`, `__v`) engellemesiyle uygulandı.
- `DELETE /events/:id` endpoint'i silinen kayıt için `204 No Content` (gövdesiz) ve ikinci çağrıda `404 Not Found` dönecek şekilde uygulandı.
- `GET /events` sorgusuna büyük/küçük harf duyarsız ve regex karakterlerinden arındırılmış `?search=` ve `?category=` filtreleri eklendi.
- `GET /events/upcoming` endpoint'i `$gte: todayStart()` filtresiyle yalnızca bugünkü ve gelecekteki etkinlikleri tarihe ve saate göre artan sırada listeler.
- Hocanın resmi test koleksiyonu (`https://webdersi.vercel.app/test.json`) Newman ile çalıştırılarak 18 istek, 45 test, 0 hata ile doğrulandı ve `run-results.json` oluşturuldu.
- Etiket: `sprint-09`.

---

## Vercel Yayına Alma Ayarları (Frontend)
- **Root Directory:** `frontend`
- **Framework Preset:** `Vite`
- **Build Command:** `npm run build`
- **Output Directory:** `dist`
