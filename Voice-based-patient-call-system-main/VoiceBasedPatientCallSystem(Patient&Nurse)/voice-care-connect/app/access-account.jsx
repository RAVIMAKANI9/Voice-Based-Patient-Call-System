import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from "react-native";
import { Feather } from "@expo/vector-icons";
import axios from "axios";

const API_URL = "http://192.168.73.1:5000/api/auth/login"; // Replace with actual backend IP

const AccessAccount = ({ setPage, setUser }) => { // Accept setUser as a prop
  const [name, setName] = useState("");
  const [dob, setDob] = useState("");

  const handleLogin = async () => {
    try {
      const response = await axios.post(API_URL, { name, dob });
      const userData = response.data; // Get user data from backend response

      setUser(userData); // Store user details in App.js state
      Alert.alert("Success", "Login successful");
      setPage("patientDashboard");
    } catch (error) {
      Alert.alert("Error", "User not found or incorrect details");
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => setPage('home')}>
        <Feather name="arrow-left" size={24} color="white" />
      </TouchableOpacity>
      <View style={styles.content}>
        <Text style={styles.title}>Access Account</Text>
        <Text style={styles.subtitle}>Enter your details to access the system</Text>

        <View style={styles.inputContainer}>
          <Feather name="user" size={20} color="#BDBDBD" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Enter your name"
            placeholderTextColor="#BDBDBD"
            value={name}
            onChangeText={setName}
          />
        </View>

        <View style={styles.inputContainer}>
          <Feather name="calendar" size={20} color="#BDBDBD" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Enter your DOB (YYYY-MM-DD)"
            placeholderTextColor="#BDBDBD"
            value={dob}
            onChangeText={setDob}
          />
        </View>

        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>Log In</Text>
        </TouchableOpacity>
      </View>
      <StatusBar style="light" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#6759FF",
    alignItems: "center",
    justifyContent: "center",
    padding: 30,
  },
  content: {
    width: "100%",
  },
  title: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  subtitle: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
    marginBottom: 30,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 50,
    fontSize: 16,
    color: "#333",
  },
  loginButton: {
    backgroundColor: "#FFFFFF",
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 20,
  },
  loginButtonText: {
    color: "#6759FF",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default AccessAccount;
