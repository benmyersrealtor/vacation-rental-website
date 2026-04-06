import { promises as fs } from "fs";
import path from "path";

interface MemoryFile {
  name: string;
  date: string;
  path: string;
  size: number;
}

async function getMemoryFiles(): Promise<MemoryFile[]> {
  const memoryDir = path.join(process.cwd(), "..", "memory");
  
  try {
    const files = await fs.readdir(memoryDir);
    const mdFiles = files
      .filter((f) => f.endsWith(".md"))
      .map((f) => ({
        name: f,
        date: f.split("-").slice(0, 3).join("-"),
        path: path.join(memoryDir, f),
        size: 0,
      }))
      .sort((a, b) => b.date.localeCompare(a.date)); // newest first
    
    // Get file sizes
    for (const file of mdFiles) {
      const stat = await fs.stat(file.path);
      file.size = stat.size;
    }
    
    return mdFiles;
  } catch {
    return [];
  }
}

async function getLongTermMemory(): Promise<string | null> {
  const memoryPath = path.join(process.cwd(), "..", "MEMORY.md");
  
  try {
    return await fs.readFile(memoryPath, "utf-8");
  } catch {
    return null;
  }
}

export default async function MemoryPage() {
  const memoryFiles = await getMemoryFiles();
  const longTermMemory = await getLongTermMemory();

  return (
    <div className="p-8">
      <header className="mb-8">
        <h1 className="text-2xl font-semibold mb-1">Memory</h1>
        <p className="text-[var(--text-secondary)]">Daily notes and long-term memory</p>
      </header>

      {/* Long-term Memory Section */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <h2 className="text-lg font-medium">Long-term Memory</h2>
          <span className="text-xs px-2 py-0.5 rounded-full bg-[var(--accent)] bg-opacity-20 text-[var(--accent)]">
            Curated
          </span>
        </div>
        
        {longTermMemory ? (
          <div className="bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg p-6">
            <div className="prose prose-invert prose-sm max-w-none">
              {longTermMemory.split("\n").map((line, i) => {
                if (line.startsWith("# ")) {
                  return <h1 key={i} className="text-xl font-semibold mb-4">{line.slice(2)}</h1>;
                }
                if (line.startsWith("## ")) {
                  return <h2 key={i} className="text-lg font-medium mb-3 mt-6">{line.slice(3)}</h2>;
                }
                if (line.startsWith("- **")) {
                  return <div key={i} className="mb-1">{line}</div>;
                }
                if (line.trim() === "") {
                  return <br key={i} />;
                }
                return <p key={i} className="text-[var(--text-secondary)] mb-2">{line}</p>;
              })}
            </div>
          </div>
        ) : (
          <div className="bg-[var(--bg-secondary)] border border-[var(--border)] border-dashed rounded-lg p-6 text-center">
            <p className="text-[var(--text-tertiary)]">No long-term memory yet</p>
            <p className="text-xs text-[var(--text-tertiary)] mt-1">MEMORY.md will appear here when created</p>
          </div>
        )}
      </div>

      {/* Daily Memory Section */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-medium">Daily Memories</h2>
          <span className="text-xs text-[var(--text-tertiary)]">
            {memoryFiles.length} {memoryFiles.length === 1 ? "day" : "days"} logged
          </span>
        </div>
        
        {memoryFiles.length > 0 ? (
          <div className="space-y-3">
            {memoryFiles.map((file) => (
              <MemoryDayCard key={file.name} file={file} />
            ))}
          </div>
        ) : (
          <div className="bg-[var(--bg-secondary)] border border-[var(--border)] border-dashed rounded-lg p-6 text-center">
            <p className="text-[var(--text-tertiary)]">No daily memories yet</p>
          </div>
        )}
      </div>
    </div>
  );
}

async function MemoryDayCard({ file }: { file: MemoryFile }) {
  const content = await fs.readFile(file.path, "utf-8");
  
  // Extract title from first heading
  const titleMatch = content.match(/^#\s+(.+)$/m);
  const title = titleMatch ? titleMatch[1] : file.name.replace(".md", "");
  
  // Get first paragraph for preview
  const lines = content.split("\n");
  const preview = lines
    .filter((l) => !l.startsWith("#") && l.trim() !== "")
    .slice(0, 2)
    .join(" ")
    .slice(0, 150);

  // Format date nicely
  const dateObj = new Date(file.date);
  const formattedDate = dateObj.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <details className="group bg-[var(--bg-secondary)] border border-[var(--border)] rounded-lg overflow-hidden">
      <summary className="p-4 cursor-pointer hover:bg-[var(--bg-hover)] transition-colors list-none">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h3 className="font-medium">{title}</h3>
            </div>
            <p className="text-xs text-[var(--text-tertiary)]">{formattedDate}</p>
            {preview && (
              <p className="text-sm text-[var(--text-secondary)] mt-2 line-clamp-2">{preview}...</p>
            )}
          </div>
          <span className="text-[var(--text-tertiary)] group-open:rotate-90 transition-transform">▶</span>
        </div>
      </summary>
      <div className="px-4 pb-4 pt-2 border-t border-[var(--border)]">
        <pre className="text-xs text-[var(--text-secondary)] whitespace-pre-wrap font-mono bg-[var(--bg-tertiary)] p-4 rounded-lg overflow-x-auto max-h-96">
{content}
        </pre>
      </div>
    </details>
  );
}
