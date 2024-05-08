import React from "react";
import { PrivateRoute } from "../../services/PrivateRoute";
import { auth } from "../../services/AuthService";
import apiCalls from "../../api/apiCalls";
import { useHistory } from "react-router-dom";

export default function Home() {
  const history = useHistory();

  const logOut = async () => {
    try {
      const response = await apiCalls.post("/user/logout");
      toast.success("Logged out");
      auth.logout();
      history.push("/log-in");
    } catch (err) {
        console.log(err)
        if (err.response) {
            toast.error(error.response.data.responseCodes[0].responseKey);
        }
    }
  };
  return (
    <PrivateRoute>
      <div>
        <h1>You are logged!!</h1>
        <p>Username: {localStorage.getItem("username")}</p>
        <button onClick={logOut}>LOGOUT</button>
      </div>
    </PrivateRoute>
  );
}
