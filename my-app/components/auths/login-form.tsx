"use client";

import { useActionState, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Mail, Lock, Eye, EyeOff, MapPin } from "lucide-react";
import { login } from "@/app/actions/login";
import type { LoginState } from "@/types/auth";

const initialState: LoginState = {};

export const LoginForm = () => {
  const [state, formAction, isPending] = useActionState(login, initialState);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="w-full max-w-5xl bg-white rounded-2xl shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2 min-h-[580px]">
      <div className="p-8 md:p-12 flex flex-col justify-between items-center text-center">
        <div className="flex flex-col items-center w-full">
          <div className="relative w-20 h-20 mb-3 flex items-center justify-center">
            <Image
              src="/Images/Atimonan.png"
              alt="Seal Logo"
              width={80}
              height={80}
              priority
              className="object-contain w-auto h-auto"
            />
          </div>

          <h1 className="text-xl md:text-2xl font-black text-primary tracking-wide">
            BULWAGANG <span className="text-[#D97706]">BALAGTAS</span>
          </h1>
          <p className="text-[10px] md:text-xs font-semibold tracking-wider uppercase mt-0.5">
            ONLINE RESERVATION SYSTEM
          </p>

          <div className="mt-8 text-left w-full">
            <h2 className="text-xl font-bold text-gray-800">Welcome Back!</h2>
            <p className="text-md text-gray-500 mt-1">
              Please sign in to continue to your account
            </p>
          </div>
        </div>

        <form action={formAction} className="w-full space-y-4 my-6">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
              <Mail className="w-5 h-5 text-black" />
            </div>
            <input
              type="text"
              name="email"
              placeholder="Email Address"
              required
              className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-[#0F172A] focus:border-transparent transition"
            />
          </div>

          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
              <Lock className="w-5 h-5 text-black" />
            </div>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              required
              className="w-full pl-10 pr-10 py-2.5 rounded-lg border border-gray-300 text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-[#0F172A] focus:border-transparent transition"
            />
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                setShowPassword((prev) => !prev);
              }}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700 cursor-pointer z-30"
            >
              {showPassword ? (
                <EyeOff className="w-5 h-5 pointer-events-none" />
              ) : (
                <Eye className="w-5 h-5 pointer-events-none" />
              )}
            </button>
          </div>

          <div className="text-right">
            <Link
              href="/reset-password"
              className="text-md font-bold text-gray-700 hover:underline"
            >
              Forgot Password?
            </Link>
          </div>

          {state?.error && (
            <p className="text-xs text-red-500 text-left mt-1">{state.error}</p>
          )}

          <button
            type="submit"
            disabled={isPending}
            className="w-full py-2.5 bg-primary hover:bg-[#1E293B] text-white font-semibold text-sm rounded-lg transition duration-200 shadow-md disabled:opacity-50 mt-2 cursor-pointer"
          >
            {isPending ? "Signing In..." : "Sign In"}
          </button>
        </form>

        <div className="text-md text-gray-600">
          Do not have an account?{" "}
          <Link
            href="/register"
            className="text-[#D97706] font-bold hover:underline"
          >
            Register
          </Link>
        </div>
      </div>

      <div className="w-full md:w-full relative min-h-[300px] md:min-h-[500px]">
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
    </div>
  );
};
