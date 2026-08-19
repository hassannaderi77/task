import { createContext, useState } from "react";

export const AuthContext = createContext();

export function AuthProvider({children}) {
    const pass = "1234"
    const [info, setInfo] = useState(null)
    const [ loginInfo, setLoginInfo] = useState({
        name: "",
        family: "",
        phone: "",
        email: ""
    })

    return (
        <AuthContext.Provider value={{pass, info, setInfo,loginInfo, setLoginInfo}}>
            {children}
        </AuthContext.Provider>
    )
}