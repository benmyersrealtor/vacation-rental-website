import { notFound } from "next/navigation";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { getPropertyBySlug, properties } from "@/lib/properties";

export function generateStaticParams() {
  return properties.map((property) => ({ slug: property.slug }));
}

export default async function PropertyDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const property = getPropertyBySlug(slug);

  if (!property) notFound();

  return (
    <div className="min-h-screen bg-[var(--sand)] text-[var(--ink)]">
      <SiteHeader />
      <main>
        <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-12 lg:px-10">
          <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:gap-8">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--brand)]">Property spotlight</p>
              <h1 className="mt-2 text-3xl font-semibold text-[var(--brand-deep)] sm:text-4xl">{property.name}</h1>
              <p className="mt-3 text-base text-[var(--muted)]">{property.location}</p>

              <div className="mt-6 min-h-[280px] rounded-[24px] bg-cover bg-center shadow-lg sm:min-h-[460px] sm:rounded-[32px]" style={{ backgroundImage: `url(${property.gallery[0]})` }} />

              <div className="mt-4 grid grid-cols-4 gap-3 overflow-x-auto">
                {property.gallery.map((image, index) => (
                  <div
                    key={image}
                    className="min-h-[84px] rounded-[18px] border border-[var(--line)] bg-cover bg-center shadow-sm sm:min-h-[96px]"
                    style={{ backgroundImage: `url(${image})` }}
                    aria-label={`Gallery image ${index + 1}`}
                  />
                ))}
              </div>

              <p className="mt-3 text-xs text-[var(--muted)]">Gallery is mocked for now. Later, this can become a swipe gallery on mobile and a lightbox/modal on desktop.</p>
            </div>

            <div className="space-y-6">
              <div className="rounded-[24px] border border-[var(--line)] bg-white p-5 shadow-sm sm:rounded-[28px] sm:p-6">
                <div className="flex items-center justify-between gap-3">
                  <span className="rounded-full bg-[var(--mist)] px-3 py-1 text-xs font-semibold text-[var(--brand)]">{property.badge}</span>
                  <span className="text-lg font-semibold text-[var(--brand-deep)]">From {property.price}/night</span>
                </div>

                <div className="mt-5 flex flex-wrap gap-2 text-sm text-[var(--muted-dark)]">
                  <span className="chip">{property.beds} bedrooms</span>
                  <span className="chip">{property.baths} baths</span>
                  <span className="chip">Sleeps {property.sleeps}</span>
                  <span className="chip">{property.area}</span>
                </div>

                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  <label className="min-w-0 space-y-2 text-sm font-medium text-[var(--muted-dark)]">
                    Check-in
                    <input className="field field-compact" defaultValue="2026-06-20" type="date" />
                  </label>
                  <label className="min-w-0 space-y-2 text-sm font-medium text-[var(--muted-dark)]">
                    Check-out
                    <input className="field field-compact" defaultValue="2026-06-27" type="date" />
                  </label>
                </div>

                <label className="mt-3 block min-w-0 space-y-2 text-sm font-medium text-[var(--muted-dark)]">
                  Guests
                  <select className="field" defaultValue={String(property.sleeps >= 10 ? 8 : 6)}>
                    <option>2</option>
                    <option>4</option>
                    <option>6</option>
                    <option>8</option>
                    <option>10+</option>
                  </select>
                </label>

                <div className="mt-5 rounded-[20px] bg-[var(--mist)] p-4">
                  <p className="text-sm font-semibold text-[var(--brand-deep)]">Estimated total</p>
                  <p className="mt-1 text-2xl font-semibold text-[var(--brand-deep)]">{property.price} / night + taxes & fees</p>
                  <p className="mt-2 text-xs leading-5 text-[var(--muted)]">
                    Inquiry-only phase: totals, fees, and final availability will be confirmed once RealTime Rental API quoting is connected.
                  </p>
                </div>

                <a
                  href={`/inquire?property=${property.slug}&checkIn=2026-06-20&checkOut=2026-06-27&guests=${property.sleeps >= 10 ? "8" : "6"}`}
                  className="mt-6 block w-full rounded-2xl bg-[var(--brand)] px-4 py-3.5 text-center text-sm font-semibold text-white hover:bg-[var(--brand-deep)]"
                >
                  Request to Book
                </a>

                <div className="mt-5 space-y-2 text-sm text-[var(--muted)]">
                  <p>• Managed locally by Myers Realty</p>
                  <p>• Secure booking workflow</p>
                  <p>• Direct support from a local team</p>
                </div>
              </div>

              <div className="rounded-[24px] border border-[var(--line)] bg-white p-5 shadow-sm sm:rounded-[28px] sm:p-6">
                <h2 className="text-2xl font-semibold text-[var(--brand-deep)]">Quick stats</h2>
                <div className="mt-4 grid grid-cols-2 gap-3 text-sm text-[var(--muted)]">
                  <div className="rounded-[18px] bg-[var(--mist)] p-4"><span className="font-semibold text-[var(--brand-deep)]">{property.beds}</span><br />Bedrooms</div>
                  <div className="rounded-[18px] bg-[var(--mist)] p-4"><span className="font-semibold text-[var(--brand-deep)]">{property.baths}</span><br />Bathrooms</div>
                  <div className="rounded-[18px] bg-[var(--mist)] p-4"><span className="font-semibold text-[var(--brand-deep)]">{property.sleeps}</span><br />Sleeps</div>
                  <div className="rounded-[18px] bg-[var(--mist)] p-4"><span className="font-semibold text-[var(--brand-deep)]">{property.area}</span><br />Area</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-10">
          <div className="grid gap-6 lg:grid-cols-[1fr_0.9fr]">
            <div className="space-y-6">
              <div className="rounded-[24px] border border-[var(--line)] bg-white p-5 shadow-sm sm:rounded-[28px] sm:p-6">
                <h2 className="text-2xl font-semibold text-[var(--brand-deep)]">About this home</h2>
                <p className="mt-4 text-sm leading-7 text-[var(--muted)]">{property.overview}</p>
              </div>

              <div className="rounded-[24px] border border-[var(--line)] bg-white p-5 shadow-sm sm:rounded-[28px] sm:p-6">
                <h2 className="text-2xl font-semibold text-[var(--brand-deep)]">Amenities</h2>
                <div className="mt-4 flex flex-wrap gap-2">
                  {property.amenities.map((amenity) => (
                    <span key={amenity} className="chip text-sm text-[var(--muted-dark)]">{amenity}</span>
                  ))}
                </div>
              </div>

              <div className="rounded-[24px] border border-[var(--line)] bg-white p-5 shadow-sm sm:rounded-[28px] sm:p-6">
                <h2 className="text-2xl font-semibold text-[var(--brand-deep)]">Sleeping arrangements</h2>
                <ul className="mt-4 space-y-3 text-sm leading-6 text-[var(--muted)]">
                  {property.sleepingArrangements.map((item) => (
                    <li key={item}>• {item}</li>
                  ))}
                </ul>
              </div>

              <div className="rounded-[24px] border border-[var(--line)] bg-white p-5 shadow-sm sm:rounded-[28px] sm:p-6">
                <h2 className="text-2xl font-semibold text-[var(--brand-deep)]">House rules</h2>
                <ul className="mt-4 space-y-3 text-sm leading-6 text-[var(--muted)]">
                  {property.houseRules.map((item) => (
                    <li key={item}>• {item}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="space-y-6">
              <div className="rounded-[24px] border border-[var(--line)] bg-white p-5 shadow-sm sm:rounded-[28px] sm:p-6">
                <h2 className="text-2xl font-semibold text-[var(--brand-deep)]">Location</h2>
                <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
                  {property.name} is positioned in {property.area}, giving guests convenient access to beach time, local dining, and island activities. This section is ready for a future embedded map or live location context from your property management data.
                </p>
                <div className="mt-4 min-h-[220px] rounded-[22px] bg-[linear-gradient(135deg,#d8e1e5,#edf4f5)] p-5 text-sm text-[var(--muted-dark)] shadow-inner">
                  Map placeholder for {property.location}
                </div>
              </div>

              <div className="rounded-[24px] border border-[var(--line)] bg-white p-5 shadow-sm sm:rounded-[28px] sm:p-6">
                <h2 className="text-2xl font-semibold text-[var(--brand-deep)]">Nearby attractions</h2>
                <ul className="mt-4 space-y-3 text-sm leading-6 text-[var(--muted)]">
                  {property.nearbyAttractions.map((item) => (
                    <li key={item}>• {item}</li>
                  ))}
                </ul>
              </div>

              <div className="rounded-[24px] border border-[var(--line)] bg-[var(--brand-deep)] p-5 text-white shadow-sm sm:rounded-[28px] sm:p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--foam)]">Ready to plan your stay?</p>
                <h2 className="mt-3 text-2xl font-semibold">Send a booking inquiry</h2>
                <p className="mt-3 text-sm leading-6 text-white/85">
                  This site is currently set up for inquiry-only booking flow. Once RealTime Rental API access is connected, live availability and quoting can feed this panel directly.
                </p>
                <a
                  href={`/inquire?property=${property.slug}&checkIn=2026-06-20&checkOut=2026-06-27&guests=${property.sleeps >= 10 ? "8" : "6"}`}
                  className="mt-5 block w-full rounded-2xl bg-white px-4 py-3 text-center text-sm font-semibold text-[var(--brand-deep)] hover:bg-[var(--sand)]"
                >
                  Request to Book
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
