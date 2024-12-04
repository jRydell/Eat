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
import { extractIngredients } from "../services/mealHelpers";

type MealDetailsProps = {
  visible: boolean;
  onClose: () => void;
  mealId: string;
  strMealThumb: string;
};

function MealDetails({
  visible,
  onClose,
  mealId,
  strMealThumb,
}: MealDetailsProps) {
  const [meal, setMeal] = useState<any>(null);
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

  const ingredients = extractIngredients(meal);

  return (
    <Modal animationType="slide" visible={visible} onRequestClose={onClose}>
      <View style={styles.modalView}>
        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <ScrollView contentContainerStyle={styles.scrollViewContent}>
            <Text style={styles.modalText}>{meal.strMeal}</Text>
            <Image source={{ uri: strMealThumb }} style={styles.image} />
            <Text style={styles.sectionTitle}>Ingredients:</Text>
            {ingredients.map((ingredient, index) => (
              <Text key={index} style={styles.ingredientText}>
                {ingredient}
              </Text>
            ))}
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
    justifyContent: "center",
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
  },
  ingredientText: {
    fontSize: 16,
    marginVertical: 2,
  },
  button: {
    marginTop: 15,
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    marginBottom: 15,
  },
});

export default MealDetails;
