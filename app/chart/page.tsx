'use client'
import { ChartAreaInteractive } from "@/components/chart-area-interactive";
import { ChartAreaDefault } from "@/components/chart-area-default";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
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
  const [token, setToken] = useState<string | undefined>(undefined);
  const router = useRouter();
  useEffect(() => {
    window.cookieStore.get("jwt").then((cookie) => {
      console.log(cookie);
      setToken(cookie?.value);
      if (token === undefined) {
        router.push("/");
      }
    });
  });
  return (
    <main className="p-4 max-w-7xl mx-auto">
      <header className="mb-4">
        <h1 className="text-2xl font-semibold">Charts</h1>
        <p className="text-sm text-gray-500">
          Overview of metrics and interactive visualisations
        </p>
      </header>

      {/* Top area: interactive chart with controls */}
      <section className="mb-6">
        <Card title="Interactive Overview">
          <div className="aspect-video">
            <div className="w-full h-full">
              <ChartAreaInteractive />
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
                <ChartAreaDefault />
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
                <ChartAreaDefault />
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
