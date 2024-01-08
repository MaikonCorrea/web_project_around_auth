import React, { useState } from "react";
import { Link, withRouter } from "react-router-dom";

function Login({
  loginUser,
  validateEmail,
  validatePassword,
  handleLoginChange,
  handleLogout,
  activeInfo,
}) {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await loginUser(email, password);
    } catch (error) {
      console.log("Error login:", error);
    }
  }

  function handleChange(e) {
    handleLoginChange(e);
  }

  return (
    <>
      <div className="login">
        <h2 className="login__title">Entrar</h2>
        <input
          className="login__input-email login__input-email:focus"
          type="email"
          name="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            handleChange(e);
          }}
        />
        <span className="span span_email-message">{emailError}</span>
        <input
          className="login__input-password"
          type="password"
          name="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            handleChange(e);
          }}
        />
        <span className="span span_password-message">{passwordError}</span>
        <button
          className={`login__button-confirm ${
            emailError || passwordError || email === "" || password === ""
              ? "login__button-confim--disabled"
              : ""
          }`}
          onClick={handleSubmit}
        >
          Entrar
        </button>
        <div className="login__signup">
          <p>Ainda não é membro?</p>
          <Link to="/register" className="signup__link">
            Inscreva-se aqui!
          </Link>
        </div>
      </div>
    </>
  );
}

export default withRouter(Login);
