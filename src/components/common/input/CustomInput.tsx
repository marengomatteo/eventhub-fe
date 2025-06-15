import { PasswordInput, TextInput } from "@mantine/core";
import { FC, useState } from "react";
import classes from "./styles/index.module.css";
import { forwardRef } from "react";


interface CustomInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  key: string;
  name?: string;
  form: any;
}

const CustomInput = forwardRef<HTMLInputElement, CustomInputProps>(({ ...props }, ref) => {
  const [focused, setFocused] = useState(false);
  const value = props.form.getValues()[props.name as string];
  const floating = value.trim().length !== 0 || focused || undefined;
  const { label, required, type, error } = props;
  return type == "password" ? (
    <PasswordInput
      label={label}
      radius="xl"
      required={required}
      classNames={classes}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      mt="md"
      size="md"
      ref={ref}
      key={props.key}
      autoComplete="nope"
      data-floating={floating}
      labelProps={{ "data-floating": floating }}
      error={error}
      {...props.form.getInputProps(props.name)}

    />
  ) : (
    <TextInput
      label={label}
      radius="xl"
      required={required}
      classNames={classes}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      mt="md"
      size="md"
      ref={ref}
      key={props.key}
      autoComplete="nope"
      data-floating={floating}
      labelProps={{ "data-floating": floating }}
      error={error}
      {...props.form.getInputProps(props.name)}
    />
  );
});

export default CustomInput;
