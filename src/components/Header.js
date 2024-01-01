import { Link, useHistory, useLocation } from "react-router-dom";

import headerLogo from "../images/Vector_Around.png";

export default function Header({ isLoggedIn, handleLogout }) {
  const location = useLocation();
  const history = useHistory();
  function SignOut() {
    handleLogout()
    localStorage.removeItem('jwt')
    history.push('/login')
  }

  return (
    <>
      <header className="header">
        <div className="header__container">
          <img className="header__logo" src={headerLogo} alt="logo do site" />
          <div className="header__menu">
            {location.pathname === "/login" && (
              <Link to="/login" className="header__menu-button">
                Entrar
              </Link>
            )}

            {location.pathname === "/register" && (
              <Link to="/register" className="header__menu-button">
                Faça o login
              </Link>
            )}

            {isLoggedIn && location.pathname === "/profile" && (
              <>
                <p className="header__menu-email">exemplo@gmail.com</p>
                <button onClick={SignOut} className="header__menu-button">
                  Sair
                </button>
              </>
            )}
          </div>
        </div>
        <div className="header__line"></div>
      </header>
    </>
  );
}
