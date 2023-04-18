import { useState } from "react";
import { StyleSheet, Text, SafeAreaView, View } from "react-native";
import PlusButton from "../components/PlusButton";
import RecentTransaction from "../components/RecentTransaction";
import MostDebtedClient from "../components/MostDebtedClient";
import AddClientTransaction from "../components/AddClientTransaction";
import useTransactions from "../hooks/useTransactions";
import useClients from "../hooks/useClients";

const Home = ({ navigation }) => {
  const { transactions } = useTransactions();
  const { clients } = useClients("worse");
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <SafeAreaView style={styles.appContainer}>
      <RecentTransaction
        style={styles.header}
        data={transactions}
        navigation={navigation}
      />
      <View style={styles.section}>
        <MostDebtedClient data={clients} navigation={navigation} />
      </View>
      <AddClientTransaction
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
      />
      <PlusButton onPress={() => setModalVisible(true)} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
  },
  whiteText: {
    color: "#fff",
  },
  header: {
    paddingTop: 40,
    paddingHorizontal: 15,
    backgroundColor: "#121212",
    flex: 1,
    borderBottomLeftRadius: 50,
  },
  section: {
    flex: 2,
    padding: 15,
  },
});

export default Home;
