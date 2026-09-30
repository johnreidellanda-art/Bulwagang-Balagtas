export const ErrorMessage = ({ errors }: { errors?: string[] }) => {
  if (!errors || errors.length === 0) return null;
  return <span className="text-error text-xs mt-1 block">{errors[0]}</span>;
};