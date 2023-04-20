import { BarChart } from "react-native-chart-kit";
import { View, Text, Dimensions } from "react-native";

const DebtsPerDay = ({ style, labels, dataset }) => {
  return (
    <View style={style}>
      <Text style={{ fontWeight: 500, fontSize: 17 }}>Nombre de crédits</Text>
      <BarChart
        data={{
          labels: labels,
          datasets: [
            {
              data: dataset,
            },
          ],
        }}
        width={Dimensions.get("window").width}
        height={220}
        yAxisInterval={1}
        chartConfig={{
          backgroundColor: "#e26a00",
          backgroundGradientFrom: "#fb8c00",
          backgroundGradientTo: "#ffa726",
          decimalPlaces: 2, // optional, defaults to 2dp
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16,
          },
          propsForDots: {
            r: "6",
            strokeWidth: "2",
            stroke: "#ffa726",
          },
        }}
        bezier
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
      />
    </View>
  );
};

export default DebtsPerDay;
