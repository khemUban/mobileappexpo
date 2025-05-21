import React, { useState, useContext } from "react";
import { View, TextInput, Button, Alert, StyleSheet } from "react-native";
import { AuthContext } from "../context/AuthContext";

export default function LoginScreen() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);

  const handleLogin = async () => {
    try {
      await login(username, password);
    } catch (err) {
      console.log(err.response?.data || err.message);
      Alert.alert(
        "Login Failed",
        err.response?.data?.message || "Something went wrong."
      );
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Username"
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="4-digit PIN"
        secureTextEntry
        onChangeText={setPassword}
      />
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20 },
  input: { borderWidth: 1, marginBottom: 10, padding: 10, borderRadius: 5 },
});
