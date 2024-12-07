import AsyncStorage from "@react-native-async-storage/async-storage";
import { Meal } from "@/types/meal";

const SHOPPING_LIST_KEY = "shopping_list";
const WEEKLY_MENU_KEY = "weekly_menu";
const MEAL_DAY_KEY = "meal_";

// Save the weekday
export async function saveWeekday(mealId: string, day: string): Promise<void> {
  try {
    await AsyncStorage.setItem(`${MEAL_DAY_KEY}${mealId}`, day);
  } catch (error) {
    console.error(`Failed to save selected day for meal ${mealId}:`, error);
  }
}

// Load the weekday
export async function loadWeekday(mealId: string): Promise<string | null> {
  try {
    const savedDay = await AsyncStorage.getItem(`${MEAL_DAY_KEY}${mealId}`);
    return savedDay;
  } catch (error) {
    console.error(`Failed to load selected day for meal ${mealId}:`, error);
    return null;
  }
}

// Save shopping list
export async function saveShoppingList(list: string[]) {
  try {
    await AsyncStorage.setItem(SHOPPING_LIST_KEY, JSON.stringify(list));
  } catch (error) {
    console.error("Error saving shopping list:", error);
  }
}

// Load shopping list
export async function loadShoppingList(): Promise<string[]> {
  try {
    const data = await AsyncStorage.getItem(SHOPPING_LIST_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error("Error loading shopping list:", error);
    return [];
  }
}

// Save menu
export const saveMenu = async (menu: Meal[]) => {
  try {
    const menuJSON = JSON.stringify(menu);
    await AsyncStorage.setItem(WEEKLY_MENU_KEY, menuJSON);
  } catch (error) {
    console.error("Failed to save menu", error);
  }
};

// Load menu
export const loadMenu = async (): Promise<Meal[] | null> => {
  try {
    const menuJSON = await AsyncStorage.getItem(WEEKLY_MENU_KEY);
    return menuJSON != null ? JSON.parse(menuJSON) : null;
  } catch (error) {
    console.error("Failed to load menu", error);
    return null;
  }
};
