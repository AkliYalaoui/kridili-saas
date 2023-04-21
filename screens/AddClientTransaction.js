import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import useClients from "../hooks/useClients";
import Tabs from "../components/Tabs";
import { supabase } from "../lib/initSupabase";
import { useUser } from "../contexts/UserContext";

const AddClientTransaction = ({ navigation }) => {
  const { clients, setClients } = useClients();
  const [transaction, setTransaction] = useState({
    client_id: "",
    amount: "",
    description: "",
    paid: false,
  });
  const [client, setClient] = useState({
    first_name: "",
    last_name: "",
    description: "",
    phone_number: "",
  });

  const [tab, setTab] = useState(0);
  const { user } = useUser();

  const onChangeTransaction = (field, value) => {
    setTransaction((prev) => ({ ...prev, [field]: value }));
  };
  const onChangeClient = (field, value) => {
    setClient((prev) => ({ ...prev, [field]: value }));
  };

  const handleTransactionCreation = async () => {
    try {
      const { data, error } = await supabase
        .from("transactions")
        .insert([transaction]);
      console.log({ data, error });
      if (error) throw error;
    } catch (err) {
      console.error(err);
    }
  };
  const handleClientCreation = async () => {
    try {
      const { data, error } = await supabase
        .from("clients")
        .insert([client])
        .select("*");
      console.log({ data, error });
      if (error) throw error;
      setClients((prev) => [data[0], ...prev]);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <SafeAreaView style={styles.appContainer}>
      <Tabs tab={tab} onTabChange={(val) => setTab(val)} />

      {tab === 1 ? (
        <>
          <View>
            <Text style={styles.inputLabel}>Nom</Text>
            <TextInput
              style={styles.input}
              onChangeText={(value) => onChangeClient("last_name", value)}
              value={client.last_name}
            />
          </View>
          <View>
            <Text style={styles.inputLabel}>Prénom</Text>
            <TextInput
              style={styles.input}
              onChangeText={(value) => onChangeClient("first_name", value)}
              value={client.first_name}
            />
          </View>
          <View>
            <Text style={styles.inputLabel}>Tel</Text>
            <TextInput
              style={styles.input}
              onChangeText={(value) => onChangeClient("phone_number", value)}
              value={client.phone_number}
              keyboardType="numeric"
            />
          </View>
          <View>
            <Text style={styles.inputLabel}>Description</Text>
            <TextInput
              style={styles.input}
              onChangeText={(value) => onChangeClient("description", value)}
              value={client.description}
            />
          </View>
          <TouchableOpacity
            style={styles.button}
            onPress={handleClientCreation}
          >
            <Text style={styles.buttonText}>Ajouter</Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <View>
            <Text style={styles.inputLabel}>Client</Text>
            <Picker
              selectedValue={transaction.client_id}
              onValueChange={(itemValue) =>
                onChangeTransaction("client_id", itemValue)
              }
            >
              {clients.map((client) => (
                <Picker.Item
                  label={`${client.first_name} ${client.last_name}`}
                  value={client.id}
                  key={client.id}
                />
              ))}
            </Picker>
          </View>
          <View>
            <Text style={styles.inputLabel}>Somme</Text>
            <TextInput
              style={styles.input}
              onChangeText={(value) => onChangeTransaction("amount", value)}
              value={transaction.amount}
              keyboardType="numeric"
            />
          </View>
          <View>
            <Text style={styles.inputLabel}>Description</Text>
            <TextInput
              style={styles.input}
              onChangeText={(value) =>
                onChangeTransaction("description", value)
              }
              value={transaction.description}
            />
          </View>
          {/* <View>
            <Text style={styles.inputLabel}>Etat</Text>
            <Switch
              trackColor={{ false: "#767577", true: "#81b0ff" }}
              thumbColor={transaction.paid ? "#f5dd4b" : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={() =>
                onChangeTransaction("paid", !transaction.paid)
              }
              value={transaction.paid}
            />
          </View> */}
          <TouchableOpacity
            style={styles.button}
            onPress={handleTransactionCreation}
          >
            <Text style={styles.buttonText}>Ajouter</Text>
          </TouchableOpacity>
        </>
      )}
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
    borderColor: "#aaa",
    borderRadius: 8,
    padding: 10,
    marginVertical: 10,
  },
  inputLabel: {
    fontWeight: 400,
    fontSize: 18,
  },
  button: {
    height: 50,
    backgroundColor: "#e26a00",
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 18,
  },
});

export default AddClientTransaction;
