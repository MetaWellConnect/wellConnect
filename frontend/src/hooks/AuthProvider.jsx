import React, { createContext } from "react";
import Cookies from "js-cookie"
import { jwtDecode } from "jwt-decode"
export const AuthContext = createContext();

export default function AuthProvider({ children }) {
    const token = Cookies.get("token");
    const isLoggedIn = token ? true : false;
    let user;
    if (isLoggedIn){
        user = jwtDecode(token);
    }


    return (
        <AuthContext.Provider value={{ isLoggedIn, user }}>{children}</AuthContext.Provider>
    );
}
