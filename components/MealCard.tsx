import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

type MealCardProps = {
  strMeal: string;
  strMealThumb: string;
  strCategory: string;
  strArea: string;
};

function MealCard({
  strMeal,
  strMealThumb,
  strCategory,
  strArea,
}: MealCardProps) {
  return (
    <View style={styles.card}>
      <Image source={{ uri: strMealThumb }} style={styles.image} />
      <View style={styles.details}>
        <Text style={styles.title}>{strMeal}</Text>
        <Text style={styles.category}>
          {strCategory} - {strArea}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: 16,
    borderRadius: 10,
    overflow: "hidden",
    backgroundColor: "#fff",
    elevation: 3,
  },
  image: {
    width: "100%",
    height: 200,
  },
  details: {
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  category: {
    fontSize: 14,
    color: "#777",
    marginTop: 4,
  },
});

export default MealCard;
