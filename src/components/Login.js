import React, { useState } from "react";
import { Link, withRouter, useHistory } from "react-router-dom";

import * as auth from "../utils/auth";

function Login({ handleLogin, activeInfo }) {
  const history = useHistory();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    if (!email || !password) {
      //criar mensagem de erro como tratamento
      return;
    }
    try {
      let response = await auth.authorize({ email, password });
      if (response.status === 401) {
        activePopupInfo(false);
       /*  alert("valide o email ou a senha, algo está errado!"); */
      }
      response = await response.json();
      if (response.token) {
        localStorage.setItem("jwt", response.token);
        handleLogin(response.token);
        history.push("/profile");
      }
    } catch (error) {
      console.log("Error login:", error);
    }
  }

  const validateEmail = (emailInput) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(emailInput);
  };

  const validatePassword = (passwordInput) => {
    const passwordRegex = /^.{6,}$/;
    return passwordRegex.test(passwordInput);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "email") {
      setEmail(value);
      setEmailError(
        value.trim() === "" || validateEmail(value)
          ? ""
          : "Digite um endereço de e-mail válido!"
      );
    } else if (name === "password") {
      setPassword(value);
      setPasswordError(
        value.trim() === "" || validatePassword(value)
          ? ""
          : "A senha deve conter no mínimo 8 caracteres"
      );
    }
  };

  function activePopupInfo(oi) {
    activeInfo(oi);
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
          type="text"
          name="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            handleChange(e);
          }}
        />
        <span className="span span_password-message">{passwordError}</span>
        <button className="login__button-confirm" onClick={handleSubmit}>
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
