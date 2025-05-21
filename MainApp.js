import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import { AuthContext } from "./context/AuthContext";

import LoginScreen from "./screens/LoginScreen";
import BottomTabs from "./navigation/BottomTabs";
import QRScannerScreen from "./screens/QRScannerScreen";

const Stack = createNativeStackNavigator();

export default function MainApp() {
  const { isAuthenticated, checkingAuth } = useContext(AuthContext);

  if (checkingAuth) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#6200ee" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isAuthenticated ? (
          <>
            <Stack.Screen name="Main" component={BottomTabs} />
            <Stack.Screen name="QRScanner" component={QRScannerScreen} />
          </>
        ) : (
          <Stack.Screen name="Login" component={LoginScreen} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
