import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import profileImage from "../assets/profile-image.jpg"; // Replace with actual profile image
import * as SecureStore from 'expo-secure-store';
import axios from 'axios';

const API_URL = "http://192.168.20.7:3000/api/user/getUserProfile";
// Dummy schedule data
const scheduleData = [
  {
    id: "1",
    time: "9:00AM - 5:00PM",
    room: "6B",
    description: "Assess/Chart - Peds...",
  },
  {
    id: "2",
    time: "9:00AM - 5:00PM",
    room: "4A",
    description: "Assess/Chart - Peds...",
  },
];


// const NurseProfileScreen = () => {
//   const navigation = useNavigation(); // Get navigation instance


//   const handleLogout = () => {
//     navigation.reset({
//       index: 0,
//       routes: [{ name: "Login" }], // Reset navigation to Login screen
//     });
//   };



//   return (
//     <View style={styles.container}>
//       {/* Profile Section */}
//       <View style={styles.profileSection}>
//         <Image source={profileImage} style={styles.profileImage} />
//         <Text style={styles.name}>asdfghjk</Text>
//         <Text style={styles.info}>1234</Text>
//         <Text style={styles.info}>Registered Nurse (RN)</Text>
//         <Text style={styles.info}>Psychiatric & Mental Health Nursing</Text>
//       </View>

//       {/* Schedule Section */}
//       <Text style={styles.sectionTitle}>Schedule</Text>
//       <FlatList
//         data={scheduleData}
//         keyExtractor={(item) => item.id}
//         renderItem={({ item }) => (
//           <View style={styles.scheduleItem}>
//             <Ionicons name="calendar-outline" size={24} color="black" />
//             <View style={styles.scheduleText}>
//               <Text style={styles.time}>{item.time}</Text>
//               <Text style={styles.room}>{item.room}</Text>
//               <Text style={styles.description}>{item.description}</Text>
//             </View>
//           </View>
//         )}
//       />
//       {/* Logout Button */}
//       <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
//         <Text style={styles.logoutText}>Log Out</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };


const NurseProfileScreen = () => {
  const navigation = useNavigation();
  const [nurseData, setNurseData] = useState({ nurseName: "", department: "" });

  useEffect(() => {
      const fetchUserProfile = async () => {
          try {
              const token = await SecureStore.getItemAsync("JWTToken");
              const response = await axios.get(API_URL, {
                  headers: { Authorization: `Bearer ${token}` },
              });
              setNurseData(response.data);
              
          } catch (error) {
              console.error("Error fetching user profile:", error);
          }
      };

      fetchUserProfile();
  }, []);

  const handleLogout = () => {
      navigation.reset({
          index: 0,
          routes: [{ name: "Login" }],
      });
  };

  return (
      <View style={styles.container}>
          <View style={styles.profileSection}>
              <Image source={profileImage} style={styles.profileImage} />
              <Text style={styles.name}>Name : {nurseData.nurseName}</Text>
              <Text style={styles.info}>Department : {nurseData.department}</Text>
              <Text style={styles.info}>Registered Nurse (RN)</Text>
              <Text style={styles.info}>Aster Medicity</Text>
          </View>

          <Text style={styles.sectionTitle}>Schedule</Text>
          <FlatList
              data={scheduleData}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                  <View style={styles.scheduleItem}>
                      <Ionicons name="calendar-outline" size={24} color="black" />
                      <View style={styles.scheduleText}>
                          <Text style={styles.time}>{item.time}</Text>
                          <Text style={styles.room}>{item.room}</Text>
                          <Text style={styles.description}>{item.description}</Text>
                      </View>
                  </View>
              )}
          />
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
              <Text style={styles.logoutText}>Log Out</Text>
          </TouchableOpacity>
      </View>
  );
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
  },
  profileSection: {
    alignItems: "center",
    marginVertical: 20,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 100,
    marginTop: 20,
  },
  name: {
    fontSize: 30,
    fontWeight: "bold",
    marginTop: 20,
    color: "#383838",
  },
  info: {
    fontSize: 16,
    color: "#3D3D3D",
    marginTop: 4,
    marginTop: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 10,
  },
  scheduleItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#EDEFFD",
    padding: 12,
    borderRadius: 8,
    marginVertical: 6,
  },
  scheduleText: {
    marginLeft: 10,
  },
  time: {
    fontSize: 16,
    fontWeight: "600",
  },
  room: {
    fontSize: 14,
    color: "#383838",
  },
  description: {
    fontSize: 14,
    color: "#383838",
  },
  logoutButton: {
    backgroundColor: "#d9534f",
    padding: 12,
    borderRadius: 20,
    width: "40%",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 30,
    alignSelf: "center", // Center the button horizontally
  },
  logoutText: {
    color: "#fff",
    fontSize: 21,
    fontWeight: "bold",
  },
});

export default NurseProfileScreen;
