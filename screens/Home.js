import { useState } from "react";
import {
  StyleSheet,
  SafeAreaView,
  StatusBar,
  ScrollView,
  Text,
} from "react-native";
import DebtsPerDay from "../components/DebtsPerDay";
import RecentTransaction from "../components/RecentTransaction";
import MostDebtedClient from "../components/MostDebtedClient";
import useTransactions from "../hooks/useTransactions";
import useClients from "../hooks/useClients";

const Home = ({ navigation }) => {
  const { transactions } = useTransactions();
  const { clients } = useClients("worse");
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <SafeAreaView style={styles.appContainer}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Gérer votre magasin.</Text>
        <Text style={styles.title}>Gérer vos crédits.</Text>
        <DebtsPerDay style={styles.section} />
        <RecentTransaction
          style={styles.section}
          data={transactions}
          navigation={navigation}
        />
        <MostDebtedClient
          style={styles.section}
          data={clients}
          navigation={navigation}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 25,
    fontWeight: 500,
    fontStyle: "italic",
  },
  section: {
    flex: 1,
    marginTop: 20,
  },
});

export default Home;
