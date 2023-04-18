import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  StyleSheet,
  StatusBar,
} from "react-native";

const Profile = () => {
  return (
    <SafeAreaView style={styles.appContainer}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View>
          <Text>Profile</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
    paddingTop: 40,
    paddingHorizontal: 20,
  },
});

export default Profile;
