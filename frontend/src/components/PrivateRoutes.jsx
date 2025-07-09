import React, { useEffect, useState } from "react";
import { useAuth } from "../hooks/AuthProvider"
import { Navigate, Outlet } from "react-router"

export default function PrivateRoutes() {
  const { user } = useAuth();

  return (
    <>
      {user ? (<Outlet />) : (<Navigate to="/login" />)}
    </>
  );
}
