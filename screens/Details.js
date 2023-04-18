import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { Picker } from "@react-native-picker/picker";
import { supabase } from "../lib/initSupabase";
import useTransactions from "../hooks/useTransactions";

const Details = () => {
  const route = useRoute();
  const { clientID } = route.params;
  const [client, setClient] = useState(null);
  const { transactions } = useTransactions("client", { clientID });
  const [stats, setstats] = useState({ total: 0, nbr: 0 });
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  async function getClient() {
    try {
      setError(null);
      setLoading(true);
      let res;
      res = await supabase.from("clients").select().eq("id", clientID).single();
      console.log(res);
      if (res.error) throw res.error;
      setClient(res.data);

      res = await supabase
        .rpc("get_client_stats", { clientid: parseInt(clientID) })
        .single();
      console.log("get_client_stats");
      console.log(res);
      if (res.data) setstats(res.data);
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getClient();
  }, [clientID]);

  return (
    <View style={styles.container}>
      {!loading && !error && (
        <>
          <View style={styles.clientInfo}>
            <Text
              style={styles.fullName}
            >{`${client?.first_name} ${client?.last_name}`}</Text>
            <Text style={styles.clientMetaData}>
              Description : {client?.description}
            </Text>
            <Text style={styles.clientMetaData}>
              Créé le : {new Date(client?.created_at).toLocaleDateString()}
            </Text>
          </View>
          {stats && (
            <View style={{ flexDirection: "row", marginVertical: 15 }}>
              <View
                style={{
                  flex: 1,
                  backgroundColor: "#fff",
                  borderRadius: 10,
                  elevation: 5,
                  shadowColor: "#000000",
                  shadowOpacity: 0.3,
                  shadowRadius: 5,
                  padding: 10,
                  marginRight: 5,
                }}
              >
                <Text
                  style={{
                    fontWeight: "bold",
                    fontSize: 25,
                    textAlign: "center",
                  }}
                >
                  {stats.nbr}
                </Text>
                <Text style={{ textAlign: "center", opacity: 0.5 }}>
                  Nombre de Crédits
                </Text>
              </View>
              <View
                style={{
                  flex: 1,
                  backgroundColor: "#fff",
                  borderRadius: 10,
                  elevation: 5,
                  shadowColor: "#000000",
                  shadowOpacity: 0.3,
                  shadowRadius: 5,
                  padding: 10,
                }}
              >
                <Text
                  style={{
                    fontWeight: "bold",
                    fontSize: 25,
                    textAlign: "center",
                  }}
                >
                  {`${stats.total}`}
                </Text>
                <Text style={{ textAlign: "center", opacity: 0.5 }}>
                  Somme de Crédits (Dz)
                </Text>
              </View>
            </View>
          )}
          <View style={{ marginVertical: 15, paddingHorizontal: 10 }}>
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 20,
                marginBottom: 6,
              }}
            >
              Liste des crédits
            </Text>
            <FlatList
              data={transactions}
              renderItem={({ item }) => (
                <View style={styles.transaction}>
                  <Text
                    style={{ fontSize: 22, fontWeight: "bold" }}
                  >{`${item.amount} DZ`}</Text>
                  <Text style={{ opacity: 0.5 }}>
                    {new Date(item.created_at).toLocaleDateString()}
                  </Text>
                </View>
              )}
              keyExtractor={(item) => item.id}
            />
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  clientInfo: {
    backgroundColor: "#fff",
    borderRadius: 10,
    marginVertical: 5,
    elevation: 5,
    shadowColor: "#000000",
    shadowOpacity: 0.3,
    shadowRadius: 5,
    padding: 10,
  },
  fullName: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    fontStyle: "italic",
  },
  clientMetaData: {
    color: "#555",
    fontSize: 16,
    marginVertical: 5,
  },
  transaction: {
    padding: 10,
    width: "100%",
    backgroundColor: "#fefefe",
    borderRadius: 10,
    marginVertical: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    elevation: 5,
    shadowColor: "#000000",
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
});

export default Details;
