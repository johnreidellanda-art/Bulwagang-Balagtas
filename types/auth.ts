
import type { ReactNode } from "react";

export type SessionUser = {
  id: string;
  email: string;
  name: string;
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

export type CardProps = {
  children: ReactNode;
  className?: string;
};

export type FormFieldProps = {
  label?: string;
  htmlFor?: string;
  children: ReactNode;
};

export type ResetPasswordState = {
  error?: string;
  success?: string;
  values?: Record<string, string>;
  fieldErrors?: {
  email?: string[];
  };
};

