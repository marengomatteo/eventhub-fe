export interface ButtonProps {
  type?: "primary" | "secondary" | "tertiary";
  label: string;
  onClick?: () => {};
  isLoading?: boolean;
  disabled?: boolean;
  className?: string;
}
