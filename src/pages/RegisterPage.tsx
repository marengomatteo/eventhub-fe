import { useForm } from "@mantine/form";
import { useRouter } from "@tanstack/react-router";
import { useState } from "react";
import { getPasswordRequirements } from "../utils";
import axios from "axios";
import { useUser } from "../context/UserContext";

import Button from "../components/common/button/Button";
import CustomInput from "@components/common/input/CustomInput";

import logoExpanded from "@assets/logo-expanded.png";
import backArrow from "@assets/icons/chevron.svg";

import "./styles/registerPage.scss";

interface FormValues {
  userType: string;
  email: string;
  name: string;
  surname: string;
  password: string;
  confermaPassword: string;
}
const PSW_REGEX = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!"#$%&'()*+,-./: ;<=>? @]).{8,}$/;

const RegisterPage = () => {
  const api = axios.create({
    baseURL: "http://localhost:8082/user-service/authentication",
    withCredentials: true,
  });
  const { setUser } = useUser();
  const [step, setStep] = useState(1);
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
  const passwordValue = form.getValues().password;
  const passwordChecks = getPasswordRequirements(passwordValue);

  const router = useRouter();
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
  const validateStep2 = async () => {
    const result = form.validate();
    const { email, password, confermaPassword } = result.errors;

    if (email || password || confermaPassword) {
      console.log("Ci sono errori nel form", result.errors);
    }
  };

  const handleRegister = async () => {
    const response = await api.post("/signup", {
      email: form.getValues().email,
      password: form.getValues().password,
      name: form.getValues().name,
      surname: form.getValues().surname,
    });
    if (response.status === 200) {
      const { data: { userDataResponse } } = response;
      const userData = {
        id: userDataResponse.id,
        name: userDataResponse.name,
        surname: userDataResponse.surname,
        email: userDataResponse.email,
        role: userDataResponse.role,
      };
      setUser(userData);
      router.navigate({ to: "/" });
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
          handleRegister();
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
                <li className={passwordChecks.hasSymbol ? "valid" : ""}>Un simbolo speciale (@#$%^&+=)</li>
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
