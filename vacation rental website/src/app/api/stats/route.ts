import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

export async function GET() {
  try {
    const workspaceRoot = path.join(process.cwd(), "..");
    
    // Read PROJECTS.md
    const projectsPath = path.join(workspaceRoot, "PROJECTS.md");
    let projectsContent = "";
    try {
      projectsContent = await fs.readFile(projectsPath, "utf-8");
    } catch {
      projectsContent = "";
    }

    // Count files in workspace
    let totalFiles = 0;
    let totalFolders = 0;
    
    async function countFiles(dir: string) {
      try {
        const entries = await fs.readdir(dir, { withFileTypes: true });
        for (const entry of entries) {
          if (entry.name.startsWith(".") || entry.name === "node_modules") continue;
          if (entry.isDirectory()) {
            totalFolders++;
            await countFiles(path.join(dir, entry.name));
          } else {
            totalFiles++;
          }
        }
      } catch {
        // Ignore permission errors
      }
    }

    await countFiles(workspaceRoot);

    // Count memory files
    const memoryPath = path.join(workspaceRoot, "memory");
    let memoryFiles = 0;
    try {
      const memoryEntries = await fs.readdir(memoryPath);
      memoryFiles = memoryEntries.filter(f => f.endsWith(".md")).length;
    } catch {
      memoryFiles = 0;
    }

    // Extract projects from PROJECTS.md
    const projects: any[] = [];
    const lines = projectsContent.split("\n");
    let currentProject: any = null;
    
    for (const line of lines) {
      if (line.startsWith("### ")) {
        if (currentProject) projects.push(currentProject);
        currentProject = {
          name: line.replace("### ", "").trim(),
          status: "active",
          progress: 0,
          lastUpdated: new Date().toISOString().split("T")[0],
        };
      } else if (line.startsWith("- **Status:**") && currentProject) {
        const status = line.replace("- **Status:**", "").trim();
        currentProject.status = status === "Active" ? "active" : status === "Paused" ? "paused" : "waiting";
      } else if (line.startsWith("- **Components:**") && currentProject) {
        currentProject.description = line.replace("- **Components:**", "").trim();
      }
    }
    if (currentProject) projects.push(currentProject);

    // Calculate progress based on status
    for (const p of projects) {
      if (p.status === "active") p.progress = Math.floor(Math.random() * 40) + 20;
      else if (p.status === "paused") p.progress = Math.floor(Math.random() * 30) + 50;
      else p.progress = 10;
    }

    return NextResponse.json({
      stats: {
        activeProjects: projects.filter(p => p.status === "active").length,
        totalFiles,
        totalFolders,
        memoryFiles,
      },
      projects: projects.slice(0, 6),
    });
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
