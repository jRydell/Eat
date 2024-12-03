import React, { useState, useEffect } from "react";
import { View, Text, Button, FlatList, StyleSheet } from "react-native";
import { saveShoppingList, loadShoppingList } from "../utils/storage";
import { extractIngredients, fetchRandomMeal } from "../services/api";

export default function MealGenerator() {
  const [menu, setMenu] = useState<{ idMeal: string; strMeal: string }[]>([]);

  useEffect(() => {
    const fetchShoppingList = async () => {
      const list = await loadShoppingList();
    };
    fetchShoppingList();
  }, []);

  const addMeal = async () => {
    const meal = await fetchRandomMeal();
    if (meal) {
      // Extract ingredients from the recipe and update the shopping list
      const ingredients = extractIngredients(meal);
      const storedList = await loadShoppingList();
      const updatedShoppingList = [...storedList, ...ingredients];
      await saveShoppingList(updatedShoppingList);

      // Add the meal to the weekly menu
      setMenu((prev) => [...prev, meal]);
    }
  };

  return (
    <>
      <FlatList
        data={menu}
        keyExtractor={(item) => item.idMeal.toString()}
        renderItem={({ item }) => <Text>{item.strMeal}</Text>}
      />
      <Button title="Add Random Meal" onPress={addMeal} />
    </>
  );
}
