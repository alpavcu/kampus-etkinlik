# Kampüs Etkinlikleri — Backend REST API (Sprint 7)

**Öğrenci Bilgileri:**
- **Ad Soyad:** Alp Avcu
- **Öğrenci Numarası:** `21210327744`
- **Port:** `3000` (ortam değişkeni `PORT` üzerinden okunur)
- **Base URL:** `http://localhost:3000`

---

## 1. REST API Sözleşmesi

| METHOD | ENDPOINT | AMAÇ | BAŞARI | HATA | DURUM |
|---|---|---|---|---|---|
| GET | `/health` | Sunucu sağlık kontrolü ve öğrenci no | 200 | — | Sprint 7 |
| GET | `/events` | Tüm liste (opsiyonel `?category=` filtresi) | 200 | — | Sprint 7 |
| GET | `/events/:id` | Tek etkinlik detayı | 200 | 404 | Sprint 7 |
| POST | `/events` | Yeni etkinlik oluşturma | 201 | 400 | Sprint 7 |
| PATCH | `/events/:id` | Etkinlik güncelleme | 200 | 400, 404 | Sprint 9 |
| DELETE | `/events/:id` | Etkinlik silme | 204 | 404 | Sprint 9 |

### HTTP Durum Kodları
- **200 OK:** İstek başarılı, veri döndürüldü.
- **201 Created:** Yeni kaynak başarıyla oluşturuldu.
- **204 No Content:** İşlem başarılı, dönecek içerik yok (Sprint 9).
- **400 Bad Request:** Eksik veya geçersiz veri gönderildi (`title, category and date are required`).
- **404 Not Found:** İstenen etkinlik veya route bulunamadı (`Event not found` veya `Route not found`).

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
    "message": "title, category and date are required"
  }
}
```
```json
{
  "error": {
    "message": "Route not found"
  }
}
```

---

## 2. Kurulum ve Çalıştırma

Gereksinim: Node.js (v18+)

```bash
# Backend klasörüne geçin
cd backend

# Bağımlılıkları yükleyin
npm install

# .env dosyasını oluşturun (örnekten kopyalayın)
cp .env.example .env

# Geliştirme modunda başlatın (Node.js watch mode)
npm run dev

# veya normal başlatın
npm start
```

Sunucu başladığında konsolda şu çıktıyı göreceksiniz:
```
API: http://localhost:3000
```

---

## 3. Test Talimatları ve Postman Koleksiyonu

`backend/requests/kampus-api.json` dosyası Postman Collection v2.1 formatında hazırlanmıştır. Postman uygulamasında **Import** butonu ile bu dosyayı içe aktarıp aşağıdaki 6 isteği sırasıyla çalıştırabilirsiniz:

1. **`GET /health`** (200 OK) -> `{ "status": "ok", "time": "...", "student": "21210327744" }`
2. **`GET /events`** (200 OK) -> Başlangıçta 6 etkinliğin dizisi döner.
3. **`GET /events/event-2`** (200 OK) -> `id="event-2"` olan Robotik Atölyesi nesnesi döner.
4. **`GET /events/yok`** (404 Not Found) -> `{ "error": { "message": "Event not found" } }`
5. **`POST /events`** (201 Created) -> Yeni etkinlik bellekteki diziye eklenir ve oluşturulan nesne döner.
6. **`POST /events (Eksik Veri)`** (400 Bad Request) -> Eksik zorunlu alanlar (`title`, `category`, `date`) nedeniyle `{ "error": { "message": "title, category and date are required" } }` döner.
