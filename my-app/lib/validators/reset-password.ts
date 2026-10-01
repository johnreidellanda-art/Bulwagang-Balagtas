// Validation for Reset Password

export const validateEmail = (email: string): string | null => {
  if (!email) {
    return "Email is required";
  }
  if (!/\S+@\S+\.\S+/.test(email)) {
    return "Invalid email format";
  }
  return null;
};

export const validateResetPassword = (email: string) => {
  const fieldErrors: { email?: string[] } = {};

  const emailError = validateEmail(email);
  if (emailError) {
    fieldErrors.email = [emailError];
  }

  return {
    hasErrors: Object.keys(fieldErrors).length > 0,
    fieldErrors,
  };
};