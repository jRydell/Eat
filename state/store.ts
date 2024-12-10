import { Meal } from "@/types/meal";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type MenuStore = {
  menu: Meal[];
  addMeal: () => void;
  removeMeal: () => void;
};

export const useMenuStore = create<MenuStore>(() => ({
  menu: [],
  addMeal: () => {},
  removeMeal: () => {},
}));

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
