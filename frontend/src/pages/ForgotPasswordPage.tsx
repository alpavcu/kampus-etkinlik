import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const isOk = email.includes("@");
    if (!isOk) {
      setError("Geçerli bir e-posta girin.");
      setSent(false);
    } else {
      setError("");
      setSent(true);
    }
  }

  return (
    <div className="form-kapsayici">
      <h2>Şifremi Unuttum</h2>
      <p className="form-bilgi">
        Kayıtlı e-posta adresinizi yazın, şifre yenileme bağlantısı gönderelim.
      </p>

      {sent && (
        <p className="mesaj mesaj-basari">
          Bağlantı {email} adresine gönderildi (demo).
        </p>
      )}

      <form className="form" onSubmit={handleSubmit} noValidate>
        <div className="form-grup">
          <label htmlFor="email">E-posta</label>
          <input
            id="email"
            name="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="ornek@kampus.edu.tr"
            aria-invalid={error ? true : undefined}
          />
          {error && <span className="hata-metni">{error}</span>}
        </div>

        <button type="submit" className="buton-birincil">
          Bağlantı gönder
        </button>
      </form>

      <div style={{ marginTop: "var(--bosluk-m)" }}>
        <Link to="/login">← Girişe dön</Link>
      </div>
    </div>
  );
}
