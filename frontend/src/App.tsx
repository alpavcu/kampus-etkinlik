import { useState, useEffect } from "react";
import "./App.css";
import type { CampusEvent, Category } from "./types/campus-event";
import { events } from "./data/events";
import {
  searchEvents,
  filterByCategory,
  findEventById,
} from "./utils/filter-events";

type PageName = "home" | "events" | "detail" | "add" | "update";

function parseEventDate(dateStr: string): number {
  const parts = dateStr.split("-");
  if (parts.length === 3) {
    return new Date(
      parseInt(parts[2], 10),
      parseInt(parts[1], 10) - 1,
      parseInt(parts[0], 10)
    ).getTime();
  }
  return new Date(dateStr).getTime();
}

function formatDate(dateStr: string): string {
  const parts = dateStr.split("-");
  if (parts.length === 3) {
    const d = new Date(
      parseInt(parts[2], 10),
      parseInt(parts[1], 10) - 1,
      parseInt(parts[0], 10)
    );
    return d.toLocaleDateString("tr-TR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  }
  return dateStr;
}

export function App() {
  const [page, setPage] = useState<PageName>("home");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [searchText, setSearchText] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<Category | "">("");

  function go(next: PageName, id: string | null = null) {
    setPage(next);
    setSelectedId(id);
    window.scrollTo(0, 0);
  }

  // ADIM 11: Side-effect ile sekme başlığını güncelleme
  useEffect(() => {
    if (page === "home") {
      document.title = "Kampüs Etkinlikleri — Ana Sayfa";
    } else if (page === "events") {
      document.title = "Kampüs Etkinlikleri — Tüm Etkinlikler";
    } else if (page === "detail") {
      const selected = selectedId
        ? findEventById(events, selectedId)
        : undefined;
      document.title = selected
        ? `Kampüs Etkinlikleri — ${selected.title}`
        : "Kampüs Etkinlikleri — Etkinlik Bulunamadı";
    } else if (page === "add") {
      document.title = "Kampüs Etkinlikleri — Etkinlik Ekle";
    } else if (page === "update") {
      document.title = "Kampüs Etkinlikleri — Etkinlik Güncelle";
    }
  }, [page, selectedId]);

  // ADIM 9: Ana sayfa için en yakın 2 etkinlik
  const upcoming = [...events]
    .sort((a, b) => parseEventDate(a.date) - parseEventDate(b.date))
    .slice(0, 2);

  // ADIM 10: Etkinlikler sayfası için arama ve kategori filtreleme
  const filtered = filterByCategory(
    searchEvents(events, searchText),
    selectedCategory
  );
  const categories: Category[] = [
    ...new Set(events.map((e) => e.category)),
  ] as Category[];

  // ADIM 12: Detay sayfası için seçili etkinlik
  const selectedEvent = selectedId
    ? findEventById(events, selectedId)
    : undefined;

  // Ortak kart bileşeni fonksiyonu (Slide 9 & 12)
  function renderCard(event: CampusEvent) {
    return (
      <article className="kart" key={event.id}>
        <h3>{event.title}</h3>
        <p className="kategori">{event.category}</p>
        <p className="tarih">
          Tarih: {formatDate(event.date)}, {event.time}
        </p>
        <p className="yer">Yer: {event.location}</p>
        <p className="kontenjan">Kontenjan: {event.capacity} kişi</p>
        <p className="aciklama">{event.description}</p>
        <button
          type="button"
          className="detay-link"
          onClick={() => go("detail", event.id)}
        >
          Detayları gör
        </button>
      </article>
    );
  }

  const navItems: { id: PageName; label: string }[] = [
    { id: "home", label: "Ana Sayfa" },
    { id: "events", label: "Etkinlikler" },
    { id: "add", label: "Ekle" },
  ];

  return (
    <>
      <header className="site-baslik">
        <h1>
          {page === "home" && "Kampüs Etkinlikleri"}
          {page === "events" && "Tüm Etkinlikler"}
          {page === "detail" && (selectedEvent ? selectedEvent.title : "Etkinlik Detayı")}
          {page === "add" && "Etkinlik Ekle"}
          {page === "update" && "Etkinlik Güncelle"}
        </h1>
        <nav className="menu" aria-label="Ana Menü">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              aria-current={page === item.id ? "page" : undefined}
              onClick={(e) => {
                e.preventDefault();
                go(item.id);
              }}
            >
              {item.label}
            </a>
          ))}
        </nav>
      </header>

      <main>
        {/* 1. SAYFA: ANA SAYFA */}
        {page === "home" && (
          <section>
            <p>Fakültedeki seminer, atölye ve söyleşileri tek yerden takip edin.</p>
            <h2>Yaklaşan 2 Etkinlik</h2>
            <section className="etkinlik-izgara etkinlik-izgara-2">
              {upcoming.map(renderCard)}
            </section>
            <p>
              <button
                type="button"
                className="tum-etkinlikler-link"
                onClick={() => go("events")}
              >
                Tüm etkinlikleri gör →
              </button>
            </p>
          </section>
        )}

        {/* 2. SAYFA: ETKİNLİKLER */}
        {page === "events" && (
          <section>
            <h2>Tüm Kampüs Etkinlikleri</h2>

            <form
              id="filtre-formu"
              className="filtre"
              onSubmit={(e) => e.preventDefault()}
            >
              <div className="filtre-grup">
                <label htmlFor="arama">Etkinlik ara</label>
                <input
                  type="search"
                  id="arama"
                  placeholder="atölye, kariyer..."
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                />
              </div>

              <div className="filtre-grup">
                <label htmlFor="kategori-filtre">Kategori</label>
                <select
                  id="kategori-filtre"
                  value={selectedCategory}
                  onChange={(e) =>
                    setSelectedCategory(e.target.value as Category | "")
                  }
                >
                  <option value="">Tümü</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
            </form>

            <p id="sonuc">
              {filtered.length > 0
                ? `${filtered.length} etkinlik listeleniyor.`
                : "Aramanıza uygun etkinlik bulunamadı."}
            </p>

            <section className="etkinlik-izgara etkinlik-izgara-3">
              {filtered.map(renderCard)}
            </section>
          </section>
        )}

        {/* 3. SAYFA: ETKİNLİK DETAYI */}
        {page === "detail" && (
          <section>
            {!selectedEvent ? (
              <div className="mesaj-hata-kutu">
                <p className="hata-metin">
                  Seçilen etkinlik bulunamadı. Listeden bir etkinlik seçin.
                </p>
                <button
                  type="button"
                  className="buton-birincil"
                  onClick={() => go("events")}
                >
                  ← Listeye dön
                </button>
              </div>
            ) : (
              <article className="detay-kapsayici">
                {selectedEvent.image && (
                  <figure>
                    <img
                      src={selectedEvent.image}
                      alt={`${selectedEvent.title} afişi`}
                    />
                    <figcaption>{selectedEvent.title} afişi</figcaption>
                  </figure>
                )}

                <div className="detay-bilgi">
                  <h3>Etkinlik Künyesi</h3>
                  <dl>
                    <dt>Tarih</dt>
                    <dd>
                      {formatDate(selectedEvent.date)}, {selectedEvent.time}
                    </dd>

                    <dt>Yer</dt>
                    <dd>{selectedEvent.location}</dd>

                    <dt>Kategori</dt>
                    <dd>{selectedEvent.category}</dd>

                    <dt>Kontenjan</dt>
                    <dd>{selectedEvent.capacity} kişi</dd>
                  </dl>

                  <h3>Açıklama</h3>
                  <p className="aciklama">{selectedEvent.description}</p>

                  <div className="detay-aksiyonlar">
                    <button
                      type="button"
                      className="buton-ikincil"
                      onClick={() => go("events")}
                    >
                      ← Listeye dön
                    </button>
                    <button
                      type="button"
                      className="buton-birincil"
                      onClick={() => go("update", selectedEvent.id)}
                    >
                      Bu etkinliği güncelle
                    </button>
                  </div>
                </div>
              </article>
            )}
          </section>
        )}

        {/* 4 & 5. SAYFALAR: EKLE VE GÜNCELLE (Adım 13: Form sadece görünüm) */}
        {(page === "add" || page === "update") && (
          <div className="form-kapsayici">
            <h2>{page === "add" ? "Etkinlik Ekle" : "Etkinlik Güncelle"}</h2>
            <p className="form-bilgi">
              Bu sprintte form sadece görünüm; kayıt yapılmaz.
            </p>

            <form className="form" onSubmit={(e) => e.preventDefault()}>
              <div className="form-grup">
                <label htmlFor="title">Etkinlik Adı</label>
                <input
                  id="title"
                  placeholder="Örn. Kariyer Günleri 2026"
                  maxLength={80}
                />
              </div>

              <div className="form-grup">
                <label htmlFor="category">Kategori</label>
                <select id="category" defaultValue="">
                  <option value="" disabled>
                    Seçiniz
                  </option>
                  <option value="Seminer">Seminer</option>
                  <option value="Atölye">Atölye</option>
                  <option value="Söyleşi">Söyleşi</option>
                  <option value="Yarışma">Yarışma</option>
                </select>
              </div>

              <div className="form-grup">
                <label htmlFor="date">Tarih</label>
                <input id="date" type="date" />
              </div>

              <div className="form-grup">
                <label htmlFor="time">Saat</label>
                <input id="time" type="time" />
              </div>

              <div className="form-grup">
                <label htmlFor="location">Yer</label>
                <input
                  id="location"
                  placeholder="Örn. A Blok Konferans Salonu"
                />
              </div>

              <div className="form-grup">
                <label htmlFor="capacity">Kontenjan</label>
                <input
                  id="capacity"
                  type="number"
                  placeholder="1–1000 arası"
                />
              </div>

              <div className="form-grup">
                <label htmlFor="description">Açıklama</label>
                <textarea
                  id="description"
                  rows={5}
                  placeholder="Etkinlik açıklaması..."
                />
              </div>

              <button type="submit" className="buton-birincil">
                {page === "add" ? "Kaydet" : "Güncelle"}
              </button>
            </form>
          </div>
        )}
      </main>

      <footer>
        <p>Alp Avcu — 2121032744 · 2026</p>
      </footer>
    </>
  );
}

export default App;
