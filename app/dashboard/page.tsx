"use client";
import { ChartAreaInteractive } from "@/components/chart-area-interactive";
import { ChartAreaDefault } from "@/components/chart-area-default";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  AreaChart,
  Area,
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
const Card: React.FC<{ title?: string; children: React.ReactNode }> = ({
  title,
  children,
}) => {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
      {title && (
        <div className="px-4 py-2 border-b border-gray-100 dark:border-slate-800 bg-gray-50 dark:bg-slate-950 flex items-center justify-between">
          <h3 className="text-sm font-medium text-gray-700 dark:text-gray-200">
            {title}
          </h3>
          {/* actions placeholder - add controls here later */}
          <div className="ml-2 text-xs text-gray-500 dark:text-gray-400"></div>
        </div>
      )}
      <div className="p-4">{children}</div>
    </div>
  );
};

const page = () => {
  const router = useRouter();
  const [users, setUsers] = useState<Array<any>>([]);
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any | null>(null);
  const [groupedModules, setGroupedModules] = useState<Array<any>>([]);
  const [loadingLogs, setLoadingLogs] = useState(false);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    window.cookieStore.get("jwt").then((cookie) => {
      if (cookie === null) {
        router.push("/");
      }
    });
  });

  useEffect(() => {
    // fetch users present in logs
    async function loadUsers() {
      setLoadingUsers(true);
      try {
        const res = await fetch("/api/log");
        const data = await res.json();
        setUsers(Array.isArray(data) ? data : []);
      } catch (e) {
        console.error(e);
        setError("Failed to load users");
      } finally {
        setLoadingUsers(false);
      }
    }
    loadUsers();
  }, []);

  useEffect(() => {
    if (!selectedUser) return;
    // fetch logs grouped by module for selected user
    async function loadLogs() {
      setLoadingLogs(true);
      setError(null);
      try {
        const res = await fetch("/api/log", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId: selectedUser._id || selectedUser.id }),
        });
        const data = await res.json();
        // response is array of { moduleId, module, logs }
        setGroupedModules(Array.isArray(data) ? data : []);
      } catch (e) {
        console.error(e);
        setError("Failed to load logs for user");
      } finally {
        setLoadingLogs(false);
      }
    }
    loadLogs();
  }, [selectedUser]);

  // helper: aggregate logs array into chart data per day (count of logs)
  function logsToDailyCounts(logs: any[]) {
    const counts: Record<string, number> = {};
    for (const l of logs) {
      const d = new Date(l.timestamp).toISOString().slice(0, 10);
      counts[d] = (counts[d] || 0) + 1;
    }
    const arr = Object.entries(counts)
      .map(([date, count]) => ({ date, count }))
      .sort((a, b) => (a.date < b.date ? -1 : 1));
    return arr;
  }

  const allLogs = groupedModules.flatMap((m) => m.logs || []);
  const overallChartData = logsToDailyCounts(allLogs);

  const ChartFromLogs: React.FC<{ title?: string; logs: any[] }> = ({
    title,
    logs,
  }) => {
    const data = logsToDailyCounts(logs);
    return (
      <div>
        {title && <h4 className="text-sm font-medium mb-2">{title}</h4>}
        <div className="h-48 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ left: 0, right: 0 }}>
              <defs>
                <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#60a5fa" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#60a5fa" stopOpacity={0.1} />
                </linearGradient>
              </defs>
              <CartesianGrid vertical={false} strokeDasharray="3 3" />
              <XAxis dataKey="date" tickFormatter={(v) => v.slice(5)} />
              <Tooltip />
              <Area
                dataKey="count"
                type="natural"
                stroke="#2563eb"
                fill="url(#g1)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    );
  };
  return (
    <main className="p-4 max-w-7xl mx-auto">
      <Button
        className="absolute left-4 top-4 z-20"
        aria-label="Go back"
        onClick={() => {
          router.push("/");
        }}
      >
        <ArrowLeft />
      </Button>
      <header className="mb-4">
        <h1 className="text-2xl font-semibold">Charts</h1>
        <p className="text-sm text-gray-500">
          Overview of metrics and interactive visualisations
        </p>
      </header>

      {/* Top area: interactive chart with controls + user selector */}
      <section className="mb-6">
        <Card title="Interactive Overview">
          <div className="grid grid-cols-3 gap-4">
            <div className="col-span-1">
              <div className="p-2">
                <h4 className="text-sm font-medium mb-2">Users</h4>

                <div className="max-h-64 overflow-auto">
                  {loadingUsers ? (
                    <div></div>
                  ) : (
                    <button
                      onClick={() => setSelectedUser(null)}
                      className={`w-full text-left px-2 py-1 rounded-md mb-1 hover:bg-gray-100 dark:hover:bg-slate-800 ${
                        selectedUser === null
                          ? "bg-gray-100 dark:bg-slate-800"
                          : ""
                      }`}
                    >
                      <div className="text-sm font-medium">all Member</div>
                    </button>
                  )}
                  {loadingUsers ? (
                    <div>Loading users...</div>
                  ) : (
                    users.map((u) => (
                      <button
                        key={u._id}
                        onClick={() => setSelectedUser(u)}
                        className={`w-full text-left px-2 py-1 rounded-md mb-1 hover:bg-gray-100 dark:hover:bg-slate-800 ${
                          selectedUser?._id === u._id
                            ? "bg-gray-100 dark:bg-slate-800"
                            : ""
                        }`}
                      >
                        <div className="text-sm font-medium">
                          {u.name || u.email}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {u.email}
                        </div>
                      </button>
                    ))
                  )}
                </div>
              </div>
            </div>
            <div className="col-span-2">
              <div className="aspect-video">
                <div className="w-full h-full">
                  {/* overall chart for selected user */}
                  {selectedUser ? (
                    <div>
                      <h3 className="text-sm font-semibold mb-2">
                        Overall activity for{" "}
                        {selectedUser.name || selectedUser.email}
                      </h3>
                      {loadingLogs ? (
                        <div>Loading logs...</div>
                      ) : (
                        <ChartFromLogs logs={allLogs} />
                      )}
                    </div>
                  ) : (
                    <ChartAreaInteractive />
                  )}
                </div>
              </div>
            </div>
          </div>
        </Card>
      </section>

      {/* Grid of smaller charts + one expanded stacked chart */}
      <section>
        <div className="grid grid-cols-2 gap-4">
          <Card title="Daily Active">
            <div className="aspect-4/3">
              <div className="w-full h-full">
                {/* overall small chart */}
                {selectedUser ? (
                  <ChartFromLogs logs={allLogs} />
                ) : (
                  <ChartAreaDefault />
                )}
              </div>
            </div>
          </Card>

          <Card title="Weekly Summary">
            <div className="aspect-4/3">
              <div className="w-full h-full">
                <ChartAreaDefault />
              </div>
            </div>
          </Card>

          <Card title="Counsellor Activity">
            <div className="aspect-4/3">
              <div className="w-full h-full">
                {/* per-module small charts for selected user */}
                {selectedUser ? (
                  <div className="space-y-3 max-h-[220px] overflow-auto p-2">
                    {loadingLogs && <div>Loading modules...</div>}
                    {!loadingLogs && groupedModules.length === 0 && (
                      <div className="text-sm text-muted-foreground">
                        No logs for this user
                      </div>
                    )}
                    {groupedModules.map((m) => (
                      <div
                        key={m.moduleId}
                        className="p-2 bg-white/5 rounded-md"
                      >
                        <div className="text-sm font-medium">{m.moduleId}</div>
                        <ChartFromLogs logs={m.logs} />
                      </div>
                    ))}
                  </div>
                ) : (
                  <ChartAreaDefault />
                )}
              </div>
            </div>
          </Card>

          {/* Another small card to fill grid */}
          <Card title="Monthly Trend">
            <div className="aspect-4/3">
              <div className="w-full h-full">
                <ChartAreaDefault />
              </div>
            </div>
          </Card>
        </div>
      </section>
    </main>
  );
};

export default page;
