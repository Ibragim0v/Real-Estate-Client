import React from "react";
import "./Login.scss";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import hero from "../../asserts/images/login-hero.svg";
import PersonIcon from "@mui/icons-material/Person";
import LockIcon from "@mui/icons-material/Lock";

export const Login = () => {
  const navigate = useNavigate();
  const { setToken } = useAuth(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    const { username, password } = e.target;

    fetch(`${process.env.REACT_APP_API}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        username: username.value.toString().trim(),
        password: password.value.toString().trim(),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setToken(data?.access_token);
        navigate("/");
      })
      .catch((err) => {
        throw new Error(err.message);
      });
  };
  return (
    <div className="login">
      <section className="login__side">
        <img src={hero} alt="hero" />
      </section>

      <section className="login__main">
        <div className="login__container">
          <p className="login__title">Welcome back!</p>
          <div className="login__separator"></div>
          <p className="login__message">
            Please, provide login credential to proceed and have access to all
            our services.
          </p>

          <form className="login__form" onSubmit={handleSubmit}>
            <div className="login__form-control">
              <input
                type="text"
                name="username"
                placeholder="Username"
                required
                autoComplete="off"
              />
              <PersonIcon className="icon" />
            </div>

            <div className="login__form-control">
              <input
                type="password"
                name="password"
                placeholder="Password"
                required
                autoComplete="off"
              />
              <LockIcon className="icon" />
            </div>

            <button type="submit" className="login__submit">
              Sign In
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};
