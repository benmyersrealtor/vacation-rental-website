import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { properties } from "@/lib/properties";

export default function PropertiesPage() {
  return (
    <div className="min-h-screen bg-[var(--sand)] text-[var(--ink)]">
      <SiteHeader />
      <main className="mx-auto max-w-7xl px-6 py-12 lg:px-10">
        <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--brand)]">Properties</p>
            <h1 className="mt-2 text-4xl font-semibold text-[var(--brand-deep)]">Browse vacation rentals</h1>
          </div>
          <p className="max-w-2xl text-sm leading-6 text-[var(--muted)]">
            Prototype search results page for Vercel preview. This is where filtered RealTime Rental inventory would land once API integration begins.
          </p>
        </div>

        <div className="mb-8 grid gap-4 rounded-[28px] border border-[var(--line)] bg-white p-6 shadow-sm md:grid-cols-4">
          <input className="field" defaultValue="June 20" aria-label="Arrival" />
          <input className="field" defaultValue="June 27" aria-label="Departure" />
          <input className="field" defaultValue="8 guests" aria-label="Guests" />
          <button className="rounded-2xl bg-[var(--brand)] px-4 py-3 text-sm font-semibold text-white hover:bg-[var(--brand-deep)]">Update search</button>
        </div>

        <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
          <aside className="rounded-[28px] border border-[var(--line)] bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-[var(--brand-deep)]">Filters</h2>
            <div className="mt-5 space-y-4 text-sm text-[var(--muted)]">
              <div>
                <p className="font-semibold text-[var(--brand-deep)]">Area</p>
                <div className="mt-2 space-y-2">
                  <label className="flex items-center gap-2"><input type="checkbox" defaultChecked /> Surf City</label>
                  <label className="flex items-center gap-2"><input type="checkbox" defaultChecked /> North Topsail Beach</label>
                  <label className="flex items-center gap-2"><input type="checkbox" defaultChecked /> Topsail Beach</label>
                </div>
              </div>
              <div>
                <p className="font-semibold text-[var(--brand-deep)]">Amenities</p>
                <div className="mt-2 space-y-2">
                  <label className="flex items-center gap-2"><input type="checkbox" /> Pool</label>
                  <label className="flex items-center gap-2"><input type="checkbox" /> Pet-friendly</label>
                  <label className="flex items-center gap-2"><input type="checkbox" /> Elevator</label>
                  <label className="flex items-center gap-2"><input type="checkbox" /> Oceanfront</label>
                </div>
              </div>
            </div>
          </aside>

          <section className="space-y-5">
            {properties.map((property) => (
              <article key={property.id} className="grid overflow-hidden rounded-[28px] border border-[var(--line)] bg-white shadow-sm md:grid-cols-[320px_1fr]">
                <div className="min-h-[240px] bg-cover bg-center" style={{ backgroundImage: `url(${property.image})` }} />
                <div className="p-6">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <span className="rounded-full bg-[var(--mist)] px-3 py-1 text-xs font-semibold text-[var(--brand)]">{property.tag}</span>
                    <span className="text-sm font-semibold text-[var(--brand-deep)]">From {property.price}/night</span>
                  </div>
                  <h2 className="mt-3 text-2xl font-semibold text-[var(--brand-deep)]">{property.name}</h2>
                  <p className="mt-2 text-sm text-[var(--muted)]">{property.location}</p>
                  <p className="mt-4 text-sm leading-6 text-[var(--muted)]">{property.summary}</p>
                  <div className="mt-4 flex flex-wrap gap-2 text-sm text-[var(--muted-dark)]">
                    <span className="chip">{property.beds} bedrooms</span>
                    <span className="chip">{property.baths} baths</span>
                    <span className="chip">Sleeps {property.sleeps}</span>
                  </div>
                  <div className="mt-6 flex flex-wrap gap-3">
                    <a href={`/properties/${property.slug}`} className="rounded-2xl bg-[var(--brand)] px-5 py-3 text-sm font-semibold text-white hover:bg-[var(--brand-deep)]">View property</a>
                    <button className="rounded-2xl border border-[var(--line)] px-5 py-3 text-sm font-semibold text-[var(--brand-deep)] hover:bg-[var(--mist)]">Check dates</button>
                  </div>
                </div>
              </article>
            ))}
          </section>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
