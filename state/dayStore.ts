import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

type DayStore = {
  selectedDays: { [mealId: string]: string };
  saveWeekday: (mealId: string, day: string) => void;
  loadWeekday: (mealId: string) => string | undefined;
};

export const useDayStore = create<DayStore, [["zustand/persist", unknown]]>(
  persist(
    (set, get) => ({
      selectedDays: {},
      saveWeekday: (mealId: string, day: string) => {
        set((state) => ({
          selectedDays: { ...state.selectedDays, [mealId]: day },
        }));
      },
      loadWeekday: (mealId: string) => {
        return get().selectedDays[mealId];
      },
    }),
    {
      name: "day_storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
