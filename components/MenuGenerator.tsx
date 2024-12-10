import React, { useState, useEffect } from "react";
import { View, Button, FlatList, StyleSheet } from "react-native";
import { saveMenu, loadMenu } from "../utils/storage";
import { fetchRandomMeal } from "../services/api";
import MealCard from "../components/MealCard";
import SwipeableListItem from "../components/SwipeableListItem";
import MealDetails from "../components/MealDetails";
import { Meal } from "@/types/meal";
import { useMenuStore } from "../state/menuStore";

const MenuGenerator = () => {
  const { menu, addRandomMeal, removeMeal } = useMenuStore();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedMeal, setSelectedMeal] = useState<Meal | null>(null);

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
            onDelete={() => removeMeal(meal.idMeal)}
            swipeThreshold={75}
          >
            <MealCard meal={meal} onPress={() => openModal(meal)} />
          </SwipeableListItem>
        )}
      />
      <View style={styles.buttonContainer}>
        <Button title="Add Random Meal" onPress={() => addRandomMeal()} />
      </View>
      <MealDetails
        visible={modalVisible}
        onClose={closeModal}
        mealId={selectedMeal?.idMeal || ""}
      />
    </View>
  );
};

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
  buttonContainer: {
    marginTop: 10,
  },
});

export default MenuGenerator;
