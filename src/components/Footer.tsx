const links = [
  { label: "01 GitHub", href: "#" },
  { label: "02 LinkedIn", href: "#" },
  { label: "03 Twitter", href: "#" },
];

export default function Footer() {
  return (
    <footer
      className="flex items-center justify-between px-10 py-8 max-w-[1400px] mx-auto flex-wrap gap-4"
      style={{ borderTop: "1px solid var(--border)" }}
    >
      {" "}
      <div></div>{" "}
      <span
        style={{
          fontFamily: "DM Mono, monospace",
          fontSize: "11px",
          fontWeight: 300,
          color: "var(--text-dim)",
          letterSpacing: "0.06em",
        }}
      >
        &copy; 2026 J.M. Njuguna. All rights reserved.
      </span>
      <ul className="flex-col gap-8 list-none">
        {links.map((link) => (
          <li key={link.label}>
            <a
              href={link.href}
              className="no-underline transition-colors duration-200"
              style={{
                fontFamily: "DM Mono, monospace",
                fontSize: "11px",
                fontWeight: 300,
                color: "var(--text-dim)",
                letterSpacing: "0.06em",
              }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLElement).style.color = "var(--text)")
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLElement).style.color =
                  "var(--text-dim)")
              }
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </footer>
  );
}
