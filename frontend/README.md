# Canlı Yayın (Vercel) URL: https://kampus-etkinlik-alp-avcu.vercel.app

# Kampüs Etkinlikleri - Frontend (Sprint 4)

**Öğrenci Bilgileri:**
- **Ad Soyad:** Alp Avcu
- **Öğrenci Numarası:** 2121032744

---

## Dosya Yapısı ve Görevleri (Adım 2)

- **`package.json`**: Proje adı, komutlar (`dev`, `build`, `preview`) ve bağımlılık paket listesini tanımlar.
- **`package-lock.json`**: İndirilen paketlerin tam sürümlerini ve bağımlılık ağacını kilitler.
- **`node_modules/`**: İndirilen NPM paketlerini içerir; `.gitignore` ile GitHub'a gitmez.
- **`tsconfig*.json`**: TypeScript derleyici ayarlarını ve tip kontrol kurallarını belirler.
- **`vite.config.ts`**: Vite yapılandırmasını ve `@vitejs/plugin-react` eklentisini barındırır.
- **`index.html`**: React uygulamasının bağlandığı tek HTML dosyasıdır; içinde `<div id="root"></div>` yer alır.
- **`src/main.tsx`**: React uygulamasını başlatır ve `App` ana bileşenini DOM'daki `root` alanına çizer.
- **`src/App.tsx`**: Uygulamanın ana bileşenidir; 5 sayfayı (`useState` ile) ve tüm arayüzü yönetir.
- **`src/App.css`**: Uygulamanın CSS stillerini ve öğrenciye özel renk/font değişkenlerini barındırır.
- **`src/index.css`**: Tüm sayfaya genel stil dosyasıdır; Vite varsayılan temasını sıfırlamak için bu sprintte boştur.
- **`public/`**: `afis.svg` gibi derlenmeden doğrudan sunulacak statik dosyaları içerir.
