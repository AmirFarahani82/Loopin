import { getHabitLog } from "@/libs/data/habits";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const habitLogs = await getHabitLog();
    return NextResponse.json(habitLogs);
  } catch (error) {
    if (error instanceof Error)
      return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
