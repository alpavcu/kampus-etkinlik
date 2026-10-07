import { events } from "./data.js";

// Tarihi "12 Ekim 2026" gibi okunur biçimlendiren yardımcı fonksiyon
function formatTurkishDate(dateStr) {
  const parts = dateStr.split("-");
  if (parts.length === 3) {
    const day = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1;
    const year = parseInt(parts[2], 10);
    const dateObj = new Date(year, month, day);
    return dateObj.toLocaleDateString("tr-TR", {
      day: "numeric",
      month: "long",
      year: "numeric"
    });
  }
  return dateStr;
}

// GG-AA-YYYY tarihini sıralama için Date nesnesine çevirme
function parseEventDate(dateStr) {
  const parts = dateStr.split("-");
  if (parts.length === 3) {
    return new Date(parseInt(parts[2], 10), parseInt(parts[1], 10) - 1, parseInt(parts[0], 10));
  }
  return new Date(dateStr);
}

// Bir etkinlikten kart üreten şablon fonksiyon
function createCard(event) {
  const formattedDate = formatTurkishDate(event.date);
  return `<article class="kart">
    <h3>${event.title}</h3>
    <p class="kategori">${event.category}</p>
    <p class="tarih">Tarih: ${formattedDate}, ${event.time}</p>
    <p class="yer">Yer: ${event.location}</p>
    <p class="kontenjan">Kontenjan: ${event.capacity} kişi</p>
    <p class="aciklama">${event.description}</p>
    <a href="etkinlik-detay.html?id=${event.id}" class="detay-link">Detayları gör</a>
  </article>`;
}

const list = document.querySelector("#etkinlik-listesi");

function render(dizi) {
  if (list) {
    list.innerHTML = dizi.map(createCard).join("");
  }
}

// Sayfa yüklendiğinde çalışacak ana akış
if (list) {
  // ADIM 5: Ana sayfa kontrolü (data-limit="2")
  if (list.dataset.limit) {
    const yaklasan = [...events]
      .sort((a, b) => parseEventDate(a.date) - parseEventDate(b.date))
      .slice(0, Number(list.dataset.limit));
    render(yaklasan);
  } else {
    // ADIM 4, 6 ve 7: Etkinlikler sayfası (hepsini listele + filtreleme)
    render(events);

    const aramaInput = document.querySelector("#arama");
    const kategoriSelect = document.querySelector("#kategori-filtre");
    const sonucSatiri = document.querySelector("#sonuc");
    const filtreFormu = document.querySelector("#filtre-formu");

    if (kategoriSelect) {
      // 1. Kategori seçeneklerini veriden dinamik üret (new Set)
      const kategoriler = [...new Set(events.map(e => e.category))];
      kategoriler.forEach(kat => {
        const option = document.createElement("option");
        option.value = kat;
        option.textContent = kat;
        kategoriSelect.appendChild(option);
      });
    }

    if (sonucSatiri) {
      sonucSatiri.textContent = `${events.length} etkinlik listeleniyor.`;
    }

    if (filtreFormu) {
      filtreFormu.addEventListener("submit", (e) => e.preventDefault());
    }

    function filtrele() {
      const aranan = aramaInput ? aramaInput.value.trim().toLocaleLowerCase("tr-TR") : "";
      const secilenKategori = kategoriSelect ? kategoriSelect.value : "";

      const sonuc = events.filter(e => {
        const titleMatch = e.title.toLocaleLowerCase("tr-TR").includes(aranan);
        const descMatch = e.description.toLocaleLowerCase("tr-TR").includes(aranan);
        const locMatch = e.location.toLocaleLowerCase("tr-TR").includes(aranan);
        const metinUyuyor = !aranan || (titleMatch || descMatch || locMatch);
        const kategoriUyuyor = !secilenKategori || e.category === secilenKategori;
        return metinUyuyor && kategoriUyuyor;
      });

      render(sonuc);

      if (sonucSatiri) {
        if (sonuc.length > 0) {
          sonucSatiri.textContent = `${sonuc.length} etkinlik listeleniyor.`;
        } else {
          sonucSatiri.textContent = "Aramanıza uygun etkinlik bulunamadı.";
        }
      }
    }

    if (aramaInput) {
      aramaInput.addEventListener("input", filtrele);
    }

    if (kategoriSelect) {
      kategoriSelect.addEventListener("change", filtrele);
    }
  }
}
