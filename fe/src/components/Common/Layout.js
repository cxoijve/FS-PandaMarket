import React from "react";
import { Outlet } from "react-router-dom"; // Outlet 사용
import { Link } from "react-router-dom";
import Header from "./Header"; // Header 포함
import "../../styles/global.css";

// 이미지 import
import facebookLogo from "../../assets/images/social/facebook-logo.svg";
import twitterLogo from "../../assets/images/social/twitter-logo.svg";
import youtubeLogo from "../../assets/images/social/youtube-logo.svg";
import instagramLogo from "../../assets/images/social/instagram-logo.svg";

const Layout = () => {
  return (
    <div className="layoutContainer with-header">
      {" "}
      {/* ✅ 헤더 아래 본문을 밀어내도록 수정 */}
      <Header /> {/* 모든 페이지에서 자동 적용 */}
      <main className="contentContainer">
        <Outlet />
      </main>
      <footer>
        <div id="copyright">©CJY 2025</div>
        <div id="footerMenu">
          <Link to="/privacy">Privacy Policy</Link>
          <Link to="/faq">FAQ</Link>
        </div>
        <div id="socialMedia">
          <a
            href="https://www.facebook.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={facebookLogo} alt="페이스북" width="20" />
          </a>
          <a
            href="https://twitter.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={twitterLogo} alt="트위터" width="20" />
          </a>
          <a
            href="https://www.youtube.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={youtubeLogo} alt="유튜브" width="20" />
          </a>
          <a
            href="https://www.instagram.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={instagramLogo} alt="인스타그램" width="20" />
          </a>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
