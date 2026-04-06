import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { properties } from "@/lib/properties";

const pillFilters = ["Oceanfront", "Pool", "Pet-friendly", "Elevator", "Hot tub"];
const sortOptions = ["Most popular", "Price low to high", "Newest", "Oceanfront first"];

export default function PropertiesPage() {
  return (
    <div className="min-h-screen bg-[var(--sand)] text-[var(--ink)]">
      <SiteHeader />
      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-12 lg:px-10">
        <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--brand)]">Properties</p>
            <h1 className="mt-2 text-3xl font-semibold text-[var(--brand-deep)] sm:text-4xl">Browse vacation rentals</h1>
          </div>
          <p className="max-w-2xl text-sm leading-6 text-[var(--muted)]">
            Prototype search results page for Vercel preview. This is where filtered RealTime Rental inventory would land once API integration begins.
          </p>
        </div>

        <div className="mb-8 rounded-[24px] border border-[var(--line)] bg-white/96 p-4 shadow-sm backdrop-blur sm:rounded-[28px] sm:p-6">
          <div className="grid gap-3 md:grid-cols-4 md:gap-4">
            <label className="min-w-0 space-y-2 text-sm font-medium text-[var(--muted-dark)]">
              Arrival
              <input className="field field-compact" defaultValue="2026-06-20" type="date" aria-label="Arrival" />
            </label>
            <label className="min-w-0 space-y-2 text-sm font-medium text-[var(--muted-dark)]">
              Departure
              <input className="field field-compact" defaultValue="2026-06-27" type="date" aria-label="Departure" />
            </label>
            <label className="min-w-0 space-y-2 text-sm font-medium text-[var(--muted-dark)]">
              Guests
              <select className="field" defaultValue="8" aria-label="Guests">
                <option>2</option>
                <option>4</option>
                <option>6</option>
                <option>8</option>
                <option>10+</option>
              </select>
            </label>
            <div className="flex items-end">
              <button className="w-full rounded-2xl bg-[var(--brand)] px-4 py-3 text-sm font-semibold text-white hover:bg-[var(--brand-deep)]">Update search</button>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {pillFilters.map((filter) => (
              <button
                key={filter}
                className="rounded-full border border-[var(--line)] bg-[var(--mist)] px-3 py-2 text-xs font-semibold text-[var(--brand-deep)] transition hover:border-[var(--brand)] hover:bg-white"
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-6 flex flex-col gap-3 rounded-[24px] border border-[var(--line)] bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between sm:rounded-[28px] sm:p-5">
          <p className="text-sm font-semibold text-[var(--brand-deep)]">{properties.length} properties found</p>
          <div className="flex items-center gap-3">
            <label htmlFor="sort" className="text-sm font-medium text-[var(--muted)]">Sort by</label>
            <select id="sort" className="field max-w-[220px] py-3 text-sm" defaultValue="Most popular">
              {sortOptions.map((option) => (
                <option key={option}>{option}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[0.78fr_1.22fr]">
          <aside className="hidden rounded-[24px] border border-[var(--line)] bg-white p-5 shadow-sm sm:rounded-[28px] sm:p-6 lg:block">
            <h2 className="text-xl font-semibold text-[var(--brand-deep)]">Filters</h2>
            <div className="mt-5 space-y-5 text-sm text-[var(--muted)]">
              <div>
                <p className="font-semibold text-[var(--brand-deep)]">Area</p>
                <div className="mt-3 space-y-2">
                  <label className="flex items-center gap-2"><input type="checkbox" defaultChecked /> Surf City</label>
                  <label className="flex items-center gap-2"><input type="checkbox" defaultChecked /> North Topsail Beach</label>
                  <label className="flex items-center gap-2"><input type="checkbox" defaultChecked /> Topsail Beach</label>
                </div>
              </div>
              <div>
                <p className="font-semibold text-[var(--brand-deep)]">Property features</p>
                <div className="mt-3 space-y-2">
                  {pillFilters.map((filter) => (
                    <label key={filter} className="flex items-center gap-2">
                      <input type="checkbox" /> {filter}
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          <section className="space-y-5">
            {properties.map((property) => (
              <article
                key={property.id}
                className="group grid overflow-hidden rounded-[24px] border border-[var(--line)] bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl sm:rounded-[28px] md:grid-cols-[280px_1fr] lg:grid-cols-[320px_1fr]"
              >
                <div className="relative min-h-[240px] bg-cover bg-center sm:min-h-[260px]" style={{ backgroundImage: `url(${property.image})` }}>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-black/5 to-transparent" />
                  <div className="absolute left-4 top-4 flex items-center gap-2">
                    <span className="rounded-full bg-white/92 px-3 py-1 text-xs font-semibold text-[var(--brand-deep)] shadow-sm">
                      {property.badge}
                    </span>
                  </div>
                  <button className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full bg-white/92 text-lg text-[var(--brand-deep)] shadow-sm transition hover:scale-105">
                    ♡
                  </button>
                  <div className="absolute bottom-4 left-4 rounded-full bg-[var(--brand-deep)]/88 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm">
                    {property.tag}
                  </div>
                </div>

                <div className="p-5 sm:p-6">
                  <div className="flex flex-wrap items-start justify-between gap-3 border-b border-[var(--line)] pb-4">
                    <div>
                      <h2 className="text-xl font-semibold text-[var(--brand-deep)] sm:text-2xl">{property.name}</h2>
                      <p className="mt-2 text-sm text-[var(--muted)]">{property.location}</p>
                    </div>
                    <div className="text-left sm:text-right">
                      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--muted)]">Starting at</p>
                      <p className="mt-1 text-2xl font-semibold text-[var(--brand-deep)]">{property.price}</p>
                      <p className="text-xs text-[var(--muted)]">per night</p>
                    </div>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2 text-sm text-[var(--muted-dark)]">
                    <span className="chip">{property.beds} bedrooms</span>
                    <span className="chip">{property.baths} baths</span>
                    <span className="chip">Sleeps {property.sleeps}</span>
                    <span className="chip">{property.area}</span>
                  </div>

                  <p className="mt-5 text-sm leading-6 text-[var(--muted)]">{property.summary}</p>

                  <div className="mt-5 border-t border-[var(--line)] pt-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--muted)]">Highlighted amenities</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {property.amenities.map((amenity) => (
                        <span key={amenity} className="rounded-full border border-[var(--line)] bg-[var(--mist)] px-3 py-1.5 text-xs font-semibold text-[var(--brand-deep)]">
                          {amenity}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                    <a
                      href={`/properties/${property.slug}`}
                      className="rounded-2xl bg-[var(--brand)] px-5 py-3 text-center text-sm font-semibold text-white hover:bg-[var(--brand-deep)]"
                    >
                      View property
                    </a>
                    <button className="rounded-2xl border border-[var(--line)] px-5 py-3 text-sm font-semibold text-[var(--brand-deep)] hover:bg-[var(--mist)]">
                      Check dates
                    </button>
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
