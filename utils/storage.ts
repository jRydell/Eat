// services/storage.ts
import AsyncStorage from "@react-native-async-storage/async-storage";

const SHOPPING_LIST_KEY = "shopping_list";
const WEEKLY_MENU_KEY = "weeklyMenu";

// Spara inköpslistan
export async function saveShoppingList(list: any[]) {
  try {
    const currentList = await loadShoppingList();
    const updatedList = [
      ...currentList,
      ...list.filter((item) => !currentList.includes(item)),
    ];
    await AsyncStorage.setItem(SHOPPING_LIST_KEY, JSON.stringify(updatedList));
  } catch (error) {
    console.error("Error saving shopping list:", error);
  }
}

// Ladda inköpslistan
export async function loadShoppingList() {
  try {
    const data = await AsyncStorage.getItem(SHOPPING_LIST_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error("Error loading shopping list:", error);
    return [];
  }
}

// Spara veckomenyn
export const saveMenu = async (menu: any) => {
  try {
    const menuJSON = JSON.stringify(menu);
    await AsyncStorage.setItem(WEEKLY_MENU_KEY, menuJSON);
  } catch (error) {
    console.error("Failed to save menu", error);
  }
};

// Hämta veckomenyn
export const getMenu = async () => {
  try {
    const menuJSON = await AsyncStorage.getItem(WEEKLY_MENU_KEY);
    return menuJSON != null ? JSON.parse(menuJSON) : null;
  } catch (error) {
    console.error("Failed to load menu", error);
    return null;
  }
};

// Generera inköpslistan från recepten i veckomenyn
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
