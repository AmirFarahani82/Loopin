import { NextResponse } from "next/server";
import { getHabits } from "@/libs/data/habits";

export async function GET() {
  const habits = await getHabits();
  return NextResponse.json(habits);
}
