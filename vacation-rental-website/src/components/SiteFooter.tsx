import Image from "next/image";

export function SiteFooter() {
  return (
    <footer className="border-t border-[var(--line)] bg-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-12 lg:grid-cols-[1.2fr_0.8fr_0.8fr] lg:px-10">
        <div>
          <Image
            src="/brand/myers-realty-logo.jpg"
            alt="Myers Realty, Inc."
            width={220}
            height={62}
            className="h-auto w-[180px]"
          />
          <p className="mt-4 max-w-md text-sm leading-6 text-[var(--muted)]">
            Vacation rental expertise for Topsail Island, with a modern direct-booking experience layered on top of trusted local management.
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.22em] text-[var(--brand)]">Explore</h3>
          <div className="mt-4 space-y-3 text-sm text-[var(--muted)]">
            <a className="block hover:text-[var(--brand)]" href="/properties">Browse Properties</a>
            <a className="block hover:text-[var(--brand)]" href="/#destinations">Areas</a>
            <a className="block hover:text-[var(--brand)]" href="https://myersrealtyinc.com/visitors-guide" target="_blank" rel="noreferrer">Visitors Guide</a>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.22em] text-[var(--brand)]">Contact</h3>
          <div className="mt-4 space-y-3 text-sm text-[var(--muted)]">
            <p>Myers Realty, Inc.</p>
            <p>Surf City / Topsail Island, NC</p>
            <p>(Placeholder) Add office phone</p>
            <p>(Placeholder) Add booking email</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
