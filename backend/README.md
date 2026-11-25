# Kampüs Etkinlikleri — Backend REST API (Sprint 9: Tam CRUD)

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
| GET | `/health` | Sunucu sağlık kontrolü ve öğrenci no | 200 | — | Çalışıyor |
| GET | `/events` | Tüm liste (opsiyonel `?search=` ve `?category=` filtreleri) | 200 | 500 | Çalışıyor |
| GET | `/events/upcoming` | Yaklaşan etkinlikler (tarih ve saate göre sıralı, geçmiş etkinlikler elenmiş) | 200 | 500 | Çalışıyor |
| GET | `/events/:id` | Tek etkinlik detayı (MongoDB `_id`) | 200 | 404, 500 | Çalışıyor |
| POST | `/events` | Yeni etkinlik oluşturma (GG-AA-YYYY tarih doğrulaması) | 201 | 400, 500 | Çalışıyor |
| PATCH | `/events/:id` | Etkinlik kısmi güncelleme (`_id`, `createdAt` vb. korumalı) | 200 | 400, 404 | Çalışıyor |
| DELETE | `/events/:id` | Etkinlik silme (`204 No Content`, gövde yok) | 204 | 404 | Çalışıyor |

### HTTP Durum Kodları
- **200 OK:** İstek başarılı, güncel veri döndürüldü.
- **201 Created:** Yeni etkinlik belgesi MongoDB üzerinde başarıyla oluşturuldu (`_id`, `createdAt`, `updatedAt` ile birlikte döner).
- **204 No Content:** Etkinlik başarıyla silindi, yanıt gövdesi boş (`res.status(204).end()`).
- **400 Bad Request:** Mongoose şema validasyonuna takılan eksik veya geçersiz veri, geçersiz tarih biçimi, boş PATCH gövdesi (`Body is empty`) veya korunan alanların (`_id`, `createdAt`, `updatedAt`, `__v`) değiştirilme girişimi.
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
    "message": "Body is empty"
  }
}
```
```json
{
  "error": {
    "message": "_id cannot be changed"
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
| `date` | Date | Zorunlu, GG-AA-YYYY biçimi (`parseDate` setter, `formatDate` getter) | — |
| `time` | String | İsteğe bağlı | `""` |
| `location` | String | Trim | `""` |
| `description` | String | Trim, max: 500 karakter | `""` |
| `createdAt` | Date | Otomatik Mongoose zaman damgası | — |
| `updatedAt` | Date | Otomatik Mongoose zaman damgası | — |

**Tarih Mantığı (`src/utils/date.js`):**
- Veritabanında gerçek `Date` (UTC) olarak saklanır; böylece `$gte: todayStart()` ve `sort({ date: 1, time: 1 })` sorguları doğru çalışır.
- API düzeyinde `GG-AA-YYYY` (örn: `15-10-2026`) formatında kabul edilir ve yanıtlanır.

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

# Başlangıç verilerini (2 geçmiş, 4 gelecek toplam 6 etkinlik) yükleyin
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

## 4. Test Talimatları ve Newman Test Koşusu

Hocanın resmi test koleksiyonu (`https://webdersi.vercel.app/test.json`) `backend/requests/kampus-api.json` içerisine kaydedilmiştir.

### Newman ile Otomatik Test:
```bash
# Newman kurulu değilse kurun
npm i -g newman

# Sunucu (npm run dev) açıkken terminalde çalıştırın:
newman run https://webdersi.vercel.app/test.json

# Test sonuçlarını JSON olarak dışa aktarmak için:
newman run https://webdersi.vercel.app/test.json --reporters cli,json --reporter-json-export requests/run-results.json
```

**Test Kapsamı (18 İstek, 45 Test):**
1. `01 Health`: 200 OK, `status: ok`, öğrenci no `21210327744`
2. `02 Etkinlik listesi`: 200 OK, en az 6 kayıt, tarihler `GG-AA-YYYY`, `_id` ve `createdAt`
3. `03 Tek etkinlik`: 200 OK, `_id` ile doğru kayıt
4. `04 Olmayan etkinlik (404)`: 404 Not Found
5. `05 Etkinlik oluştur (201)`: 201 Created, `_id` ve `date: 20-12-2026`
6. `06 Eksik veri (400)`: 400 Bad Request
7. `07 Yanlış tarih biçimi (400)`: 400 Bad Request
8. `08 Güncelle (200)`: PATCH ile kapasite güncelleme
9. `09 Tarih güncelle (200)`: PATCH ile tarih güncelleme
10. `10 Boş body (400)`: Boş gövdede 400 Bad Request
11. `11 Geçersiz kategori (400)`: Enum dışı değerde 400
12. `12 _id değiştirme (400)`: Korunan alanlarda 400
13. `13 Olmayan id güncelle (404)`: 404 Not Found
14. `14 Arama`: `?search=atölye` ile başlık araması
15. `15 Arama + kategori`: `?search=atölye&category=Atölye` birleşik filtre
16. `16 Yaklaşan etkinlikler`: `/events/upcoming` geçmiş etkinlikleri eler, tarihe ve saate göre sıralar
17. `17 Sil (204)`: `204 No Content`, gövde boş
18. `18 Tekrar sil (404)`: Silinmiş ID için 404 Not Found
