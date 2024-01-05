import React, { useState } from "react";
import { Link, withRouter, useHistory } from "react-router-dom";

import * as auth from "../utils/auth";

function Register({ activeInfo }) {
  const history = useHistory();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  
  async function handleSubmit(e) {
    e.preventDefault();

    if (!email || !password) {
      activePopupInfo(false);
      return;
    }

    try {
      const response = await auth.register({ email, password });
      if (response.ok) {
        activePopupInfo(true);
        setEmail("");
        setPassword("");
        history.push("/login");
      } else {
        activePopupInfo(false);
        if (response.status === 400) {
          activePopupInfo(false);
          console.log(
            "Um dos campos foi preenchido incorretamente:",
            response.status
          );
        } else if (response.status === 401) {
          activePopupInfo(false);
          console.log(
            "Não autorizado: Verifique suas credenciais.",
            response.status
          );
        } else {
          activePopupInfo(false);
          console.log(
            "Erro desconhecido ao tentar registrar:",
            response.status
          );
        }
      }
    } catch (error) {
      console.log("Erro no Registro:", error.message);
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
          : "a senha deve conter no mínimo 6 caracteres"
      );
    }
  };

  function activePopupInfo(params) {
    activeInfo(params);
  }

  return (
    <>
      <div className="register">
        <h2 className="register__title">Inscrever-se</h2>
        <input
          className="register__input-email register__input-email:focus"
          type="email"
          name="email"
          value={email}
          placeholder="E-mail"
          onChange={(e) => {
            setEmail(e.target.value);
            handleChange(e);
          }}
        />
        <span className="span span_email-message">{emailError}</span>
        <input
          className="register__input-password"
          type="password"
          name="password"
          value={password}
          placeholder="Senha"
          onChange={(e) => {
            setPassword(e.target.value);
            handleChange(e);
          }}
        />
        <span className="span span_password-message">{passwordError}</span>
        <button className={`register__button-confirm ${emailError || passwordError || email === "" || password === "" ? "register__button-confim--disabled" : ""}`} onClick={handleSubmit}>
          Inscrever-se
        </button>
        <div className="register__signup">
          <p>Já é um membro?</p>
          <Link to="/login" className="register__signup_link">
            Faça seu login aqui!
          </Link>
        </div>
      </div>
    </>
  );
}

export default withRouter(Register);
