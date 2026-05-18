import { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export const Input = ({ label, required, ...props }: InputProps) => {
  return (
    <div>
      <label>
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input className="focus:bg-gray-200" {...props} />
    </div>
  );
};
