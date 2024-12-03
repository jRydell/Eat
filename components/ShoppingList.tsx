import React, { useEffect, useState } from "react";
import { View, Text, Button, FlatList, StyleSheet } from "react-native";
import { loadShoppingList, saveShoppingList } from "../utils/storage";

const ShoppingListTab = () => {
  const [shoppingList, setShoppingList] = useState<string[]>([]);

  // Load shopping list from AsyncStorage when the component mounts
  useEffect(() => {
    const fetchShoppingList = async () => {
      const list = await loadShoppingList();
      setShoppingList(list);
    };
    fetchShoppingList();
  }, []);

  const removeItemFromList = async (item: string) => {
    const updatedList = shoppingList.filter((i) => i !== item);
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
          <Button title="Remove" onPress={() => removeItemFromList(item)} />
        </View>
      )}
    />
  );
};

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

export default ShoppingListTab;
