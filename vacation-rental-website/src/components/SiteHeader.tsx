import Image from "next/image";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-[var(--line)] bg-white/92 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-4 lg:px-10">
        <a href="/" className="flex items-center gap-4">
          <Image
            src="/brand/myers-realty-logo.jpg"
            alt="Myers Realty, Inc."
            width={240}
            height={68}
            className="h-auto w-[170px] sm:w-[220px]"
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
          <a href="/#why" className="hover:text-[var(--brand)]">Why Book Direct</a>
          <a href="/#about-us" className="hover:text-[var(--brand)]">About Us</a>
        </nav>

        <a
          href="/#search"
          className="rounded-full bg-[var(--brand)] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[var(--brand-deep)]"
        >
          Check Availability
        </a>
      </div>
    </header>
  );
}
