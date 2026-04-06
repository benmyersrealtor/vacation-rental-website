"use client";

import { useState, useMemo } from "react";

interface Doc {
  name: string;
  path: string;
  category: string;
  lastUpdated: string;
  size: number;
  excerpt: string;
}

const categories = [
  { id: "all", label: "All Docs", icon: "◈" },
  { id: "system", label: "System", icon: "⚙" },
  { id: "knowledge", label: "Knowledge Base", icon: "◉" },
  { id: "receipts", label: "Receipts", icon: "◫" },
  { id: "memory", label: "Memory", icon: "◷" },
  { id: "documents", label: "Documents", icon: "▸" },
];

const sampleDocs: Doc[] = [
  // System
  { name: "PROJECTS.md", path: "/PROJECTS.md", category: "system", lastUpdated: "Mar 9, 2026", size: 2800, excerpt: "All active projects and their status" },
  { name: "SOUL.md", path: "/SOUL.md", category: "system", lastUpdated: "Feb 28, 2026", size: 2400, excerpt: "Max's character and voice definition" },
  { name: "USER.md", path: "/USER.md", category: "system", lastUpdated: "Feb 27, 2026", size: 1600, excerpt: "Ben's profile and business info" },
  { name: "AGENTS.md", path: "/AGENTS.md", category: "system", lastUpdated: "Mar 9, 2026", size: 8000, excerpt: "Workspace configuration and memory rules" },
  { name: "TOOLS.md", path: "/TOOLS.md", category: "system", lastUpdated: "Feb 27, 2026", size: 860, excerpt: "Local tool notes and specifics" },
  { name: "IDENTITY.md", path: "/IDENTITY.md", category: "system", lastUpdated: "Feb 27, 2026", size: 164, excerpt: "Max's identity" },
  { name: "LEARNINGS.md", path: "/LEARNINGS.md", category: "system", lastUpdated: "Feb 28, 2026", size: 385, excerpt: "Lessons learned" },
  { name: "HEARTBEAT.md", path: "/HEARTBEAT.md", category: "system", lastUpdated: "Feb 27, 2026", size: 164, excerpt: "Periodic task configuration" },
  
  // Knowledge
  { name: "tips.json", path: "/knowledge/tips.json", category: "knowledge", lastUpdated: "Mar 4, 2026", size: 6900, excerpt: "Tips and best practices" },
  { name: "index.json", path: "/knowledge/index.json", category: "knowledge", lastUpdated: "Mar 2, 2026", size: 791, excerpt: "Knowledge base index" },
  { name: "niche-marketing-playbook.md", path: "/knowledge/notes/niche-marketing-playbook.md", category: "knowledge", lastUpdated: "Mar 4, 2026", size: 3200, excerpt: "Marketing strategies" },
  { name: "attorney-tracking.md", path: "/knowledge/notes/attorney-tracking.md", category: "knowledge", lastUpdated: "Mar 9, 2026", size: 2800, excerpt: "Probate attorney outreach tracking" },
  { name: "probate-niche-expansion.md", path: "/knowledge/notes/probate-niche-expansion.md", category: "knowledge", lastUpdated: "Mar 4, 2026", size: 4100, excerpt: "Probate market expansion plan" },
  { name: "self-improvement-relationship-framework.md", path: "/knowledge/notes/self-improvement-relationship-framework.md", category: "knowledge", lastUpdated: "Mar 4, 2026", size: 5500, excerpt: "Relationship and self-improvement notes" },
  
  // Receipts
  { name: "2026-02-27-walmart-smoke-alarms.md", path: "/knowledge/receipts/2026-02-27-walmart-smoke-alarms.md", category: "receipts", lastUpdated: "Feb 27, 2026", size: 450, excerpt: "Walmart receipt - smoke alarms" },
  { name: "2026-03-02-executive-committee-dinner.md", path: "/knowledge/receipts/2026-03-02-executive-committee-dinner.md", category: "receipts", lastUpdated: "Mar 2, 2026", size: 380, excerpt: "Executive committee dinner receipt" },
  
  // Memory
  { name: "2026-02-28.md", path: "/memory/2026-02-28.md", category: "memory", lastUpdated: "Feb 28, 2026", size: 742, excerpt: "Setup day notes" },
  { name: "2026-03-04-rtr-vrbo-sync.md", path: "/memory/2026-03-04-rtr-vrbo-sync.md", category: "memory", lastUpdated: "Mar 4, 2026", size: 8248, excerpt: "VRBO sync session" },
  { name: "2026-03-10-brave-search-llm-mode.md", path: "/memory/2026-03-10-brave-search-llm-mode.md", category: "memory", lastUpdated: "Mar 10, 2026", size: 6335, excerpt: "Brave Search LLM mode session" },
  
  // Documents
  { name: "notice-to-vacate-110-washington-harbor.md", path: "/documents/notice-to-vacate-110-washington-harbor.md", category: "documents", lastUpdated: "Unknown", size: 1200, excerpt: "Notice to vacate document" },
];

