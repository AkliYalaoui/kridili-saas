import { useState } from "react";
import {
  View,
  SafeAreaView,
  FlatList,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Calendar } from "react-native-calendars";
import useTransactions from "../hooks/useTransactions";

const Transactions = ({ navigation }) => {
  const today = new Date();
  const year = today.getFullYear();
  const month = (today.getMonth() + 1).toString().padStart(2, "0");
  const day = today.getDate().toString().padStart(2, "0");
  const maxDate = `${year}-${month}-${day}`;
  const [selectedDated, setSelectedDate] = useState(maxDate);
  const { transactions } = useTransactions("date", { selectedDated });
  return (
    <SafeAreaView style={styles.appContainer}>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={transactions}
        ListHeaderComponent={
          <View
            style={{
              padding: 2,
              margin: 10,
              borderRadius: 20,
              backgroundColor: "#e26a00",
            }}
          >
            <Calendar
              maxDate={maxDate}
              onDayPress={(day) => {
                console.log("selected day", day);
                setSelectedDate(day.dateString);
              }}
              theme={{
                backgroundColor: "#e26a00",
                calendarBackground: "#e26a00",
                textSectionTitleColor: "#b6c1cd",
                selectedDayBackgroundColor: "#fff",
                selectedDayTextColor: "#ffffff",
                todayTextColor: "#00adf5",
                dayTextColor: "#2d4150",
                textDisabledColor: "#d9e1e8",
                dotColor: "#00adf5",
                selectedDotColor: "#ffffff",
                arrowColor: "#000",
                monthTextColor: "#fff",
                textDayFontFamily: "monospace",
                textMonthFontFamily: "monospace",
                textDayHeaderFontFamily: "monospace",
                textDayFontSize: 16,
                textMonthFontSize: 16,
                textDayHeaderFontSize: 16,
              }}
            />
          </View>
        }
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.transaction}
            onPress={() =>
              navigation.navigate("Details", {
                clientID: item.client_id.id,
              })
            }
          >
            <Ionicons name="pricetags-outline" size={32} color="#e26a00" />
            <View style={{ marginLeft: 10, flex: 1 }}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{ fontSize: 20, fontWeight: 500 }}
                >{`${item.client_id.first_name} ${item.client_id.last_name}`}</Text>
                <Text style={{ fontWeight: 400 }}>{`${item.amount} DZ`}</Text>
              </View>
              <Text style={{ fontSize: 14, opacity: 0.7 }}>
                {item.description}
              </Text>
              <Text style={{ fontSize: 12, opacity: 0.5, textAlign: "right" }}>
                {new Date(item.created_at).toLocaleDateString()}
              </Text>
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
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  transaction: {
    padding: 15,
    width: "100%",
    borderRadius: 10,
    marginVertical: 5,
    flexDirection: "row",
    alignItems: "center",
    elevation: 5,
    shadowColor: "#ccc",
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
});

export default Transactions;
