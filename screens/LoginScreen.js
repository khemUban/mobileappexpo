import React, { useState, useContext, useRef } from "react";
import {
  View,
  Text,
  Alert,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Image,
  useColorScheme,
} from "react-native";
import { AuthContext } from "../context/AuthContext";

export default function LoginScreen() {
  const [username] = useState("occguard1@example.com");
  const [pin, setPin] = useState("");
  const { login } = useContext(AuthContext);
  const colorScheme = useColorScheme();

  const pinAnimations = useRef([
    new Animated.Value(0),
    new Animated.Value(0),
    new Animated.Value(0),
    new Animated.Value(0),
  ]).current;

  const isDark = colorScheme === "dark";

  const handleDigitPress = (digit) => {
    if (pin.length < 4) {
      const newPin = pin + digit;
      setPin(newPin);
      animatePin(newPin.length - 1);
      if (newPin.length === 4) {
        setTimeout(() => handleLogin(newPin), 300);
      }
    }
  };

  const handleBackspace = () => {
    if (pin.length > 0) {
      setPin(pin.slice(0, -1));
    }
  };

  const animatePin = (index) => {
    Animated.sequence([
      Animated.timing(pinAnimations[index], {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(pinAnimations[index], {
        toValue: 0,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handleLogin = async (enteredPin) => {
    try {
      await login(username, enteredPin);
    } catch (err) {
      console.log(err.response?.data || err.message);
      Alert.alert("Login Failed", err.response?.data?.message || "Invalid PIN");
      setPin("");
    }
  };

  const renderPinBoxes = () =>
    [...Array(4)].map((_, i) => (
      <Animated.View
        key={i}
        style={[
          styles.pinBox,
          pin.length > i ? styles.pinBoxFilled(isDark) : styles.pinBoxEmpty(isDark),
          {
            transform: [
              {
                scale: pinAnimations[i].interpolate({
                  inputRange: [0, 1],
                  outputRange: [1, 1.1],
                }),
              },
            ],
          },
        ]}
      >
        <Text style={styles.pinText(isDark)}>{pin[i] ? "●" : ""}</Text>
      </Animated.View>
    ));

  const renderKeypad = () => {
    const rows = [
      ["1", "2", "3"],
      ["4", "5", "6"],
      ["7", "8", "9"],
      ["", "0", "←"],
    ];

    return rows.map((row, rowIndex) => (
      <View key={rowIndex} style={styles.keypadRow}>
        {row.map((digit, colIndex) => (
          <TouchableOpacity
            key={colIndex}
            style={[
              styles.key,
              digit === "←" && styles.keyBackspace,
              digit === "" && styles.keyDisabled,
            ]}
            onPress={() => {
              if (digit === "←") handleBackspace();
              else if (digit !== "") handleDigitPress(digit);
            }}
            disabled={digit === ""}
          >
            {digit !== "" && (
              <Text style={styles.keyText}>{digit}</Text>
            )}
          </TouchableOpacity>
        ))}
      </View>
    ));
  };


  return (
    <View style={[styles.container, { backgroundColor: isDark ? "#111" : "#f7f7f7" }]}>
      <Image
        source={require("../assets/def-logo.jpg")}
        style={styles.avatar}
      />
      <Text style={[styles.title, { color: isDark ? "#fff" : "#333" }]}>
        {username}
      </Text>

      <View style={styles.pinContainer}>{renderPinBoxes()}</View>

      <View style={styles.keypad}>{renderKeypad()}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 16,
  },
  title: {
    fontSize: 15,
    fontWeight: "1000",
    marginBottom: 30,
  },
  pinContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 40,
  },
  pinBox: {
    width: 50,
    height: 60,
    borderRadius: 10,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 8,
  },
  pinBoxFilled: (isDark) => ({
    borderColor: isDark ? "#6a4fff" : "#023473",
    backgroundColor: isDark ? "#333" : "#fff",
  }),
  pinBoxEmpty: (isDark) => ({
    borderColor: isDark ? "#444" : "#ccc",
    backgroundColor: isDark ? "#222" : "#fff",
  }),
  pinText: (isDark) => ({
    fontSize: 24,
    color: isDark ? "#fff" : "#000",
  }),
  keypad: {
    width: "80%",
  },
  keypadRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  key: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "#ddd",
    justifyContent: "center",
    alignItems: "center",
  },
  keyBackspace: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#f7f7f7",
  },
  keyDisabled: {
    backgroundColor: "transparent",
  },
  keyText: {
    fontSize: 24,
    fontWeight: "600",
  },
});
