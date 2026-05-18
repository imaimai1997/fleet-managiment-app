import { SelectHTMLAttributes } from "react";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: { key: string | number; value: string | number }[];
}

export const Select = ({ label, options, required, ...props }: SelectProps) => {
  return (
    <div>
      <label>
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <select {...props}>
        <option value="">選択してください</option>
        {options.map((option) => (
          <option key={option.key} value={option.value}>
            {option.value}
          </option>
        ))}
      </select>
    </div>
  );
};
