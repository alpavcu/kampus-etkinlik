import { useState } from "react";
import { useEvents } from "../context/EventsContext";
import type { Category } from "../types/campus-event";
import { searchEvents, filterByCategory } from "../utils/filter-events";
import EventFilter from "../components/events/EventFilter";
import EventList from "../components/events/EventList";

export default function EventsPage() {
  const { events } = useEvents();
  const [searchText, setSearchText] = useState("");
  const [category, setCategory] = useState<Category | "">("");

  const categories = [...new Set(events.map((e) => e.category))] as Category[];
  const filtered = filterByCategory(
    searchEvents(events, searchText),
    category
  );

  return (
    <section>
      <h2>Tüm Kampüs Etkinlikleri</h2>
      <EventFilter
        searchText={searchText}
        category={category}
        categories={categories}
        onSearchChange={setSearchText}
        onCategoryChange={setCategory}
      />
      <p id="sonuc">
        {filtered.length > 0
          ? `${filtered.length} etkinlik listeleniyor.`
          : "Aramanıza uygun etkinlik bulunamadı."}
      </p>
      <section className="etkinlik-izgara etkinlik-izgara-3">
        <EventList events={filtered} />
      </section>
    </section>
  );
}
