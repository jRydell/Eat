import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

type ListStore = {
  shoppinglist: string[];
  addIngredients: (ingredients: string[]) => void;
  removeIngredient: (index: number) => void;
};

export const useListStore = create<ListStore, [["zustand/persist", unknown]]>(
  persist(
    (set) => ({
      shoppinglist: [],

      addIngredients: (ingredients: string[]) => {
        set((state) => ({
          shoppinglist: [...state.shoppinglist, ...ingredients],
        }));
        alert("Ingredients added to shopping list!");
      },
      removeIngredient: (index: number) => {
        set((state) => ({
          shoppinglist: state.shoppinglist.filter((_, i) => i !== index),
        }));
      },
    }),
    {
      name: "shopping_list_storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
