import {
  View,
  SafeAreaView,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  StatusBar,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
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
          <>
            <Text style={styles.title}>Rechercher Vos Clients</Text>
            <Text style={styles.secondary_title}>veuillez entrer un nom</Text>
            <View style={styles.search_container}>
              {/* <TextInput
                style={styles.input}
                onChangeText={(value) => setKeywords(value)}
                value={keywords}
                placeholder="Rechercher un client"
              /> */}
              <TouchableOpacity style={styles.search_btn}>
                <Ionicons name="search-outline" size={32} color="white" />
              </TouchableOpacity>
            </View>
          </>
        }
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() =>
              navigation.navigate("Details", { clientID: item.id })
            }
          >
             <Ionicons name="person-outline" size={32} color="#e26a00" />
            <View style={{marginLeft:5}}>
              <Text
                style={{ fontSize: 18, fontWeight: 500 }}
              >{`${item.first_name} ${item.last_name}`}</Text>
              <Text style={{ fontSize:12 ,opacity: 0.5 }}>{item.description}</Text>
            </View>
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
  title: {
    fontSize: 25,
    fontWeight: 500,
    fontStyle: "italic",
  },
  secondary_title: {
    fontSize: 16,
    color: "#777",
    fontStyle: "italic",
    marginTop: 5,
    marginBottom: 15,
  },
  search_container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderRightWidth: 0,
    borderColor: "#e26a00",
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
    padding: 10,
    flex: 1,
  },
  search_btn: {
    backgroundColor: "#e26a00",
    height: 50,
    width: 50,
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
    justifyContent: "center",
    alignItems: "center",
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
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    width: "100%",
    borderRadius: 10,
    marginVertical: 5,
    elevation: 5,
    shadowColor: "#ccc",
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
});

export default Clients;
