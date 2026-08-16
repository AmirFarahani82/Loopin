import { getAiInsightData } from "@/libs/data/habitAnalysis";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const habitAnalysis = await getAiInsightData();
    return NextResponse.json(habitAnalysis);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
