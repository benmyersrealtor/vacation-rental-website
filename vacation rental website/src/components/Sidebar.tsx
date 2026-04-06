"use client";

import Link from "next/link";

const navItems = [
  { id: "dashboard", label: "Dashboard", icon: "◈", href: "/" },
  { id: "calendar", label: "Calendar", icon: "▣", href: "/calendar" },
  { id: "tasks", label: "Tasks", icon: "◉", href: "/tasks" },
  { id: "projects", label: "Projects", icon: "▸", href: "/projects" },
  { id: "docs", label: "Docs", icon: "▤", href: "/docs" },
  { id: "memory", label: "Memory", icon: "◫", href: "/memory" },
  { id: "files", label: "Files", icon: "◻", href: "/files" },
  { id: "activity", label: "Activity", icon: "◷", href: "/activity" },
  { id: "settings", label: "Settings", icon: "⚙", href: "/settings" },
];

export function Sidebar() {
  return (
    <aside className="fixed left-0 top-0 w-64 h-screen bg-[var(--bg-secondary)] border-r border-[var(--border)] flex flex-col">
      {/* Logo */}
      <div className="h-14 px-4 flex items-center border-b border-[var(--border)]">
        <span className="text-lg font-semibold tracking-tight">Mission Control</span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3">
        <div className="text-xs font-medium text-[var(--text-tertiary)] uppercase tracking-wider mb-2 px-3">
          Workspace
        </div>
        <ul className="space-y-0.5">
          {navItems.map((item) => (
            <li key={item.id}>
              <Link
                href={item.href}
                className="flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-hover)]"
              >
                <span className="text-base">{item.icon}</span>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Bottom section */}
      <div className="p-3 border-t border-[var(--border)]">
        <div className="flex items-center gap-3 px-3 py-2">
          <div className="w-6 h-6 rounded-full bg-[var(--accent)] flex items-center justify-center text-xs font-medium">
            B
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-sm font-medium truncate">Ben Myers</div>
            <div className="text-xs text-[var(--text-tertiary)] truncate">Local</div>
          </div>
        </div>
      </div>
    </aside>
  );
}
