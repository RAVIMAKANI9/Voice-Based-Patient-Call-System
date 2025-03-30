import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import PatientRecordsScreen from "../screens/PatientRecordsScreen";
import RecordDetailsScreen from "../screens/RecordDetailsScreen";

const Stack = createStackNavigator();

const PatientsStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="PatientRecords" component={PatientRecordsScreen} />
      <Stack.Screen name="RecordDetails" component={RecordDetailsScreen} />
    </Stack.Navigator>
  );
};

export default PatientsStackNavigator;
