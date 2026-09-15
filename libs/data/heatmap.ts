import { createClient } from "../../utils/supabase/server";
import { requireSession } from "../actions/auth";

export async function getHeatmapData(startDate: string, endDate: string) {
  const supabase = await createClient();
  const user = await requireSession();

  const { data, error } = await supabase.rpc("get_completed_logs_heatmap", {
    p_user_id: user.id,
    p_start_date: startDate,
    p_end_date: endDate,
  });

  if (error) throw error;
  return data;
}
