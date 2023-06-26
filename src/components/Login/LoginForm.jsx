import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../context/AuthContext";
import { CiUser } from "react-icons/ci";
import { AiOutlineLock } from "react-icons/ai";
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./login.css";

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { login } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isUsernameFocused, setIsUsernameFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };
  const navigate = useNavigate();
  const onSubmit = async (data) => {
    try {
      setIsLoading(true);
      const response = await axios.post(
        "http://wlp.howizbiz.com/api/web-authenticate",
        {
          username: data.username,
          password: data.password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        const accessToken = response.data.access_token;
        login(accessToken);
        navigate("/");
      }
    } catch (error) {
      setErrorMessage("Tên tài khoản hoặc mật khẩu không chính xác");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const usernameInput = document.querySelector(".input-username");
    if (usernameInput) {
      usernameInput.focus();
    }
  }, []);

  return (
    <form className="form-login" onSubmit={handleSubmit(onSubmit)}>
      <a href="/search" className="link-logo">
        <img
          src="https://loainguycap.ceid.gov.vn/static/img/logo.png"
          alt="logo"
        />
      </a>

      <h3 className="title-form">Đăng nhập</h3>
      <div className={`username ${isUsernameFocused ? "focused" : ""}`}>
        <span>
          <CiUser />
        </span>
        <input
          className="input-username"
          {...register("username", {
            required: "Tên đăng nhập không được bỏ trống",
          })}
          placeholder="Tên đăng nhập"
          onChange={() => setErrorMessage("")}
          onFocus={() => {
            setIsUsernameFocused(true);
            setIsPasswordFocused(false);
          }}
        />
      </div>
      {errors.username && (
        <div className="error-message">{errors.username.message}</div>
      )}
      <div className={`password ${isPasswordFocused ? "focused" : ""}`}>
        <span>
          <AiOutlineLock />
        </span>
        <input
          className="input-password"
          {...register("password", {
            required: "Mật khẩu không được bỏ trống",
            minLength: {
              value: 8,
              message: "Mật khẩu phải có ít nhất 8 ký tự",
            },
          })}
          placeholder="Mật khẩu"
          type={showPassword ? "text" : "password"}
          onChange={() => setErrorMessage("")}
          onFocus={() => {
            setIsPasswordFocused(true);
            setIsUsernameFocused(false);
          }}
        />

        <span onClick={togglePasswordVisibility}>
          {showPassword ? <BsEyeFill /> : <BsEyeSlashFill />}
        </span>
      </div>
      {errors.password && (
        <div className="error-message">{errors.password.message}</div>
      )}
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      <button className="btn btn-login" type="submit" disabled={isLoading}>
        {isLoading ? "Đang đăng nhập..." : "Đăng nhập"}
      </button>
    </form>
  );
};

export default LoginForm;
