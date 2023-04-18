import {
  StyleSheet,
  FlatList,
  View,
  Text,
  TouchableOpacity,
} from "react-native";

const MostDebtedClient = ({ data, navigation }) => {
  return (
    <View style={{ marginTop: 10 }}>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text style={{ fontWeight: "bold", fontSize: 18 }}>Total Crédits</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Clients")}>
          <Text style={{ fontWeight: "bold" }}>Voir tout</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        style={{ marginVertical: 15, paddingHorizontal: 10 }}
        horizontal={true}
        data={data}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.recentCard}
            onPress={() =>
              navigation.navigate("Details", { clientID: item.id })
            }
          >
            <Text
              style={styles.whiteText}
            >{`${item.first_name} ${item.last_name}`}</Text>
            <Text
              style={{ ...styles.whiteText, opacity: 0.5 }}
            >{`${item.total} DZ`}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  whiteText: {
    color: "#222",
    fontSize: 20,
    fontWeight: "bold",
  },
  recentCard: {
    padding: 10,
    backgroundColor: "#ddd",
    borderRadius: 10,
    width: 140,
    height: 100,
    marginRight: 10,
    elevation: 5,
    shadowColor: "#000000",
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
});

export default MostDebtedClient;
