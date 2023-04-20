import React, { useState } from "react";
import {
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const UpdateProfileModal = ({
  isVisible,
  onClose,
  onSubmit,
  initialValues,
}) => {
  const [first_name, setFirstName] = useState(initialValues.first_name);
  const [last_name, setLastName] = useState(initialValues.last_name);
  const [description, setDescription] = useState(initialValues.description);
  const [phone_number, setPhoneNumber] = useState(initialValues.phone_number);

  const handleSubmit = () => {
    const updatedProfile = { first_name, last_name, description, phone_number };
    onSubmit(updatedProfile);
  };

  return (
    <Modal visible={isVisible} animationType="slide">
      <View style={styles.modalContainer}>
        <Text style={styles.inputLabel}>Prénom</Text>
        <TextInput
          style={styles.input}
          placeholder="Prénom"
          value={first_name}
          onChangeText={setFirstName}
        />
        <Text style={styles.inputLabel}>Nom</Text>
        <TextInput
          style={styles.input}
          placeholder="Nom"
          value={last_name}
          onChangeText={setLastName}
        />
        <Text style={styles.inputLabel}>Description</Text>
        <TextInput
          style={styles.input}
          placeholder="Description"
          value={description}
          onChangeText={setDescription}
        />
        <Text style={styles.inputLabel}>Tél:</Text>
        <TextInput
          style={styles.input}
          placeholder="Tel"
          value={phone_number}
          onChangeText={setPhoneNumber}
        />

        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Enregistrer</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <Text style={styles.closeButtonText}>Annuler</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    // alignItems: "center",
    backgroundColor: "#fff",
    padding: 20,
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    marginBottom: 20,
  },
  inputLabel: {
    fontWeight: 400,
    fontSize: 18,
    marginBottom: 10,
  },
  submitButton: {
    backgroundColor: "#e26a00",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  submitButtonText: {
    color: "#fff",
    textAlign: "center",
  },
  closeButton: {
    backgroundColor: "#ccc",
    padding: 10,
    borderRadius: 5,
  },
  closeButtonText: {
    color: "#fff",
    textAlign: "center",
  },
});

export default UpdateProfileModal;
