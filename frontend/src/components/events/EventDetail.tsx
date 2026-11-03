import { Link } from "react-router-dom";
import type { CampusEvent } from "../../types/campus-event";
import { formatDate } from "../../utils/format-date";

interface EventDetailProps {
  event: CampusEvent;
}

export default function EventDetail({ event }: EventDetailProps) {
  return (
    <article className="detay-kapsayici">
      {event.image && (
        <figure>
          <img
            src={event.image}
            alt={`${event.title} afişi`}
          />
          <figcaption>{event.title} afişi</figcaption>
        </figure>
      )}

      <div className="detay-bilgi">
        <h3>Etkinlik Künyesi</h3>
        <dl>
          <dt>Tarih</dt>
          <dd>
            {formatDate(event.date)}, {event.time}
          </dd>

          <dt>Yer</dt>
          <dd>{event.location}</dd>

          <dt>Kategori</dt>
          <dd>{event.category}</dd>

          <dt>Kontenjan</dt>
          <dd>{event.capacity} kişi</dd>
        </dl>

        <h3>Açıklama</h3>
        <p className="aciklama">{event.description}</p>

        <div className="detay-aksiyonlar">
          <Link to="/events" className="buton-ikincil">
            ← Listeye dön
          </Link>
          <Link to={`/admin/${event.id}/edit`} className="buton-birincil">
            Bu etkinliği güncelle
          </Link>
        </div>
      </div>
    </article>
  );
}
