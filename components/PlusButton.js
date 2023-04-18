import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const PlusButton = ({
  accessibilityLabel,
  accessibilityState,
  onPress,
  onLongPress,
}) => {
  const focused = accessibilityState.selected;
  return (
    <TouchableOpacity
      style={{
        ...styles.button,
        backgroundColor: focused ? "#e26a00" : "#212121",
      }}
      onPress={onPress}
      onLongPress={onLongPress}
      accessibilityLabel={accessibilityLabel}
    >
      <Ionicons name="add" size={32} color="white" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    top: -20,
    justifyContent: "center",
    alignItems: "center",
    height: 60,
    width: 60,
    borderRadius: 30,
  },
});

export default PlusButton;
