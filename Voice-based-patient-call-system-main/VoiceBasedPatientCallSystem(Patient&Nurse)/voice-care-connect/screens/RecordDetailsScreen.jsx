import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import profileImage from "../assets/profile-PATIENT.png";

// Dummy patient interaction data
const nurseInteractions = [
  {
    id: "1",
    date: "3/12/2023",
    nurse: "Jessica Daniel",
    action: "Washed hands before...",
  },
  {
    id: "2",
    date: "3/4/2023",
    nurse: "Mary Jones",
    action: "Observed feeding...",
  },
];

const RecordDetailsScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { patient } = route.params; // Getting patient data from navigation

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.title}>Records Management</Text>
        <Ionicons name="ellipsis-vertical" size={24} color="black" />
      </View>

      {/* Patient Info */}
      <View style={styles.patientInfo}>
        <Image source={profileImage} style={styles.profileImage} />
        <Text style={styles.patientName}>{patient.name}</Text>
        <Text style={styles.patientDetails}>Patient ID: {patient.id}</Text>
        <Text style={styles.patientDetails}>DOB: 06/21/2016 | Sex: M</Text>
        <Text style={styles.admittedFor}>
          <Text style={styles.boldText}>Admitted for: </Text>Excessive Chest
          Pain
        </Text>
      </View>

      {/* Nurse Interactions */}
      <Text style={styles.sectionTitle}>NURSE INTERACTION</Text>
      <FlatList
        data={nurseInteractions}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.interactionCard}>
            <View style={styles.interactionRow}>
              <Ionicons name="time-outline" size={20} color="#007AFF" />
              <Text style={styles.interactionDate}>{item.date}</Text>
              <Text style={styles.nurseName}>Nurse {item.nurse}</Text>
            </View>
            <Text style={styles.interactionAction}>{item.action}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  patientInfo: {
    alignItems: "center",
    marginBottom: 20,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
  },
  patientName: {
    fontSize: 22,
    fontWeight: "bold",
  },
  patientDetails: {
    fontSize: 16,
    color: "gray",
    marginTop: 2,
  },
  admittedFor: {
    fontSize: 16,
    color: "#333",
    marginTop: 8,
  },
  boldText: {
    fontWeight: "bold",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  interactionCard: {
    backgroundColor: "#EDEFFD",
    padding: 12,
    borderRadius: 8,
    marginVertical: 6,
  },
  interactionRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  interactionDate: {
    marginLeft: 5,
    fontSize: 16,
    fontWeight: "bold",
  },
  nurseName: {
    fontSize: 16,
    marginLeft: 10,
  },
  interactionAction: {
    fontSize: 15,
    color: "#383838",
  },
});

export default RecordDetailsScreen;
