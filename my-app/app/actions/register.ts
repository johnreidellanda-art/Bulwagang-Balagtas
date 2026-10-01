"use server";

import { redirect } from "next/navigation";

type RegisterState = {
  fieldErrors: Record<string, string[]>;
};

export async function register(
  _prevState: RegisterState,
  formData: FormData
): Promise<RegisterState> {

  let firstName = formData.get("firstName")?.toString().trim() || "";
  let middleName = formData.get("middleName")?.toString().trim() || "";
  let lastName = formData.get("lastName")?.toString().trim() || "";
  const email = formData.get("email")?.toString().trim().toLowerCase() || "";
  const contactNumber = formData.get("contactNumber")?.toString().trim() || "";
  const password = formData.get("password")?.toString() || "";
  const confirmPassword = formData.get("confirmPassword")?.toString() || "";
  const household = formData.get("household")?.toString().trim() || "";
  let street = formData.get("street")?.toString().trim() || "";
  const barangay = formData.get("barangay")?.toString() || "";
  const town = formData.get("town")?.toString() || "";
  const province = formData.get("province")?.toString() || "";
  const agreement = formData.get("agreement");

 
  const fieldErrors: Record<string, string[]> = {};

  //  PERSONAL INFORMATION 
  const nameRegex = /^[a-zA-Z\s]+$/;

  if (!firstName) fieldErrors.firstName = ["First name is required"];
  else if (!nameRegex.test(firstName)) fieldErrors.firstName = ["First name must contain only letters"];
  else firstName = firstName.charAt(0).toUpperCase() + firstName.slice(1).toLowerCase();

  if (!middleName) fieldErrors.middleName = ["Middle name is required"];
  else if (!nameRegex.test(middleName)) fieldErrors.middleName = ["Middle name must contain only letters"];
  else middleName = middleName.charAt(0).toUpperCase() + middleName.slice(1).toLowerCase();

  if (!lastName) fieldErrors.lastName = ["Last name is required"];
  else if (!nameRegex.test(lastName)) fieldErrors.lastName = ["Last name must contain only letters"];
  else lastName = lastName.charAt(0).toUpperCase() + lastName.slice(1).toLowerCase();

  //  CONTACT INFORMATION 
  if (!email) fieldErrors.email = ["Email is required"];
  else if (!/\S+@\S+\.\S+/.test(email)) fieldErrors.email = ["Invalid email format"];

  if (!contactNumber) fieldErrors.contactNumber = ["Contact number is required"];
  else if (!/^09\d{9}$/.test(contactNumber)) fieldErrors.contactNumber = ["Must be a valid 11-digit number starting with 09"];

  // PASSWORD 
  if (!password) fieldErrors.password = ["Password is required"];
  else if (password.length < 8) fieldErrors.password = ["Password must be at least 8 characters long"];
  else if (!/[A-Z]/.test(password)) fieldErrors.password = ["Password must contain at least one UPPERCASE letter"];
  else if (!/[a-z]/.test(password)) fieldErrors.password = ["Password must contain at least one lowercase letter"];
  else if (!/[0-9!@#$%^&*(),.?":{}|<>]/.test(password)) fieldErrors.password = ["Password must contain at least one number or special character"];

  if (password !== confirmPassword) fieldErrors.confirmPassword = ["Passwords do not match"];

  // ADDRESS 
  if (!street) fieldErrors.street = ["Street is required"];
  else street = street.replace(/\b\w/g, (char) => char.toUpperCase());

  if (!barangay) fieldErrors.barangay = ["Please select a Barangay"];
  if (!town) fieldErrors.town = ["Please select a Town/Municipality"];
  if (!province) fieldErrors.province = ["Please select a Province"];

  //  AGREEMENT 
  if (!agreement) fieldErrors.agreement = ["You must agree to the Terms and Conditions"];

  // If meron error ito
  if (Object.keys(fieldErrors).length > 0) {
    return { fieldErrors };
  }

  // PAG LAHAT OKAY NA
  console.log("Saving to DB:", { firstName, middleName, lastName, email, contactNumber });
  await new Promise((r) => setTimeout(r, 1000));
  redirect("/login");
}