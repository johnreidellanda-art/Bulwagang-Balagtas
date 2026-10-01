"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, CardBody } from "../ui/card";
import { FormField } from "../ui/form-field";
import { ErrorMessage } from "../ui/error-message";
import { Mail, ArrowLeft, MapPin } from "lucide-react";
import type { ResetPasswordState } from "@/types/auth";
import { resetPassword } from "@/app/actions/reset";
import { validateResetPassword } from "@/lib/validators/reset-password";

export const ResetPasswordForm = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [state, setState] = useState<ResetPasswordState>({});

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  e.stopPropagation();  // 👈 Stop any parent form behavior
  
  const savedEmail = email; // 👈 Save the value
  setLoading(true);

  const result = validateResetPassword(email);
  if (result.hasErrors) {
    setState({ fieldErrors: result.fieldErrors });
    setLoading(false);
    setEmail(savedEmail); // restore
    return;
  }

  await new Promise((r) => setTimeout(r, 1000));
  setLoading(false);
  setState({ success: "Reset link sent to " + email });
  setEmail(savedEmail); // 👈 Restore after success
};

  return (
    <Card className="overflow-hidden max-w-5xl w-full mx-auto p-0 flex flex-col md:flex-row rounded-3xl shadow-2xl">
      {/* LEFT SIDE: FORM */}
      <CardBody className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
        <div className="text-center mb-8">
          <img
            src="/Images/Atimonan.png"
            alt="Bulwagang Balagtas Logo"
            className="w-20 h-20 mx-auto mb-3 object-contain"
          />
          <h1 className="text-2xl font-bold text-primary tracking-wide">
            BULWAGANG <span className="text-warning">BALAGTAS</span>
          </h1>
          <p className="text-xs text-base-content/70 uppercase tracking-widest mt-1">
            Online Reservation System
          </p>
        </div>

        <h2 className="text-xl font-bold mb-2">Reset Password</h2>
        <p className="text-sm text-base-content/70 mb-6">
          Enter your email address and we will send you a link to reset your password.
        </p>

        {state.success && (
          <div className="alert alert-success mb-4 text-sm">
            <span>{state.success}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <FormField label="" htmlFor="email">
            <div className="relative">
              <Mail
                className="absolute left-3 top-1/2 -translate-y-1/2 text-base-content/50"
                size={18}
              />
              <input
                type="email"
                id="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`input input-bordered w-full pl-10 ${
                  state.fieldErrors?.email ? "input-error" : ""
                }`}
              />
            </div>
            <ErrorMessage errors={state.fieldErrors?.email} />
          </FormField>

          <button
            type="submit"
            className="btn btn-primary w-full text-base"
            disabled={loading}
          >
            {loading ? (
              <span className="loading loading-spinner"></span>
            ) : (
              "Send Reset Link"
            )}
          </button>
        </form>

        <div className="mt-8 text-center">
          <Link
            href="/login"
            className="inline-flex items-center gap-2 text-sm font-bold text-primary hover:underline"
          >
            <ArrowLeft size={16} />
            Back to login
          </Link>
        </div>
      </CardBody>

      {/* RIGHT SIDE: BUILDING IMAGE */}
      <div className="w-full md:w-1/2 relative min-h-[300px] md:min-h-[500px]">
        {/* 👇 The image has a border on the top (mobile) or left (desktop) */}
        <img
          src="/Images/Balagtas.png"
          alt="Bulwagang Balagtas Building"
          className=" absolute inset-0 w-full h-full object-cover rounded-sm border-l-4 border-orange-500 md:rounded-sm  md:border-l-4"
        />

        {/* Location Badge */}
        <a
          href="https://www.google.com/maps/search/?api=1&query=Bulwagang+Balagtas+Atimonan+Quezon"
          target="_blank"
          rel="noopener noreferrer"
          className="absolute  bottom-4 right-30 bg-base-100/90 backdrop-blur-sm px-3 py-2 rounded-lg shadow-md flex items-center gap-2 text-xs font-medium hover:bg-primary hover:text-primary-content transition-colors z-10"
        >
          <MapPin size={14} />
          2W3C+G3C, D Ricafort, Atimonan, Quezon
        </a>
      </div>
    </Card>
  );
};