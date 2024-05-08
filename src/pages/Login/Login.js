import React, { useState } from "react";
import "./Login.scss";
import apiCalls from "../../api/apiCalls";
import { useHistory } from "react-router-dom";
import { auth } from "../../services/AuthService";
import { GuestRoute } from "../../services/GuestRoute";
import { toast } from "react-toastify";
import PasswordStrengthBar from 'react-password-strength-bar';
import { motion } from "framer-motion"

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
          password: passwordInput,
        },
      };
      try {
        const response = await apiCalls.post("/user/login", userInfos);
        if (response.data && response.data.success) {
          const token = response.headers["24ca04apr02"];
          auth.login(token, usernameInput);
          toast.success("You are logged!");
          history.push("/");
        }
      } catch (error) {
        console.log(error);
        if (error.response) {
          toast.error(error.response.data.responseCodes[0].responseKey);
        }
      }
    }
  };

  return (
    <GuestRoute>
      <div className="authPage">
        <motion.form
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
         className="authForm">
          <div className="input">
            <label for="usernameInput"><p>Username</p></label>
            <motion.input
              whileHover={{
                scale: 1.03,
                transition: { duration: 0.2 },
              }}
              id="usernameInput"
              value={usernameInput}
              onChange={(e) => setUsernameInput(e.target.value)}
              type="text"
              name="username"
            />
          </div>
          <div className="input">
            <label for="passwordInput"><p>Password</p></label>
            <motion.input
              whileHover={{
                scale: 1.03,
                transition: { duration: 0.2 },
              }}
              value={passwordInput}
              id="passwordInput"
              onChange={(e) => setPasswordInput(e.target.value)}
              type="password"
              name="password"
            />
            <PasswordStrengthBar password={passwordInput} />
          </div>
          <button className="orangeBtn" onClick={loginFun}>
            Log in
          </button>
        </motion.form>
      </div>
    </GuestRoute>
  );
}
