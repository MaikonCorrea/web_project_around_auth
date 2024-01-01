import React, { useState } from "react";
import { Link, withRouter, useHistory} from "react-router-dom";

import * as auth from "../utils/auth";

function Login({ handleLogin }) {
  const history = useHistory();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    if (!email || !password) {
      //criar mensagem de erro como tratamento
      return;
    }
    try {
      let response = await auth.authorize({ email, password })
      if (response.status === 401) {
        alert('valide o email ou a senha, algo está errado!')
      }
      response = await response.json()
      if (response.token) {
        handleLogin()
        localStorage.setItem('jwt', response.token)
        history.push('/profile')        
      }

    } catch (error) {
      console.log('Error login:', error)
    }
  };

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
          onChange={(e) => setEmail(e.target.value)}
        />
        <span className="span span_email-message"></span>
        <input
          className="login__input-password"
          type="text"
          name="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <span className="span span_password-message"></span>
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

export default withRouter(Login)
