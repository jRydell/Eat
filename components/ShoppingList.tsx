import React from "react";
import { View, Text, Button, FlatList, StyleSheet } from "react-native";
import { saveShoppingList } from "../utils/storage";

type ShoppingListProps = {
  shoppingList: string[];
  setShoppingList: React.Dispatch<React.SetStateAction<string[]>>;
};

function ShoppingList({ shoppingList, setShoppingList }: ShoppingListProps) {
  const deleteListItem = async (item: string) => {
    const updatedList = shoppingList.filter((item: string) => item !== item);
    setShoppingList(updatedList);
    await saveShoppingList(updatedList);
  };

  return (
    <FlatList
      data={shoppingList}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item }) => (
        <View style={styles.item}>
          <Text style={styles.itemText}>{item}</Text>
          <Button title="Remove" onPress={() => deleteListItem(item)} />
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
  },
  itemText: {
    fontSize: 16,
  },
});

export default ShoppingList;
