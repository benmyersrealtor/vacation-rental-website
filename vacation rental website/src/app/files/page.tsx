"use client";

import { useState, useEffect, useMemo } from "react";

interface FileItem {
  name: string;
  path: string;
  category: string;
  type: string;
  size: string;
  modified: string;
  isFolder: boolean;
}

const fileCategories = [
  { id: "all", label: "All Files", icon: "◈" },
  { id: "offers", label: "Offers", icon: "▸" },
  { id: "buyers", label: "Buyers", icon: "▤" },
  { id: "listings", label: "Listings", icon: "◫" },
  { id: "closed", label: "Closed", icon: "✓" },
  { id: "transaction", label: "Transaction Files", icon: "◉" },
  { id: "knowledge", label: "Knowledge Base", icon: "◷" },
  { id: "memory", label: "Memory", icon: "◫" },
  { id: "documents", label: "Documents", icon: "▻" },
  { id: "system", label: "System", icon: "⚙" },
];

const categoryColors: Record<string, string> = {
  transaction: "#f59e0b",
  offers: "#f59e0b",
  buyers: "#3b82f6",
  listings: "#8b5cf6",
  closed: "#22c55e",
  pending: "#eab308",
  forms: "#06b6d4",
  knowledge: "#22c55e",
  memory: "#71717a",
  documents: "#ec4899",
  system: "#5e6ad2",
};

const typeIcons: Record<string, string> = {
  folder: "📁",
  markdown: "📄",
  pdf: "📕",
  json: "📋",
  image: "🖼",
  file: "📄",
};

function FileRow({ file }: { file: FileItem }) {
  return (
    <div className="flex items-center gap-3 px-4 py-3 hover:bg-[var(--bg-hover)] transition-colors cursor-pointer border-b border-[var(--border)] last:border-b-0">
      <span className="text-lg">{typeIcons[file.type] || typeIcons.file}</span>
      <div className="flex-1 min-w-0">
        <div className="font-medium text-sm truncate">{file.name}</div>
        <div className="text-xs text-[var(--text-tertiary)] truncate">{file.path}</div>
      </div>
      <div className="flex items-center gap-4 text-xs text-[var(--text-tertiary)]">
        <span
          className="px-2 py-0.5 rounded-full"
          style={{
            backgroundColor: `${categoryColors[file.category]}20`,
            color: categoryColors[file.category] || "#71717a",
          }}
        >
          {file.category}
        </span>
        <span className="w-16 text-right">{file.size}</span>
        <span className="w-16 text-right">{file.modified}</span>
      </div>
    </div>
  );
}

export default function FilesPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");
  const [files, setFiles] = useState<FileItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/files")
      .then((res) => res.json())
      .then((data) => {
        setFiles(data.files || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const filteredFiles = useMemo(() => {
    return files.filter((file) => {
      const matchesCategory =
        selectedCategory === "all" ||
        file.category === selectedCategory ||
        (selectedCategory === "transaction" && ["offers", "buyers", "listings", "closed", "pending"].includes(file.category));
      const matchesSearch =
        searchQuery === "" ||
        file.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        file.path.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery, files]);

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: files.length };
    for (const file of files) {
      counts[file.category] = (counts[file.category] || 0) + 1;
    }
    return counts;
  }, [files]);

  const transactionCount = files.filter(f =>
    ["offers", "buyers", "listings", "closed", "pending", "forms"].includes(f.category)
  ).length;

  if (loading) {
    return (
      <div className="p-8">
        <header className="mb-8">
          <h1 className="text-2xl font-semibold mb-1">Files</h1>
          <p className="text-[var(--text-secondary)]">Loading...</p>
        </header>
      </div>
    );
  }

  return (
    <div className="p-8">
      <header className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold mb-1">Files</h1>
            <p className="text-[var(--text-secondary)]">Browse all workspace files</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setViewMode("list")}
              className={`p-2 rounded ${viewMode === "list" ? "bg-[var(--accent)] text-white" : "bg-[var(--bg-secondary)] text-[var(--text-secondary)]"}`}
            >
              ☰
            </button>
            <button
              onClick={() => setViewMode("grid")}
              className={`p-2 rounded ${viewMode === "grid" ? "bg-[var(--accent)] text-white" : "bg-[var(--bg-secondary)] text-[var(--text-secondary)]"}`}
            >
              ⊞
            </button>
          </div>
        </div>
      </header>

      {/* Search */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search files..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg px-4 py-3 text-sm text-[var(--text-primary)] placeholder-[var(--text-tertiary)] focus:outline-none focus:border-[var(--accent)]"
        />
      </div>

      {/* Categories */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        {fileCategories.map((cat) => {
          let count = categoryCounts[cat.id] || 0;
          if (cat.id === "transaction") count = transactionCount;
          
          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors whitespace-nowrap ${
                selectedCategory === cat.id
                  ? "bg-[var(--accent)] text-white"
                  : "bg-[var(--bg-secondary)] text-[var(--text-secondary)] hover:bg-[var(--bg-hover)] border border-[var(--border)]"
              }`}
            >
              <span>{cat.icon}</span>
              {cat.label}
              <span className="text-xs opacity-70">({count})</span>
            </button>
          );
        })}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg p-4">
          <div className="text-sm text-[var(--text-secondary)]">Total Files</div>
          <div className="text-2xl font-semibold">{files.filter(f => !f.isFolder).length}</div>
        </div>
        <div className="bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg p-4">
          <div className="text-sm text-[var(--text-secondary)]">Folders</div>
          <div className="text-2xl font-semibold">{files.filter(f => f.isFolder).length}</div>
        </div>
        <div className="bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg p-4">
          <div className="text-sm text-[var(--text-secondary)]">Transaction Files</div>
          <div className="text-2xl font-semibold text-[#f59e0b]">{transactionCount}</div>
        </div>
        <div className="bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg p-4">
          <div className="text-sm text-[var(--text-secondary)]">Knowledge Base</div>
          <div className="text-2xl font-semibold text-[#22c55e]">{files.filter(f => f.category === "knowledge").length}</div>
        </div>
      </div>

      {/* Results count */}
      <div className="mb-4 text-sm text-[var(--text-tertiary)]">
        Showing {filteredFiles.length} {filteredFiles.length === 1 ? "item" : "items"}
      </div>

      {/* Files List */}
      {filteredFiles.length > 0 ? (
        <div className="bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg overflow-hidden">
          {/* Header */}
          <div className="flex items-center gap-3 px-4 py-3 bg-[var(--bg-tertiary)] border-b border-[var(--border)] text-xs text-[var(--text-tertiary)] font-medium">
            <span className="w-6"></span>
            <span className="flex-1">Name</span>
            <span className="w-24 text-right">Category</span>
            <span className="w-16 text-right">Size</span>
            <span className="w-16 text-right">Modified</span>
          </div>
          {filteredFiles.slice(0, 100).map((file, i) => (
            <FileRow key={i} file={file} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-[var(--text-tertiary)]">No files found</p>
        </div>
      )}
    </div>
  );
}
