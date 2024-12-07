import { View, Text, StyleSheet } from "react-native";

export default function HomeTab() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Eat</Text>
      <Text style={styles.subtitle}>-Whats for dinner?</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 16,
    color: "gray",
  },
});
