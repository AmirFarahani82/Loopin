import { getHabitLog } from "@/libs/data/habits";
import { NextResponse } from "next/server";

export async function GET() {
  const habitLogs = await getHabitLog();
  return NextResponse.json(habitLogs);
}
