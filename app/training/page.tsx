"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type Module = {
  module_id: string;
  name: string;
  description: string;
};

export default function TrainingPage() {
  const router = useRouter();
  const [modules, setModules] = useState<Module[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [token, setToken] = useState<string | undefined>(undefined);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get<Module[]>("/api/module");
      // defensive: ensure we get an array
      if (Array.isArray(res.data)) setModules(res.data);
      else setModules([]);
    } catch (err) {
      console.error("Failed to load modules", err);
      setError("Failed to load modules. Please try again later.");
      setModules([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    window.cookieStore.get("jwt").then((cookie) => {
      console.log(cookie);
      setToken(cookie?.value);
      if(token === undefined){
        // router.push("/")
      }
    });
    fetchData();
  }, []);
  return (
    <>
      <main className="min-h-screen flex items-start justify-center py-12 px-4">
        <section className="w-full max-w-5xl">
          <header className="mb-8">
            <h1 className="text-2xl md:text-3xl font-bold">Training Modules</h1>
            <p className="text-sm mt-1">
              Short lessons to help build social and emotional skills.
            </p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {loading ? (
              // simple loading placeholders
              Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className="animate-pulse bg-card border border-border rounded-lg p-4 h-28"
                />
              ))
            ) : error ? (
              <div className="col-span-1 md:col-span-2 p-4 bg-destructive/10 text-destructive rounded">
                {error}
              </div>
            ) : modules.length === 0 ? (
              <div className="col-span-1 md:col-span-2 p-6 text-muted">
                No modules available.
              </div>
            ) : (
              modules.map((module) => (
                <article
                  key={module.module_id}
                  className="bg-card text-card-foreground border border-border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
                  aria-labelledby={`${module.module_id}-title`}
                >
                  <div className="flex items-start justify-between">
                    <h2
                      id={`${module.module_id}-title`}
                      className="font-semibold text-lg mb-2"
                    >
                      {module.name}
                    </h2>
                    <span className="text-xs text-muted ml-3">
                      {module.module_id}
                    </span>
                  </div>
                  <p className="text-sm leading-relaxed">
                    {module.description}
                  </p>
                  <div className="mt-4">
                    <button
                      onClick={() =>
                        router.push(
                          `/training/${encodeURIComponent(module.module_id)}`
                        )
                      }
                      className="inline-flex items-center gap-2 px-3 py-1 text-sm rounded-md border border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
                      aria-label={`Start ${module.name}`}
                    >
                      Start
                    </button>
                  </div>
                </article>
              ))
            )}
          </div>
        </section>
      </main>
    </>
  );
}
