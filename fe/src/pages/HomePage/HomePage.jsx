import React from "react";
import { Link } from "react-router-dom";
import "./HomePage.css";
import "../../styles/global.css";

// 이미지 import
import heroImage from "../../assets/images/home/hero-image.png";
import bottomBannerImage from "../../assets/images/home/bottom-banner-image.png";
import feature1Image from "../../assets/images/home/feature1-image.png";
import feature2Image from "../../assets/images/home/feature2-image.png";
import feature3Image from "../../assets/images/home/feature3-image.png";

const HomePage = () => {
  return (
    <div>
      {/* Hero Section */}
      <section
        id="hero"
        className="banner"
        style={{
          backgroundImage: `url(${heroImage})`,
        }}
      >
        <div className="wrapper">
          <h1>일상의 모든 물건을 거래해 보세요</h1>
          <Link to="/items" className="button pill-button">
            구경하러 가기
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="wrapper">
        <div className="feature">
          <img src={feature1Image} alt="인기 상품" />
          <div className="feature-content">
            <h2>Hot item</h2>
            <h1>인기 상품을 확인해 보세요</h1>
            <p className="feature-description">
              가장 HOT한 중고거래 물품을 판다마켓에서 확인해 보세요
            </p>
          </div>
        </div>
        <div className="feature">
          <img src={feature2Image} alt="검색 기능" />
          <div className="feature-content">
            <h2>Search</h2>
            <h1>구매를 원하는 상품을 검색하세요</h1>
            <p className="feature-description">
              구매하고 싶은 물품은 검색해서 쉽게 찾아보세요
            </p>
          </div>
        </div>
        <div className="feature">
          <img src={feature3Image} alt="판매 상품 등록" />
          <div className="feature-content">
            <h2>Register</h2>
            <h1>판매를 원하는 상품을 등록하세요</h1>
            <p className="feature-description">
              어떤 물건이든 판매하고 싶은 상품을 쉽게 등록하세요
            </p>
          </div>
        </div>
      </section>

      {/* Bottom Banner Section */}
      <section
        id="bottomBanner"
        className="banner"
        style={{
          backgroundImage: `url(${bottomBannerImage})`,
        }}
      >
        <div className="wrapper">
          <h1>
            믿을 수 있는
            <br />
            판다마켓 중고거래
          </h1>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
