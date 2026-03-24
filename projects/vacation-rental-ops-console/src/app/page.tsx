const navTabs = [
  "Runs",
  "Reservations",
  "Cleaners",
  "Linens",
  "Access Codes",
  "Exceptions",
  "Properties",
];

const runMetrics = [
  { label: "Arrivals", value: "3" },
  { label: "Departures", value: "2" },
  { label: "VRBO", value: "2" },
  { label: "Direct / In-House", value: "0" },
  { label: "Owner Reservations", value: "2" },
  { label: "Exceptions", value: "2" },
];

const cleanerCards = [
  {
    cleaner: "Laura",
    items: [
      "Tahiti Sweetie — Mar 26 check-in / Mar 29 check-out — VRBO",
      "Station Vacation — Mar 27 check-in / Apr 6 check-out — Owner reservation",
    ],
  },
  {
    cleaner: "Lisa",
    items: ["Myers Cottage — Mar 29 check-in / Apr 4 check-out — VRBO"],
  },
  {
    cleaner: "Nancy",
    items: ["Aqua Stella — Mar 29 check-out — Owner reservation"],
  },
];

const accessCodeItems = {
  vrbo: [
    "Tahiti Sweetie — Martha Farlow — Arrive Mar 26 — Priority: High",
    "Myers Cottage — Pete Shrock — Arrive Mar 29 — Priority: Medium",
  ],
  direct: ["No direct / in-house bookings in the current sample run."],
};

const exceptionItems = [
  "Station Vacation owner notes do not explicitly confirm cleaning or linens.",
  "Aqua Stella owner notes do not explicitly confirm cleaning or linens.",
];

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto flex min-h-screen max-w-7xl flex-col px-6 py-8 lg:px-10">
        <header className="flex flex-col gap-6 border-b border-white/10 pb-8">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.24em] text-cyan-300/80">
                Vacation Rental Ops Console
              </p>
              <h1 className="mt-2 text-4xl font-semibold tracking-tight text-white">
                Local workflow console for weekly turnover operations
              </h1>
              <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-300">
                V1 is upload-driven. Drop in RTR check-in and check-out reports,
                generate a workflow run, then review cleaners, linens, access codes,
                and exceptions in one place.
              </p>
            </div>
            <div className="rounded-2xl border border-cyan-400/20 bg-cyan-400/10 px-4 py-3 text-sm text-cyan-100">
              Status: scaffolded locally · manual upload workflow first
            </div>
          </div>

          <nav className="flex flex-wrap gap-2">
            {navTabs.map((tab, index) => (
              <span
                key={tab}
                className={`rounded-full px-4 py-2 text-sm font-medium ${
                  index === 0
                    ? "bg-cyan-400 text-slate-950"
                    : "border border-white/10 bg-white/5 text-slate-300"
                }`}
              >
                {tab}
              </span>
            ))}
          </nav>
        </header>

        <section className="mt-8 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl shadow-black/20">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-semibold text-white">New Run</h2>
                <p className="mt-1 text-sm text-slate-300">
                  Upload both reports to create a turnover run.
                </p>
              </div>
              <span className="rounded-full border border-amber-300/30 bg-amber-300/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.2em] text-amber-200">
                V1 placeholder UI
              </span>
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <div className="rounded-2xl border border-dashed border-white/15 bg-slate-900/60 p-5">
                <p className="text-sm font-medium text-white">Check-In Report</p>
                <p className="mt-2 text-sm text-slate-400">
                  PDF upload zone goes here.
                </p>
              </div>
              <div className="rounded-2xl border border-dashed border-white/15 bg-slate-900/60 p-5">
                <p className="text-sm font-medium text-white">Check-Out Report</p>
                <p className="mt-2 text-sm text-slate-400">
                  PDF upload zone goes here.
                </p>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <button className="rounded-full bg-cyan-400 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300">
                Process Reports
              </button>
              <button className="rounded-full border border-white/15 px-5 py-3 text-sm font-semibold text-slate-200 transition hover:bg-white/5">
                View Latest Run
              </button>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
            {runMetrics.map((metric) => (
              <div
                key={metric.label}
                className="rounded-2xl border border-white/10 bg-white/5 p-5"
              >
                <p className="text-sm text-slate-400">{metric.label}</p>
                <p className="mt-2 text-3xl font-semibold text-white">
                  {metric.value}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-8 grid gap-6 xl:grid-cols-3">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 xl:col-span-1">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-white">Cleaner Queues</h2>
              <span className="text-xs uppercase tracking-[0.2em] text-slate-400">
                grouped by cleaner
              </span>
            </div>
            <div className="mt-5 space-y-4">
              {cleanerCards.map((card) => (
                <div
                  key={card.cleaner}
                  className="rounded-2xl border border-white/10 bg-slate-900/60 p-4"
                >
                  <h3 className="text-sm font-semibold text-cyan-200">
                    {card.cleaner}
                  </h3>
                  <ul className="mt-3 space-y-2 text-sm text-slate-300">
                    {card.items.map((item) => (
                      <li key={item} className="rounded-xl bg-white/5 px-3 py-2">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 xl:col-span-1">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-white">Linen Vendors</h2>
              <span className="text-xs uppercase tracking-[0.2em] text-slate-400">
                split by vendor
              </span>
            </div>
            <div className="mt-5 space-y-4 text-sm text-slate-300">
              <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-4">
                <h3 className="font-semibold text-cyan-200">Holiday Linens</h3>
                <ul className="mt-3 space-y-2">
                  <li className="rounded-xl bg-white/5 px-3 py-2">
                    Tahiti Sweetie — Mar 26 to Mar 29
                  </li>
                  <li className="rounded-xl bg-white/5 px-3 py-2">
                    Myers Cottage — Mar 29 to Apr 4
                  </li>
                </ul>
              </div>
              <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-4">
                <h3 className="font-semibold text-cyan-200">Sweet Dreams</h3>
                <p className="mt-3 rounded-xl bg-white/5 px-3 py-2 text-slate-400">
                  No properties in the current sample run.
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 xl:col-span-1">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-white">Access Codes</h2>
              <span className="text-xs uppercase tracking-[0.2em] text-slate-400">
                split by booking type
              </span>
            </div>
            <div className="mt-5 space-y-4 text-sm text-slate-300">
              <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-4">
                <h3 className="font-semibold text-cyan-200">VRBO</h3>
                <ul className="mt-3 space-y-2">
                  {accessCodeItems.vrbo.map((item) => (
                    <li key={item} className="rounded-xl bg-white/5 px-3 py-2">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-4">
                <h3 className="font-semibold text-cyan-200">Direct / In-House</h3>
                <ul className="mt-3 space-y-2">
                  {accessCodeItems.direct.map((item) => (
                    <li key={item} className="rounded-xl bg-white/5 px-3 py-2">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-8 rounded-3xl border border-rose-400/20 bg-rose-400/10 p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-white">Exceptions</h2>
            <span className="text-xs uppercase tracking-[0.2em] text-rose-200/80">
              review before sending
            </span>
          </div>
          <ul className="mt-4 space-y-3 text-sm text-rose-50">
            {exceptionItems.map((item) => (
              <li key={item} className="rounded-2xl bg-slate-950/40 px-4 py-3">
                {item}
              </li>
            ))}
          </ul>
        </section>
      </div>
    </main>
  );
}
