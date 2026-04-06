import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

interface FileItem {
  name: string;
  path: string;
  category: string;
  type: string;
  size: string;
  modified: string;
  isFolder: boolean;
}

function getCategoryFromPath(filePath: string): string {
  if (filePath.includes("/Transaction Files/Offers/")) return "offers";
  if (filePath.includes("/Transaction Files/Buyers/")) return "buyers";
  if (filePath.includes("/Transaction Files/Listings/")) return "listings";
  if (filePath.includes("/Transaction Files/Closed/")) return "closed";
  if (filePath.includes("/Transaction Files/Pending/")) return "pending";
  if (filePath.includes("/Transaction Files/")) return "transaction";
  if (filePath.includes("/knowledge/")) return "knowledge";
  if (filePath.includes("/memory/")) return "memory";
  if (filePath.includes("/documents/")) return "documents";
  if (!filePath.includes("/")) return "system";
  return "other";
}

function getTypeFromName(name: string, isFolder: boolean): string {
  if (isFolder) return "folder";
  if (name.endsWith(".md")) return "markdown";
  if (name.endsWith(".pdf")) return "pdf";
  if (name.endsWith(".json")) return "json";
  if (name.match(/\.(jpg|jpeg|png|gif|svg)$/i)) return "image";
  return "file";
}

function formatSize(bytes: number): string {
  if (bytes === 0) return "-";
  if (bytes < 1024) return bytes + " B";
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
  return (bytes / (1024 * 1024)).toFixed(1) + " MB";
}

export async function GET() {
  try {
    const workspaceRoot = path.join(process.cwd(), "..");
    const files: FileItem[] = [];

    async function scanDir(dir: string, depth: number = 0) {
      if (depth > 3) return; // Limit depth

      try {
        const entries = await fs.readdir(dir, { withFileTypes: true });
        
        for (const entry of entries) {
          if (entry.name.startsWith(".")) continue;
          if (entry.name === "node_modules") continue;
          if (entry.name === "mission-control") continue;
          
          const fullPath = path.join(dir, entry.name);
          const relativePath = fullPath.replace(workspaceRoot, "");
          
          if (entry.isDirectory()) {
            files.push({
              name: entry.name + "/",
              path: relativePath,
              category: getCategoryFromPath(relativePath),
              type: "folder",
              size: "-",
              modified: "folder",
              isFolder: true,
            });
            await scanDir(fullPath, depth + 1);
          } else {
            try {
              const stat = await fs.stat(fullPath);
              files.push({
                name: entry.name,
                path: relativePath,
                category: getCategoryFromPath(relativePath),
                type: getTypeFromName(entry.name, false),
                size: formatSize(stat.size),
                modified: stat.mtime.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
                isFolder: false,
              });
            } catch {
              // Skip files we can't stat
            }
          }
        }
      } catch {
        // Ignore permission errors
      }
    }

    await scanDir(workspaceRoot);

    // Sort: folders first, then by name
    files.sort((a, b) => {
      if (a.isFolder && !b.isFolder) return -1;
      if (!a.isFolder && b.isFolder) return 1;
      return a.name.localeCompare(b.name);
    });

    return NextResponse.json({ files: files.slice(0, 200) });
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
