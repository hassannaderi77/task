// import {
//   createContext,
//   useEffect,
//   useState,
// } from "react";

// import {
//   getCurrentUser,
//   logoutUser,
// } from "../api/services/authService";

// export const AuthContext = createContext(null);

// export function AuthProvider({ children }) {
//   const [user, setUser] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);

//   const isAuthenticated = Boolean(user);

//   useEffect(() => {
//     const restoreUser = async () => {
//       try {
//         console.log("🔄 Checking current session...");
//         const response = await getCurrentUser();

//         setUser(response.user);
//       } catch (error) {
//         setUser(null);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     restoreUser();
//   }, []);

//   const login = (userData) => {
//     setUser(userData);
//   };

//   const logout = async () => {
//     try {
//       await logoutUser();
//     } catch (error) {
//       console.error("Logout error:", error);
//     } finally {
//       setUser(null);
//     }
//   };

//   return (
//     <AuthContext.Provider
//       value={{
//         user,
//         isAuthenticated,
//         isLoading,
//         login,
//         logout,
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// }


import {
  createContext,
  useEffect,
  useState,
} from "react";

import { logoutUser } from "../api/services/authService";

export const AuthContext = createContext(null);

const AUTH_STORAGE_KEY = "modernio_auth";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const isAuthenticated = Boolean(user);

  useEffect(() => {
    try {
      const savedUser = localStorage.getItem(AUTH_STORAGE_KEY);

      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }
    } catch (error) {
      console.error("Failed to restore auth:", error);
      localStorage.removeItem(AUTH_STORAGE_KEY);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = (userData) => {
    localStorage.setItem(
      AUTH_STORAGE_KEY,
      JSON.stringify(userData)
    );

    setUser(userData);
  };

  const logout = async () => {
    try {
      await logoutUser();
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      localStorage.removeItem(AUTH_STORAGE_KEY);
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isLoading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}