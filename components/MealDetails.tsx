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
  Linking,
} from "react-native";
import { fetchMealById } from "../services/api";
import { Meal } from "@/types/meal";
import { useListStore } from "../state/listStore";

type MealDetailsProps = {
  visible: boolean;
  onClose: () => void;
  mealId: string;
};

const MealDetails = ({ visible, onClose, mealId }: MealDetailsProps) => {
  const [meal, setMeal] = useState<Meal | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const addIngredients = useListStore((state) => state.addIngredients);

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

  const handleAddIngredients = () => {
    addIngredients(ingredients);
    alert("Ingredients added to shopping list!");
  };

  const openYoutubeLink = () => {
    if (meal.strYoutube) {
      Linking.openURL(meal.strYoutube);
    }
  };

  return (
    <Modal animationType="slide" visible={visible} onRequestClose={onClose}>
      <View style={styles.modalView}>
        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <ScrollView>
            <Image source={{ uri: meal.strMealThumb }} style={styles.image} />
            <Text style={styles.title}>{meal.strMeal}</Text>
            <Text style={styles.category}>{meal.strCategory}</Text>
            <Text style={styles.area}>{meal.strArea}</Text>
            <Text style={styles.subtitle}>Ingredients:</Text>
            {ingredients.map((ingredient, index) => (
              <Text key={index} style={styles.ingredient}>
                {ingredient}
              </Text>
            ))}
            <View style={styles.buttonContainer}>
              <Button
                title="Add to Shopping List"
                onPress={handleAddIngredients}
                color="#841584"
              />
            </View>
            <Text style={styles.subtitle}>Instructions:</Text>
            <Text style={styles.instructions}>{meal.strInstructions}</Text>
            {meal.strYoutube && (
              <Button
                title="Watch on YouTube"
                onPress={openYoutubeLink}
                color="#FF0000"
              />
            )}
            <View style={styles.buttonContainer}>
              <Button title="Close" onPress={onClose} color="#000000" />
            </View>
          </ScrollView>
        )}
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalView: {
    flex: 1,
    padding: 16,
    backgroundColor: "white",
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
    textAlign: "center",
  },
  category: {
    fontSize: 18,
    fontStyle: "italic",
    color: "#666",
    textAlign: "center",
  },
  area: {
    fontSize: 18,
    color: "#666",
    textAlign: "center",
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },
  ingredient: {
    fontSize: 16,
    marginVertical: 2,
  },
  instructions: {
    fontSize: 16,
    marginVertical: 16,
    lineHeight: 24,
  },
  buttonContainer: {
    marginTop: 10,
    marginBottom: 10,
  },
});

export default MealDetails;
