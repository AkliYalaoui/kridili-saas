import {
  View,
  ScrollView,
  SafeAreaView,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  StatusBar,
} from "react-native";
import { useState } from "react";
import useClients from "../hooks/useClients";

const Clients = ({ navigation }) => {
  const [keywords, setKeywords] = useState("");
  const { clients } = useClients("search", keywords);
  return (
    <SafeAreaView style={styles.appContainer}>
      <FlatList
        showsVerticalScrollIndicator={false}
        style={{ marginVertical: 15, paddingHorizontal: 10 }}
        data={clients}
        ListHeaderComponent={
          <TextInput
            style={styles.input}
            onChangeText={(value) => setKeywords(value)}
            value={keywords}
            placeholder="Rechercher un client"
          />
        }
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() =>
              navigation.navigate("Details", { clientID: item.id })
            }
          >
            <Text
              style={{ fontSize: 18, fontWeight: "bold" }}
            >{`${item.first_name} ${item.last_name}`}</Text>
            <Text style={{ opacity: 0.5 }}>{item.description}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
    paddingTop: 40,
    paddingHorizontal: 20,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginVertical: 10,
  },
  button: {
    height: 50,
    backgroundColor: "#121212",
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 18,
  },
  card: {
    padding: 10,
    width: "100%",
    backgroundColor: "#eee",
    borderRadius: 10,
    marginVertical: 5,
    elevation: 5,
    shadowColor: "#000000",
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
});

export default Clients;
