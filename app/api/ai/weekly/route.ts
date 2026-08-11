import { getWeeklyAiInsight } from "@/libs/analytics/weeklyAiInsight";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const weeklyInsight = await getWeeklyAiInsight();
    return NextResponse.json(weeklyInsight);
  } catch (error) {
    if (error instanceof Error)
      return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
