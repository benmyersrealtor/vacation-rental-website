import Image from "next/image";

const mobileLinks = [
  { href: "/#search", label: "Search" },
  { href: "/properties", label: "Properties" },
  { href: "/#destinations", label: "Areas" },
  { href: "https://myersrealtyinc.com/visitors-guide", label: "Visitors Guide", external: true },
  { href: "/#about-us", label: "About Us" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-[var(--line)] bg-white/95 backdrop-blur">
      <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6 lg:px-10">
        <div className="flex items-center justify-between gap-3">
          <a href="/" className="flex min-w-0 items-center gap-3">
            <Image
              src="/brand/myers-realty-logo.jpg"
              alt="Myers Realty, Inc."
              width={240}
              height={68}
              className="h-auto w-[148px] sm:w-[200px] lg:w-[220px]"
              priority
            />
          </a>

          <nav className="hidden gap-7 text-sm font-medium text-[var(--muted)] md:flex">
            <a href="/#search" className="hover:text-[var(--brand)]">Search</a>
            <a href="/properties" className="hover:text-[var(--brand)]">Properties</a>
            <a href="/#destinations" className="hover:text-[var(--brand)]">Areas</a>
            <a
              href="https://myersrealtyinc.com/visitors-guide"
              target="_blank"
              rel="noreferrer"
              className="hover:text-[var(--brand)]"
            >
              Visitors Guide
            </a>
            <a href="/#about-us" className="hover:text-[var(--brand)]">About Us</a>
          </nav>

          <a
            href="/#search"
            className="hidden rounded-full bg-[var(--brand)] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[var(--brand-deep)] md:inline-flex"
          >
            Check Availability
          </a>
        </div>

        <div className="mt-3 flex gap-2 overflow-x-auto pb-1 md:hidden">
          {mobileLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.external ? "_blank" : undefined}
              rel={link.external ? "noreferrer" : undefined}
              className="shrink-0 rounded-full border border-[var(--line)] bg-[var(--mist)] px-3 py-2 text-xs font-semibold text-[var(--brand-deep)]"
            >
              {link.label}
            </a>
          ))}
        </div>

        <a
          href="/#search"
          className="mt-3 block rounded-2xl bg-[var(--brand)] px-4 py-3 text-center text-sm font-semibold text-white shadow-sm transition hover:bg-[var(--brand-deep)] md:hidden"
        >
          Check Availability
        </a>
      </div>
    </header>
  );
}
