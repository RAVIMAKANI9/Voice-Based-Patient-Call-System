import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { GestureHandlerRootView } from "react-native-gesture-handler";
import logo from '../assets/icons/logo.png';
import AccessAccount from './access-account';
import PatientDashboard from './patient-dashboard';
import ProfilePage from './profile-page';
import VoiceRequestPage from './voice-request';
import AppNavigator from "../navigation/AppNavigator";

export default function App() {
  const [page, setPage] = useState('home');
  const [user, setUser] = useState(null);

  const renderPage = () => {
    switch (page) {
      case 'home':
        return (
          <View style={styles.container}>
            <View style={styles.content}>
              <Image source={logo} style={styles.logo} resizeMode="contain" />
              <Text style={styles.title}>VoiceCare Connect</Text>
              <Text style={styles.subtitle}>Welcome to the Voice-Based Patient</Text>
              <Text style={styles.subtitle}>Call System</Text>
            </View>

            <View style={styles.buttonContainer}>
              <TouchableOpacity 
                style={styles.button} 
                onPress={() => setPage('accessAccount')}
              >
                <Text style={styles.buttonText}>I am a Patient</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={styles.button} 
                onPress={() => setPage('employeeNavigator')}
              >
                <Text style={styles.buttonText}>I am an Employee/Nurse</Text>
              </TouchableOpacity>
            </View>

            <StatusBar style="light" />
          </View>
        );

      case 'accessAccount':
        return <AccessAccount setPage={setPage} setUser={setUser} />;

      case 'patientDashboard':
        return <PatientDashboard setPage={setPage} user={user} />;

      case 'profilePage':
        return <ProfilePage setPage={setPage} user={user} />;

      case 'voiceRequestPage':
        return <VoiceRequestPage setPage={setPage} />;

      case 'employeeNavigator': 
        return (
          <GestureHandlerRootView style={{ flex: 1 }}>
            <AppNavigator />
          </GestureHandlerRootView>
        );

      default:
        return <Text>Page Not Found</Text>;
    }
  };

  return renderPage();
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#6759FF',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 100,
  },
  content: {
    alignItems: 'center',
    marginBottom: 80,
  },
  logo: {
    width: 100,
    height: 100,
  },
  title: {
    color: 'white',
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 20,
    textAlign: 'center',
  },
  subtitle: {
    color: 'white',
    fontSize: 16,
    marginTop: 10,
    textAlign: 'center',
  },
  buttonContainer: {
    width: '100%',
    paddingHorizontal: 30,
    marginBottom: 30,
  },
  button: {
    backgroundColor: 'white',
    paddingVertical: 15,
    borderRadius: 10,
    marginBottom: 15,
    alignItems: 'center',
  },
  buttonText: {
    color: '#6759FF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  footer: {
    position: 'absolute',
    bottom: 20,
    alignItems: 'center',
  },
  footerText: {
    color: 'white',
    fontSize: 14,
  },
});