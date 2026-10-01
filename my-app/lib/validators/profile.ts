const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^[0-9+\-\s()]{7,15}$/;

export type ValidationResult<T> =
  | { success: true; data: T }
  | { success: false; fieldErrors: Record<string, string[]> };


function addError(
  errors: Record<string, string[]>,
  field: string,
  message: string
) {
  if (!errors[field]) errors[field] = [];
  errors[field].push(message);
}

function isEmpty(errors: Record<string, string[]>): boolean {
  return Object.keys(errors).length === 0;
}

export type ProfileInput = {
  name: string;
  email: string;
  phone: string;
  unit: string;
  street: string;
  barangay: string;
  municipality: string;
  province: string;
};

export function validateProfile(
  formData: FormData
): ValidationResult<ProfileInput> {
  const errors: Record<string, string[]> = {};

  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const phone = String(formData.get("phone") ?? "").trim();
  const unit = String(formData.get("unit") ?? "").trim();
  const street = String(formData.get("street") ?? "").trim();
  const barangay = String(formData.get("barangay") ?? "").trim();
  const municipality = String(formData.get("municipality") ?? "").trim();
  const province = String(formData.get("province") ?? "").trim();

  // Name
  if (!name) {
    addError(errors, "name", "Full name is required.");
  } else if (name.length < 2) {
    addError(errors, "name", "Name must be at least 2 characters.");
  } else if (name.length > 100) {
    addError(errors, "name", "Name cannot exceed 100 characters.");
  }

  //  Email
  if (!email) {
    addError(errors, "email", "Email is required.");
  } else if (!EMAIL_REGEX.test(email)) {
    addError(errors, "email", "Enter a valid email address.");
  }

  // Phone 
  if (phone && !PHONE_REGEX.test(phone)) {
    addError(errors, "phone", "Enter a valid phone number (7-15 digits).");
  }

  //  Address
  if (unit && unit.length > 50) {
    addError(errors, "unit", "Unit is too long.");
  }
  if (street && street.length > 100) {
    addError(errors, "street", "Street is too long.");
  }

  if (!isEmpty(errors)) return { success: false, fieldErrors: errors };
  return {
    success: true,
    data: { name, email, phone, unit, street, barangay, municipality, province },
  };
}

export type PasswordInput = {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
};

export function validatePasswordChange(
  formData: FormData
): ValidationResult<PasswordInput> {
  const errors: Record<string, string[]> = {};

  const currentPassword = String(formData.get("currentPassword") ?? "");
  const newPassword = String(formData.get("newPassword") ?? "");
  const confirmPassword = String(formData.get("confirmPassword") ?? "");

  //  Current Password 
  if (!currentPassword) {
    addError(errors, "currentPassword", "Current password is required.");
  }

  //  New Password 
  if (!newPassword) {
    addError(errors, "newPassword", "New password is required.");
  } else {
    if (newPassword.length < 8) {
      addError(errors, "newPassword", "Password must be at least 8 characters.");
    }
    if (newPassword.length > 64) {
      addError(errors, "newPassword", "Password cannot exceed 64 characters.");
    }
    if (!/[A-Z]/.test(newPassword)) {
      addError(errors, "newPassword", "Must contain at least one uppercase letter.");
    }
    if (!/[a-z]/.test(newPassword)) {
      addError(errors, "newPassword", "Must contain at least one lowercase letter.");
    }
    if (!/[0-9]/.test(newPassword)) {
      addError(errors, "newPassword", "Must contain at least one number.");
    }
  }

  //  Confirm Password 
  if (!confirmPassword) {
    addError(errors, "confirmPassword", "Please confirm your new password.");
  } else if (newPassword && newPassword !== confirmPassword) {
    addError(errors, "confirmPassword", "Passwords do not match.");
  }

  if (currentPassword && newPassword && currentPassword === newPassword) {
    addError(errors, "newPassword", "New password must differ from current password.");
  }

  if (!isEmpty(errors)) return { success: false, fieldErrors: errors };
  return {
    success: true,
    data: { currentPassword, newPassword, confirmPassword },
  };
}