"use client";

import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Card, CardBody } from "@/components/ui/card";
import { FormField } from "@/components/ui/form-field";
import { ErrorMessage } from "@/components/ui/error-message";
import { Eye, EyeOff, UserPlus } from "lucide-react";
import Link from "next/link";
import {
  emptyRegisterForm,
  validateRegister,
  type RegisterFormShape,
  type FieldErrors,
  type StringFieldKey,
} from "@/lib/validators/register";

export const RegisterForm = () => {
  const router = useRouter();

  const [form, setForm] = useState<RegisterFormShape>(emptyRegisterForm);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [isPending, setIsPending] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const name = e.target.name as StringFieldKey;
    const value = e.target.value;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckbox = (e: ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, agreement: e.target.checked }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const err = validateRegister(form);
    setFieldErrors(err);

    if (Object.keys(err).length > 0) {
      setForm((prev) => {
        const next = { ...prev };

        if (err.firstName) next.firstName = "";
        if (err.middleName) next.middleName = "";
        if (err.lastName) next.lastName = "";
        if (err.email) next.email = "";
        if (err.contactNumber) next.contactNumber = "";

        // Password group: if EITHER password field has an error,
        // clear BOTH password fields.
        if (err.password || err.confirmPassword) {
          next.password = "";
          next.confirmPassword = "";
        }

        if (err.household) next.household = "";
        if (err.street) next.street = "";
        if (err.barangay) next.barangay = "";
        if (err.town) next.town = "";
        if (err.province) next.province = "";
        if (err.agreement) next.agreement = false;

        return next;
      });
      return;
    }

    setIsPending(true);
    try {
      console.log("Saving to DB:", form);
      await new Promise((r) => setTimeout(r, 1000));
      router.push("/login");
    } finally {
      setIsPending(false);
    }
  };

  return (
    <Card className="rounded-md px-4 py-8 max-w-3xl w-full shadow-lg bg-base-100">
      <CardBody>
        <div className="text-center mb-6">
          <img src="/Images/Atimonan.png" alt="Logo" className="w-20 h-20 mx-auto mb-2 object-contain" />
          <h2 className="text-2xl font-bold text-primary">Bulwagang Balagtas</h2>
          <p className="text-sm text-base-content/70">Sports Complex Online Reservation</p>
        </div>

        <h4 className="text-xl font-bold mb-1">Create account</h4>
        <p className="text-sm text-base-content/70 mb-6">Join the Bulwagang Balagtas community</p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* PERSONAL INFORMATION */}
          <div>
            <h3 className="text-xs font-bold tracking-wider uppercase mb-3 border-b pb-1">Personal Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FormField label="First Name" htmlFor="firstName">
                <input type="text" id="firstName" name="firstName" placeholder="Juan"
                  value={form.firstName} onChange={handleChange}
                  className={`input input-bordered w-full capitalize ${fieldErrors.firstName ? 'input-error' : ''}`} />
                <ErrorMessage errors={fieldErrors.firstName} />
              </FormField>
              <FormField label="Middle Name" htmlFor="middleName">
                <input type="text" id="middleName" name="middleName" placeholder="Santos"
                  value={form.middleName} onChange={handleChange}
                  className={`input input-bordered w-full capitalize ${fieldErrors.middleName ? 'input-error' : ''}`} />
                <ErrorMessage errors={fieldErrors.middleName} />
              </FormField>
              <FormField label="Last Name" htmlFor="lastName">
                <input type="text" id="lastName" name="lastName" placeholder="Dela Cruz"
                  value={form.lastName} onChange={handleChange}
                  className={`input input-bordered w-full capitalize ${fieldErrors.lastName ? 'input-error' : ''}`} />
                <ErrorMessage errors={fieldErrors.lastName} />
              </FormField>
            </div>
          </div>

          {/* CONTACT INFORMATION */}
          <div>
            <h3 className="text-xs font-bold tracking-wider uppercase mb-3 border-b pb-1">Contact Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField label="Email" htmlFor="email">
                <input type="email" id="email" name="email" placeholder="juan@gmail.com"
                  value={form.email} onChange={handleChange}
                  className={`input input-bordered w-full ${fieldErrors.email ? 'input-error' : ''}`} />
                <ErrorMessage errors={fieldErrors.email} />
              </FormField>
              <FormField label="Contact Number" htmlFor="contactNumber">
                <input type="tel" id="contactNumber" name="contactNumber" placeholder="09XXXXXXXXX"
                  inputMode="numeric" maxLength={11}
                  value={form.contactNumber} onChange={handleChange}
                  className={`input input-bordered w-full ${fieldErrors.contactNumber ? 'input-error' : ''}`} />
                <ErrorMessage errors={fieldErrors.contactNumber} />
              </FormField>
            </div>
          </div>

          {/* SECURITY */}
          <div>
            <h3 className="text-xs font-bold tracking-wider uppercase mb-3 border-b pb-1">Security</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField label="Password" htmlFor="password">
                <div className="relative">
                  <input type={showPassword ? "text" : "password"} id="password" name="password"
                    value={form.password} onChange={handleChange}
                    className={`input input-bordered w-full pr-10 ${fieldErrors.password ? 'input-error' : ''}`} />
                  <button type="button" onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-base-content/50">
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                <span className="text-xs text-base-content/60 mt-1 block">
                  Min 8 chars, 1 uppercase, 1 lowercase, 1 number/special char
                </span>
                <ErrorMessage errors={fieldErrors.password} />
              </FormField>
              <FormField label="Confirm Password" htmlFor="confirmPassword">
                <div className="relative">
                  <input type={showConfirmPassword ? "text" : "password"} id="confirmPassword" name="confirmPassword"
                    value={form.confirmPassword} onChange={handleChange}
                    className={`input input-bordered w-full pr-10 ${fieldErrors.confirmPassword ? 'input-error' : ''}`} />
                  <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-base-content/50">
                    {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                <ErrorMessage errors={fieldErrors.confirmPassword} />
              </FormField>
            </div>
          </div>

          {/* ADDRESS */}
          <div>
            <h3 className="text-xs font-bold tracking-wider uppercase mb-3 border-b pb-1">Address</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <FormField label="Household/Unit (Optional)" htmlFor="household">
                <input type="text" id="household" name="household" placeholder="Blk 5 Lot 8"
                  value={form.household} onChange={handleChange}
                  className="input input-bordered w-full" />
              </FormField>
              <FormField label="Street" htmlFor="street">
                <input type="text" id="street" name="street" placeholder="Mabini St."
                  value={form.street} onChange={handleChange}
                  className={`input input-bordered w-full capitalize ${fieldErrors.street ? 'input-error' : ''}`} />
                <ErrorMessage errors={fieldErrors.street} />
              </FormField>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FormField label="Barangay" htmlFor="barangay">
                <select id="barangay" name="barangay" value={form.barangay} onChange={handleChange}
                  className={`select select-bordered w-full ${fieldErrors.barangay ? 'select-error' : ''}`}>
                  <option value="" disabled>SELECT</option>
                  <option value="Barangay 1">Barangay 1</option>
                </select>
                <ErrorMessage errors={fieldErrors.barangay} />
              </FormField>
              <FormField label="Town/Municipality" htmlFor="town">
                <select id="town" name="town" value={form.town} onChange={handleChange}
                  className={`select select-bordered w-full ${fieldErrors.town ? 'select-error' : ''}`}>
                  <option value="" disabled>SELECT</option>
                  <option value="Town 1">Town 1</option>
                </select>
                <ErrorMessage errors={fieldErrors.town} />
              </FormField>
              <FormField label="Province" htmlFor="province">
                <select id="province" name="province" value={form.province} onChange={handleChange}
                  className={`select select-bordered w-full ${fieldErrors.province ? 'select-error' : ''}`}>
                  <option value="" disabled>SELECT</option>
                  <option value="Province 1">Province 1</option>
                </select>
                <ErrorMessage errors={fieldErrors.province} />
              </FormField>
            </div>
          </div>

          {/* AGREEMENT */}
          <div>
            <h3 className="text-xs font-bold tracking-wider uppercase mb-3 border-b pb-1">Agreement</h3>
            <div className="border border-base-300 rounded-box p-4 bg-base-200/50 mb-3 text-sm text-base-content/80">
              <p>By creating an account, you agree to comply with the rules and regulations of the Bulwagang Balagtas Sports Complex. All reservations are subject to approval and availability.</p>
            </div>
            <div className="form-control">
              <label className="label cursor-pointer justify-start gap-3">
                <input type="checkbox" name="agreement" checked={form.agreement} onChange={handleCheckbox}
                  className={`checkbox checkbox-primary ${fieldErrors.agreement ? 'checkbox-error' : ''}`} />
                <span className="label-text">I have read and agree to the Terms and Conditions</span>
              </label>
              <ErrorMessage errors={fieldErrors.agreement} />
            </div>
          </div>

          <button type="submit" className="btn btn-primary w-full text-base" disabled={isPending}>
            {isPending ? <span className="loading loading-spinner"></span> : <><UserPlus size={20} /> Create Account</>}
          </button>
        </form>

        <div className="text-center mt-6">
          <p className="text-sm">
            Already have an account?{" "}
            <Link href="/login" className="text-primary font-bold hover:underline">Sign in</Link>
          </p>
        </div>
      </CardBody>
    </Card>
  );
};