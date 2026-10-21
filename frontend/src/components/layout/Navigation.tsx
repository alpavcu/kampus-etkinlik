import type { PageName } from "../../types/page";

interface NavigationProps {
  current: PageName;
  onNavigate: (page: PageName) => void;
}

const navItems: { id: PageName; label: string }[] = [
  { id: "home", label: "Ana Sayfa" },
  { id: "events", label: "Etkinlikler" },
  { id: "add", label: "Ekle" },
];

export default function Navigation({ current, onNavigate }: NavigationProps) {
  return (
    <nav className="menu" aria-label="Ana Menü">
      {navItems.map((item) => (
        <a
          key={item.id}
          href={`#${item.id}`}
          aria-current={current === item.id ? "page" : undefined}
          onClick={(e) => {
            e.preventDefault();
            onNavigate(item.id);
          }}
        >
          {item.label}
        </a>
      ))}
    </nav>
  );
}
