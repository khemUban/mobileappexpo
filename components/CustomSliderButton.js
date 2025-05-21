import React, { useRef, useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Animated,
  PanResponder,
  Dimensions,
} from "react-native";

const SCREEN_WIDTH = Dimensions.get("window").width;
const SLIDER_WIDTH = SCREEN_WIDTH * 0.8;
const SLIDER_HEIGHT = 60;
const SLIDE_THRESHOLD = SLIDER_WIDTH - 80;

export default function CustomSliderButton({
  onSlideComplete,
  text = "Slide to Confirm",
  resetTrigger,
}) {
  const pan = useRef(new Animated.ValueXY()).current;
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    setIsComplete(false);
    Animated.timing(pan, {
      toValue: { x: 0, y: 0 },
      duration: 150,
      useNativeDriver: false,
    }).start();
  }, [resetTrigger]);

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gesture) => gesture.dx > 10,
      onPanResponderMove: (_, gesture) => {
        if (!isComplete) {
          if (gesture.dx >= 0 && gesture.dx <= SLIDE_THRESHOLD) {
            pan.setValue({ x: gesture.dx, y: 0 });
          }
        }
      },
      onPanResponderRelease: (_, gesture) => {
        if (gesture.dx > SLIDE_THRESHOLD) {
          setIsComplete(true);
          Animated.timing(pan, {
            toValue: { x: SLIDE_THRESHOLD, y: 0 },
            duration: 150,
            useNativeDriver: false,
          }).start(() => {
            onSlideComplete?.();
          });
        } else {
          Animated.spring(pan, {
            toValue: { x: 0, y: 0 },
            useNativeDriver: false,
          }).start();
        }
      },
    })
  ).current;

  return (
    <View style={styles.container}>
      <View style={styles.sliderBackground}>
        <Text style={styles.label}>{text}</Text>
        <Animated.View
          style={[styles.sliderThumb, { transform: [{ translateX: pan.x }] }]}
          {...panResponder.panHandlers}
        >
          <Text style={styles.arrow}>➤</Text>
        </Animated.View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginVertical: 20,
  },
  sliderBackground: {
    width: SLIDER_WIDTH,
    height: SLIDER_HEIGHT,
    borderRadius: 30,
    backgroundColor: "#0047AB",
    justifyContent: "center",
    overflow: "hidden",
  },
  label: {
    position: "absolute",
    alignSelf: "center",
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  sliderThumb: {
    width: 60,
    height: SLIDER_HEIGHT,
    borderRadius: 30,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  arrow: {
    fontSize: 20,
    color: "#0047AB",
    fontWeight: "bold",
  },
});
