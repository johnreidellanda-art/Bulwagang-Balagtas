// app/profile/page.tsx
import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";
import ProfilePage from "@/components/auths/profile-page";

export default async function ProfileRoute() {
  const user = await getSession();

  if (!user) {
    redirect("/login");
  }

  return <ProfilePage user={user} />;
}