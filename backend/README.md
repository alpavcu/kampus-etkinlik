# Kampüs Etkinlikleri — Backend REST API (Sprint 8: MongoDB & Mongoose)

**Öğrenci Bilgileri:**
- **Ad Soyad:** Alp Avcu
- **Öğrenci Numarası:** `21210327744`
- **Port:** `3000` (ortam değişkeni `PORT` üzerinden okunur)
- **Base URL:** `http://localhost:3000`
- **Veritabanı:** MongoDB (Mongoose ODM)

---

## 1. REST API Sözleşmesi

| METHOD | ENDPOINT | AMAÇ | BAŞARI | HATA | DURUM |
|---|---|---|---|---|---|
| GET | `/health` | Sunucu sağlık kontrolü ve öğrenci no | 200 | — | Sprint 7 & 8 |
| GET | `/events` | Tüm liste (opsiyonel `?category=` filtresi) | 200 | 500 | Sprint 8 (MongoDB) |
| GET | `/events/:id` | Tek etkinlik detayı (MongoDB `_id`) | 200 | 404, 500 | Sprint 8 (MongoDB) |
| POST | `/events` | Yeni etkinlik oluşturma | 201 | 400, 500 | Sprint 8 (Mongoose) |
| PATCH | `/events/:id` | Etkinlik güncelleme | 200 | 400, 404 | Sprint 9 |
| DELETE | `/events/:id` | Etkinlik silme | 204 | 404 | Sprint 9 |

### HTTP Durum Kodları
- **200 OK:** İstek başarılı, veri döndürüldü.
- **201 Created:** Yeni etkinlik belgesi MongoDB üzerinde başarıyla oluşturuldu (`_id`, `createdAt`, `updatedAt` ile birlikte döner).
- **204 No Content:** İşlem başarılı, dönecek içerik yok (Sprint 9).
- **400 Bad Request:** Mongoose şema validasyonuna takılan eksik veya geçersiz veri gönderildi (`ValidationError`).
- **404 Not Found:** İstenen ObjectId bulunamadı veya geçersiz formatta (`Event not found` veya `Route not found`).
- **500 Internal Server Error:** Sunucu/veritabanı kaynaklı beklenmeyen hata (`Server error`).

### Standart Hata Yanıt Şemaları
```json
{
  "error": {
    "message": "Event not found"
  }
}
```
```json
{
  "error": {
    "message": "Event validation failed: title: Etkinlik başlığı zorunludur"
  }
}
```
```json
{
  "error": {
    "message": "Server error"
  }
}
```

---

## 2. Mongoose Veri Modeli (`Event`)

`src/models/event-model.js` dosyası ile tanımlanmıştır:

| Alan Adı | Tip | Kurallar & Validasyonlar | Varsayılan |
|---|---|---|---|
| `title` | String | Zorunlu, trim, min: 3, max: 100 karakter | — |
| `category` | String | Zorunlu, Enum: `["Seminer", "Atölye", "Söyleşi", "Yarışma"]` | — |
| `capacity` | Number | Min: 0 | `0` |
| `date` | String | Zorunlu | — |
| `time` | String | İsteğe bağlı | `""` |
| `location` | String | Trim | `""` |
| `description` | String | Trim, max: 500 karakter | `""` |
| `createdAt` | Date | Otomatik Mongoose zaman damgası | — |
| `updatedAt` | Date | Otomatik Mongoose zaman damgası | — |

---

## 3. Kurulum ve Çalıştırma

Gereksinim: Node.js (v18+) ve MongoDB (Yerel veya MongoDB Atlas)

```bash
# Backend klasörüne geçin
cd backend

# Bağımlılıkları yükleyin (express, mongoose, dotenv, cors)
npm install

# .env dosyasını oluşturun (örnekten kopyalayın)
cp .env.example .env
# .env içinde MONGODB_URI adresinizi yapılandırın

# Başlangıç verilerini (6 özgün etkinlik) veritabanına aktarın
npm run seed

# Geliştirme modunda başlatın (Node.js watch mode)
npm run dev

# veya normal başlatın
npm start
```

Sunucu başarıyla başladığında konsolda şu çıktıyı göreceksiniz:
```
MongoDB bağlandı (yerel veya Atlas): <host>/<database>
API: http://localhost:3000
```

---

## 4. Test Talimatları ve Postman Koleksiyonu

`backend/requests/kampus-api.json` dosyası Postman Collection v2.1 formatında hazırlanmıştır. Postman uygulamasında **Import** butonu ile bu dosyayı içe aktarıp aşağıdaki 6 isteği sırasıyla çalıştırabilirsiniz:

1. **`GET /health`** (200 OK) -> `{ "status": "ok", "time": "...", "student": "21210327744" }`
2. **`GET /events`** (200 OK) -> MongoDB'deki etkinlik listesi döner (başlangıçta 6 etkinlik).
3. **`GET /events/:id`** (200 OK) -> Geçerli MongoDB `_id` ile tek etkinlik kaydı döner.
4. **`GET /events/64f1a...`** (404 Not Found) -> Bulunamayan veya geçersiz ID için `{ "error": { "message": "Event not found" } }` döner (500 çökme yaşanmaz).
5. **`POST /events`** (201 Created) -> Yeni etkinlik MongoDB'ye kaydedilir, `_id` ve timestamps döner.
6. **`POST /events (Eksik Veri)`** (400 Bad Request) -> Mongoose validasyonu yakalanır ve `{ "error": { "message": "..." } }` döner.
