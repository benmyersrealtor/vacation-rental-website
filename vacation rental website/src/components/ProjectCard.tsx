interface Project {
  id: string;
  name: string;
  status: "active" | "pending" | "completed";
  lastUpdated: string;
  files: number;
}

export function ProjectCard({ project }: { project: Project }) {
  const statusColors = {
    active: "bg-[var(--success)]",
    pending: "bg-[var(--warning)]",
    completed: "bg-[var(--text-tertiary)]",
  };

  const statusLabels = {
    active: "Active",
    pending: "Pending",
    completed: "Done",
  };

  return (
    <div className="bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg p-4 hover:border-[var(--text-tertiary)] transition-colors cursor-pointer">
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="font-medium mb-1">{project.name}</h3>
          <div className="flex items-center gap-2 text-xs text-[var(--text-tertiary)]">
            <span className={`w-2 h-2 rounded-full ${statusColors[project.status]}`} />
            {statusLabels[project.status]} • {project.lastUpdated}
          </div>
        </div>
      </div>
      <div className="flex items-center gap-4 text-xs text-[var(--text-secondary)]">
        <span>{project.files} files</span>
      </div>
    </div>
  );
}
