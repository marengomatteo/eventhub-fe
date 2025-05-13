export interface ButtonProps {
  variant?: "primary" | "secondary" | "tertiary";
  label?: string;
  onClick?: () => void;
  isLoading?: boolean;
  disabled?: boolean;
  type?: "submit" | "button" | "reset";
  icon?: string;
  className?: string;
}
