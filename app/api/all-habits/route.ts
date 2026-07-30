import { getAllHabits } from "@/libs/data/habits";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const allHabits = await getAllHabits();
    return NextResponse.json(allHabits);
  } catch (error) {
    if (error instanceof Error)
      return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
