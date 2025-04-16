import logoExpanded from "@assets/logo-expanded.png";

import "../styles/login.scss";
import { useState } from "react";
import Button from "../components/common/button/Button";
import CustomInput from "@components/common/input/CustomInput";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  return (
    <div className="login">
      <div className="left">
        <img src={logoExpanded} />
      </div>
      <div className="right">
        <h1>Accedi per scoprire un mondo di eventi!</h1>
        <form className="login-form">
          <CustomInput
            value={username}
            setValue={setUsername}
            label={"Username"}
          />
          <CustomInput
            type="password"
            value={password}
            setValue={setPassword}
            label={"Passsword"}
          />
        </form>
        <Button
          className="forgotPassword"
          type="tertiary"
          label="Password dimenticata?"
        />
        <Button className="login-button" label="Accedi" />
        <Button
          className="register-button"
          type="tertiary"
          label="Oppure registrati"
        />
      </div>
    </div>
  );
};

export default LoginPage;
