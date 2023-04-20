import { useState } from "react";
import {
  StyleSheet,
  SafeAreaView,
  StatusBar,
  ScrollView,
  Text,
  RefreshControl,
} from "react-native";
import DebtsPerDay from "../components/DebtsPerDay";
import RecentTransaction from "../components/RecentTransaction";
import MostDebtedClient from "../components/MostDebtedClient";
import useTransactions from "../hooks/useTransactions";
import useClients from "../hooks/useClients";
import useChartData from "../hooks/useChartData";

const Home = ({ navigation }) => {
  const [refreshing, setRefreshing] = useState(false);
  const { transactions, getTransactions } = useTransactions();
  const { clients, getClients } = useClients("worse");
  const { labels, dataset, getData } = useChartData();

  const handleRefresh = () => {
    setRefreshing(true);
    getTransactions();
    getClients();
    getData();
    setRefreshing(false);
  };

  return (
    <SafeAreaView style={styles.appContainer}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
      >
        <Text style={styles.title}>Gérer votre magasin.</Text>
        <Text style={styles.title}>Gérer vos crédits.</Text>
        <DebtsPerDay style={styles.section} labels={labels} dataset={dataset} />
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