function DocCard({ doc, onClick }: { doc: Doc; onClick: () => void }) {
  const categoryColors: Record<string, string> = {
    system: "var(--accent)",
    knowledge: "var(--success)",
    receipts: "var(--warning)",
    memory: "var(--text-tertiary)",
    documents: "#8b5cf6",
  };

  return (
    <div
      onClick={onClick}
      className="bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg p-4 hover:border-[var(--text-tertiary)] transition-colors cursor-pointer"
    >
      <div className="flex items-start justify-between mb-2">
        <h3 className="font-medium text-sm">{doc.name}</h3>
        <span
          className="w-2 h-2 rounded-full mt-1.5"
          style={{ backgroundColor: categoryColors[doc.category] }}
        />
      </div>
      <p className="text-xs text-[var(--text-secondary)] mb-3 line-clamp-2">{doc.excerpt}</p>
      <div className="flex items-center justify-between text-xs text-[var(--text-tertiary)]">
        <span>{doc.lastUpdated}</span>
        <span>{(doc.size / 1024).toFixed(1)} KB</span>
      </div>
    </div>
  );
}

function DocViewer({ doc, onClose }: { doc: Doc; onClose: () => void }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-8">
      <div className="bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-[var(--border)] flex items-center justify-between">
          <div>
            <h2 className="font-semibold text-lg">{doc.name}</h2>
            <p className="text-xs text-[var(--text-tertiary)]">{doc.path}</p>
          </div>
          <button
            onClick={onClose}
            className="text-[var(--text-tertiary)] hover:text-[var(--text-primary)] text-2xl"
          >
            ×
          </button>
        </div>
        
        {/* Content */}
        <div className="flex-1 overflow-auto p-6">
          <div className="prose prose-invert prose-sm max-w-none">
            <p className="text-[var(--text-secondary)]">
              <em>Document preview would load here. Use the file path to navigate to the actual document.</em>
            </p>
            <p className="text-[var(--text-tertiary)] mt-4">
              Path: <code className="bg-[var(--bg-tertiary)] px-2 py-1 rounded">{doc.path}</code>
            </p>
          </div>
        </div>
        
        {/* Footer */}
        <div className="p-4 border-t border-[var(--border)] flex items-center justify-between">
          <span className="text-xs text-[var(--text-tertiary)]">Last updated: {doc.lastUpdated}</span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-[var(--accent)] text-white rounded-md text-sm hover:bg-[var(--accent-hover)] transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default function DocsPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDoc, setSelectedDoc] = useState<Doc | null>(null);

  const filteredDocs = useMemo(() => {
    return sampleDocs.filter((doc) => {
      const matchesCategory = selectedCategory === "all" || doc.category === selectedCategory;
      const matchesSearch =
        searchQuery === "" ||
        doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doc.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: sampleDocs.length };
    for (const doc of sampleDocs) {
      counts[doc.category] = (counts[doc.category] || 0) + 1;
    }
    return counts;
  }, []);

  return (
    <div className="p-8">
      <header className="mb-8">
        <h1 className="text-2xl font-semibold mb-1">Docs</h1>
        <p className="text-[var(--text-secondary)]">Search and browse all documents</p>
      </header>

      {/* Search */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search documents..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg px-4 py-3 text-sm text-[var(--text-primary)] placeholder-[var(--text-tertiary)] focus:outline-none focus:border-[var(--accent)]"
        />
      </div>

      {/* Categories */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm transition-colors whitespace-nowrap ${
              selectedCategory === cat.id
                ? "bg-[var(--accent)] text-white"
                : "bg-[var(--bg-secondary)] text-[var(--text-secondary)] hover:bg-[var(--bg-hover)] border border-[var(--border)]"
            }`}
          >
            <span>{cat.icon}</span>
            {cat.label}
            <span className="text-xs opacity-70">({categoryCounts[cat.id] || 0})</span>
          </button>
        ))}
      </div>

      {/* Results count */}
      <div className="mb-4 text-sm text-[var(--text-tertiary)]">
        Showing {filteredDocs.length} {filteredDocs.length === 1 ? "document" : "documents"}
      </div>

      {/* Doc Grid */}
      {filteredDocs.length > 0 ? (
        <div className="grid grid-cols-3 gap-4">
          {filteredDocs.map((doc) => (
            <DocCard key={doc.path} doc={doc} onClick={() => setSelectedDoc(doc)} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-[var(--text-tertiary)]">No documents found</p>
          <p className="text-xs text-[var(--text-tertiary)] mt-1">Try adjusting your search</p>
        </div>
      )}

      {/* Doc Viewer Modal */}
      {selectedDoc && (
        <DocViewer doc={selectedDoc} onClose={() => setSelectedDoc(null)} />
      )}
    </div>
  );
}
