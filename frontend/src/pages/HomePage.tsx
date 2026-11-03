import { Link } from "react-router-dom";
import { useEvents } from "../context/EventsContext";
import EventList from "../components/events/EventList";

export default function HomePage() {
  const { events } = useEvents();
  const upcoming = [...events]
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(0, 2);

  return (
    <section>
      <h2 className="bolum-baslik">Yaklaşan 2 Etkinlik</h2>
      <section className="etkinlik-izgara etkinlik-izgara-2">
        <EventList events={upcoming} />
      </section>
      <p>
        <Link className="tum-etkinlikler-link buton" to="/events">
          Tüm etkinlikleri gör →
        </Link>
      </p>
    </section>
  );
}
