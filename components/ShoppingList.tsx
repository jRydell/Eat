import React, { useState } from "react";
import {
  View,
  Text,
  Button,
  FlatList,
  StyleSheet,
  TextInput,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { useListStore } from "../state/listStore";

const ShoppingList = () => {
  const { shoppinglist, removeIngredient } = useListStore();

  return (
    <View>
      <FlatList
        data={shoppinglist}
        keyExtractor={(ingredient, index) => `${ingredient}-${index}`}
        renderItem={({ item: ingredient, index }) => (
          <View style={styles.item}>
            <Text style={styles.itemText}>{ingredient}</Text>
            <Button title="Remove" onPress={() => removeIngredient(index)} />
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 8,
  },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
  },
  itemText: {
    fontSize: 16,
  },
});

export default ShoppingList;
