import React, { useEffect, useRef } from "react";
import { View, StyleSheet, Animated } from "react-native";
import Svg, { Circle, Text } from "react-native-svg";
import { Colors } from "../../Constants/Colors";

const Progress = ({ progress }) => {
  const animatedValue = useRef(new Animated.Value(0)).current;
  const circleRef = useRef();
  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: progress || 82,
      duration: 3000,
      useNativeDriver: false,
    }).start();
  }, [animatedValue, progress]);
  const circumference = 2 * Math.PI * 50;
  const animatedStrokeDashoffset = animatedValue.interpolate({
    inputRange: [0, 100],
    outputRange: [circumference, 0],
    extrapolate: "clamp",
  });
  return (
    <View style={styles.container}>
      <Svg height="200" width="200">
        <Circle
          ref={circleRef}
          cx="100"
          cy="100"
          r="50"
          stroke="#e3e3e3"
          strokeWidth="10"
          fill="transparent"
        />
        <AnimatedCircle
          cx="100"
          cy="100"
          r="50"
          stroke={Colors.Marianblue}
          strokeWidth="10"
          fill="transparent"
          strokeDasharray={`${circumference}, ${circumference}`}
          strokeDashoffset={animatedStrokeDashoffset}
        />
        <Text
          x="100"
          y="110"
          textAnchor="middle"
          fontSize="20"
          fontWeight="bold"
          fill={Colors.whiteColor}
        >
          {Number(progress).toFixed(2)}
        </Text>
      </Svg>
    </View>
  );
};

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Progress;