import React from "react";
import { Route, Redirect} from 'react-router-dom';
import { auth } from "./AuthService";


export const GuestRoute = ({ children, ...rest }) => {
  let isAuthenticated = auth.getAuthStatus();
  return (
    <Route
      {...rest}
      render={({ location }) =>
        isAuthenticated ? (
          <Redirect to="/" replace />
        ) : (
          children
        )
      }
    />
  );
};
