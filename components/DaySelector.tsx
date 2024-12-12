import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useDayStore } from "../state/dayStore";

type DaySelectorProps = {
  mealId: string;
};

const daysOfWeek = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const DaySelector = ({ mealId }: DaySelectorProps) => {
  const [selectedDay, setSelectedDay] = useState<string>("");
  const saveWeekday = useDayStore((state) => state.saveWeekday);
  const loadWeekday = useDayStore((state) => state.loadWeekday);

  useEffect(() => {
    const savedDay = loadWeekday(mealId);
    if (savedDay) {
      setSelectedDay(savedDay);
    }
  }, [mealId, loadWeekday]);

  const handleDayChange = (day: string) => {
    setSelectedDay(day);
    saveWeekday(mealId, day);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Select Day:</Text>
      <Picker
        selectedValue={selectedDay}
        onValueChange={(value) => handleDayChange(value)}
        style={styles.picker}
        itemStyle={styles.pickerItem}
      >
        {daysOfWeek.map((day) => (
          <Picker.Item key={day} label={day} value={day} />
        ))}
      </Picker>
      <View style={styles.underline} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginRight: 10,
  },
  picker: {
    height: 60,
    width: 165,
  },
  pickerItem: {
    fontSize: 16,
    fontWeight: "bold",
  },
  underline: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: "black",
  },
});

export default DaySelector;
