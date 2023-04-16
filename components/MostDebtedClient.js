import {
  StyleSheet,
  FlatList,
  View,
  Text,
  TouchableOpacity,
} from "react-native";

const MostDebtedClient = ({ style, data }) => {
  return (
    <View style={style}>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text style={{ ...styles.whiteText, fontWeight: "bold" }}>
          Top Clients
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate("Clients")}>
          <Text style={{ ...styles.whiteText, fontWeight: "bold" }}>
            Voir tout
          </Text>
        </TouchableOpacity>
      </View>
      <FlatList
        style={{ marginVertical: 15, paddingHorizontal: 10 }}
        horizontal={true}
        data={data}
        renderItem={({ item }) => (
          <View style={styles.recentCard}>
            <Text
              style={styles.whiteText}
            >{`${item.first_name} ${item.last_name}`}</Text>
            <Text style={{ ...styles.whiteText }}>{`${item.total} DZ`}</Text>
          </View>
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  whiteText: {
    color: "#fff",
  },
  recentCard: {
    padding: 10,
    backgroundColor: "#333",
    borderRadius: 10,
    width: 150,
    height: 150,
    marginRight: 10,
  },
});

export default MostDebtedClient;
