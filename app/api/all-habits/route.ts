import { getAllHabits } from "@/libs/data/habits";
import { NextResponse } from "next/server";

export async function GET() {
  const allHabits = await getAllHabits();
  return NextResponse.json(allHabits);
}
