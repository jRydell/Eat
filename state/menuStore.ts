import { Meal } from "@/types/meal";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { fetchRandomMeal } from "@/services/api";

type MenuStore = {
  menu: Meal[];
  addRandomMeal: () => Promise<Meal | null>;
  removeMeal: (idMeal: string) => void;
};

export const useMenuStore = create<MenuStore, [["zustand/persist", unknown]]>(
  persist(
    (set) => ({
      menu: [],
      addRandomMeal: async () => {
        const meal = await fetchRandomMeal();
        if (meal) {
          set((state: MenuStore) => ({ menu: [...state.menu, meal] }));
        }
        return meal;
      },
      removeMeal: (idMeal: string) => {
        set((state: MenuStore) => ({
          menu: state.menu.filter((meal) => meal.idMeal !== idMeal),
        }));
      },
    }),
    {
      name: "menu_storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
