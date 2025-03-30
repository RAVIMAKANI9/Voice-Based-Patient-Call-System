import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { Ionicons } from "react-native-vector-icons";

// Import Screens
import LoginScreen from "../screens/LoginScreen";
import DashboardScreen from "../screens/DashboardScreen";
import TaskManagementScreen from "../screens/TaskManagementScreen";
import PatientRecordsScreen from "../screens/PatientRecordsScreen";
import RecordDetailsScreen from "../screens/RecordDetailsScreen";
import NurseProfileScreen from "../screens/NurseProfileScreen";
import PatientsStackNavigator from "./PatientsStackNavigator"; // ✅ Import Patients Stack

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Placeholder Record Details Stack (Only appears when a patient is clicked)
const PatientStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="PatientRecords" component={PatientRecordsScreen} />
    <Stack.Screen name="RecordDetails" component={RecordDetailsScreen} />
  </Stack.Navigator>
);

// Bottom Tab Navigator
const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === "Dashboard") iconName = "home-outline";
          else if (route.name === "Tasks") iconName = "list-outline";
          else if (route.name === "Patients") iconName = "people-outline";
          else if (route.name === "Profile") iconName = "person-outline";

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#4A63E7", // Change as per your design
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen name="Dashboard" component={DashboardScreen} />
      <Tab.Screen name="Tasks" component={TaskManagementScreen} />
      <Tab.Screen name="Patients" component={PatientStack} />
      <Tab.Screen name="Profile" component={NurseProfileScreen} />
    </Tab.Navigator>
  );
};

// Main App Navigation (Login → Dashboard)
const AppNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Main" component={BottomTabNavigator} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
