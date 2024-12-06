import React, { useEffect, useState } from "react";
import {
  Modal,
  View,
  Text,
  Button,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  Image,
} from "react-native";
import { fetchMealById } from "../services/api";
import { loadShoppingList, saveShoppingList } from "@/utils/storage";
import { Meal } from "@/types/meal";

type MealDetailsProps = {
  visible: boolean;
  onClose: () => void;
  mealId: string;
};

function MealDetails({ visible, onClose, mealId }: MealDetailsProps) {
  const [meal, setMeal] = useState<Meal | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getMealDetails = async () => {
      setLoading(true);
      const fetchedMeal = await fetchMealById(mealId);
      setMeal(fetchedMeal);
      setLoading(false);
    };

    if (mealId) {
      getMealDetails();
    }
  }, [mealId]);

  if (!mealId || !meal) return null;

  const extractIngredients = (meal: Meal) => {
    const ingredients: string[] = [];

    for (let i = 1; i <= 20; i++) {
      const ingredient = meal[`strIngredient${i}`];
      const measure = meal[`strMeasure${i}`];

      if (ingredient) {
        ingredients.push(`${measure ? measure : ""} ${ingredient}`);
      }
    }
    return ingredients;
  };

  const ingredients = extractIngredients(meal);

  const addIngredients = async () => {
    const currentList = await loadShoppingList();
    const updatedList = [...currentList, ...ingredients];
    await saveShoppingList(updatedList);
    alert("Ingredients added to shopping list!");
  };

  return (
    <Modal animationType="slide" visible={visible} onRequestClose={onClose}>
      <View style={styles.modalView}>
        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <ScrollView contentContainerStyle={styles.scrollViewContent}>
            <Text style={styles.modalText}>{meal.strMeal}</Text>
            <Image source={{ uri: meal.strMealThumb }} style={styles.image} />
            <Text style={styles.sectionTitle}>Ingredients:</Text>
            {ingredients.map((ingredient: string, index: number) => (
              <Text key={index} style={styles.ingredientText}>
                {ingredient}
              </Text>
            ))}
            <View style={styles.button}>
              <Button title="Add to shopping list" onPress={addIngredients} />
            </View>
            <Text style={styles.sectionTitle}>Instructions:</Text>
            <Text>{meal.strInstructions}</Text>
            <View style={styles.button}>
              <Button title="Close" onPress={() => onClose()} />
            </View>
          </ScrollView>
        )}
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalView: {
    flex: 1,
    width: "100%",
    height: "100%",
    backgroundColor: "white",
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  scrollViewContent: {
    flexGrow: 1,
    alignItems: "center",
  },
  modalText: {
    marginBottom: 15,
    fontSize: 24,
    fontWeight: "bold",
  },
  sectionTitle: {
    marginTop: 15,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "left", // Align text to the left
    width: "100%",
  },
  ingredientText: {
    fontSize: 16,
    marginVertical: 2,
    textAlign: "left", // Align text to the left
    width: "100%", // Ensure the text takes the full width
  },
  button: {
    marginTop: 15,
    width: "60%",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    marginBottom: 15,
  },
});

export default MealDetails;
