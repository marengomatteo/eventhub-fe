import { PasswordInput, TextInput } from "@mantine/core";
import { forwardRef } from "react";


interface CustomInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  key: string;
  name?: string;
  form: any;
  type?: string;
}

const CustomInput = forwardRef<HTMLInputElement, CustomInputProps>(({ ...props }, ref) => {
  const { label, required, type } = props;
  const error = props.form.errors[props.name as string];
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
      error={error}
      {...props.form.getInputProps(props.name)}

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
      error={error}
      {...props.form.getInputProps(props.name)}
    />
  );
});

export default CustomInput;
