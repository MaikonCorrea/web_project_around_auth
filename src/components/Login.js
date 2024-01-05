import React, { useState } from "react";
import { Link, withRouter, useHistory } from "react-router-dom";

import * as auth from "../utils/auth";

function Login({ handleLogin, handleLogout, activeInfo }) {
  const history = useHistory();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    if (!email || !password) {
      activePopupInfo(false);
      console.log("oi");
      return;
    }
    try {
      let response = await auth.authorize({ email, password });
      if (response.status === 401) {
        activePopupInfo(false);
      }
      response = await response.json();
      if (response.token) {
        const expirationTimeInHours = 24;
        const expirationTimeInMilliseconds =
          expirationTimeInHours * 60 * 60 * 1000;
        const token = response.token;
        localStorage.setItem("jwt", token);
        handleLogin(token);
        history.push("/profile");
        setTimeout(() => {
          localStorage.removeItem("jwt");
          handleLogout();
          history.push("/login");
        }, expirationTimeInMilliseconds);
        history.push("/profile");
      }
    } catch (error) {
      console.log("Error login:", error);
    }
  }

  function validateEmail(emailInput) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(emailInput);
  }

  function validatePassword(passwordInput) {
    const passwordRegex = /^.{6,}$/;
    return passwordRegex.test(passwordInput);
  }

  function handleChange(e) {
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
          : "A senha deve conter no mínimo 6 caracteres"
      );
    }
  }

  function activePopupInfo(params) {
    activeInfo(params);
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
