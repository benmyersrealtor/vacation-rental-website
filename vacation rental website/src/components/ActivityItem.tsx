interface Activity {
  id: string;
  action: string;
  target: string;
  time: string;
}

export function ActivityItem({ item }: { item: Activity }) {
  return (
    <div className="px-4 py-3 flex items-center gap-3">
      <div className="w-2 h-2 rounded-full bg-[var(--accent)]" />
      <div className="flex-1 min-w-0">
        <div className="text-sm">
          <span className="text-[var(--text-secondary)]">{item.action}</span>{" "}
          <span className="font-medium">{item.target}</span>
        </div>
      </div>
      <div className="text-xs text-[var(--text-tertiary)]">{item.time}</div>
    </div>
  );
}
