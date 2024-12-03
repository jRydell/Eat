// app/menu.tsx
import React, { useState, useEffect } from "react";
import { View, Text, Button, FlatList, StyleSheet } from "react-native";
import { fetchRandomMeal } from "../../services/api";
import { saveShoppingList, loadShoppingList } from "../../utils/storage";
import { extractIngredients } from "../../services/api";
import MenuGenerator from "@/components/MenuGenerator";

export default function MenuTab() {
  return (
    <View style={styles.container}>
      <MenuGenerator />
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
    marginBottom: 16,
  },
});
