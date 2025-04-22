import React, { ButtonHTMLAttributes } from "react";
import { LoadingIcon } from "../../Icons/LoadingIcon";

export const OrangeButton = ({
  children,
  isLoading,
  type = "button",
  ...props
}: {
  type?: "button" | "submit" | "reset";
  children: string | React.ReactNode;
  isLoading?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button
      {...props}
      type={type}
      disabled={isLoading}
      className="all:unset w-full disabled:bg-neutral-10 bg-dark_orange flex items-center justify-center text-white font-bold py-3 disabled:pointer-events-none disabled:cursor-no-drop"
    >
      {children}
      {isLoading && (
        <span className="ml-4 flex origin-center animate-spin">
          <LoadingIcon />
        </span>
      )}
    </button>
  );
};
