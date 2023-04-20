import {
  View,
  SafeAreaView,
  Text,
  StyleSheet,
  StatusBar,
  FlatList,
  Linking,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { supabase } from "../lib/initSupabase";
import UpdateProfileModal from "../components/UpdateProfileModal";
import SwipeableListItem from "../components/SwipeableListItem";
import useTransactions from "../hooks/useTransactions";

const Details = () => {
  const route = useRoute();
  const { clientID } = route.params;
  const [client, setClient] = useState(null);
  const { transactions, setTransactions } = useTransactions("client", {
    clientID,
  });
  const [stats, setstats] = useState({ total: 0, nbr: 0 });
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

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

  const updateClientInfo = async (updated) => {
    try {
      const res = await supabase
        .from("clients")
        .update(updated)
        .eq("id", clientID);
      console.log(res);
      if (res.error) throw res.error;
      setClient((prev) => ({
        ...prev,
        ...updated,
      }));
      setIsModalVisible(false);
    } catch (err) {
      console.error(err);
    }
  };

  const deleteAllDebts = async () => {
    try {
      const res = await supabase
        .from("transactions")
        .delete()
        .eq("client_id", clientID);
      console.log(res);
      if (res.error) throw res.error;
      setstats({ total: 0, nbr: 0 });
      setTransactions([]);
    } catch (err) {
      console.error(err);
    }
  };

  const deleteById = async (transaction_id, transaction_price) => {
    console.log(transaction_id, transaction_price);
    try {
      const res = await supabase
        .from("transactions")
        .delete()
        .eq("id", transaction_id);
      console.log(res);
      if (res.error) throw res.error;
      setstats((prev) => ({
        total: prev.total - transaction_price,
        nbr: prev.nbr - 1,
      }));
      setTransactions((prev) => prev.filter((tr) => tr.id !== transaction_id));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <SafeAreaView style={styles.appContainer}>
      {!loading && !error && (
        <FlatList
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={
            <>
              <UpdateProfileModal
                isVisible={isModalVisible}
                onClose={() => setIsModalVisible(false)}
                onSubmit={updateClientInfo}
                initialValues={client}
              />
              <View style={styles.clientInfo}>
                <View>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    {client?.phone_number && (
                      <TouchableOpacity
                        style={styles.phone_number_btn}
                        onPress={() =>
                          Linking.openURL(`tel:${client?.phone_number}`)
                        }
                      >
                        <Ionicons
                          name="call-outline"
                          size={20}
                          color="#e26a00"
                        />
                        <Text style={styles.phone_number}>
                          {client?.phone_number}
                        </Text>
                      </TouchableOpacity>
                    )}
                    <TouchableOpacity
                      style={styles.editBtn}
                      onPress={() => setIsModalVisible(true)}
                    >
                      <Ionicons name="pencil-outline" size={20} color="white" />
                      <Text style={{ color: "#fff", marginLeft: 5 }}>
                        Modifier
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <Text
                    style={styles.fullName}
                  >{`${client?.first_name} ${client?.last_name}`}</Text>
                  <Text style={styles.clientMetaData}>
                    {client?.description}
                  </Text>
                  <Text style={styles.clientMetaData}>
                    Créé le :{new Date(client?.created_at).toLocaleDateString()}
                  </Text>
                  {stats && (
                    <View
                      style={{
                        flexDirection: "row",
                        marginTop: 15,
                        marginBottom: -20,
                      }}
                    >
                      <View style={styles.nbrCard}>
                        <Text
                          style={{
                            fontWeight: "bold",
                            fontSize: 25,
                            textAlign: "center",
                            color: "#fff",
                          }}
                        >
                          {stats.nbr}
                        </Text>
                        <Text
                          style={{
                            textAlign: "center",
                            opacity: 0.9,
                            color: "#fff",
                          }}
                        >
                          Nombre de Crédits
                        </Text>
                      </View>
                      <View style={styles.totalCard}>
                        <Text
                          style={{
                            fontWeight: "bold",
                            fontSize: 25,
                            textAlign: "center",
                            color: "#e26a00",
                          }}
                        >
                          {`${stats.total}`}
                        </Text>
                        <Text
                          style={{
                            textAlign: "center",
                            opacity: 0.7,
                            color: "#e26a00",
                          }}
                        >
                          Total de Crédits (Dz)
                        </Text>
                      </View>
                    </View>
                  )}
                </View>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginTop: 40,
                }}
              >
                <Text
                  style={{
                    fontWeight: 500,
                    fontSize: 20,
                    fontStyle: "italic",
                  }}
                >
                  Liste des crédits
                </Text>
                <TouchableOpacity
                  style={styles.deleteAll}
                  onPress={deleteAllDebts}
                >
                  <Ionicons name="trash-outline" size={20} color="white" />
                  <Text style={{ color: "#fff", marginLeft: 5 }}>
                    Tout Effacer
                  </Text>
                </TouchableOpacity>
              </View>
            </>
          }
          data={transactions}
          renderItem={({ item }) => (
            <SwipeableListItem item={item} onDelete={deleteById} />
          )}
          keyExtractor={(item) => item.id}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
    paddingHorizontal: 15,
  },
  clientInfo: {
    backgroundColor: "#fff",
    borderRadius: 8,
    elevation: 5,
    shadowColor: "#000000",
    shadowOpacity: 0.3,
    shadowRadius: 5,
    padding: 10,
  },
  fullName: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: 500,
    fontStyle: "italic",
  },
  clientMetaData: {
    color: "#555",
    textAlign: "center",
    fontSize: 14,
    marginVertical: 5,
    fontStyle: "italic",
  },
  editBtn: {
    backgroundColor: "#33d9b2",
    padding: 9,
    borderRadius: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: 120,
  },
  phone_number: {
    color: "#e26a00",
    marginLeft: 5,
    textDecorationLine: "underline",
  },
  phone_number_btn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: 120,
  },
  nbrCard: {
    flex: 1,
    backgroundColor: "#e26a00",
    borderRadius: 5,
    elevation: 5,
    shadowColor: "#eee",
    shadowOpacity: 0.3,
    shadowRadius: 5,
    padding: 10,
    marginRight: 5,
  },
  totalCard: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 5,
    elevation: 5,
    shadowColor: "#000000",
    shadowOpacity: 0.3,
    shadowRadius: 5,
    padding: 10,
  },
  deleteAll: {
    backgroundColor: "#b33939",
    padding: 9,
    borderRadius: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: 120,
  },
});

export default Details;
