import { PasswordInput, TextInput } from "@mantine/core";
import { forwardRef } from "react";


interface CustomInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  key: string;
  name?: string;
  form: any;
  type?: string;
  placeholder?: string;
  error?: string;
}

const CustomInput = forwardRef<HTMLInputElement, CustomInputProps>(({ ...props }, ref) => {
  const { label, required, type, placeholder } = props;
  const error = props.error || props.form.errors[props.name as string];
  return type == "password" ? (
    <PasswordInput
      label={label}
      radius="lg"
      required={required}
      mt="md"
      size="md"
      ref={ref}
      key={props.key}
      autoComplete="nope"
      {...props.form.getInputProps(props.name)}
      error={error}
      placeholder={placeholder}
    />
  ) : (
    <TextInput
      label={label}
      radius="lg"
      required={required}
      mt="md"
      size="md"
      ref={ref}
      key={props.key}
      {...props.form.getInputProps(props.name)}
      error={error}
      placeholder={placeholder}
    />
  );
});

export default CustomInput;
