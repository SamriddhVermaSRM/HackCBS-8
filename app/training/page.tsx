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
  const fechData = async() => {
    const data = await axios.get("http://localhost:3000/api/module")
    console.log(data.data);
    setModules(data.data)
  };
  useEffect(()=>{
    fechData()
  },[])
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
            {modules.map((module) => (
              <article
                key={module.module_id}
                className="bg-card text-card-foreground border border-border rounded-lg p-4 shadow-sm"
                aria-labelledby={`${module.module_id}-title`}
              >
                <h2
                  id={`${module.module_id}-title`}
                  className="font-semibold text-lg mb-2"
                >
                  {module.name}
                </h2>
                <p className="text-sm leading-relaxed">{module.description}</p>
                <div className="mt-4">
                  <button
                    onClick={() =>
                      router.push(
                        `/training/${encodeURIComponent(module.module_id)}`
                      )
                    }
                    className="px-3 py-1 text-sm rounded-md border border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
                  >
                    Start
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
