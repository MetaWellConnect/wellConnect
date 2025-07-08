import React, { createContext, useContext } from "react";
import Cookies from "js-cookie"
import { jwtDecode } from "jwt-decode"
export const AuthContext = createContext();

export default function AuthProvider({ children }) {
    const token = Cookies.get("token");
    let user = null;

    if (token) {
        user = jwtDecode(token);
    }

    function logout() {
        user = null;
    }

    return (
        <AuthContext.Provider value={{ logout, user }}>{children}</AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}
