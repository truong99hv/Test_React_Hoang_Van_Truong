import "./login.css";
import React from "react";
import LoginForm from "./LoginForm";
const Login = () => {
  return (
    <div className="Login">
      <div className="banner">
        <a href="/search">
          <img
            src="https://loainguycap.ceid.gov.vn/static/img/logoColor.e5de23ce.png"
            alt="logo"
          />
        </a>
        <div className="title-banner">
          <h2>
            HỆ THỐNG BÁO CÁO VỀ HIỆN TRẠNG LOÀI NGUY CẤP, QUÝ, HIẾM ĐƯỢC ƯU TIÊN
            BẢO VỆ
          </h2>
        </div>
      </div>

      <div className="main-login">
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
