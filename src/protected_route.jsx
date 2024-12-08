import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ element }) => {
  const auth = useSelector((state) => state.login);
  const token = auth.token;

  if (token && auth.user) {
    return element;
  } else {
    return <Navigate to="/login" />;
  }

  //   return element;
};

export default ProtectedRoute;
