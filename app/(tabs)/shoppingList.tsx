import { View, Text, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import { loadShoppingList } from "../../utils/storage";
import ShoppingList from "@/components/ShoppingList";

export default function ShoppingListTab() {
  const [shoppingList, setShoppingList] = useState([]);

  useEffect(() => {
    loadShoppingList().then(setShoppingList);
  }, []);

  return (
    <View style={styles.container}>
      <ShoppingList />
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
