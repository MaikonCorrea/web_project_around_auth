import {Link, useLocation} from 'react-router-dom'

import headerLogo from "../images/Vector_Around.png";

export default function Header({ isLoggedIn }) {
  const location = useLocation();

  return (
    <>
      <header className="header">
        <div className="header__container">
          <img className="header__logo" src={headerLogo} alt="logo do site" />
          <div className="header__discription">
          {location.pathname === '/login' && (
            <Link to="/login" className="header__button">
              Entrar
            </Link>
          )}

          {location.pathname === '/register' && (
            <Link to="/register" className="header__button">
              Faça o login
            </Link>
          )}

          {isLoggedIn && location.pathname === '/profile' && (
            <>
              <p className="header__subtitle">exemplo@gmail.com</p>
              <button className="header__button">Sair</button>
            </>
          )}
          </div>
        </div>
        <div className="header__line"></div>
      </header>
    </>
  );
}
