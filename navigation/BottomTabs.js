import React, { useContext } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import HomeScreen from "../screens/HomeScreen";
import SettingsScreen from "../screens/SettingsScreen";
import { AuthContext } from "../context/AuthContext";

const user = {
  avatar:
    "https://ui-avatars.com/api/?name=Guard+One&background=0D8ABC&color=fff",
  name: "Guard 1",
  email: "occguard1@example.com",
};

const Tab = createBottomTabNavigator();

export default function BottomTabs({ navigation }) {
  const { logout } = useContext(AuthContext);

  return (
    <View style={{ flex: 1 }}>
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
            headerRight: () => (
              <TouchableOpacity onPress={logout} style={styles.logoutButton}>
                <Ionicons name="log-out-outline" size={24} color="#333" />
              </TouchableOpacity>
            ),
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="home" size={size} color={color} />
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
    </View>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: "#fff",
    height: 60,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    position: "absolute",
    overflow: "hidden",
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  name: {
    fontWeight: "bold",
    fontSize: 16,
  },
  email: {
    fontSize: 12,
    color: "#888",
  },
  logoutButton: {
    marginRight: 15,
  },
});
