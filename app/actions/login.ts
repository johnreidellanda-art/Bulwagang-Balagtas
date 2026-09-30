"use server";

import { redirect } from "next/navigation";
import { clearSession, setSession } from "@/lib/session";
import type { LoginState } from "@/types/auth";

const DEMO_USER = {
  id: "1",
  email: "johnrick@gmail.com",
  name: "Administrator",
};

const DEMO_PASSWORD = "123456";

export async function login(
  _prevState: LoginState,
  formData: FormData,
): Promise<LoginState> {
  const email = formData.get("email")?.toString().trim().toLowerCase();
  const password = formData.get("password")?.toString();

  if (!email || !password) {
    return { error: "Please ensure that all fields has value." };
  }

  if (email !== DEMO_USER.email || password !== DEMO_PASSWORD) {
    return { error: "Username or Password Mismatch." };
  }

  await setSession({
    id: DEMO_USER.id,
    email: DEMO_USER.email,
    name: DEMO_USER.name,
  });

  const next = formData.get("next")?.toString() ?? "/dashboard";
  const safeNext =
    next.startsWith("/") && !next.startsWith("//") ? next : "/dashboard";
  redirect(safeNext);
}

export async function nalogoutme() {
  await clearSession();
  redirect("/login");
}
