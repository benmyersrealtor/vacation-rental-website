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
              <div className="mt-6 min-h-[260px] rounded-[24px] bg-cover bg-center shadow-lg sm:min-h-[420px] sm:rounded-[32px]" style={{ backgroundImage: `url(${property.image})` }} />
            </div>

            <div className="space-y-6">
              <div className="rounded-[24px] border border-[var(--line)] bg-white p-5 shadow-sm sm:rounded-[28px] sm:p-6">
                <div className="flex items-center justify-between gap-3">
                  <span className="rounded-full bg-[var(--mist)] px-3 py-1 text-xs font-semibold text-[var(--brand)]">{property.tag}</span>
                  <span className="text-lg font-semibold text-[var(--brand-deep)]">From {property.price}/night</span>
                </div>
                <p className="mt-4 text-sm leading-6 text-[var(--muted)]">{property.summary}</p>
                <div className="mt-5 flex flex-wrap gap-2 text-sm text-[var(--muted-dark)]">
                  <span className="chip">{property.beds} bedrooms</span>
                  <span className="chip">{property.baths} baths</span>
                  <span className="chip">Sleeps {property.sleeps}</span>
                  <span className="chip">{property.area}</span>
                </div>
                <button className="mt-6 w-full rounded-2xl bg-[var(--brand)] px-4 py-3.5 text-sm font-semibold text-white hover:bg-[var(--brand-deep)]">Check availability</button>
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
                <h2 className="text-2xl font-semibold text-[var(--brand-deep)]">Prototype note</h2>
                <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
                  This detail page is mocked for layout approval. The next step would be swapping in RealTime Rental fields for descriptions, media galleries, rates, amenity flags, and live availability checks.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
