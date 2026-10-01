"use server";

import type { ResetPasswordState } from "@/types/auth";
import { validateResetPassword } from "@/lib/validators/reset-password";

// Demo users 
const DEMO_USERS = [
  { email: "johnrick@gmail.com", name: "Administrator" },
  { email: "juan@gmail.com", name: "Juan Dela Cruz" },
];

export async function resetPassword(
  _prevState: ResetPasswordState,
  formData: FormData
): Promise<ResetPasswordState> {
  const email = formData.get("email")?.toString().trim().toLowerCase() || "";

  // Validate email 
  const result = validateResetPassword(email);
  if (result.hasErrors) {
    return { fieldErrors: result.fieldErrors };
  }

  // Check if email exists
  const user = DEMO_USERS.find((u) => u.email === email);
  if (!user) {
    return {
      fieldErrors: { email: ["No account found with this email"] },
    };
  }

  //  Simulate sending the reset link
  await new Promise((r) => setTimeout(r, 1000));

  console.log("Password reset link sent to:", email);

  return { success: `Reset link sent to ${email}` };
}