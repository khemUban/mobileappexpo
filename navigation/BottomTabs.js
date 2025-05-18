import React from "react";
import { StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { FAB } from "react-native-paper";

// Dummy Screens
// import HomeScreen from "../screens/HomeScreen";
// import SettingsScreen from "../screens/SettingsScreen";

const Tab = createBottomTabNavigator();

export default function BottomTabs({ navigation }) {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: styles.tabBar,
      }}
    >
      <Tab.Screen
        name="Home"
        component={() => null} // Empty dummy component
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="QR"
        component={() => null} // Empty dummy component
        options={{
          tabBarButton: () => (
            <FAB
              icon="qrcode"
              style={styles.fab}
              color="white"
              onPress={() => navigation.navigate("QRScanner")}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={() => null} // Empty dummy component
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="settings" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    position: "absolute",
    height: 60,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 10,
  },
  fab: {
    position: "absolute",
    bottom: 10,
    alignSelf: "center",
    backgroundColor: "#6200ee",
    zIndex: 10,
  },
});
