import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import profileImage from "../assets/profile-image.jpg";
import { useNavigation } from "@react-navigation/native";

// Dummy data for patients
const patients = [
  {
    id: "1",
    name: "Elmon Brown",
    room: "6B",
    description: "Assess/Chart - Peds...",
    contact: "+1 234 567 890",
  },
  {
    id: "2",
    name: "Nicholas Hays",
    room: "5B",
    description: "Assess/Chart - Peds...",
    contact: "+1 987 654 321",
  },
  {
    id: "3",
    name: "Emma Watson",
    room: "4A",
    description: "Follow-up - Cardio...",
    contact: "+1 555 123 456",
  },
];

const PatientRecordsScreen = () => {
  const navigation = useNavigation();

  const [searchQuery, setSearchQuery] = useState("");
  const [filteredPatients, setFilteredPatients] = useState(patients);

  // Function to filter patients based on search query
  const handleSearch = (text) => {
    setSearchQuery(text);
    if (text === "") {
      setFilteredPatients(patients);
    } else {
      const filteredData = patients.filter((patient) =>
        patient.name.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredPatients(filteredData);
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Patient Records</Text>
        <TouchableOpacity>
          <Image source={profileImage} style={styles.profileImage} />
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Ionicons
          name="search-outline"
          size={20}
          color="gray"
          style={styles.searchIcon}
        />
        <TextInput
          style={styles.searchInput}
          placeholder="Search patients..."
          value={searchQuery}
          onChangeText={handleSearch}
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={() => handleSearch("")}>
            <Ionicons
              name="close-circle"
              size={20}
              color="gray"
              style={styles.clearIcon}
            />
          </TouchableOpacity>
        )}
      </View>

      {/* Patient List */}
      <FlatList
        data={filteredPatients}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={
              () => navigation.navigate("RecordDetails", { patient: item }) // ✅ Now navigation is defined
            }
          >
            <Ionicons name="person-outline" size={24} color="black" />
            <View style={styles.info}>
              <Text style={styles.name}>
                {item.name}, {item.room}
              </Text>
              <Text style={styles.description}>{item.description}</Text>
              <Text style={styles.contact}>📞 {item.contact}</Text>
            </View>
          </TouchableOpacity>
        )}
        ListEmptyComponent={() => (
          <Text style={styles.noResults}>No patients found</Text>
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
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 16,
  },
  title: {
    fontSize: 29,
    fontWeight: "bold",
    color: "#383838",
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#edeffd",
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 40,
  },
  clearIcon: {
    marginLeft: 8,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#EDEFFD",
    padding: 12,
    borderRadius: 8,
    marginVertical: 6,
  },
  info: {
    marginLeft: 10,
  },
  name: {
    fontSize: 17,
    fontWeight: "600",
  },
  description: {
    fontSize: 15,
    color: "#383838",
    marginTop: 5,
    marginBottom: 4,
  },
  contact: {
    fontSize: 15,
    color: "#007AFF",
    marginTop: 4,
  },
  noResults: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
    color: "gray",
  },
});

export default PatientRecordsScreen;
