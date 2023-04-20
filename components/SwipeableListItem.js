import { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Swipeable } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";

const SwipeableListItem = ({ item, onDelete }) => {
  const [swipeableRef, setSwipeableRef] = useState(null);

  const handleSwipeableRef = (ref) => {
    setSwipeableRef(ref);
  };

  const handleDelete = () => {
    onDelete(item.id, item.amount);
    swipeableRef.close();
  };

  const renderRightActions = (progress, dragX) => {
    return (
      <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
        <Ionicons name="trash-outline" size={32} color="#ff5252" />
      </TouchableOpacity>
    );
  };

  return (
    <Swipeable ref={handleSwipeableRef} renderRightActions={renderRightActions}>
      <View style={styles.transaction}>
        <Ionicons name="pricetags-outline" size={32} color="#e26a00" />
        <View style={{ marginLeft: 10, flex: 1 }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text
              style={{ fontSize: 20, fontWeight: 500 }}
            >{`${item.amount} Dz`}</Text>
            <Text style={{ fontSize: 12, opacity: 0.5 }}>
              {new Date(item.created_at).toLocaleDateString()}
            </Text>
          </View>
          <Text style={{ fontSize: 13, opacity: 0.8 }}>{item.description}</Text>
        </View>
      </View>
    </Swipeable>
  );
};

const styles = StyleSheet.create({
  deleteButton: {
    width: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  deleteButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  transaction: {
    padding: 15,
    width: "100%",
    borderRadius: 10,
    marginVertical: 5,
    flexDirection: "row",
    alignItems: "center",
    elevation: 5,
    shadowColor: "#ccc",
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
});

export default SwipeableListItem;
