import { Meal } from "@/types/meal";
import React from "react";
import { View, Text, Image, StyleSheet, Pressable } from "react-native";
import DaySelector from "./DaySelector";

type MealCardProps = {
  meal: Meal;
  onPress: () => void;
};

const MealCard = ({ meal, onPress }: MealCardProps) => {
  return (
    <>
      <DaySelector mealId={meal.idMeal} />
      <Pressable onPress={onPress}>
        <View style={styles.card}>
          <Image source={{ uri: meal.strMealThumb }} style={styles.image} />
          <Text style={styles.title}>{meal.strMeal}</Text>
          <Text>{meal.strCategory}</Text>
          <Text>{meal.strArea}</Text>
        </View>
      </Pressable>
    </>
  );
};

const styles = StyleSheet.create({
  card: {
    marginTop: 40,
    marginBottom: 30,
    padding: 10,
    margin: 10,
    backgroundColor: "white",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
  },
  image: {
    width: "100%",
    height: 150,
    borderRadius: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 10,
  },
});

export default MealCard;
