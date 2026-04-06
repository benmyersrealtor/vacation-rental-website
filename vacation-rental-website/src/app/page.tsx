import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { properties } from "@/lib/properties";

const featuredProperties = properties.slice(0, 3);

const perks = [
  "Direct-booking experience connected to RealTime Rental inventory",
  "Fast property search with filters for beach access, pool, and pet-friendly stays",
  "Owner-trusted local management with Myers Realty’s existing market presence",
];

const destinations = [
  {
    name: "Surf City",
    description: "Family-friendly beach homes close to dining, the pier, and easy island access.",
  },
  {
    name: "North Topsail Beach",
    description: "Roomier homes, quieter stretches of sand, and strong appeal for extended stays.",
  },
  {
    name: "Topsail Beach",
    description: "Classic coastal feel with walkable charm and premium beachfront inventory.",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-[var(--sand)] text-[var(--ink)]">
      <SiteHeader />

      <main>
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(45,70,87,0.88),rgba(81,119,138,0.68))]" />
          <div
            className="absolute inset-0 bg-cover bg-center opacity-30"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=80')",
            }}
          />

          <div className="relative mx-auto grid max-w-7xl gap-10 px-6 py-20 lg:grid-cols-[1.2fr_0.8fr] lg:px-10 lg:py-28">
            <div className="max-w-2xl text-white">
              <p className="mb-4 text-sm font-semibold uppercase tracking-[0.32em] text-[var(--foam)]">
                Topsail Island Awaits
              </p>
              <h1 className="text-4xl font-semibold leading-tight sm:text-5xl">
                Your perfect beach escape starts here.
              </h1>
              <p className="mt-5 max-w-xl text-base leading-7 text-white/88 sm:text-lg">
                Topsail Island welcomes you with 27 miles of unspoiled beaches, gentle ocean breezes, and a relaxed
                coastal charm that makes every visit feel like coming home.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="/properties"
                  className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-[var(--brand-deep)] transition hover:bg-[var(--sand)]"
                >
                  Explore featured homes
                </a>
                <a
                  href="#why"
                  className="rounded-full border border-white/30 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                >
                  See booking concept
                </a>
              </div>
            </div>

            <div id="search" className="rounded-[28px] bg-white p-6 shadow-2xl ring-1 ring-black/5">
              <div className="mb-5">
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--brand)]">Availability search</p>
                <h2 className="mt-2 text-2xl font-semibold text-[var(--brand-deep)]">Find your coastal stay</h2>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <label className="space-y-2 text-sm font-medium text-[var(--muted-dark)]">
                  Arrival
                  <input className="field" defaultValue="2026-06-20" type="date" />
                </label>
                <label className="space-y-2 text-sm font-medium text-[var(--muted-dark)]">
                  Departure
                  <input className="field" defaultValue="2026-06-27" type="date" />
                </label>
                <label className="space-y-2 text-sm font-medium text-[var(--muted-dark)]">
                  Guests
                  <select className="field" defaultValue="8">
                    <option>2</option>
                    <option>4</option>
                    <option>6</option>
                    <option>8</option>
                    <option>10+</option>
                  </select>
                </label>
                <label className="space-y-2 text-sm font-medium text-[var(--muted-dark)]">
                  Area
                  <select className="field" defaultValue="Surf City">
                    <option>Surf City</option>
                    <option>North Topsail Beach</option>
                    <option>Topsail Beach</option>
                    <option>Any area</option>
                  </select>
                </label>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                {["Oceanfront", "Pool", "Pet-friendly", "Elevator", "Golf cart"].map((filter) => (
                  <span
                    key={filter}
                    className="rounded-full border border-[var(--line)] bg-[var(--mist)] px-3 py-1.5 text-xs font-semibold text-[var(--muted-dark)]"
                  >
                    {filter}
                  </span>
                ))}
              </div>

              <a
                href="/properties"
                className="mt-6 block w-full rounded-2xl bg-[var(--brand)] px-4 py-3.5 text-center text-sm font-semibold text-white transition hover:bg-[var(--brand-deep)]"
              >
                Search rentals
              </a>

              <p className="mt-3 text-xs leading-5 text-[var(--muted)]">
                Prototype note: in production, this search would read from cached property data and check live rates /
                availability through RealTime Rental before checkout.
              </p>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-14 lg:px-10" id="why">
          <div className="grid gap-8 rounded-[32px] border border-[var(--line)] bg-white p-8 shadow-sm lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--brand)]">Why this direction works</p>
              <h2 className="mt-3 text-3xl font-semibold text-[var(--brand-deep)]">Built for bookings first, not just brochure pages.</h2>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              {perks.map((perk) => (
                <div key={perk} className="rounded-3xl bg-[var(--mist)] p-5 text-sm leading-6 text-[var(--muted-dark)]">
                  {perk}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-10 lg:px-10" id="featured">
          <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--brand)]">Featured rentals</p>
              <h2 className="mt-2 text-3xl font-semibold text-[var(--brand-deep)]">Mock property cards shaped for API-fed inventory</h2>
            </div>
            <p className="max-w-2xl text-sm leading-6 text-[var(--muted)]">
              These cards are using mock content now. Later, they can map directly to RealTime Rental property data,
              amenity flags, pricing summaries, and image galleries.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {featuredProperties.map((property) => (
              <article
                key={property.id}
                className="overflow-hidden rounded-[28px] border border-[var(--line)] bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="h-64 bg-cover bg-center" style={{ backgroundImage: `url(${property.image})` }} />
                <div className="p-6">
                  <div className="mb-3 flex items-center justify-between gap-3">
                    <span className="rounded-full bg-[var(--mist)] px-3 py-1 text-xs font-semibold text-[var(--brand)]">
                      {property.tag}
                    </span>
                    <span className="text-sm font-semibold text-[var(--brand-deep)]">From {property.price}/night</span>
                  </div>
                  <h3 className="text-2xl font-semibold text-[var(--brand-deep)]">{property.name}</h3>
                  <p className="mt-2 text-sm text-[var(--muted)]">{property.location}</p>
                  <div className="mt-5 flex flex-wrap gap-2 text-sm text-[var(--muted-dark)]">
                    <span className="chip">{property.beds} bedrooms</span>
                    <span className="chip">{property.baths} baths</span>
                    <span className="chip">Sleeps {property.sleeps}</span>
                  </div>
                  <p className="mt-4 text-sm leading-6 text-[var(--muted)]">{property.summary}</p>
                  <div className="mt-6 flex gap-3">
                    <a
                      href={`/properties/${property.slug}`}
                      className="flex-1 rounded-2xl bg-[var(--brand)] px-4 py-3 text-center text-sm font-semibold text-white hover:bg-[var(--brand-deep)]"
                    >
                      View details
                    </a>
                    <button className="rounded-2xl border border-[var(--line)] px-4 py-3 text-sm font-semibold text-[var(--brand-deep)] hover:bg-[var(--mist)]">
                      Save
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-14 lg:px-10" id="destinations">
          <div className="mb-8">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--brand)]">Browse by area</p>
            <h2 className="mt-2 text-3xl font-semibold text-[var(--brand-deep)]">Show the island the way guests actually shop.</h2>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {destinations.map((destination) => (
              <div key={destination.name} className="rounded-[28px] border border-[var(--line)] bg-white p-6 shadow-sm">
                <h3 className="text-2xl font-semibold text-[var(--brand-deep)]">{destination.name}</h3>
                <p className="mt-3 text-sm leading-6 text-[var(--muted)]">{destination.description}</p>
                <a href="/properties" className="mt-5 inline-block text-sm font-semibold text-[var(--brand)] hover:text-[var(--brand-deep)]">
                  Browse rentals →
                </a>
              </div>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-14 lg:px-10" id="about-us">
          <div className="grid gap-6 rounded-[32px] border border-[var(--line)] bg-white p-8 shadow-sm lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--brand)]">About us</p>
              <h2 className="mt-3 text-3xl font-semibold text-[var(--brand-deep)]">Local knowledge, steady management, and a better guest experience.</h2>
            </div>
            <div>
              <p className="text-sm leading-7 text-[var(--muted)]">
                Myers Realty, Inc. serves Topsail Island with a mix of local market experience, vacation rental
                management expertise, and hands-on service. This section can become the home for your company story,
                owner value proposition, and trust-building content for direct bookings.
              </p>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
