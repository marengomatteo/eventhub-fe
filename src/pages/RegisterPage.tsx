import { useForm } from "@mantine/form";
import { useRouter } from "@tanstack/react-router";
import { useState } from "react";
import { getPasswordRequirements } from "../utils";
import { getBaseURL } from "../utils";

import Button from "../components/common/button/Button";
import CustomInput from "@components/common/input/CustomInput";

import logoExpanded from "@assets/logo-expanded.png";
import backArrow from "@assets/icons/chevron.svg";

import axios from "axios";

import "./styles/registerPage.scss";

interface FormValues {
  userType: "user" | "admin" | "";
  email: string;
  name: string;
  surname: string;
  password: string;
  confermaPassword: string;
}
const PSW_REGEX = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!"#$%&'()*+,\-./:;<=>?@]).{8,}$/;

const RegisterPage = () => {
  const [step, setStep] = useState(1);
  const [error, setError] = useState("");
  const [passwordChecks, setPasswordChecks] = useState({
    hasUpperCase: false,
    hasLowerCase: false,
    hasNumber: false,
    hasSymbol: false,
    hasMinLength: false,
  });
  const form = useForm<FormValues>({
    mode: "uncontrolled",
    initialValues: {
      userType: "",
      email: "",
      name: "",
      surname: "",
      password: "",
      confermaPassword: "",
    },
    onValuesChange(values) {
      const passwordChecks = getPasswordRequirements(values.password);
      setPasswordChecks(passwordChecks);
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
      name: (value) => {
        if (!value) {
          return "Questo campo è obbligatorio";
        }
        return null;
      },
      surname: (value) => {
        if (!value) {
          return "Questo campo è obbligatorio";
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

  const router = useRouter();
  const validateStep1 = () => {
    const res = form.validateField("userType");
    if (!res.hasError) {
      setStep(2);
    } else {
      form.setFieldError("userType", "Questo campo è obbligatorio");
    }
  };
  const validateStep2 = async () => {
    const result = form.validate();
    const { email, password, confermaPassword } = result.errors;

    if (email || password || confermaPassword) {
      console.log("Ci sono errori nel form", result.errors);
    } else {
      handleRegister();
    }
  };

  const handleRegister = async () => {
    debugger;
    try {
      const response = await getBaseURL("authentication").post("/signup", {
        email: form.getValues().email,
        password: form.getValues().password,
        name: form.getValues().name,
        surname: form.getValues().surname,
        role: form.getValues().userType.toUpperCase(),
      });
      if (response.status === 201) {
        router.navigate({ to: "/login" });
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError(error.response?.data?.message || "Errore durante la registrazione");
      }
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
          e.preventDefault();
        }} className="login-form">
          {error && <p className="general-error">{error}</p>}

          {step == 1 ? <>
            <div className={`options ${form.errors.userType ? "error" : ""}`}>
              <button type="button" className={`userOption ${form.getValues().userType === "user" ? "selected" : ""}`} onClick={() => form.setFieldValue("userType", "user")}>
                <div data-type="utente" className="bg"></div>
                <span>Utente</span>
              </button>
              <button type="button" className={`userOption ${form.getValues().userType === "admin" ? "selected" : ""}`} onClick={() => form.setFieldValue("userType", "admin")}>
                <div data-type="organizzatore" className="bg"></div>
                <span>Organizzatore</span>
              </button>
              {form.errors.userType && <span className="error-message">{form.errors.userType}</span>}
            </div>
          </> : <>
            <CustomInput
              label={"Email"}
              name="email"
              key="email"
              form={form}
            />
            <CustomInput
              label={"Nome"}
              name="name"
              key="name"
              form={form}
            />
            <CustomInput
              label={"Cognome"}
              name="surname"
              key="surname"
              form={form}
            />
            <div>
              <CustomInput
                type="password"
                name="password"
                key="password"
                form={form}
                label={"Password"}
              />
              <ul className="password-requirements">
                <li className={passwordChecks.hasUpperCase ? "valid" : ""}>Una lettera maiuscola</li>
                <li className={passwordChecks.hasLowerCase ? "valid" : ""}>Una lettera minuscola</li>
                <li className={passwordChecks.hasNumber ? "valid" : ""}>Un numero</li>
                <li className={passwordChecks.hasSymbol ? "valid" : ""}>Un simbolo speciale (@#$%^&+=.)</li>
                <li className={passwordChecks.hasMinLength ? "valid" : ""}>Minimo 8 caratteri</li>
              </ul>
            </div>
            <CustomInput
              type="password"
              name="confermaPassword"
              key="confermaPassword"
              form={form}
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
