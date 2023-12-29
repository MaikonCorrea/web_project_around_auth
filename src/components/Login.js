import {Link} from 'react-router-dom'


export default function Login() {
  const handleLinkClick = () => {
    window.location.href = '/register';
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
        />
        <span className="span span_email-message"></span>
        <input
          className="login__input-password"
          type="text"
          name="password"
          placeholder="Senha"
        />
        <span className="span span_password-message"></span>
        <button className="login__button-confirm">Entrar</button>
        <Link to="/register" className="login__link" onClick={handleLinkClick}>Ainda não é membro? Inscreva-se aqui!</Link>
      </div>
    </>
  );
}
