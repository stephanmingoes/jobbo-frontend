import React, { useState, useReducer } from "react";
import Logo from "../Logo/Logo";
import { authReducer, authInitialState } from "../../reducers/auth";
import { validateCredentials } from "./validate";
import * as actions from "../../actionTypes/actionTypes";
import * as api from "../../api/index";
import "./auth.css";

const Auth = ({ setUser }) => {
  const [pwd, setPwd] = useState(true);
  const [toggle, setToggle] = useState(true);
  const [success, setSuccess] = useState({ status: null, message: null });
  const [authState, authDispatch] = useReducer(authReducer, authInitialState);
  const [credentials, setCredentials] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleClick = async (cred) => {
    try {
      if (toggle) {
        if (validateCredentials(cred)) {
          const { data } = await api.signup(cred);
          if (data) {
            setSuccess({ status: true, message: data.message });
          }
        }
      } else {
        if (cred.email.trim() !== "" && cred.password.trim() !== "") {
          const { data } = await api.login(cred);
          if (data) {
            setSuccess({ status: true, message: data.message });
            authDispatch({ type: actions.LOGIN, payload: data.data });
            setUser(localStorage.getItem("profile"));
          }
        } else {
          alert("Input fields cannot be empty.");
        }
      }
    } catch (error) {
      console.log(error);
      setSuccess({ status: false, message: "Oh no, something went wrong." });
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCredentials((preval) => ({ ...preval, [name]: value }));
  };

  return (
    <div className="auth">
      <Logo />

      <form className="auth-form">
        {toggle ? (
          <input
            type="text"
            name="username"
            placeholder="Username"
            autoComplete="username"
            onChange={handleChange}
          />
        ) : null}
        <input
          type="email"
          name="email"
          placeholder="Email"
          autoComplete="email"
          onChange={handleChange}
        />
        <input
          type={pwd ? "password" : "text"}
          name="password"
          placeholder="Password"
          autoComplete="current-password"
          onChange={handleChange}
        />

        <input
          type="checkbox"
          onClick={() => setPwd(!pwd)}
          name="checkbox"
          id="cb"
        />
        <label htmlFor="cb">Show Password</label>
        <button
          onClick={(e) => {
            e.preventDefault();
            handleClick(credentials);
          }}
        >
          {toggle ? "Sign up" : "Log in"}
        </button>
        {toggle ? (
          <p>
            Already have an account?{" "}
            <span onClick={() => setToggle(!toggle)}>Login</span>
          </p>
        ) : (
          <p>
            Dont have an account?{" "}
            <span
              onClick={() => {
                setSuccess({ status: null, message: null });
                setToggle(!toggle);
              }}
            >
              Signup
            </span>
          </p>
        )}
      </form>
      {success.message ? (
        <div
          className="popup"
          style={{ background: success.status ? "#1BCF94" : "#D20E17" }}
        >
          {success.message}
        </div>
      ) : null}
    </div>
  );
};

export default Auth;
