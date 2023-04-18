import {
  StyleSheet,
  FlatList,
  View,
  Text,
  TouchableOpacity,
} from "react-native";

const RecentTransaction = ({ style, data, navigation }) => {
  return (
    <View style={style}>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text style={{ ...headerstyles.whiteText, fontWeight: "bold" }}>
          Crédits Récentes
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate("Transactions")}>
          <Text style={{ color: "#fff", fontWeight: "bold" }}>Voir tout</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        style={{ marginVertical: 15, paddingHorizontal: 10 }}
        horizontal={true}
        data={data}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={headerstyles.recentCard}
            onPress={() =>
              navigation.navigate("Details", { clientID: item.client_id.id })
            }
          >
            <Text
              style={headerstyles.whiteText}
            >{`${item.client_id.first_name} ${item.client_id.last_name}`}</Text>
            <Text style={{ ...headerstyles.whiteText, opacity: 0.5 }}>
              {new Date(item.created_at).toLocaleDateString()}
            </Text>
            <Text
              style={{ ...headerstyles.whiteText }}
            >{`${item.amount} DZ`}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const headerstyles = StyleSheet.create({
  whiteText: {
    color: "#fff",
    fontSize: 18,
  },
  recentCard: {
    padding: 10,
    backgroundColor: "#333",
    borderRadius: 10,
    width: 150,
    height: 100,
    marginRight: 10,
  },
});

export default RecentTransaction;
