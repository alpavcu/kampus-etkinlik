import { useState, useEffect } from "react";
import "./App.css";
import type { PageName } from "./types/page";
import type { Category } from "./types/campus-event";
import { events } from "./data/events";
import { searchEvents, filterByCategory, findEventById } from "./utils/filter-events";
import Header from "./components/layout/Header";
import Navigation from "./components/layout/Navigation";
import Footer from "./components/layout/Footer";
import EventList from "./components/events/EventList";
import EventFilter from "./components/events/EventFilter";
import EventDetail from "./components/events/EventDetail";
import EventForm from "./components/forms/EventForm";

export function App() {
  const [page, setPage] = useState<PageName>("home");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [searchText, setSearchText] = useState("");
  const [category, setCategory] = useState<Category | "">("");

  const go = (next: PageName, id: string | null = null) => { setPage(next); setSelectedId(id); window.scrollTo(0, 0); };

  const selectedEvent = selectedId ? findEventById(events, selectedId) : undefined;
  const upcoming = [...events].slice(0, 2);
  const filtered = filterByCategory(searchEvents(events, searchText), category);
  const categories: Category[] = [...new Set(events.map((e) => e.category))] as Category[];

  const titles: Record<PageName, string> = {
    home: "Kampüs Etkinlikleri", events: "Tüm Etkinlikler", detail: selectedEvent ? selectedEvent.title : "Etkinlik Detayı", add: "Etkinlik Ekle", update: "Etkinlik Güncelle",
  };

  useEffect(() => {
    const docTitles: Record<PageName, string> = {
      home: "Kampüs Etkinlikleri — Ana Sayfa", events: "Kampüs Etkinlikleri — Tüm Etkinlikler",
      detail: selectedEvent ? `Kampüs Etkinlikleri — ${selectedEvent.title}` : "Kampüs Etkinlikleri — Etkinlik Bulunamadı",
      add: "Kampüs Etkinlikleri — Etkinlik Ekle", update: "Kampüs Etkinlikleri — Etkinlik Güncelle",
    };
    document.title = docTitles[page];
  }, [page, selectedEvent]);

  return (
    <>
      <Header title={titles[page]} />
      <Navigation current={page} onNavigate={go} />
      <main>
        {page === "home" && (
          <section>
            <p>Fakültedeki seminer, atölye ve söyleşileri tek yerden takip edin.</p>
            <h2>Yaklaşan 2 Etkinlik</h2>
            <section className="etkinlik-izgara etkinlik-izgara-2"><EventList events={upcoming} onShowDetail={(id) => go("detail", id)} /></section>
            <p><button type="button" className="tum-etkinlikler-link" onClick={() => go("events")}>Tüm etkinlikleri gör →</button></p>
          </section>
        )}
        {page === "events" && (
          <section>
            <h2>Tüm Kampüs Etkinlikleri</h2>
            <EventFilter searchText={searchText} category={category} categories={categories} onSearchChange={setSearchText} onCategoryChange={setCategory} />
            <p id="sonuc">{filtered.length > 0 ? `${filtered.length} etkinlik listeleniyor.` : "Aramanıza uygun etkinlik bulunamadı."}</p>
            <section className="etkinlik-izgara etkinlik-izgara-3">
              <EventList events={filtered} onShowDetail={(id) => go("detail", id)} />
            </section>
          </section>
        )}
        {page === "detail" && (
          <section>
            {!selectedEvent ? (
              <div className="mesaj-hata-kutu">
                <p className="hata-metin">Seçilen etkinlik bulunamadı. Listeden bir etkinlik seçin.</p>
                <button type="button" className="buton-birincil" onClick={() => go("events")}>← Listeye dön</button>
              </div>
            ) : (
              <EventDetail event={selectedEvent} onBack={() => go("events")} onEdit={(id) => go("update", id)} />
            )}
          </section>
        )}
        {(page === "add" || page === "update") && (
          <div className="form-kapsayici">
            <h2>{page === "add" ? "Etkinlik Ekle" : "Etkinlik Güncelle"}</h2>
            <p className="form-bilgi">Bu sprintte form sadece görünüm; kayıt yapılmaz.</p>
            <EventForm submitLabel={page === "add" ? "Kaydet" : "Güncelle"} onSubmit={() => {}} />
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}

export default App;
