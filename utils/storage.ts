// services/storage.ts
import AsyncStorage from "@react-native-async-storage/async-storage";

const SHOPPING_LIST_KEY = "shopping_list";
const WEEKLY_MENU_KEY = "weeklyMenu";

// Save the shopping list
export async function saveShoppingList(list: any[]) {
  try {
    await AsyncStorage.setItem(SHOPPING_LIST_KEY, JSON.stringify(list));
  } catch (error) {
    console.error("Error saving shopping list:", error);
  }
}

// Load the shopping list
export async function loadShoppingList() {
  try {
    const data = await AsyncStorage.getItem(SHOPPING_LIST_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error("Error loading shopping list:", error);
    return [];
  }
}

// Save the menu
export const saveMenu = async (menu: any) => {
  try {
    const menuJSON = JSON.stringify(menu);
    await AsyncStorage.setItem(WEEKLY_MENU_KEY, menuJSON);
  } catch (error) {
    console.error("Failed to save menu", error);
  }
};

// Load the menu
export const getMenu = async () => {
  try {
    const menuJSON = await AsyncStorage.getItem(WEEKLY_MENU_KEY);
    return menuJSON != null ? JSON.parse(menuJSON) : null;
  } catch (error) {
    console.error("Failed to load menu", error);
    return null;
  }
};

// Generate shoppinglist
export const generateShoppingList = (menu: any[]) => {
  let shoppingList: string[] = [];
  menu.forEach((meal) => {
    meal.ingredients.forEach((ingredient: string) => {
      if (!shoppingList.includes(ingredient)) {
        shoppingList.push(ingredient);
      }
    });
  });
  return shoppingList;
};
