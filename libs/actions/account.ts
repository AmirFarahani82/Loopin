"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "../../utils/supabase/server";

type UpdateAccountInput = {
  name?: string;
  email?: string;
};

export async function updateAccount({ name, email }: UpdateAccountInput) {
  const supabase = await createClient();

  const updateData: {
    email?: string;
    data?: {
      name?: string;
    };
  } = {};

  if (email) {
    updateData.email = email;
  }

  if (name) {
    updateData.data = {
      name,
    };
  }

  const { error } = await supabase.auth.updateUser(updateData);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/settings");
}
