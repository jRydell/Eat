import axios from "axios";
import { Meal } from "@/types/meal";

const API_URL = "https://www.themealdb.com/api/json/v1/1";

export async function fetchRandomMeal(): Promise<Meal | null> {
  try {
    const response = await axios.get(`${API_URL}/random.php`);
    const data = response.data as { meals: Meal[] };
    return data.meals[0];
  } catch (error) {
    console.error("Error fetching meal:", error);
    return null;
  }
}

export async function fetchMealById(idMeal: string): Promise<Meal | null> {
  try {
    const response = await axios.get(`${API_URL}/lookup.php?i=${idMeal}`);
    const data = response.data as { meals: Meal[] };
    return data.meals[0];
  } catch (error) {
    console.error("Error fetching meal by ID:", error);
    return null;
  }
}
