const featuredProperties = [
  {
    id: "salty-winds",
    name: "Salty Winds Cottage",
    location: "Surf City, Topsail Island",
    beds: 4,
    baths: 3,
    sleeps: 10,
    price: "$425",
    image:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80",
    tag: "Ocean view",
  },
  {
    id: "soundside-retreat",
    name: "Soundside Retreat",
    location: "North Topsail Beach",
    beds: 5,
    baths: 4,
    sleeps: 12,
    price: "$510",
    image:
      "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1200&q=80",
    tag: "Private pool",
  },
  {
    id: "pelican-point",
    name: "Pelican Point",
    location: "Topsail Beach",
    beds: 3,
    baths: 2,
    sleeps: 8,
    price: "$360",
    image:
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1200&q=80",
    tag: "Walk to beach",
  },
];

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
      <header className="border-b border-[var(--line)] bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--brand)]">
              Myers Realty, Inc.
            </p>
            <h1 className="text-xl font-semibold text-[var(--brand-deep)]">Topsail Rentals</h1>
          </div>
          <nav className="hidden gap-8 text-sm font-medium text-[var(--muted)] md:flex">
            <a href="#search" className="hover:text-[var(--brand)]">Search</a>
            <a href="#featured" className="hover:text-[var(--brand)]">Featured Homes</a>
            <a href="#destinations" className="hover:text-[var(--brand)]">Areas</a>
            <a href="#why" className="hover:text-[var(--brand)]">Why Book Direct</a>
          </nav>
          <a
            href="#search"
            className="rounded-full bg-[var(--brand)] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[var(--brand-deep)]"
          >
            Check Availability
          </a>
        </div>
      </header>

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
                Prototype direction
              </p>
              <h2 className="text-4xl font-semibold leading-tight sm:text-5xl">
                A cleaner, faster direct-booking experience for Topsail Island rentals.
              </h2>
              <p className="mt-5 max-w-xl text-base leading-7 text-white/88 sm:text-lg">
                This mockup keeps the Myers Realty coastal palette and professional tone, but shifts the site toward
                modern search, strong property merchandising, and a booking flow ready for RealTime Rental API data.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="#featured"
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
                <h3 className="mt-2 text-2xl font-semibold text-[var(--brand-deep)]">Find your coastal stay</h3>
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
                {['Oceanfront', 'Pool', 'Pet-friendly', 'Elevator', 'Golf cart'].map((filter) => (
                  <span
                    key={filter}
                    className="rounded-full border border-[var(--line)] bg-[var(--mist)] px-3 py-1.5 text-xs font-semibold text-[var(--muted-dark)]"
                  >
                    {filter}
                  </span>
                ))}
              </div>

              <button className="mt-6 w-full rounded-2xl bg-[var(--brand)] px-4 py-3.5 text-sm font-semibold text-white transition hover:bg-[var(--brand-deep)]">
                Search rentals
              </button>

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
              <h3 className="mt-3 text-3xl font-semibold text-[var(--brand-deep)]">Built for bookings first, not just brochure pages.</h3>
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
              <h3 className="mt-2 text-3xl font-semibold text-[var(--brand-deep)]">Mock property cards shaped for API-fed inventory</h3>
            </div>
            <p className="max-w-2xl text-sm leading-6 text-[var(--muted)]">
              These cards are using mock content now. Later, they can map directly to RealTime Rental property data,
              amenity flags, pricing summaries, and image galleries.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {featuredProperties.map((property) => (
              <article key={property.id} className="overflow-hidden rounded-[28px] border border-[var(--line)] bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
                <div
                  className="h-64 bg-cover bg-center"
                  style={{ backgroundImage: `url(${property.image})` }}
                />
                <div className="p-6">
                  <div className="mb-3 flex items-center justify-between gap-3">
                    <span className="rounded-full bg-[var(--mist)] px-3 py-1 text-xs font-semibold text-[var(--brand)]">
                      {property.tag}
                    </span>
                    <span className="text-sm font-semibold text-[var(--brand-deep)]">From {property.price}/night</span>
                  </div>
                  <h4 className="text-2xl font-semibold text-[var(--brand-deep)]">{property.name}</h4>
                  <p className="mt-2 text-sm text-[var(--muted)]">{property.location}</p>
                  <div className="mt-5 flex flex-wrap gap-2 text-sm text-[var(--muted-dark)]">
                    <span className="chip">{property.beds} bedrooms</span>
                    <span className="chip">{property.baths} baths</span>
                    <span className="chip">Sleeps {property.sleeps}</span>
                  </div>
                  <div className="mt-6 flex gap-3">
                    <button className="flex-1 rounded-2xl bg-[var(--brand)] px-4 py-3 text-sm font-semibold text-white hover:bg-[var(--brand-deep)]">
                      View details
                    </button>
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
            <h3 className="mt-2 text-3xl font-semibold text-[var(--brand-deep)]">Show the island the way guests actually shop.</h3>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {destinations.map((destination) => (
              <div key={destination.name} className="rounded-[28px] border border-[var(--line)] bg-white p-6 shadow-sm">
                <h4 className="text-2xl font-semibold text-[var(--brand-deep)]">{destination.name}</h4>
                <p className="mt-3 text-sm leading-6 text-[var(--muted)]">{destination.description}</p>
                <a href="#search" className="mt-5 inline-block text-sm font-semibold text-[var(--brand)] hover:text-[var(--brand-deep)]">
                  Browse rentals →
                </a>
              </div>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 pb-20 lg:px-10">
          <div className="rounded-[32px] bg-[var(--brand-deep)] px-8 py-10 text-white shadow-xl">
            <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--foam)]">Next phase</p>
                <h3 className="mt-3 text-3xl font-semibold">What we can wire in after you approve the look and flow</h3>
                <ul className="mt-5 space-y-3 text-sm leading-6 text-white/85">
                  <li>• RealTime Rental property sync and content mapping</li>
                  <li>• Availability and quote lookups on live inventory</li>
                  <li>• Property detail pages with amenities, policies, and gallery</li>
                  <li>• Booking handoff or full direct-booking checkout flow</li>
                </ul>
              </div>
              <div className="rounded-[28px] bg-white/10 p-6 ring-1 ring-white/15 backdrop-blur-sm">
                <p className="text-sm font-semibold">Prototype goals</p>
                <div className="mt-4 space-y-4 text-sm text-white/85">
                  <div>
                    <div className="mb-1 flex items-center justify-between">
                      <span>Brand alignment</span>
                      <span>85%</span>
                    </div>
                    <div className="h-2 rounded-full bg-white/15">
                      <div className="h-2 w-[85%] rounded-full bg-[var(--foam)]" />
                    </div>
                  </div>
                  <div>
                    <div className="mb-1 flex items-center justify-between">
                      <span>Search UX readiness</span>
                      <span>90%</span>
                    </div>
                    <div className="h-2 rounded-full bg-white/15">
                      <div className="h-2 w-[90%] rounded-full bg-[#93d5d9]" />
                    </div>
                  </div>
                  <div>
                    <div className="mb-1 flex items-center justify-between">
                      <span>API integration ready</span>
                      <span>70%</span>
                    </div>
                    <div className="h-2 rounded-full bg-white/15">
                      <div className="h-2 w-[70%] rounded-full bg-[#f4d7a1]" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
