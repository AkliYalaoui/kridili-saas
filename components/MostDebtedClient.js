import {
  StyleSheet,
  FlatList,
  View,
  Text,
  TouchableOpacity,
} from "react-native";

const MostDebtedClient = ({ style, data, navigation }) => {
  return (
    <View style={style}>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text style={{ fontWeight: 500, fontSize: 17 }}>Total</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Clients")}>
          <Text style={{ fontWeight: 500 }}>Voir tout</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        showsHorizontalScrollIndicator={false}
        style={{ marginVertical: 15, paddingHorizontal: 10 }}
        horizontal={true}
        data={data}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() =>
              navigation.navigate("Details", { clientID: item.id })
            }
          >
            <Text
              style={styles.title}
            >{`${item.first_name} ${item.last_name}`}</Text>
            <Text style={styles.price}>{`${item.total} Dz`}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
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
});

export default MostDebtedClient;
