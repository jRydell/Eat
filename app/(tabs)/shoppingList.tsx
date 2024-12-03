import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { loadShoppingList } from "../../utils/storage";
import ShoppingList from "@/components/ShoppingList";

export default function ShoppingListTab() {
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

  return (
    <View style={styles.container}>
      <ShoppingList
        shoppingList={shoppingList}
        setShoppingList={setShoppingList}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
});
