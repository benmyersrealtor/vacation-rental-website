import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { getPropertyBySlug } from "@/lib/properties";
import { submitInquiry } from "@/app/actions";
import { InquirySubmitButton } from "@/components/InquirySubmitButton";

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

  return (
    <div className="min-h-screen bg-[var(--sand)] text-[var(--ink)]">
      <SiteHeader />
      <main className="mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-12 lg:px-10">
        <div className="mb-8">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--brand)]">Booking inquiry</p>
          <h1 className="mt-2 text-3xl font-semibold text-[var(--brand-deep)] sm:text-4xl">Request to book</h1>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-[var(--muted)]">
            This inquiry flow now sends booking requests to email first, giving you a working lead-capture path before RealTime Rental is connected.
          </p>
        </div>

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
            <form action={submitInquiry} className="space-y-4">
              {property ? <input type="hidden" name="propertyName" value={property.name} /> : null}
              {property ? <input type="hidden" name="propertyLocation" value={property.location} /> : null}

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
                This inquiry will be emailed to your booking inbox. Next step after this is optionally logging submissions into CRM, Google Sheets, or a RealTime-connected workflow.
              </div>

              <InquirySubmitButton />
            </form>
          </section>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
