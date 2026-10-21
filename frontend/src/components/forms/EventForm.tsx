import type { FormEvent } from "react";

interface EventFormProps {
  submitLabel?: string;
  onSubmit: () => void;
}

export default function EventForm({
  submitLabel = "Kaydet",
  onSubmit,
}: EventFormProps) {
  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    onSubmit();
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
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
        {submitLabel}
      </button>
    </form>
  );
}
