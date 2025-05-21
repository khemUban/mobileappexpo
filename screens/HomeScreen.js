import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { format } from "date-fns";
import CustomSliderButton from "../components/CustomSliderButton";
import { useIsFocused } from "@react-navigation/native";
import ClockWidget from "../components/ClockWidget";
import TodaysViolators from "../components/TodaysViolators";

export default function HomeScreen({ navigation }) {
  const [now, setNow] = useState(new Date());
  const isFocused = useIsFocused();

  useEffect(() => {
    const interval = setInterval(() => {
      setNow(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const day = format(now, "EEE").toUpperCase();
  const time = format(now, "hh:mm a").toUpperCase();
  const date = format(now, "MMMM d").toUpperCase();

  const handleSlideComplete = () => {
    navigation.navigate("QRScanner");
  };

  return (
    <View style={styles.container}>

      <View style={styles.card}>
        <ClockWidget />

        <CustomSliderButton
          text="Slide to Scan QR"
          onSlideComplete={handleSlideComplete}
          resetTrigger={isFocused}
        />
      </View>

      <View style={styles.card1}>
        <TodaysViolators />
      </View>
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
  },
  card: {
    padding: 20,
  },
  card1: {
    padding: 20,
  },
});
