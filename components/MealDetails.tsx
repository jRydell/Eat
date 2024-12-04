import React from "react";
import { Modal, View, Text, Button, StyleSheet } from "react-native";

type MealDetailsProps = {
  visible: boolean;
  onClose: () => void;
  meal: {
    strMeal: string;
    strCategory: string;
    strArea: string;
  };
};

function MealDetails({ visible, onClose, meal }: MealDetailsProps) {
  if (!meal) return null;

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalView}>
        <Text style={styles.modalText}>{meal.strMeal}</Text>
        <Text>{meal.strCategory}</Text>
        <Text>{meal.strArea}</Text>
        <Button title="Close" onPress={() => onClose()} />
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
  },
});

export default MealDetails;
