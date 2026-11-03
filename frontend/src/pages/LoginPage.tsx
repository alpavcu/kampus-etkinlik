import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [sent, setSent] = useState(false);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const found: { email?: string; password?: string } = {};

    if (!email.includes("@")) {
      found.email = "Geçerli bir e-posta girin.";
    }
    if (password.length < 6) {
      found.password = "Şifre en az 6 karakter olmalı.";
    }

    setErrors(found);
    setSent(Object.keys(found).length === 0);
  }

  return (
    <div className="form-kapsayici">
      <h2>Giriş Yap</h2>

      {sent && (
        <p className="mesaj mesaj-basari">Gerçek giriş Sprint 10'da</p>
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
            aria-invalid={errors.email ? true : undefined}
          />
          {errors.email && <span className="hata-metni">{errors.email}</span>}
        </div>

        <div className="form-grup">
          <label htmlFor="password">Şifre</label>
          <input
            id="password"
            name="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••"
            aria-invalid={errors.password ? true : undefined}
          />
          {errors.password && <span className="hata-metni">{errors.password}</span>}
        </div>

        <button type="submit" className="buton-birincil">
          Giriş yap
        </button>
      </form>

      <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "0.5rem", marginTop: "var(--bosluk-m)" }}>
        <Link to="/forgot-password">Şifremi unuttum</Link>
        <Link to="/register">Hesabın yok mu? Kayıt ol</Link>
      </div>
    </div>
  );
}
