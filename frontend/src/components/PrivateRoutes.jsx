import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../hooks/AuthProvider"
import { Navigate, Outlet } from "react-router"

export default function PrivateRoutes() {
  const  {isLoggedIn}  = useContext(AuthContext);

  return (
    <>
      {isLoggedIn ? (<Outlet />) : (<Navigate to="/login" />)}
    </>
  );
}
