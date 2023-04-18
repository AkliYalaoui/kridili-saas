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
        <Text style={{ fontWeight: 500, fontSize: 17 }}>Récents</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Transactions")}>
          <Text style={{ fontWeight: 500 }}>Voir tout</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        style={{ marginVertical: 15, paddingHorizontal: 10 }}
        showsHorizontalScrollIndicator={false}
        horizontal={true}
        data={data}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={headerstyles.card}
            onPress={() =>
              navigation.navigate("Details", { clientID: item.client_id.id })
            }
          >
            <Text
              style={headerstyles.title}
            >{`${item.client_id.first_name} ${item.client_id.last_name}`}</Text>
            <Text style={headerstyles.price}>{`${item.amount} Dz`}</Text>
            <Text style={headerstyles.description}>{item.description}</Text>
            <Text style={{ opacity: 0.5, fontSize: 12 }}>
              {new Date(item.created_at).toLocaleDateString()}
            </Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const headerstyles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
    padding: 10,
    marginRight: 10,
  },
  title: {
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 5,
  },
  price: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#e26a00",
    marginBottom: 5,
  },
  description: {
    fontSize: 14,
    color: '#666',
  },
});

export default RecentTransaction;
