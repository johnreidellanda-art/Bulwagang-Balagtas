import type { ReactNode } from "react";


export type UserRole = "admin" | "staff" | "customer";

export type Address = {
  unit?: string;
  street?: string;
  barangay?: string;
  municipality?: string;
  province?: string;
};

export type SessionUser = {
  id: string;
  email: string;
  name: string;
  phone: string;
  role: UserRole; // Added: Needed for the Profile Dashboard
  address?: Address;
  createdAt?: string; // Added: Displayed on Profile
  lastLogin?: string; // Added: Displayed on Profile
};

export interface LoginState {
  error?: string;
}

export type RegisterState = {
  error?: string;
  values?: Record<string, string>;
  fieldErrors?: {
    firstName?: string[];
    middleName?: string[];
    lastName?: string[];
    email?: string[];
    contactNumber?: string[];
    password?: string[];
    confirmPassword?: string[];
    household?: string[];
    street?: string[];
    barangay?: string[];
    town?: string[];
    province?: string[];
    agreement?: string[];
  };
};

export type ResetPasswordState = {
  error?: string;
  success?: string;
  values?: Record<string, string>;
  fieldErrors?: {
    email?: string[];
  };
};

export interface ActionResponse {
  success?: string;
  error?: string;
  fieldErrors?: Record<string, string[]>;
}

export type ProfileActionState = {
  success?: string;
  error?: string;
  fieldErrors?: Record<string, string[]>;
};

export type CardProps = {
  children: ReactNode;
  className?: string;
};

export type FormFieldProps = {
  label?: string;
  htmlFor?: string;
  children: ReactNode;
};