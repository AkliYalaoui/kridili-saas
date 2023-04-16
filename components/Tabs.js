import { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const Tabs = ({ tab, onTabChange }) => {
  return (
    <View style={styles.tab}>
      <TouchableOpacity
        style={{
          ...styles.button,
          backgroundColor: tab === 0 ? "#222" : "#fff",
        }}
        onPress={() => onTabChange(0)}
      >
        <Text style={{ color: tab === 0 ? "#fff" : "#000" }}>Transaction</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          ...styles.button,
          backgroundColor: tab === 1 ? "#222" : "#fff",
        }}
        onPress={() => onTabChange(1)}
      >
        <Text style={{ color: tab === 1 ? "#fff" : "#000" }}>Client</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  tab: {
    flexDirection: "row",
    marginVertical: 10,
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    padding: 10,
    flex: 1,
  },
  activeButtonText: {
    color: "white",
  },
});

export default Tabs;
