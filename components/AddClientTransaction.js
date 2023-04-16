import { useState } from "react";
import {
  View,
  Modal,
  Text,
  Switch,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import useClients from "../hooks/useClients";
import Tabs from "./Tabs";
import { supabase } from "../lib/initSupabase";

const AddTransaction = ({ visible, onClose }) => {
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

  const onChangeTransaction = (field, value) => {
    setTransaction((prev) => ({ ...prev, [field]: value }));
  };
  const onChangeClient = (field, value) => {
    setClient((prev) => ({ ...prev, [field]: value }));
  };

  const handleTransactionCreation = async () => {
    try {
      console.log(transaction);
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
      console.log(client);
      const { data, error } = await supabase.from("clients").insert([client]).single();
      console.log({ data, error });
      if (error) throw error;
      setClients(prev => [data,...prev])
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Modal visible={visible} animationType="slide" onRequestClose={onClose}>
      <View
        style={{
          backgroundColor: "#eee",
          flex: 1,
          paddingHorizontal: 15,
          paddingVertical: 40,
        }}
      >
        <TouchableOpacity onPress={onClose}>
          <Ionicons name="return-down-back" size={30} color="black" />
        </TouchableOpacity>

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
                onChangeText={(value) =>
                  onChangeTransaction("amount", parseInt(value))
                }
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
            <View>
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
            </View>
            <TouchableOpacity
              style={styles.button}
              onPress={handleTransactionCreation}
            >
              <Text style={styles.buttonText}>Ajouter</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 50,
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginVertical: 10,
  },
  inputLabel: {
    fontWeight: "600",
    fontSize: 18,
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
});

export default AddTransaction;
