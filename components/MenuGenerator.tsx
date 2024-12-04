import React, { useState, useEffect } from "react";
import { View, Text, Button, FlatList, StyleSheet } from "react-native";
import {
  saveShoppingList,
  loadShoppingList,
  saveMenu,
  loadMenu,
} from "../utils/storage";
import { fetchRandomMeal } from "../services/api";
import { extractIngredients } from "../services/mealHelpers";
import MealCard from "../components/MealCard"; // Import MealCard

function MenuGenerator() {
  const [menu, setMenu] = useState<
    {
      idMeal: string;
      strMeal: string;
      strMealThumb: string;
      strCategory: string;
      strArea: string;
    }[]
  >([]);

  useEffect(() => {
    const fetchMenu = async () => {
      const storedMenu = await loadMenu();
      if (storedMenu) {
        setMenu(storedMenu);
      }
    };
    fetchMenu();
  }, []);
  const addMeal = async () => {
    try {
      const meal = await fetchRandomMeal();
      if (meal) {
        // Extract ingredients from the recipe and update the shopping list
        const ingredients = extractIngredients(meal);
        console.log("Extracted ingredients:", ingredients);

        const storedList = await loadShoppingList();
        console.log("Stored shopping list before update:", storedList);

        const updatedShoppingList = [...storedList, ...ingredients];
        console.log("Updated shopping list:", updatedShoppingList);

        await saveShoppingList(updatedShoppingList);
        console.log("Shopping list saved successfully");

        // Add the meal to the weekly menu
        const updatedMenu = [
          ...menu,
          {
            idMeal: meal.idMeal,
            strMeal: meal.strMeal,
            strMealThumb: meal.strMealThumb,
            strCategory: meal.strCategory,
            strArea: meal.strArea,
          },
        ];
        setMenu(updatedMenu);
        await saveMenu(updatedMenu);
        console.log("Menu saved successfully");
      }
    } catch (error) {
      console.error("Error adding meal:", error);
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={menu}
        keyExtractor={(item) => item.idMeal.toString()}
        renderItem={({ item }) => (
          <MealCard
            strMeal={item.strMeal}
            strMealThumb={item.strMealThumb}
            strCategory={item.strCategory}
            strArea={item.strArea}
          />
        )}
      />
      <Button title="Add Random Meal" onPress={addMeal} />
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

export default MenuGenerator;
