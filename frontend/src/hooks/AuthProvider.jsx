import React, { createContext } from "react";
import Cookies from "js-cookie"
export const AuthContext = createContext();

export default function AuthProvider({ children }) {
    const user = Cookies.get("token");
    const isLoggedIn = user ? true : false;

    return (
        <AuthContext.Provider value={{ isLoggedIn }}>{children}</AuthContext.Provider>
    );
}
