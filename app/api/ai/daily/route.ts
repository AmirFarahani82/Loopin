import { getDailyAiInsight } from "@/libs/analytics/dailyAiInsight";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const dailyAnalysis = await getDailyAiInsight();
    return NextResponse.json(dailyAnalysis);
  } catch (error) {
    if (error instanceof Error)
      return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
