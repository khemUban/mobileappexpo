// import React, { createContext, useState, useEffect } from "react";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import apiClient from "../apiClient";

// export const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [checkingAuth, setCheckingAuth] = useState(true);

//   useEffect(() => {
//     const checkToken = async () => {
//       const token = await AsyncStorage.getItem("authToken");
//       if (token) {
//         try {
//           // Optional: verify token with backend
//           await apiClient.get("/user");
//           setIsAuthenticated(true);
//         } catch (err) {
//           await AsyncStorage.removeItem("authToken");
//         }
//       }
//       setCheckingAuth(false);
//     };

//     checkToken();
//   }, []);

//   const login = async (username, password) => {
//     const response = await apiClient.post("/login", { username, password });
//     const token = response.data.token;
//     await AsyncStorage.setItem("authToken", token);
//     setIsAuthenticated(true);
//   };

//   const logout = async () => {
//     try {
//       await apiClient.post("/logout");
//     } catch (err) {
//       // fallback silently
//     }
//     await AsyncStorage.removeItem("authToken");
//     setIsAuthenticated(false);
//     // Optional navigation logic
//     navigation.reset({ index: 0, routes: [{ name: "Login" }] });
//   };

//   return (
//     <AuthContext.Provider
//       value={{ isAuthenticated, checkingAuth, login, logout }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// };



import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    // Simulate auth check delay
    setTimeout(() => {
      setCheckingAuth(false);
    }, 1000);
  }, []);

  const login = async (username, password) => {
    // Dummy login logic
    if (username === "occguard1@example.com" && password === "1234") {
      setIsAuthenticated(true);
    } else {
      throw new Error("Invalid username or password");
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        checkingAuth,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
