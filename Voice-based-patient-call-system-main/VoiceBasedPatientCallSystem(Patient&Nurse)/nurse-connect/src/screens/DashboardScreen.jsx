import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import profileImage from "../assets/profile-image.jpg";

const DashboardScreen = () => {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Main Nurse Dashboard</Text>
        <Image source={profileImage} style={styles.profileImage} />
      </View>

      {/* Upcoming Shifts and Patient Assignments */}
      <View style={styles.sectionContainer}>
        {/* Upcoming Shifts */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Upcoming Shifts</Text>
          <Text style={styles.shiftText}>SUN MAR 19, 2023</Text>
          <Text style={styles.shiftText}>0730-1600 | 4A North | HCC</Text>
          <Text style={styles.shiftText}>0730-1600 | 4A North | HCC</Text>
          <Text style={styles.shiftText}>0730-1600 | 4A North | HCC</Text>
        </View>

        {/* Patient Assignments */}
        {/* <View style={styles.section}>
          <Text style={styles.sectionTitle}>Patient Assignments</Text>
          <Text style={styles.patientText}>Noah Brooks, 6B</Text>
          <Text style={styles.patientSubText}>Assess/Chart - Peds...</Text>
          <Text style={styles.patientText}>Nicholas Hays, 5B</Text>
          <Text style={styles.patientSubText}>Assess/Chart - Peds...</Text>
        </View> */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#FFFFFF",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 36,
  },
  title: {
    fontSize: 27,
    fontWeight: "bold",
    color: "#383838",
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  section: {
    backgroundColor: "#EDEFFD",
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
  },

  sectionTitle: {
    fontSize: 23,
    fontWeight: "bold",
    marginBottom: 28,
    color: "#273377",
  },
  shiftText: {
    fontSize: 16,
    marginBottom: 20,
  },
  patientText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  patientSubText: {
    fontSize: 18,
    color: "gray",
    marginBottom: 30,
  },
});

export default DashboardScreen;
