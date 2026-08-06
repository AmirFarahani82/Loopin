import { requireSession } from "@/libs/data/habits";
import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const supabase = await createClient();
    const user = await requireSession();
    const today = new Date().toLocaleDateString("en-CA", {
      timeZone: user.timezone,
    });

    const { data, error } = await supabase.rpc("get_user_habits_analysis", {
      p_user_id: user.id,
      p_today: today,
    });

    if (error)
      throw new Error(`Failed to fetch Habits data - ${error.message}`);

    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
