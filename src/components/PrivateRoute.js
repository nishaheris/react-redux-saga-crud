import React from "react";
import { Navigate, Outlet } from "react-router-dom";

function PrivateRoute() {
  // determine if authorized, from context or however you're doing it
  const auth = localStorage.getItem("userLogin") ? true : false;

  // If authorized, return an outlet that will render child elements
  // If not, return element that will navigate to login page
  return auth ? <Outlet /> : <Navigate to="/" />;
}

export default PrivateRoute;
