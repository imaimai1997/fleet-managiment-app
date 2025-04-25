import { HTMLAttributes, ReactElement } from "react";
import { IconBaseProps } from "react-icons";

interface BoxProps extends HTMLAttributes<HTMLDivElement> {
  icon?: ReactElement<IconBaseProps>;
  title?: string;
}

export const Box = ({ icon, title, className, children }: BoxProps) => {
  return (
    <div className={`bg-white p-4 border-2 border-gray-200 ${className}`}>
      <h3 className="text-2xl font-bold mb-8 flex items-center">
        {icon}
        {title}
      </h3>
      {children}
    </div>
  );
};
