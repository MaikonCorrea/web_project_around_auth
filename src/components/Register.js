import React, { useState } from "react";
import { Link, withRouter, useHistory } from "react-router-dom";

import * as auth from "../utils/auth";

function Register() {
  const history = useHistory();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    if (!email || !password) {
      console.log("Email e senha são obrigatórios.");
      return;
    }

    try {
      const response = await auth.register({ email, password });
      if (response.ok) {
        console.log("Registro bem-sucedido!");
        history.push("/login");
      } else {
        console.log("Falha no registro:", response.error);

        if (response.status === 400) {
          console.log(
            "Um dos campos foi preenchido incorretamente:",
            response.status
          );
        } else if (response.status === 401) {
          console.log(
            "Não autorizado: Verifique suas credenciais.",
            response.status
          );
        } else {
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
          : "a senha deve conter no mínimo 8 caracteres"
      );
    }
  };

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
        <button className="register__button-confirm" onClick={handleSubmit}>
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
