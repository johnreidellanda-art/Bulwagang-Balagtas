import { ResetPasswordForm } from "@/components/auths/reset-password-form";

export const metadata = {
  title: "Reset Password | Bulwagang Balagtas",
};

export default function ResetPasswordPage() {
  return (
    <main className="min-h-screen bg-base-200 flex items-center justify-center p-4">
      <ResetPasswordForm />
    </main>
  );
}