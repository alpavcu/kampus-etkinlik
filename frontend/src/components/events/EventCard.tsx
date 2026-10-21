import type { CampusEvent } from "../../types/campus-event";
import { formatDate } from "../../utils/format-date";

interface EventCardProps {
  event: CampusEvent;
  onShowDetail: (id: string) => void;
}

export default function EventCard({ event, onShowDetail }: EventCardProps) {
  return (
    <article className="kart">
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
        onClick={() => onShowDetail(event.id)}
      >
        Detayları gör
      </button>
    </article>
  );
}
