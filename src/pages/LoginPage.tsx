import google from "@assets/google-login.png";
import logoExpanded from "@assets/logo-expanded.png";
import CustomInput from "@components/common/input/CustomInput";
import { useForm } from "@mantine/form";
import Button from "../components/common/button/Button";
import "../styles/login.scss";
import { useGoogleLogin } from "@react-oauth/google";

interface FormValues {
  username: string;
  password: string;
}

const LoginPage = () => {

  const form = useForm<FormValues>({
    mode: "uncontrolled",
    initialValues: {
      username: "",
      password: "",
    },
    onValuesChange: (values) => {
      console.log(values);
    },
    validate: {
      username: (value) => {
        if (!value) {
          return "Username is required";
        } if (!value.match("/^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/gim")) {
          return "Username non valida";
        }
        return null;
      },
      password: (value) => {
        if (!value) {
          return "Password is required";
        }
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



  return (
    <div className="login">
      <div className="left">
        <img src={logoExpanded} />
      </div>
      <div className="right">
        <h1>Accedi per scoprire un mondo di eventi!</h1>
        <form className="login-form">
          <CustomInput
            value={form.getValues().username}
            key={form.key("username")}
            setValue={(value: string) => form.setFieldValue("username", value)}
            label={"Username"}
            {...form.getInputProps("username")}
          />
          <CustomInput
            value={form.getValues().password}
            type="password"
            key={form.key("password")}
            setValue={(value: string) => form.setFieldValue("password", value)}
            {...form.getInputProps("password")}
            label={"Passsword"}
          />
        </form>
        <Button
          className="forgotPassword"
          variant="tertiary"
          label="Password dimenticata?"
        />
        <Button className="login-button" type="submit" label="Accedi" />
        <Button
          className="register-button"
          variant="tertiary"
          label="o registrati"
        />
        <div className="login-separator">Oppure accedi con</div>
        <div className="login-social-buttons">
          <button className="social-login-button" onClick={() => login()} >
            <img src={google} />
          </button>

        </div>
      </div>
    </div>
  );
};

export default LoginPage;
