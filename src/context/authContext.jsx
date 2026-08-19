import { createContext, useState } from "react";

export const AuthContext = createContext();

export function AuthProvider({children}) {
    const pass = "1234"
    const [info, setInfo] = useState(null)

    return (
        <AuthContext.Provider value={{pass, info, setInfo}}>
            {children}
        </AuthContext.Provider>
    )
}