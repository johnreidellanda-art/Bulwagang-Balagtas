// Pure validation rules for the Register form.
// No React, no "use client", no "use server" — just a plain function
// you can call from anywhere (client, server, tests).

export const emptyRegisterForm = {
  firstName: "",
  middleName: "",
  lastName: "",
  email: "",
  contactNumber: "",
  password: "",
  confirmPassword: "",
  household: "",
  street: "",
  barangay: "",
  town: "",
  province: "",
  agreement: false,
};

export type RegisterFormShape = typeof emptyRegisterForm;

// Every form field can have an array of error messages.
export type FieldErrors = Partial<Record<keyof RegisterFormShape, string[]>>;

// Keys of RegisterFormShape whose value is a string (everything except `agreement`)
export type StringFieldKey = {
  [K in keyof RegisterFormShape]: RegisterFormShape[K] extends string ? K : never;
}[keyof RegisterFormShape];

export function validateRegister(data: RegisterFormShape): FieldErrors {
  const err: FieldErrors = {};
  const nameRegex = /^[a-zA-Z\s]+$/;

  // --- PERSONAL INFORMATION ---
  if (!data.firstName) err.firstName = ["First name is required"];
  else if (!nameRegex.test(data.firstName))
    err.firstName = ["First name must contain only letters"];

  if (!data.middleName) err.middleName = ["Middle name is required"];
  else if (!nameRegex.test(data.middleName))
    err.middleName = ["Middle name must contain only letters"];

  if (!data.lastName) err.lastName = ["Last name is required"];
  else if (!nameRegex.test(data.lastName))
    err.lastName = ["Last name must contain only letters"];

  // --- CONTACT INFORMATION ---
  if (!data.email) err.email = ["Email is required"];
  else if (!/\S+@\S+\.\S+/.test(data.email))
    err.email = ["Invalid email format"];

  if (!data.contactNumber)
    err.contactNumber = ["Contact number is required"];
  else if (!/^09\d{9}$/.test(data.contactNumber))
    err.contactNumber = ["Must be a valid 11-digit number starting with 09"];

  // --- PASSWORD ---
  if (!data.password) err.password = ["Password is required"];
  else if (data.password.length < 8)
    err.password = ["Password must be at least 8 characters long"];
  else if (!/[A-Z]/.test(data.password))
    err.password = ["Password must contain at least one UPPERCASE letter"];
  else if (!/[a-z]/.test(data.password))
    err.password = ["Password must contain at least one lowercase letter"];
  else if (!/[0-9!@#$%^&*(),.?":{}|<>]/.test(data.password))
    err.password = [
      "Password must contain at least one number or special character",
    ];

  if (data.password !== data.confirmPassword)
    err.confirmPassword = ["Passwords do not match"];

  // --- ADDRESS ---
  if (!data.street) err.street = ["Street is required"];
  if (!data.barangay) err.barangay = ["Please select a Barangay"];
  if (!data.town) err.town = ["Please select a Town/Municipality"];
  if (!data.province) err.province = ["Please select a Province"];

  // --- AGREEMENT ---
  if (!data.agreement)
    err.agreement = ["You must agree to the Terms and Conditions"];

  return err;
}