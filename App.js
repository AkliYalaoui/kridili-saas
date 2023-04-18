import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import Ionicons from "react-native-vector-icons/Ionicons";
import LoginScreen from "./screens/Login";
import HomeScreen from "./screens/Home";
import TransactionsScreen from "./screens/Transactions";
import AddClientTransactionScreen from "./screens/AddClientTransaction";
import DetailsScreen from "./screens/Details";
import ClientsScreen from "./screens/Clients";
import ProfileScreen from "./screens/Profile";
import PlusButton from "./components/PlusButton";
import { UserContextProvider, useUser } from "./contexts/UserContext";
import { Pressable } from "react-native";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function MainTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Accueil"
      screenOptions={({ route }) => ({
        tabBarButton: (props) => {
          if (route.name === "Ajouter") {
            return <PlusButton {...props} />;
          } else {
            return <Pressable {...props} />;
          }
        },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          let rn = route.name;

          if (rn === "Accueil") {
            iconName = focused ? "home" : "home-outline";
          } else if (rn === "Transactions") {
            iconName = focused ? "book" : "book-outline";
          } else if (rn === "Clients") {
            iconName = focused ? "people" : "people-outline";
          } else if (rn === "Profile") {
            iconName = focused ? "person" : "person-outline";
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#e26a00",
        tabBarInactiveTintColor: "grey",
        tabBarLabelStyle: { fontSize: 10, paddingBottom: 8 },
        tabBarStyle: { padding: 8, height: 60 },
        headerShown: false,
      })}
    >
      <Tab.Screen name="Accueil" component={HomeScreen} />
      <Tab.Screen name="Transactions" component={TransactionsScreen} />
      <Tab.Screen name="Ajouter" component={AddClientTransactionScreen} />
      <Tab.Screen name="Clients" component={ClientsScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

const Screens = () => {
  const user = "AB";
  // const { user } = useUser();

  const render = user ? (
    <>
      <Stack.Screen
        options={{ headerShown: false }}
        name="Main"
        component={MainTabs}
      />
      <Stack.Screen name="Details" component={DetailsScreen} />
    </>
  ) : (
    <Stack.Screen name="Login" component={LoginScreen} />
  );

  return (
    <NavigationContainer>
      <Stack.Navigator>{render}</Stack.Navigator>
    </NavigationContainer>
  );
};

export default function App() {
  return (
    <UserContextProvider>
      <Screens />
    </UserContextProvider>
  );
}
