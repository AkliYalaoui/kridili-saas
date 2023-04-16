import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./screens/Login";
import HomeScreen from "./screens/Home";
import TransactionsScreen from "./screens/Transactions";
import DetailsScreen from "./screens/Details";
import ProfileScreen from "./screens/Profile";
import { UserContextProvider, useUser } from "./contexts/UserContext";

const Stack = createNativeStackNavigator();

const Screens = () => {
  const user = "AB";
  // const { user } = useUser();

  const render = user ? (
    <>
      <Stack.Screen name="Accueil" component={HomeScreen} />
      <Stack.Screen name="Transactions" component={TransactionsScreen} />
      <Stack.Screen name="Details" component={DetailsScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
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
