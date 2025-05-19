import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { FAB } from "react-native-paper";
import HomeScreen from "../screens/HomeScreen";
import SettingsScreen from "../screens/SettingsScreen";

// Dummy user
const user = {
  avatar: "https://ui-avatars.com/api/?name=Guard+One&background=0D8ABC&color=fff",
  name: "Guard 1",
  email: "occguard1@example.com",
};

const Tab = createBottomTabNavigator();

function QRPlaceholderScreen() {
  return null;
}

export default function BottomTabs({ navigation }) {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: styles.tabBar,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerTitle: () => (
            <View style={styles.headerContainer}>
              <Image source={{ uri: user.avatar }} style={styles.avatar} />
              <View>
                <Text style={styles.name}>{user.name}</Text>
                <Text style={styles.email}>{user.email}</Text>
              </View>
            </View>
          ),
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="QR"
        component={QRPlaceholderScreen}
        options={{
          tabBarButton: () => (
            <FAB
              icon="qrcode"
              style={styles.fab}
              color="white"
              onPress={() => navigation.navigate("QRScannerScreen")}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          headerTitle: "Settings",
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
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  name: {
    fontWeight: "bold",
    fontSize: 20,
  },
  email: {
    fontSize: 12,
    color: "gray",
  },
});
