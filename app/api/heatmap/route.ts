import { getHeatmapData } from "@/libs/data/heatmap";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const startDate = searchParams.get("startDate");
  const endDate = searchParams.get("endDate");
  if (!startDate || !endDate) {
    return NextResponse.json(
      { message: "Missing required query parameters: startDate and endDate" },
      { status: 400 },
    );
  }
  try {
    const heatmapData = await getHeatmapData(startDate, endDate);
    return NextResponse.json(heatmapData);
  } catch (error) {
    if (error instanceof Error)
      return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
