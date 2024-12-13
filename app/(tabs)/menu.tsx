import React from "react";
import { View, StyleSheet } from "react-native";

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
