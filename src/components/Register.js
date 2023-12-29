import React, { useState } from "react";
import { Link } from "react-router-dom";

import * as auth from "../utils/auth";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLinkClick = () => {
    window.location.href = "/login";
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    auth
      .signup(email, password)
      .then((res) => console.log(res))
      .catch(console.log);
  };

  return (
    <>
      <div className="login">
        <h2 className="login__title">Inscrever-se</h2>
        <input
          className="login__input-email login__input-email:focus"
          type="email"
          name="email"
          value={email}
          placeholder="E-mail"
          onChange={(e) => setEmail(e.target.value)}
        />
        <span className="span span_email-message"></span>
        <input
          className="login__input-password"
          type="password"
          name="password"
          value={password}
          placeholder="Senha"
          onChange={(e) => setPassword(e.target.value)}
        />
        <span className="span span_password-message"></span>
        <button className="login__button-confirm" onClick={handleSubmit}>
          Inscrever-se
        </button>
        <Link to="/login" className="login__link" onClick={handleLinkClick}>
          Já é um membro? Faça o login aqui!
        </Link>
      </div>
    </>
  );
}
