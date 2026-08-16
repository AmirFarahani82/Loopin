import { getHabitAnalytics } from "@/libs/data/habitAnalysis";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const daysBack = Number(searchParams.get("daysBack")) ?? 30;
  try {
    const chartData = await getHabitAnalytics(daysBack);
    return NextResponse.json(chartData);
  } catch (error) {
    if (error instanceof Error)
      return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
