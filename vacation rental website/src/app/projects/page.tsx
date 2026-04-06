interface Project {
  id: string;
  name: string;
  description: string;
  status: "active" | "completed" | "paused" | "waiting";
  progress: number;
  lastUpdated: string;
  owner: string;
  nextAction?: string;
}

const projects: Project[] = [
  {
    id: "1",
    name: "Knowledge Base System",
    description: "Document indexing and retrieval system for receipts, inspections, notes. Workflow: Ben sends docs via Telegram → I process, tag, save, index.",
    status: "active",
    progress: 85,
    lastUpdated: "Mar 9, 2026",
    owner: "Max + Ben",
    nextAction: "Start using it for daily queries"
  },
  {
    id: "2",
    name: "Real Estate Market Briefing",
    description: "Automated market updates delivered Mon/Wed/Fri at 8am via Telegram. Categories: National, NC, Eastern NC.",
    status: "active",
    progress: 100,
    lastUpdated: "Mar 9, 2026",
    owner: "Max",
    nextAction: "Running on cron"
  },
  {
    id: "3",
    name: "Transaction Files Index",
    description: "Make sales data searchable for recall. Located in /Transaction Files/",
    status: "waiting",
    progress: 10,
    lastUpdated: "Mar 9, 2026",
    owner: "Ben",
    nextAction: "Waiting on files"
  },
  {
    id: "4",
    name: "Vacation Rental Optimization",
    description: "Streamline workflows for ~15 properties on Topsail Island (growing to ~30). Guest comm, cleaning scheduling, owner statements, maintenance.",
    status: "active",
    progress: 25,
    lastUpdated: "Mar 10, 2026",
    owner: "Ben + Max",
    nextAction: "Map guest communication workflows"
  },
  {
    id: "5",
    name: "Unified Lead Capture & CRM",
    description: "Unified system for vacation rentals, long-term rentals, and sales. Cross-sell opportunity: guests→buyers, tenants→owners.",
    status: "active",
    progress: 15,
    lastUpdated: "Mar 9, 2026",
    owner: "Ben",
    nextAction: "Decide: custom build vs Follow Up Boss"
  },
  {
    id: "6",
    name: "Probate & Estate Sales Niche",
    description: "Target Eastern NC market for inherited properties. Researched 13 attorneys, sent outreach, set up tracking.",
    status: "paused",
    progress: 70,
    lastUpdated: "Mar 9, 2026",
    owner: "Ben",
    nextAction: "Resume later this week, follow-up Mar 16"
  },
  {
    id: "7",
    name: "Mission Control Dashboard",
    description: "Local Next.js dashboard for project management, inspired by Linear. Quick glance at all projects and files.",
    status: "active",
    progress: 40,
    lastUpdated: "Mar 10, 2026",
    owner: "Max",
    nextAction: "Add real-time data connections"
  },
];

const statusConfig = {
  active: { label: "Active", color: "var(--success)", bg: "bg-[var(--success)]" },
  completed: { label: "Completed", color: "var(--accent)", bg: "bg-[var(--accent)]" },
  paused: { label: "Paused", color: "var(--warning)", bg: "bg-[var(--warning)]" },
  waiting: { label: "Waiting", color: "var(--text-tertiary)", bg: "bg-[var(--text-tertiary)]" },
};

function ProgressBar({ progress }: { progress: number }) {
  return (
    <div className="w-full h-1.5 bg-[var(--bg-tertiary)] rounded-full overflow-hidden">
      <div
        className="h-full bg-[var(--accent)] rounded-full transition-all duration-500"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}

export default function ProjectsPage() {
  return (
    <div className="p-8">
      <header className="mb-8">
        <h1 className="text-2xl font-semibold mb-1">Projects</h1>
        <p className="text-[var(--text-secondary)]">All active projects and their current status</p>
      </header>

      <div className="space-y-4">
        {projects.map((project) => {
          const status = statusConfig[project.status];
          return (
            <div
              key={project.id}
              className="bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg p-5 hover:border-[var(--text-tertiary)] transition-colors"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="font-semibold text-lg">{project.name}</h3>
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full ${status.bg} bg-opacity-20`}
                      style={{ color: status.color }}
                    >
                      {status.label}
                    </span>
                  </div>
                  <p className="text-sm text-[var(--text-secondary)]">{project.description}</p>
                </div>
                <div className="text-right ml-4">
                  <div className="text-2xl font-semibold">{project.progress}%</div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mb-4">
                <ProgressBar progress={project.progress} />
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-4">
                  <span className="text-[var(--text-tertiary)]">
                    Owner: <span className="text-[var(--text-secondary)]">{project.owner}</span>
                  </span>
                  <span className="text-[var(--text-tertiary)]">
                    Updated: <span className="text-[var(--text-secondary)]">{project.lastUpdated}</span>
                  </span>
                </div>
                {project.nextAction && (
                  <div className="text-[var(--accent)]">
                    Next: {project.nextAction}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Summary Stats */}
      <div className="mt-8 grid grid-cols-4 gap-4">
        <div className="bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg p-4">
          <div className="text-sm text-[var(--text-secondary)] mb-1">Total Projects</div>
          <div className="text-2xl font-semibold">{projects.length}</div>
        </div>
        <div className="bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg p-4">
          <div className="text-sm text-[var(--text-secondary)] mb-1">Active</div>
          <div className="text-2xl font-semibold text-[var(--success)]">
            {projects.filter(p => p.status === "active").length}
          </div>
        </div>
        <div className="bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg p-4">
          <div className="text-sm text-[var(--text-secondary)] mb-1">Paused</div>
          <div className="text-2xl font-semibold text-[var(--warning)]">
            {projects.filter(p => p.status === "paused").length}
          </div>
        </div>
        <div className="bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg p-4">
          <div className="text-sm text-[var(--text-secondary)] mb-1">Avg Progress</div>
          <div className="text-2xl font-semibold">
            {Math.round(projects.reduce((acc, p) => acc + p.progress, 0) / projects.length)}%
          </div>
        </div>
      </div>
    </div>
  );
}
