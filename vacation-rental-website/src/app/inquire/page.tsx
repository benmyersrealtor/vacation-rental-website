import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { getPropertyBySlug } from "@/lib/properties";

interface InquirePageProps {
  searchParams: Promise<{
    property?: string;
    checkIn?: string;
    checkOut?: string;
    guests?: string;
    success?: string;
  }>;
}

export default async function InquirePage({ searchParams }: InquirePageProps) {
  const params = await searchParams;
  const property = params.property ? getPropertyBySlug(params.property) : undefined;
  const submitted = params.success === "1";

  return (
    <div className="min-h-screen bg-[var(--sand)] text-[var(--ink)]">
      <SiteHeader />
      <main className="mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-12 lg:px-10">
        <div className="mb-8">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--brand)]">Booking inquiry</p>
          <h1 className="mt-2 text-3xl font-semibold text-[var(--brand-deep)] sm:text-4xl">Request to book</h1>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-[var(--muted)]">
            This inquiry flow is the pre-RealTime version of lead capture. It collects booking details and routes the guest into a direct inquiry path first.
          </p>
        </div>

        {submitted ? (
          <div className="rounded-[28px] border border-[var(--line)] bg-white p-8 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--brand)]">Inquiry sent</p>
            <h2 className="mt-3 text-3xl font-semibold text-[var(--brand-deep)]">Thanks — we’ve got your request.</h2>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-[var(--muted)]">
              Your booking inquiry has been captured. Next step will be connecting this to email, CRM, or RealTime Rental-side workflows so the request is delivered automatically.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <a href="/properties" className="rounded-2xl bg-[var(--brand)] px-5 py-3 text-center text-sm font-semibold text-white hover:bg-[var(--brand-deep)]">Browse more properties</a>
              <a href="/" className="rounded-2xl border border-[var(--line)] px-5 py-3 text-center text-sm font-semibold text-[var(--brand-deep)] hover:bg-[var(--mist)]">Return home</a>
            </div>
          </div>
        ) : (
          <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
            <aside className="rounded-[28px] border border-[var(--line)] bg-white p-6 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--brand)]">Inquiry summary</p>
              <h2 className="mt-3 text-2xl font-semibold text-[var(--brand-deep)]">
                {property ? property.name : "Vacation rental inquiry"}
              </h2>
              <p className="mt-2 text-sm text-[var(--muted)]">{property ? property.location : "Topsail Island, NC"}</p>

              <div className="mt-5 flex flex-wrap gap-2 text-sm text-[var(--muted-dark)]">
                {property ? (
                  <>
                    <span className="chip">{property.beds} bedrooms</span>
                    <span className="chip">{property.baths} baths</span>
                    <span className="chip">Sleeps {property.sleeps}</span>
                  </>
                ) : (
                  <span className="chip">Booking inquiry</span>
                )}
              </div>

              <div className="mt-6 space-y-3 rounded-[22px] bg-[var(--mist)] p-4 text-sm text-[var(--muted)]">
                <p><span className="font-semibold text-[var(--brand-deep)]">Check-in:</span> {params.checkIn || "Not selected"}</p>
                <p><span className="font-semibold text-[var(--brand-deep)]">Check-out:</span> {params.checkOut || "Not selected"}</p>
                <p><span className="font-semibold text-[var(--brand-deep)]">Guests:</span> {params.guests || "Not selected"}</p>
              </div>

              <div className="mt-6 text-sm leading-6 text-[var(--muted)]">
                <p>• Managed locally by Myers Realty</p>
                <p>• Inquiry-only workflow for now</p>
                <p>• RealTime Rental connection comes next</p>
              </div>
            </aside>

            <section className="rounded-[28px] border border-[var(--line)] bg-white p-6 shadow-sm">
              <form action="/inquire" method="GET" className="space-y-4">
                <input type="hidden" name="success" value="1" />
                {property ? <input type="hidden" name="property" value={property.slug} /> : null}
                {params.checkIn ? <input type="hidden" name="checkIn" value={params.checkIn} /> : null}
                {params.checkOut ? <input type="hidden" name="checkOut" value={params.checkOut} /> : null}
                {params.guests ? <input type="hidden" name="guests" value={params.guests} /> : null}

                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="space-y-2 text-sm font-medium text-[var(--muted-dark)]">
                    First name
                    <input className="field" name="firstName" required />
                  </label>
                  <label className="space-y-2 text-sm font-medium text-[var(--muted-dark)]">
                    Last name
                    <input className="field" name="lastName" required />
                  </label>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="space-y-2 text-sm font-medium text-[var(--muted-dark)]">
                    Email
                    <input className="field" name="email" type="email" required />
                  </label>
                  <label className="space-y-2 text-sm font-medium text-[var(--muted-dark)]">
                    Phone
                    <input className="field" name="phone" type="tel" required />
                  </label>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="space-y-2 text-sm font-medium text-[var(--muted-dark)]">
                    Check-in
                    <input className="field field-compact" name="checkInVisible" type="date" defaultValue={params.checkIn || "2026-06-20"} />
                  </label>
                  <label className="space-y-2 text-sm font-medium text-[var(--muted-dark)]">
                    Check-out
                    <input className="field field-compact" name="checkOutVisible" type="date" defaultValue={params.checkOut || "2026-06-27"} />
                  </label>
                </div>

                <label className="space-y-2 text-sm font-medium text-[var(--muted-dark)]">
                  Number of guests
                  <select className="field" name="guestsVisible" defaultValue={params.guests || "8"}>
                    <option>2</option>
                    <option>4</option>
                    <option>6</option>
                    <option>8</option>
                    <option>10+</option>
                  </select>
                </label>

                <label className="space-y-2 text-sm font-medium text-[var(--muted-dark)]">
                  Tell us about your stay
                  <textarea
                    className="field min-h-[160px] resize-y"
                    name="message"
                    placeholder="Preferred property, special requests, pet info, questions, or anything else we should know."
                  />
                </label>

                <div className="rounded-[22px] bg-[var(--mist)] p-4 text-sm leading-6 text-[var(--muted)]">
                  Inquiry-only mode: the next integration step is routing this submission into email, CRM, or RealTime Rental-connected workflows.
                </div>

                <button className="w-full rounded-2xl bg-[var(--brand)] px-4 py-3.5 text-sm font-semibold text-white hover:bg-[var(--brand-deep)]">
                  Send booking inquiry
                </button>
              </form>
            </section>
          </div>
        )}
      </main>
      <SiteFooter />
    </div>
  );
}
