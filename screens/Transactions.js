import { useState } from "react";
import {
  View,
  FlatList,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
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
    <View>
      <View
        style={{
          padding: 10,
          margin: 10,
          borderRadius: 20,
          backgroundColor: "#121212",
        }}
      >
        <Calendar
          maxDate={maxDate}
          onDayPress={(day) => {
            console.log("selected day", day);
            setSelectedDate(day.dateString);
          }}
          theme={{
            backgroundColor: "#121212",
            calendarBackground: "#121212",
            textSectionTitleColor: "#b6c1cd",
            selectedDayBackgroundColor: "#00adf5",
            selectedDayTextColor: "#ffffff",
            todayTextColor: "#00adf5",
            dayTextColor: "#2d4150",
            textDisabledColor: "#d9e1e8",
            dotColor: "#00adf5",
            selectedDotColor: "#ffffff",
            arrowColor: "orange",
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

      <View style={{ marginVertical: 15, paddingHorizontal: 10 }}>
        <FlatList
          data={transactions}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.transaction}
              onPress={() =>
                navigation.navigate("Details", { clientID: item.client_id.id })
              }
            >
              <View>
                <Text
                  style={{ fontSize: 18, fontWeight: "bold" }}
                >{`${item.client_id.first_name} ${item.client_id.last_name}`}</Text>
                <Text style={{ opacity: 0.5 }}>
                  {new Date(item.created_at).toLocaleDateString()}
                </Text>
              </View>
              <Text style={{ fontWeight: "bold" }}>{`${item.amount} DZ`}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.id}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  transaction: {
    padding: 10,
    width: "100%",
    backgroundColor: "#eee",
    borderRadius: 10,
    marginVertical: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    elevation: 5,
    shadowColor: "#000000",
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
});

export default Transactions;
