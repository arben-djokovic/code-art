import React, { useState } from "react";
import "./Login.scss";
import apiCalls from "../../api/apiCalls"; 
import { useHistory } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { auth } from "../../services/AuthService";
import { GuestRoute } from "../../services/GuestRoute";

export default function Login() {
  const history = useHistory();
  const [usernameInput, setUsernameInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");

  const loginFun = async (e) => {
    e.preventDefault();
    if (usernameInput.length === 0 || passwordInput.length === 0) {
      toast.error("Please fill all input fields");
    } else {
      const userInfos = {
        requestBody: {
          username: usernameInput,
          password: passwordInput
        }
      };
      try {
        const response = await apiCalls.post("/user/login", userInfos); 
        if(response.data.success){
          const token = response.headers['24ca04apr02'];
          auth.login(token, usernameInput)
          toast.success("You are logged!")
          history.push("/");
        };
      } catch (error) {
        toast.error(error.response.data.responseCodes[0].responseKey);
      }
    }
  };

  return (<GuestRoute>
    <div className="authPage">
      <form className="authForm">
        <div className="input">
          <p>Username</p>
          <input
            value={usernameInput}
            onChange={(e) => setUsernameInput(e.target.value)}
            type="text"
            name="username"
          />
        </div>
        <div className="input">
          <p>Password</p>
          <input
            value={passwordInput}
            onChange={(e) => setPasswordInput(e.target.value)}
            type="password"
            name="password"
          />
        </div>
        <button className="loginBtn" onClick={loginFun}>
          Log in
        </button>
      </form>
    </div></GuestRoute>
  );
}
