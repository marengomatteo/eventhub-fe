export interface ButtonProps {
  variant?: "primary" | "secondary" | "tertiary";
  label: string;
  onClick?: () => {};
  isLoading?: boolean;
  disabled?: boolean;
  type?: "submit" | "button" | "reset";
  className?: string;
}
