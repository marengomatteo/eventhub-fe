import google from "@assets/google-login.png";
import logoExpanded from "@assets/logo-expanded.png";
import CustomInput from "@components/common/input/CustomInput";
import { useForm } from "@mantine/form";
import Button from "../components/common/button/Button";
import { useGoogleLogin } from "@react-oauth/google";
import { useRouter } from "@tanstack/react-router";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { useUser } from "../context/UserContext";

import "./styles/login.scss";

interface FormValues {
  username: string;
  password: string;
}
const PSW_REGEX = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!"#$%&'()*+,\-./:;<=>?@]).{8,}$/;

const LoginPage = () => {
  const router = useRouter();
  const api = axios.create({
    baseURL: "http://localhost:8082/user-service/authentication",
    withCredentials: true,
  });

  const form = useForm<FormValues>({
    mode: "uncontrolled",
    initialValues: {
      username: "",
      password: "",
    },
    validate: {
      username: (value) => {
        if (!value) return "Username is required";
        const emailRegex = /^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/gim;
        if (!emailRegex.test(value)) return "Username non valida";
        return null;
      },
      password: (value) => {
        if (!value) return "Password is required";
        if (!PSW_REGEX.test(value)) return "Password non valida";
        return null;
      },
    }
  });

  const [error, setError] = useState<string>("");
  const { setUser, user, isLoading } = useUser();

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, isLoading]);

  const login = useGoogleLogin({
    onSuccess: async (response) => {
      if (response) {
        const res = await api.post("/google", response);
        const userData = res.data.userDataResponse;
        setUser(userData);
        navigate("/");
      }
    },
    flow: 'auth-code',
  });

  const navigate = (to: string) => router.navigate({ to });

  const handleLogin = useCallback(async (values: FormValues) => {
    setError("");
    try {
      const response = await api.post("/signin", {
        email: values.username,
        password: values.password,
      });
      if (response.status === 200) {
        const { data: { userDataResponse } } = response;
        const userData = userDataResponse;
        setUser(userData);
        navigate("/");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError(error.response?.data?.message || "Errore durante il login");
        form.setErrors({
          username: error.response?.data?.message,
          password: error.response?.data?.message,
        });
      }
    }
  }, [api]);


  return (
    <div className="login">
      <div className="left">
        <img src={logoExpanded} />
      </div>
      <form className="right" onSubmit={form.onSubmit((values) => handleLogin(values))}>
        <h1>Accedi per scoprire un mondo di eventi!</h1>
        <div className="login-form">
          <CustomInput
            name="username"
            key={form.key("username")}
            label={"Username"}
            form={form}
          />
          <CustomInput
            name="password"
            type="password"
            key={form.key("password")}
            label={"Passsword"}
            form={form}
          />
          {/*           <Button
            className="forgotPassword"
            variant="tertiary"
            label="Password dimenticata?"
          /> */}
          {error && <p className="error">{error}</p>}

          <div className="login-separator">Oppure accedi con</div>
          <div className="login-social-buttons">
            <button className="social-login-button" type="button" onClick={() => login()} >
              <img src={google} />
            </button>

          </div>
          <Button className="login-button" type="submit" label="Accedi" />
          <Button
            onClick={async () => await navigate("/register")}
            className="register-button"
            variant="tertiary"
            label="o registrati"
          />
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
