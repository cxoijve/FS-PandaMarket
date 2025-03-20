import React, { useState } from "react";
import { Link } from "react-router-dom";
import Meta from "./Meta";
import "./LoginPage.css";
import "../../styles/global.css";

// 이미지 import
import logo from "../../assets/images/logo/logo.svg";
import eyeInvisibleIcon from "../../assets/images/icons/eye-invisible.svg";
import eyeVisibleIcon from "../../assets/images/icons/eye-visible.svg";
import googleLogo from "../../assets/images/social/google-logo.png";
import kakaoLogo from "../../assets/images/social/kakao-logo.png";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setErrorMessage("이메일과 비밀번호를 입력하세요.");
      return;
    }

    console.log("로그인 요청:", { email, password });

    // TODO: 백엔드 API 연결하여 로그인 처리
  };

  return (
    <>
      <Meta title="판다마켓 - 로그인" path="/login" />

      <main className="auth-container">
        {/* 로고 */}
        <Link to="/" className="logo-home-link" aria-label="홈으로 이동">
          <img src={logo} alt="판다마켓 로고" />
        </Link>

        {/* 로그인 폼 */}
        <form id="loginForm" onSubmit={handleSubmit}>
          <div className="input-item">
            <label htmlFor="email">이메일</label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="이메일을 입력해 주세요"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="input-item">
            <label htmlFor="password">비밀번호</label>
            <div className="input-wrapper">
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="비밀번호를 입력해 주세요"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="password-toggle-button"
                aria-label="비밀번호 보기"
                onClick={togglePasswordVisibility}
              >
                <img
                  className="password-toggle-icon"
                  src={showPassword ? eyeVisibleIcon : eyeInvisibleIcon}
                  alt={showPassword ? "비밀번호 보임" : "비밀번호 숨김"}
                />
              </button>
            </div>
          </div>

          {errorMessage && <p className="error-message">{errorMessage}</p>}

          <button type="submit" className="button pill-button full-width">
            로그인
          </button>
        </form>

        {/* 간편 로그인 */}
        <div className="social-login-container">
          <h3>간편 로그인하기</h3>
          <div className="social-login-links-container">
            <a
              href="https://www.google.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={googleLogo} alt="구글 로그인" width="42" />
            </a>
            <a
              href="https://www.kakaocorp.com/page/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={kakaoLogo} alt="카카오톡 로그인" width="42" />
            </a>
          </div>
        </div>

        {/* 회원가입 링크 */}
        <div className="auth-switch">
          판다마켓이 처음이신가요? <Link to="/signup">회원가입</Link>
        </div>
      </main>
    </>
  );
};

export default LoginPage;
