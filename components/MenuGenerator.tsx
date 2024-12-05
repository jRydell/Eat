import React, { useState, useEffect } from "react";
import { View, Button, FlatList, StyleSheet } from "react-native";
import { saveMenu, loadMenu } from "../utils/storage";
import { fetchRandomMeal } from "../services/api";
import MealCard from "../components/MealCard";
import { SwipeableListItem } from "../components/SwipeableListItem";
import MealDetails from "../components/MealDetails";
import { Meal } from "@/types/meal";

function MenuGenerator() {
  const [menu, setMenu] = useState<Meal[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedMeal, setSelectedMeal] = useState<Meal | null>(null);

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const storedMenu = await loadMenu();
        console.log("Loaded menu:", storedMenu);
        if (storedMenu) {
          setMenu(storedMenu);
        }
      } catch (error) {
        console.error("Error loading menu:", error);
      }
    };
    fetchMenu();
  }, []);

  const addMeal = async () => {
    try {
      const meal = await fetchRandomMeal();
      console.log("Fetched meal:", meal);
      if (meal) {
        const updatedMenu = [...menu, meal];
        setMenu(updatedMenu);
        await saveMenu(updatedMenu);
        console.log("Menu saved successfully");
      }
    } catch (error) {
      console.error("Error adding meal:", error);
    }
  };

  const deleteMeal = async (idMeal: string) => {
    const storedMenu = await loadMenu();
    if (storedMenu) {
      const updatedMenu = storedMenu.filter((meal) => meal.idMeal !== idMeal);
      await saveMenu(updatedMenu);
      setMenu(updatedMenu);
      console.log("meal deleted");
    }
  };

  const openModal = (meal: Meal) => {
    setSelectedMeal(meal);
    setModalVisible(true);
  };

  const closeModal = () => {
    setSelectedMeal(null);
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={menu}
        keyExtractor={(meal) => meal.idMeal}
        renderItem={({ item: meal }) => (
          <SwipeableListItem
            onDelete={() => deleteMeal(meal.idMeal)}
            swipeThreshold={75}
          >
            <MealCard meal={meal} onPress={() => openModal(meal)} />
          </SwipeableListItem>
        )}
      />
      <Button title="Add Random Meal" onPress={addMeal} />
      <MealDetails
        visible={modalVisible}
        onClose={closeModal}
        mealId={selectedMeal?.idMeal || ""}
      />
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
