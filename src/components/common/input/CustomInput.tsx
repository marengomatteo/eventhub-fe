import { PasswordInput, TextInput } from "@mantine/core";
import { FC, useState } from "react";
import classes from "./styles/index.module.css";

const CustomInput: FC<{
  label: string;
  value: string;
  required?: boolean;
  key: string;
  type?: string;
  setValue: (value: string) => void;
}> = ({ value, setValue, required = false, key, label, type = "text" }) => {
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
      key={key}
      size="md"
      autoComplete="nope"
      data-floating={floating}
      labelProps={{ "data-floating": floating }}
    />
  ) : (
    <TextInput
      label={label}
      radius="xl"
      key={key}
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
    />
  );
};

export default CustomInput;
