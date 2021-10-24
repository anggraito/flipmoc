import { useEffect, useRef } from "react"
import { Animated } from "react-native"

const fadeAnim = useRef(new Animated.Value(0)).current

export const fadeIn = () => {
  Animated.timing(fadeAnim, {
    toValue: 1,
    duration: 1500,
    useNativeDriver: true
  }).start(({ finished }) => {
    if (finished) fadeOut()
  })
};

const fadeOut = () => {
  Animated.timing(fadeAnim, {
    toValue: 0,
    duration: 1500,
    useNativeDriver: true
  }).start();
};
