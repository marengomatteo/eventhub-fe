import google from "@assets/google-login.png";
import logoExpanded from "@assets/logo-expanded.png";
import CustomInput from "@components/common/input/CustomInput";
import { useForm } from "@mantine/form";
import Button from "../components/common/button/Button";
import "./styles/login.scss";
import { useGoogleLogin } from "@react-oauth/google";
import { useRouter } from "@tanstack/react-router";

interface FormValues {
  username: string;
  password: string;
}

const LoginPage = () => {
  const router = useRouter();

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
        console.log(value);
        if (!value) return "Password is required";
        return null;
      },
    }
  });

  const login = useGoogleLogin({
    onSuccess: async (response) => {

      console.log(response);
    },
    flow: 'auth-code',
  });

  const navigate = (to: string) => router.navigate({ to });


  return (
    <div className="login">
      <div className="left">
        <img src={logoExpanded} />
      </div>
      <form className="right" onSubmit={form.onSubmit((values) => {
        console.log("Form valid:", values);
      })}>
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
          <Button
            className="forgotPassword"
            variant="tertiary"
            label="Password dimenticata?"
          />

          <div className="login-separator">Oppure accedi con</div>
          <div className="login-social-buttons">
            <button className="social-login-button" onClick={() => login()} >
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
