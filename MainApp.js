// import React, { useContext } from "react";
// import { NavigationContainer } from "@react-navigation/native";
// import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import { View, ActivityIndicator, StyleSheet } from "react-native";
// import { AuthContext } from "./context/AuthContext";

// import LoginScreen from "./screens/LoginScreen";
// import BottomTabs from "./navigation/BottomTabs";
// import QRScannerScreen from "./screens/QRScannerScreen";

// const Stack = createNativeStackNavigator();

// export default function MainApp() {
//   const { isAuthenticated, checkingAuth } = useContext(AuthContext);

//   if (checkingAuth) {
//     return (
//       <View style={styles.loaderContainer}>
//         <ActivityIndicator size="large" color="#6200ee" />
//       </View>
//     );
//   }

//   return (
//     <NavigationContainer>
//       <Stack.Navigator screenOptions={{ headerShown: false }}>
//         {isAuthenticated ? (
//           <>
//             <Stack.Screen name="Main" component={BottomTabs} />
//             <Stack.Screen name="QRScanner" component={QRScannerScreen} />
//           </>
//         ) : (
//           <Stack.Screen name="Login" component={LoginScreen} />
//         )}
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }

// const styles = StyleSheet.create({
//   loaderContainer: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
// });


import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import { AuthContext } from "./context/AuthContext";

import LoginScreen from "./screens/LoginScreen";
import BottomTabs from "./navigation/BottomTabs";
import QRScannerScreen from "./screens/QRScannerScreen";

import TodaysViolatorsScreen from "./screens/TodaysViolatorsScreen";
import IssueViolationScreen from "./screens/IssueViolationScreen";
import TicketReceiptScreen from "./screens/TicketReceiptScreen";

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
            <Stack.Screen
              name="TodaysViolatorsScreen"
              component={TodaysViolatorsScreen}
              options={{
                headerShown: true,
                title: "Today's Violators",
                headerStyle: {
                  backgroundColor: "#0047AB",
                },
                headerTintColor: "#fff",
                headerTitleStyle: {
                  fontWeight: "600",
                },
              }} />
            <Stack.Screen
              name="IssueViolationScreen"
              component={IssueViolationScreen}
              options={{
                headerShown: true,
                title: "Issue Violation",
                headerStyle: {
                  backgroundColor: "#0047AB",
                },
                headerTintColor: "#fff",
                headerTitleStyle: {
                  fontWeight: "600",
                },
              }}
            />
            <Stack.Screen
              name="TicketReceiptScreen"
              component={TicketReceiptScreen}
              options={{
                headerShown: true,
                title: "Ticket Receipt",
                headerStyle: {
                  backgroundColor: "#0047AB",
                },
                headerTintColor: "#fff",
                headerTitleStyle: {
                  fontWeight: "600",
                },
              }}
            />
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
