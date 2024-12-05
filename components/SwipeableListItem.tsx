// Import necessary components and hooks from React and React Native
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

// Define the interface for the props expected by the SwipeableListItem component
type SwipeableListItemProps = {
  children: React.ReactNode; // Child elements to be displayed inside the component
  onDelete: () => void; // Function to call when item is deleted
  deleteText?: string; // Optional text to display on delete button
  deleteTextStyle?: StyleProp<TextStyle>; // Optional style for delete text
  deleteContainerStyle?: StyleProp<ViewStyle>; // Optional style for delete container
  swipeThreshold?: number; // Optional threshold to trigger delete swipe action
};

// Define the SwipeableListItem functional component
export const SwipeableListItem = ({
  children,
  onDelete,
  swipeThreshold = 100, // Default swipe threshold
}: SwipeableListItemProps) => {
  // Initialize a ref to track the X translation value for swipe animation
  const translateX = useRef(new Animated.Value(0)).current;

  // Define a pan responder to handle swipe gestures
  const panResponder = useRef(
    PanResponder.create({
      // Determine if the gesture should be handled when it starts
      onStartShouldSetPanResponder: (_, gestureState) =>
        Math.abs(gestureState.dx) > Math.abs(gestureState.dy) &&
        Math.abs(gestureState.dx) > 10,
      // Determine if the gesture should be handled when it moves
      onMoveShouldSetPanResponder: (_, gestureState) =>
        Math.abs(gestureState.dx) > Math.abs(gestureState.dy) &&
        Math.abs(gestureState.dx) > 10,
      // Handle the movement of the swipe gesture
      onPanResponderMove: (_, gestureState) => {
        if (gestureState.dx < 0) {
          // Allow swipe only to the left
          translateX.setValue(gestureState.dx); // Update translateX with gesture movement
        }
      },
      // Handle what happens when the user releases the swipe
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dx < -swipeThreshold) {
          // If swipe exceeds the threshold, animate smoothly off the screen and call onDelete
          Animated.timing(translateX, {
            toValue: -400, // Move the item far off-screen
            duration: 300,
            useNativeDriver: true,
          }).start(() => {
            onDelete(); // Call the delete function passed in props
            translateX.setValue(0); // Reset position for potential reuse
          });
        } else {
          // Otherwise, reset position to 0
          Animated.spring(translateX, {
            toValue: 0,
            useNativeDriver: true,
          }).start();
        }
      },
    })
  ).current;

  // Render the swipeable list item component
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

// Define styles for the component
const styles = StyleSheet.create({
  container: {
    position: "relative", // Allows positioning of delete button overlay
  },
});

// Export the component to use in other parts of the app
