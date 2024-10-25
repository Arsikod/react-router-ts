import { ReactNode } from "react";
import { useSearchParams } from "react-router-dom";

export type BadgeProps = {
  children: ReactNode;
  paramKey: string;
  param: string;
  onButtonClick: (key: string, value: string) => void;
};

export function Badge({
  children,
  param,
  paramKey,
  onButtonClick,
}: BadgeProps) {
  const [searchParams] = useSearchParams();

  // Determine if this badge is selected based on search params
  const isSelected = searchParams.get(paramKey) === param;

  return (
    <button
      style={{
        backgroundColor: isSelected ? "blue" : "white",
        color: isSelected ? "white" : "black",
      }}
      onClick={() => onButtonClick(paramKey, param)}
    >
      {children}
    </button>
  );
}
