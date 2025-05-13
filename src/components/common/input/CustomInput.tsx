import { PasswordInput, TextInput } from "@mantine/core";
import { FC, useState } from "react";
import classes from "./styles/index.module.css";

const CustomInput: FC<{
  label: string;
  value: string;
  required?: boolean;
  type?: string;
  error?: string;
  setValue: (value: string) => void;
}> = ({ value, setValue, required = false, label, type = "text", error }) => {
  const [focused, setFocused] = useState(false);

  const floating = value.trim().length !== 0 || focused || undefined;
  return type == "password" ? (
    <PasswordInput
      label={label}
      radius="xl"
      required={required}
      classNames={classes}
      onChange={(event) => setValue(event.currentTarget.value)}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      mt="md"
      size="md"
      autoComplete="nope"
      data-floating={floating}
      labelProps={{ "data-floating": floating }}
      error={error}
      value={value}
    />
  ) : (
    <TextInput
      label={label}
      radius="xl"
      required={required}
      classNames={classes}
      onChange={(event) => setValue(event.currentTarget.value)}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      mt="md"
      size="md"
      autoComplete="nope"
      data-floating={floating}
      labelProps={{ "data-floating": floating }}
      error={error}
      value={value}
    />
  );
};

export default CustomInput;
