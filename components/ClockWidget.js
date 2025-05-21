import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { format } from "date-fns";
import { BlurView } from "expo-blur";
import { Feather } from "@expo/vector-icons";

export default function ClockWidget() {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setNow(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const time = format(now, "hh:mm a");
  const day = format(now, "EEEE");
  const date = format(now, "MMMM dd, yyyy");

  return (
    <View style={styles.card}>
      <Text style={styles.time}>{time}</Text>
      <Text style={styles.day}>{day}</Text>
      <Text style={styles.date}>{date}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    marginBottom: 25,
    backgroundColor: "#f0f0f0",
  },
  time: {
    fontSize: 44,
    fontWeight: "700",
    color: "#1A1A1A",
  },
  day: {
    fontSize: 18,
    fontWeight: "600",
    color: "#0047AB",
    marginTop: 6,
  },
  date: {
    fontSize: 14,
    color: "#666",
    marginTop: 2,
  },
});
