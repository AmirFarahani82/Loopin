import { getAiInsightData } from "@/libs/data/habitAnalysis";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const habitAnalysis = await getAiInsightData();
    return NextResponse.json(habitAnalysis);
  } catch (error) {
    if (error instanceof Error)
      return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
