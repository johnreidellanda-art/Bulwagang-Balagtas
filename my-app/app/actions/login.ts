"use server";

import { redirect } from "next/navigation";
import { clearSession, setSession } from "@/lib/session";
import type { LoginState, SessionUser } from "@/types/auth";

const DEMO_USER: SessionUser = {
  id: "1",
  email: "johnrick@gmail.com",
  name: "John Rick Alvarez",
  role: "customer", 
  phone: "09171234567",
  address: {
    unit: "B1 L5",
    street: "Main St.",
    barangay: "Barangay 1",
    municipality: "Atimonan",
    province: "Quezon",
  },
};

const DEMO_PASSWORD = "123456";

export async function login(
  _prevState: LoginState,
  formData: FormData,
): Promise<LoginState> {
  const email = formData.get("email")?.toString().trim().toLowerCase();
  const password = formData.get("password")?.toString();

  if (!email || !password) {
    return { error: "Please ensure that all fields have a value." };
  }

  if (email !== DEMO_USER.email || password !== DEMO_PASSWORD) {
    return { error: "Username or Password Mismatch." };
  }

  await setSession(DEMO_USER);
  const next = formData.get("next")?.toString() ?? "/profile"; 
  const safeNext =
    next.startsWith("/") && !next.startsWith("//") ? next : "/profile";
  redirect(safeNext);
}

export async function logout() {
  await clearSession();
  redirect("/login");
}