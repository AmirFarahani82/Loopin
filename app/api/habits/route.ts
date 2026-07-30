import { NextResponse } from "next/server";
import { getHabits } from "@/libs/data/habits";

export async function GET() {
  try {
    const habits = await getHabits();
    return NextResponse.json(habits);
  } catch (error) {
    if (error instanceof Error)
      return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
