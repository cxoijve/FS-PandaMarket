import React from "react";
import { Link, NavLink } from "react-router-dom";
import Logo from "../../assets/images/logo/logo.svg";
import "./Header.css";

const Header = () => {
  return (
    <header className="globalHeader">
      <div className="headerLeft">
        {/* 클릭 시 홈으로 이동 */}
        <Link to="/" className="headerLogo">
          <img src={Logo} alt="판다마켓 로고" width="153" />
        </Link>

        <nav>
          <ul>
            <li>
              <NavLink to="/community" className="navLink">
                자유게시판
              </NavLink>
            </li>
            <li>
              <NavLink to="/items" className="navLink">
                중고마켓
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>

      {/* 로그인 버튼 */}
      <Link to="/login" className="loginLink button">
        로그인
      </Link>
    </header>
  );
};

export default Header;
