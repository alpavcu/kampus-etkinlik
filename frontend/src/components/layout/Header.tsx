interface HeaderProps {
  title?: string;
  text?: string;
}

export default function Header({
  title = "Kampüs Etkinlikleri",
  text = "Fakültedeki seminer, atölye ve söyleşileri tek yerden takip edin.",
}: HeaderProps = {}) {
  return (
    <header className="site-baslik">
      <h1>{title}</h1>
      {text && <p>{text}</p>}
    </header>
  );
}
