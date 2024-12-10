import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

type ListStore = {
  shoppinglist: string[];
  addIngredient: () => void;
  removeIngredient: () => void;
};

export const useListStore = create<ListStore>(() => ({
  shoppinglist: [],
  addIngredient: () => {},
  removeIngredient: () => {},
}));
