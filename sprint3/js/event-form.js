import { events } from "./data.js";

// GG-AA-YYYY tarih formatını input[type="date"] için YYYY-MM-DD formatına çevirme
function toInputDateFormat(dateStr) {
  if (!dateStr) return "";
  const parts = dateStr.split("-");
  if (parts.length === 3 && parts[2].length === 4) {
    return `${parts[2]}-${parts[1].padStart(2, "0")}-${parts[0].padStart(2, "0")}`;
  }
  return dateStr;
}

const form = document.querySelector("#etkinlik-formu");
const formMesaj = document.querySelector("#form-mesaj");

if (form) {
  const isGuncelleMode = form.dataset.mode === "guncelle";
  let targetEvent = null;

  // ADIM 11: Güncelleme sayfası kontrolü
  if (isGuncelleMode) {
    const id = new URLSearchParams(location.search).get("id");
    targetEvent = events.find((e) => e.id === id);

    if (targetEvent) {
      // Alanları mevcut etkinliğin verileriyle doldur
      if (form.elements.ad) form.elements.ad.value = targetEvent.title || "";
      if (form.elements.kategori) form.elements.kategori.value = targetEvent.category || "";
      if (form.elements.tarih) form.elements.tarih.value = toInputDateFormat(targetEvent.date) || "";
      if (form.elements.saat) form.elements.saat.value = targetEvent.time || "";
      if (form.elements.yer) form.elements.yer.value = targetEvent.location || "";
      if (form.elements.kontenjan) form.elements.kontenjan.value = targetEvent.capacity || "";
      if (form.elements.aciklama) form.elements.aciklama.value = targetEvent.description || "";
    } else {
      // id yoksa veya etkinlik bulunamazsa formu gösterme; uyarı + "Etkinliklere git"
      form.outerHTML = `
        <div class="mesaj-hata-kutu">
          <p class="hata-metin">Güncellenecek etkinlik seçilmedi. Önce listeden bir etkinlik seçin, detay sayfasındaki "Bu etkinliği güncelle" butonunu kullanın.</p>
          <a href="etkinlikler.html" class="buton-birincil">Etkinliklere git</a>
        </div>
      `;
    }
  }

  // ADIM 9 & 10: Form gönderimi, doğrulama ve mesajlar
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const fd = new FormData(form);
    const title = (fd.get("ad") || "").trim();
    const category = fd.get("kategori") || "";
    const date = fd.get("tarih") || "";
    const time = fd.get("saat") || "";
    const locationVal = (fd.get("yer") || "").trim();
    const capacityRaw = fd.get("kontenjan");
    const capacity = capacityRaw ? Number(capacityRaw) : null;
    const description = (fd.get("aciklama") || "").trim();

    // Veri nesnesi (Adlar data.js gibi İngilizce)
    const data = {
      id: isGuncelleMode && targetEvent ? targetEvent.id : `event-${events.length + 1}`,
      title,
      category,
      date,
      time,
      location: locationVal,
      capacity,
      description
    };

    // ADIM 10: Doğrulama kuralları
    const errors = {};

    // 1. Ad: 3 karakterden kısa
    if (title.length < 3) {
      errors.ad = "Etkinlik adı en az 3 karakter olmalı.";
    }

    // 2. Kategori: seçilmemiş
    if (!category) {
      errors.kategori = "Bir kategori seçin.";
    }

    // 3. Tarih: boş
    if (!date) {
      errors.tarih = "Tarih seçin.";
    }

    // 4. Saat: boş
    if (!time) {
      errors.saat = "Saat seçin.";
    }

    // 5. Yer: boş
    if (!locationVal) {
      errors.yer = "Yer bilgisini yazın.";
    }

    // 6. Kontenjan: girildiyse 1-1000 dışı
    if (capacity !== null && !isNaN(capacity)) {
      if (capacity < 1 || capacity > 1000) {
        errors.kontenjan = "Kontenjan 1–1000 arasında olmalı.";
      }
    }

    // Alanların hata durumunu güncelle / temizle
    const alanlar = ["ad", "kategori", "tarih", "saat", "yer", "kontenjan", "aciklama"];
    alanlar.forEach((alanAdi) => {
      const inputEl = form.elements[alanAdi];
      const hataEl = document.querySelector(`#${alanAdi}-hata`);

      if (inputEl) {
        if (errors[alanAdi]) {
          inputEl.setAttribute("aria-invalid", "true");
        } else {
          inputEl.removeAttribute("aria-invalid");
        }
      }

      if (hataEl) {
        hataEl.textContent = errors[alanAdi] || "";
      }
    });

    // Hata varsa durdur
    if (Object.keys(errors).length > 0) {
      if (formMesaj) {
        formMesaj.innerHTML = "";
      }
      return;
    }

    // Hata yoksa: yeşil kutuda başarı mesajı ve JSON nesnesi (localStorage yok)
    if (formMesaj) {
      const baslikMetni = isGuncelleMode
        ? "Etkinlik güncellendi (bu sprintte form veri güncellemez):"
        : "Etkinlik oluşturuldu (bu sprintte kaydedilmez):";

      formMesaj.innerHTML = `
        <div class="mesaj-basari-kutu">
          <p class="basari-metin"><strong>${baslikMetni}</strong></p>
          <pre>${JSON.stringify(data, null, 2)}</pre>
        </div>
      `;
    }

    console.log("Form verisi başarıyla üretildi:", data);
  });
}
