import React from "react";
import { AuthProvider } from "./context/AuthContext";
import { Provider as PaperProvider } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";
import MainApp from "./MainApp";

export default function App() {
  return (
    <PaperProvider>
      <SafeAreaProvider>
        <AuthProvider>
          <MainApp />
        </AuthProvider>
      </SafeAreaProvider>
    </PaperProvider>
  );
}
