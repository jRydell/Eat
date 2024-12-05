import React, { useState } from "react";
import { View, Text, Button, FlatList, StyleSheet } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { loadShoppingList, saveShoppingList } from "../utils/storage";

function ShoppingList() {
  const [shoppingList, setShoppingList] = useState<string[]>([]);

  useFocusEffect(
    React.useCallback(() => {
      const fetchShoppingList = async () => {
        const list = await loadShoppingList();
        setShoppingList(list);
      };
      fetchShoppingList();
    }, [])
  );

  const deleteItem = async (item: string) => {
    const updatedList = shoppingList.filter((listItem) => listItem !== item);
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
          <Button title="Remove" onPress={() => deleteItem(item)} />
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
