import { events } from "./data.js";

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

const container = document.querySelector("#detay");
const sayfaBaslik = document.querySelector("#detay-baslik");

if (container) {
  const id = new URLSearchParams(location.search).get("id");
  const event = events.find((e) => e.id === id);

  if (!event) {
    // ADIM 8: Bulamazsa hata kutusu + "Listeye dön" (Konsolda kırmızı hata yok)
    if (sayfaBaslik) sayfaBaslik.textContent = "Etkinlik Bulunamadı";
    document.title = "Etkinlik Bulunamadı - Kampüs Etkinlikleri";

    container.className = "mesaj-hata-kutu";
    container.innerHTML = `
      <div class="hata-icerik">
        <p class="hata-metin">"${id ? id : 'Geçersiz'}" numaralı bir etkinlik yok. Listeden bir etkinlik seçin.</p>
        <a href="etkinlikler.html" class="buton-birincil">← Listeye dön</a>
      </div>
    `;
  } else {
    // ADIM 8 & 11: Bulursa başlık, sekme adı, künye ve "Bu etkinliği güncelle" linki
    document.title = `${event.title} - Kampüs Etkinlikleri`;
    if (sayfaBaslik) sayfaBaslik.textContent = event.title;

    container.className = "detay-kapsayici";
    const formattedDate = formatTurkishDate(event.date);

    container.innerHTML = `
      <figure>
        <img src="afis.jpg" alt="${event.title} afişi">
        <figcaption>${event.title} afişi</figcaption>
      </figure>

      <div class="detay-bilgi">
        <h3>Etkinlik Künyesi</h3>
        <dl>
          <dt>Tarih</dt>
          <dd>${formattedDate}, ${event.time}</dd>

          <dt>Yer</dt>
          <dd>${event.location}</dd>

          <dt>Kategori</dt>
          <dd>${event.category}</dd>

          <dt>Kontenjan</dt>
          <dd>${event.capacity} kişi</dd>
        </dl>

        <h3>Açıklama</h3>
        <p class="aciklama">${event.description}</p>

        <div class="detay-aksiyonlar">
          <a href="etkinlikler.html" class="buton-ikincil">← Listeye dön</a>
          <a href="etkinlik-guncelle.html?id=${event.id}" class="buton-birincil">Bu etkinliği güncelle</a>
        </div>
      </div>
    `;
  }
}
