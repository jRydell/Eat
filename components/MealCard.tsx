import React from "react";
import { View, Text, Image, StyleSheet, Pressable } from "react-native";

type MealCardProps = {
  strMeal: string;
  strMealThumb: string;
  strCategory: string;
  strArea: string;
  onPress: () => void;
};

function MealCard({
  strMeal,
  strMealThumb,
  strCategory,
  strArea,
  onPress,
}: MealCardProps) {
  return (
    <Pressable onPress={onPress}>
      <View style={styles.card}>
        <Image source={{ uri: strMealThumb }} style={styles.image} />
        <Text style={styles.title}>{strMeal}</Text>
        <Text>{strCategory}</Text>
        <Text>{strArea}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
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
