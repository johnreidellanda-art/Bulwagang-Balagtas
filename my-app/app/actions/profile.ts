"use server";

import { getSession, setSession, clearSession } from "@/lib/session";
import { redirect } from "next/navigation";
import type { SessionUser, ActionResponse } from "@/types/auth";

export async function updateProfile(
  _prevState: ActionResponse,
  formData: FormData
): Promise<ActionResponse> {
  const user = await getSession();
  if (!user) return { error: "Your session has expired. Please sign in again." };

  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const phone = String(formData.get("phone") ?? "").trim();

  if (!name || !email) return { error: "Name and email are required." };
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    return { error: "Enter a valid email address." };

  const nextUser: SessionUser = {
    ...user,
    name,
    email,
    phone,
    address: {
      unit: formData.has("unit")
        ? String(formData.get("unit") ?? "").trim()
        : user.address?.unit,
      street: formData.has("street")
        ? String(formData.get("street") ?? "").trim()
        : user.address?.street,
      barangay: formData.has("barangay")
        ? String(formData.get("barangay") ?? "").trim()
        : user.address?.barangay,
      municipality: formData.has("municipality")
        ? String(formData.get("municipality") ?? "").trim()
        : user.address?.municipality,
      province: formData.has("province")
        ? String(formData.get("province") ?? "").trim()
        : user.address?.province,
    },
  };

  await setSession(nextUser);
  return { success: "Profile updated successfully." };
}

export async function changePassword(
  _prevState: ActionResponse,
  formData: FormData
): Promise<ActionResponse> {
  const user = await getSession();
  if (!user) return { error: "Your session has expired. Please sign in again." };

  const current = String(formData.get("currentPassword") ?? "");
  const next = String(formData.get("newPassword") ?? "");
  const confirm = String(formData.get("confirmPassword") ?? "");

  if (!current || !next || !confirm) return { error: "Complete all password fields." };
  if (next.length < 8) return { error: "Your new password must be at least 8 characters." };
  if (next !== confirm) return { error: "The new passwords do not match." };
  if (next === current) return { error: "Choose a password different from your current one." };

  if (current !== "123456") {
    return { error: "Your current password is incorrect." };
  }

  return { success: "Your password has been updated successfully!" };
}

export async function logout() {
  await clearSession();
  redirect("/login");
}