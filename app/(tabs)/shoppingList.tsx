import React from "react";
import { View, StyleSheet } from "react-native";
import ShoppingList from "@/components/ShoppingList";

export default function ShoppingListTab() {
  return (
    <View style={styles.container}>
      <ShoppingList />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
});
