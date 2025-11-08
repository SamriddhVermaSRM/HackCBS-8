"use client";

export default function TrainingPage() {
  const modules = [
    {
      module_id: "Module 1A",
      name: "Comparision to Others",
      description:
        "A training module to help you understand the importance of being good enough.",
    },
    {
      module_id: "Module 1B",
      name: "Being Good Enough?",
      description:
        "A training module to help you understand the importance of being good enough.",
    },
    {
      module_id: "Module 1C",
      name: "Handling Peer Pressure",
      description:
        "A module about making choices when facing pressure from friends.",
    },
    {
      module_id: "Module 1D",
      name: "Dealing with Disappointment",
      description:
        "A module about coping with setbacks and not achieving a desired outcome.",
    },
    {
      module_id: "Module 2A",
      name: "Empathy & Perspective",
      description:
        "Understanding why someone else might act a certain way, even if it affects you.",
    },
    {
      module_id: "Module 2B",
      name: "Navigating Online Worlds",
      description:
        "Dealing with negativity online and choosing responsible actions.",
    },
    {
      module_id: "Module 2C",
      name: "Plans Change!",
      description:
        "Learning to adapt and manage feelings when things don't go as expected.",
    },
    {
      module_id: "Module 2D",
      name: "Effort vs. Outcome",
      description:
        "Recognizing the value of your own work and dealing with fairness in group settings.",
    },
  ];
  return (
    <>
      <main className="h-full flex justify-center items-center">
        <div className="flex justify-center items-center flex-col ">
          {modules.map((module) => (
            <div className="border-2 rounded-[10px] p-1 m-1.5">
              {module.name}
              <br></br>
              {module.description}
            </div>
          ))}
        </div>
      </main>
    </>
  );
}
