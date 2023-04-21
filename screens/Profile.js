import { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { supabase } from "../lib/initSupabase";

const Profile = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const logout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    } catch (err) {
      console.error(err);
    }
  };
  const handleChangeMp = async () => {
    try {
      if (oldPassword !== newPassword) return;
      const { data, error } = await supabase.auth.updateUser({
        password: newPassword,
      });
      console.log({ data, error });
      if (error) throw error;
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <SafeAreaView style={styles.appContainer}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View>
          <Text style={styles.title}>Kridili</Text>
          <Text style={styles.sub_title}>modifier votre mot de passe</Text>
          <TextInput
            style={styles.input}
            placeholder="Nouveau Mot de Passe"
            secureTextEntry={true}
            value={oldPassword}
            onChangeText={setOldPassword}
          />
          <TextInput
            style={styles.input}
            placeholder="Confirmer Mot de Passe"
            secureTextEntry={true}
            value={newPassword}
            onChangeText={setNewPassword}
          />
          <TouchableOpacity style={styles.button} onPress={handleChangeMp}>
            <Text style={styles.buttonText}>Enregistrer</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.logout_btn} onPress={logout}>
          <Text
            style={{
              fontSize: 17,
              marginRight: 10,
              textTransform: "capitalize",
            }}
          >
            se déconnecter
          </Text>
          <Ionicons name="log-out-outline" size={32} color="#000" />
        </TouchableOpacity>
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
  title: {
    fontSize: 40,
    fontWeight: 500,
    fontStyle: "italic",
  },
  sub_title: {
    color: "#555",
    marginBottom: 20,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: "#aaa",
    borderRadius: 5,
    padding: 10,
    marginVertical: 10,
  },
  button: {
    height: 50,
    backgroundColor: "#e26a00",
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    textTransform: "capitalize",
  },
  logout_btn: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#aaa",
    height: 50,
    borderRadius: 5,
  },
});

export default Profile;
