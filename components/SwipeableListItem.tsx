import React, { useRef } from "react";
import {
  Animated,
  PanResponder,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";

type SwipeableListItemProps = {
  children: React.ReactNode;
  onDelete: () => void;
  deleteTextStyle?: StyleProp<TextStyle>;
  deleteContainerStyle?: StyleProp<ViewStyle>;
  swipeThreshold?: number;
};

export const SwipeableListItem = ({
  children,
  onDelete,
  swipeThreshold = 100,
}: SwipeableListItemProps) => {
  const translateX = useRef(new Animated.Value(0)).current;

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: (_, gestureState) =>
        Math.abs(gestureState.dx) > Math.abs(gestureState.dy) &&
        Math.abs(gestureState.dx) > 10,

      onMoveShouldSetPanResponder: (_, gestureState) =>
        Math.abs(gestureState.dx) > Math.abs(gestureState.dy) &&
        Math.abs(gestureState.dx) > 10,

      onPanResponderMove: (_, gestureState) => {
        if (gestureState.dx < 0) {
          translateX.setValue(gestureState.dx);
        }
      },

      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dx < -swipeThreshold) {
          Animated.timing(translateX, {
            toValue: -400,
            duration: 300,
            useNativeDriver: true,
          }).start(() => {
            onDelete();
            translateX.setValue(0);
          });
        } else {
          Animated.spring(translateX, {
            toValue: 0,
            useNativeDriver: true,
          }).start();
        }
      },
    })
  ).current;

  return (
    <View style={styles.container}>
      <Animated.View
        style={{ transform: [{ translateX }] }}
        {...panResponder.panHandlers}
      >
        {children}
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
  },
});
