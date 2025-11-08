import { NextRequest } from "next/server";
import modules from "@/data/modules.json";

export async function POST(req: NextRequest) {
  const pathname = req.nextUrl.pathname;
  const moduleId = decodeURIComponent(pathname.split("/").pop()!);
  const { lesson_id } = await req.json();

  console.log("Module ID:", moduleId);
  const moduleData = modules[moduleId as keyof typeof modules];
  console.log("Module Data:", moduleData);
  const moduleLesson = moduleData.lessons[lesson_id as number];
  console.log("Module Lesson:", moduleLesson);
  if (!moduleLesson) {
    return Response.json({ error: "Lesson not found" }, { status: 404 });
  }

  return Response.json(moduleLesson);
}
