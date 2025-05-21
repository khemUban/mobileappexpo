import React, { useRef, useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Animated,
  PanResponder,
  Dimensions,
  Easing,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const SCREEN_WIDTH = Dimensions.get("window").width;
const SLIDER_WIDTH = SCREEN_WIDTH - 40;
const SLIDER_HEIGHT = 60;
const SLIDE_THRESHOLD = SLIDER_WIDTH - 80;

export default function CustomSliderButton({
  onSlideComplete,
  text = "Slide to Confirm",
  resetTrigger,
}) {
  const pan = useRef(new Animated.ValueXY()).current;
  const shimmerAnim = useRef(new Animated.Value(0)).current;
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    shimmerAnimation();
  }, []);

  useEffect(() => {
    setIsComplete(false);
    Animated.timing(pan, {
      toValue: { x: 0, y: 0 },
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [resetTrigger]);

  const shimmerAnimation = () => {
    shimmerAnim.setValue(0);
    Animated.loop(
      Animated.timing(shimmerAnim, {
        toValue: 1,
        duration: 2000,
        easing: Easing.linear,
        useNativeDriver: false,
      })
    ).start();
  };

  const translateXInterpolate = shimmerAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [-SLIDER_WIDTH, SLIDER_WIDTH],
  });

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gesture) => gesture.dx > 10,
      onPanResponderMove: (_, gesture) => {
        if (!isComplete && gesture.dx >= 0 && gesture.dx <= SLIDE_THRESHOLD) {
          pan.setValue({ x: gesture.dx, y: 0 });
        }
      },
      onPanResponderRelease: (_, gesture) => {
        if (gesture.dx > SLIDE_THRESHOLD) {
          setIsComplete(true);
          Animated.spring(pan, {
            toValue: { x: SLIDE_THRESHOLD, y: 0 },
            useNativeDriver: false,
          }).start(() => {
            onSlideComplete?.();
          });
        } else {
          Animated.spring(pan, {
            toValue: { x: 0, y: 0 },
            friction: 5,
            tension: 80,
            useNativeDriver: false,
          }).start();
        }
      },
    })
  ).current;

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#0047AB", "#007FFF"]}
        style={styles.sliderBackground}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
      >
        <View style={styles.shimmerContainer}>
          <Text style={styles.label}>{text}</Text>
          <Animated.View
            style={[
              styles.shimmer,
              {
                transform: [{ translateX: translateXInterpolate }],
              },
            ]}
          />
        </View>

        <Animated.View
          style={[styles.sliderThumb, { transform: [{ translateX: pan.x }] }]}
          {...panResponder.panHandlers}
        >
          <Text style={styles.arrow}>➤</Text>
        </Animated.View>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
  },
  sliderBackground: {
    width: SLIDER_WIDTH,
    height: SLIDER_HEIGHT,
    borderRadius: 40,
    justifyContent: "center",
    overflow: "hidden",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  shimmerContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
  },
  label: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    zIndex: 2,
  },
  shimmer: {
    position: "absolute",
    width: 200,
    height: "100%",
    borderRadius: 40,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
  },
  sliderThumb: {
    width: 60,
    height: SLIDER_HEIGHT,
    borderRadius: 40,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 3,
  },
  arrow: {
    fontSize: 20,
    color: "#0047AB",
    fontWeight: "bold",
  },
});
