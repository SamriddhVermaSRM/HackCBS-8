import modules from "@/data/modules.json";
import { NextRequest, NextResponse } from "next/server";

export function GET() {
  const moduleDescription = Object.entries(modules).map((o) => ({
    module_id: o[0],
    name: o[1].name,
    description: o[1].description,
  }));
  return NextResponse.json(moduleDescription);
}

export async function POST(req: NextRequest) {
  const { module_id, index } = await req.json();

  const moduleLesson =
    modules[module_id as keyof typeof modules].lessons[index as number];
  if (!module) {
    return NextResponse.json({ error: "Module not found" }, { status: 404 });
  }
  return NextResponse.json(moduleLesson);
}
