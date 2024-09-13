import { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

// Create the AuthContext with an initial value of false
export const AuthContext = createContext(false);

// eslint-disable-next-line react/prop-types
export default function AuthContextProvider({ children }) {
    // Check if a token exists in localStorage to determine the initial login state
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(() => localStorage.getItem("token") !== null);

    // Effect to update localStorage when isUserLoggedIn changes
    const token=localStorage.getItem("token")
    useEffect(() => {
        if(token)
            {

                try {
                    jwtDecode(token)
                    setIsUserLoggedIn(true)
            }
         catch (error) {
            (localStorage.removeItem("token"))
            setIsUserLoggedIn(false)
        }
    }
    
       
    }, [isUserLoggedIn]);

    return (
        <AuthContext.Provider value={{ isUserLoggedIn, setIsUserLoggedIn }}>
            {children}
        </AuthContext.Provider>
    );
}
