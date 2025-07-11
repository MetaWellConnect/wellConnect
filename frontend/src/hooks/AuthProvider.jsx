import React, { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie"
import { jwtDecode } from "jwt-decode"
const AuthContext = createContext();
const useAuth = () => useContext(AuthContext);

function AuthProvider({ children }) {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = Cookies.get("token");
        if (token) {
            setUser(jwtDecode(token));
        }
    }, []);

    const loginFrontend = () => {
        const token = Cookies.get("token");
        if (token) {
            setUser(jwtDecode(token));
            return "Successfully logged in!";
        }

        return "No token present!";
    }

    const logoutFrontend = () => {
        setUser(null);
        return "Successfully logged out!";
    }

    return (
        <AuthContext.Provider value={{ logoutFrontend, loginFrontend, user }}>{children}</AuthContext.Provider>
    );
}

export { AuthContext, useAuth };
export default AuthProvider;
