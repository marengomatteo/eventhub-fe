import { useForm } from "@mantine/form";
import { useRouter } from "@tanstack/react-router";
import { useState } from "react";
import { getPasswordRequirements } from "../utils";

import Button from "../components/common/button/Button";
import CustomInput from "@components/common/input/CustomInput";

import logoExpanded from "@assets/logo-expanded.png";
import backArrow from "@assets/icons/chevron.svg";

import "./styles/registerPage.scss";

interface FormValues {
  userType: string;
  email: string;
  password: string;
  confermaPassword: string;
}
const PSW_REGEX = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@#$%^&+=]).{8,}$/;

const RegisterPage = () => {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const form = useForm<FormValues>({
    mode: "uncontrolled",
    initialValues: {
      userType: "",
      email: "",
      password: "",
      confermaPassword: "",
    },
    onValuesChange: (values) => {
      console.log(values);
    },
    validate: {
      userType: (value) => {
        if (!value) {
          return "Questo campo è obbligatorio";
        }
        return null;
      },
      email: (value) => {
        const emailRegex = /^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/gim;
        if (!value) {
          return "Questo campo è obbligatorio";
        } if (!emailRegex.test(value)) {
          return "Email non valida";
        }
        return null;
      },
      password: (value) => {
        if (!value) {
          return "Questo campo è obbligatorio";
        } if (!PSW_REGEX.test(value)) {
          return "Password non valida";
        }
        return null;
      },
      confermaPassword: (value) => {
        if (!value) {
          return "Questo campo è obbligatorio";
        } if (!PSW_REGEX.test(value)) {
          return "Password non valida";
        } if (value !== form.getValues().password) return "Le password non coincidono";
        return null;
      },
    }
  });
  const passwordValue = form.getValues().password;
  const passwordChecks = getPasswordRequirements(passwordValue);

  const validateStep1 = () => {
    console.log("BB");
    const res = form.validateField("userType");
    console.log("BB", res);
    if (!res.hasError) {
      setStep(2);
    } else {
      form.setFieldError("userType", "Questo campo è obbligatorio");
    }
  };
  const validateStep2 = () => {
    const result = form.validate();
    const { email, password, confermaPassword } = result.errors;

    if (!email && !password && !confermaPassword) {
      console.log("Form valido, puoi inviare");
    } else {
      console.log("Ci sono errori nel form", result.errors);
    }
  };

  return (
    <div className="login">
      <div className="left">
        <img src={logoExpanded} />
      </div>
      <div className="right">
        {step === 2 ? <button className="backArrow" onClick={() => setStep(prev => prev - 1)}><img src={backArrow} /></button> : null}
        <h1>{step === 1 ? "Scegli il tuo ruolo" : "Registrati!"}</h1>
        <form onSubmit={(e) => {
          console.log("AA", form.getValues());
          e.preventDefault();
        }} className="login-form">
          {step == 1 ? <>
            <div className={`options ${form.errors.userType ? "error" : ""}`}>
              <button type="button" className={`userOption ${form.getValues().userType === "user" ? "selected" : ""}`} onClick={() => form.setFieldValue("userType", "user")}>
                <div data-type="utente" className="bg"></div>
                <span>Utente</span>
              </button>
              <button type="button" className={`userOption ${form.getValues().userType === "organizer" ? "selected" : ""}`} onClick={() => form.setFieldValue("userType", "organizer")}>
                <div data-type="organizzatore" className="bg"></div>
                <span>Organizzatore</span>
              </button>
              {form.errors.userType && <span className="error-message">{form.errors.userType}</span>}
            </div>
          </> : <>
            <CustomInput
              label={"Email"}
              error={form.errors.email}
              {...form.getInputProps("email")}
            />
            <div>
              <CustomInput
                type="password"
                error={form.errors.password}
                {...form.getInputProps("password")}
                label={"Password"}
              />
              <ul className="password-requirements">
                <li className={passwordChecks.hasUpperCase ? "valid" : ""}>Una lettera maiuscola</li>
                <li className={passwordChecks.hasLowerCase ? "valid" : ""}>Una lettera minuscola</li>
                <li className={passwordChecks.hasNumber ? "valid" : ""}>Un numero</li>
                <li className={passwordChecks.hasSymbol ? "valid" : ""}>Un simbolo speciale (@#$%^&+=)</li>
                <li className={passwordChecks.hasMinLength ? "valid" : ""}>Minimo 8 caratteri</li>
              </ul>
            </div>
            <CustomInput
              type="password"
              error={form.errors.confermaPassword}
              {...form.getInputProps("confermaPassword")}
              label={"Conferma Password"}
            />
          </>}
          {step == 1 ? <Button className="register-button" type="button" label="Avanti" onClick={() => validateStep1()} /> : <Button className="register-button" type="submit" label="Registrati" onClick={validateStep2} />}

        </form>
      </div>
    </div >
  );
};

export default RegisterPage;
