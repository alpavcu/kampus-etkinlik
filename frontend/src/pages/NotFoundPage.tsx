import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <section className="sayfa-bulunamadi">
      <h2>Sayfa bulunamadı</h2>
      <p>Aradığınız sayfa ya da etkinlik yok.</p>
      <p>
        <Link to="/" className="buton-birincil">
          Ana sayfaya dön
        </Link>
      </p>
    </section>
  );
}
