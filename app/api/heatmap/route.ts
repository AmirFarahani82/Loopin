import { getHeatmapData } from "@/libs/data/heatmap";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const startDate = searchParams.get("startDate");
  const endDate = searchParams.get("endDate");
  if (!startDate || !endDate) {
    return NextResponse.json(
      { error: "Missing required query parameters: startDate and endDate" },
      { status: 400 },
    );
  }
  const heatmapData = await getHeatmapData(startDate, endDate);
  return NextResponse.json(heatmapData);
}
