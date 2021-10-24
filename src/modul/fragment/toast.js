import { useEffect, useRef } from "react"
import { Animated, View, Text } from "react-native"
import { DARKSLATE, Font13, WHITE } from "../../helpers/globalStyles"

export const showToast = () => {
  const fadeAnim = useRef(new Animated.Value(0)).current
  
  useEffect(() => {
    fadeIn()
  }, [])

  const fadeIn = () => {
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

  return (
    <Animated.View style={{ position: 'absolute', bottom: 0, width: '100%', backgroundColor: DARKSLATE, padding: 20, opacity: fadeAnim}}>
      <Text style={Font13('Roboto-Regular', WHITE)}>Berhasil disalin</Text>
    </Animated.View>
  )
}
