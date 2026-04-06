"use client";

import { useState } from "react";

type TaskStatus = "todo" | "doing" | "done";

interface Task {
  id: string;
  title: string;
  description: string;
  assignee: string;
  priority: "low" | "medium" | "high";
}

interface Activity {
  id: string;
  action: string;
  target: string;
  user: string;
  time: string;
}

const initialTasks: Task[] = [
  { id: "1", title: "Set up Brave Search LLM mode", description: "Enable llm-context mode in OpenClaw config", assignee: "Max", priority: "medium" },
  { id: "2", title: "VRBO sync optimization", description: "Improve sync frequency for listings", assignee: "Max", priority: "high" },
  { id: "3", title: "Knowledge Base RAG setup", description: "Implement vector embeddings for docs", assignee: "Ben", priority: "medium" },
  { id: "4", title: "Lead pipeline dashboard", description: "Create tracking view for leads", assignee: "Ben", priority: "low" },
  { id: "5", title: "Mission Control - Projects page", description: "Wire up real project data", assignee: "Max", priority: "high" },
  { id: "6", title: "Mission Control - Kanban board", description: "Build task board UI", assignee: "Max", priority: "high" },
];

const initialActivity: Activity[] = [
  { id: "1", action: "Moved task", target: "Mission Control skeleton → Done", user: "Max", time: "Just now" },
  { id: "2", action: "Commented on", target: "VRBO sync optimization", user: "Ben", time: "2m ago" },
  { id: "3", action: "Started", target: "Mission Control - Kanban board", user: "Max", time: "5m ago" },
  { id: "4", action: "Completed", target: "Set up Next.js project", user: "Max", time: "10m ago" },
  { id: "5", action: "Created", target: "Lead pipeline dashboard", user: "Ben", time: "15m ago" },
];

const columns: { id: TaskStatus; label: string; color: string }[] = [
  { id: "todo", label: "To Do", color: "var(--text-tertiary)" },
  { id: "doing", label: "Doing", color: "var(--warning)" },
  { id: "done", label: "Done", color: "var(--success)" },
];

const priorityColors = {
  low: "var(--text-tertiary)",
  medium: "var(--warning)",
  high: "var(--error)",
};

export default function KanbanPage() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [activity, setActivity] = useState<Activity[]>(initialActivity);
  const [draggedTask, setDraggedTask] = useState<Task | null>(null);

  const getTasksByStatus = (status: TaskStatus) => tasks.filter((t) => t.id.startsWith(statusMap[status] || ""));

  const handleDragStart = (task: Task) => {
    setDraggedTask(task);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (status: TaskStatus) => {
    if (!draggedTask) return;
    
    // For demo, just update the task ID prefix to reflect new status
    // In real app, would have a status field
    const taskIndex = tasks.findIndex((t) => t.id === draggedTask.id);
    if (taskIndex > -1) {
      const updatedTasks = [...tasks];
      const newId = statusMap[status] + "-" + Date.now();
      updatedTasks[taskIndex] = { ...draggedTask, id: newId };
      setTasks(updatedTasks);
      
      // Add activity
      const newActivity: Activity = {
        id: Date.now().toString(),
        action: "Moved",
        target: `${draggedTask.title} → ${columns.find((c) => c.id === status)?.label}`,
        user: "You",
        time: "Just now",
      };
      setActivity([newActivity, ...activity.slice(0, 9)]);
    }
    setDraggedTask(null);
  };

  const getTasksForColumn = (status: TaskStatus) => {
    return tasks.filter((t) => {
      if (status === "todo") return !t.id.startsWith("doing") && !t.id.startsWith("done");
      if (status === "doing") return t.id.startsWith("doing");
      if (status === "done") return t.id.startsWith("done");
      return false;
    });
  };

  return (
    <div className="p-8">
      <header className="mb-8">
        <h1 className="text-2xl font-semibold mb-1">Tasks</h1>
        <p className="text-[var(--text-secondary)]">Kanban board for workflow management</p>
      </header>

      <div className="grid grid-cols-4 gap-6">
        {/* Kanban Board */}
        <div className="col-span-3">
          <div className="grid grid-cols-3 gap-4">
            {columns.map((column) => (
              <div
                key={column.id}
                className="bg-[var(--bg-secondary)] rounded-lg border border-[var(--border)] min-h-[500px]"
                onDragOver={handleDragOver}
                onDrop={() => handleDrop(column.id)}
              >
                {/* Column Header */}
                <div className="p-4 border-b border-[var(--border)] flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: column.color }}
                    />
                    <span className="font-medium">{column.label}</span>
                  </div>
                  <span className="text-xs text-[var(--text-tertiary)]">
                    {getTasksForColumn(column.id).length}
                  </span>
                </div>

                {/* Cards */}
                <div className="p-3 space-y-2">
                  {getTasksForColumn(column.id).map((task) => (
                    <div
                      key={task.id}
                      draggable
                      onDragStart={() => handleDragStart(task)}
                      className="bg-[var(--bg-tertiary)] border border-[var(--border)] rounded-lg p-3 cursor-grab hover:border-[var(--text-tertiary)] transition-colors"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <span className="font-medium text-sm">{task.title}</span>
                        <span
                          className="w-2 h-2 rounded-full mt-1"
                          style={{ backgroundColor: priorityColors[task.priority] }}
                          title={task.priority}
                        />
                      </div>
                      <p className="text-xs text-[var(--text-tertiary)] mb-2 line-clamp-2">
                        {task.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-[var(--text-secondary)]">{task.assignee}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Live Activity Feed */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <span className="w-2 h-2 rounded-full bg-[var(--success)] animate-pulse" />
            <h2 className="text-lg font-medium">Live Activity</h2>
          </div>
          <div className="bg-[var(--bg-secondary)] rounded-lg border border-[var(--border)] divide-y divide-[var(--border)]">
            {activity.map((item) => (
              <div key={item.id} className="px-4 py-3">
                <div className="text-sm">
                  <span className="text-[var(--text-secondary)]">{item.action}</span>{" "}
                  <span className="font-medium">{item.target}</span>
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs text-[var(--text-tertiary)]">{item.user}</span>
                  <span className="text-xs text-[var(--text-tertiary)]">•</span>
                  <span className="text-xs text-[var(--text-tertiary)]">{item.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

const statusMap: Record<TaskStatus, string> = {
  todo: "todo",
  doing: "doing",
  done: "done",
};
