import React, { useState } from "react";
import { Link, withRouter } from "react-router-dom";

import * as auth from "../utils/auth";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    auth
      .register(email, password)
      .then((res) => console.log(res))
      .catch(console.log);
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
          onChange={(e) => setEmail(e.target.value)}
        />
        <span className="span span_email-message"></span>
        <input
          className="register__input-password"
          type="password"
          name="password"
          value={password}
          placeholder="Senha"
          onChange={(e) => setPassword(e.target.value)}
        />
        <span className="span span_password-message"></span>
        <button className="register__button-confirm" onClick={handleSubmit}>
          Inscrever-se
        </button>
        <div className="register__signup">
          <p>Já é um membro?</p>
          <Link to="/login"  className="register__signup_link">
            Faça seu login aqui!
          </Link>
        </div>
      </div>
    </>
  );
}

export default withRouter(Register);
