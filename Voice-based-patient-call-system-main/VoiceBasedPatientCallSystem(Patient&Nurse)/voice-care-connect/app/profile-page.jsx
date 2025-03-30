import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';

const ProfilePage = ({ setPage, user }) => {

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => setPage('home')}>
          <Feather name="arrow-left" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Profile Page</Text>
      </View>

      <View style={styles.profileSection}>
        <Text style={styles.nameText}>{user.user.name}</Text>

        <Text style={styles.patientText}>Patient</Text>
        <View style={styles.detailItem}>
          <Feather name="hotel" size={20} color="#757575" />
          <Text style={styles.detailText}>{user.user.room || "Room not assigned"}</Text>
        </View>
        <View style={styles.detailItem}>
          <Feather name="smartphone" size={20} color="#757575" />
          <Text style={styles.detailText}>{user.user.phone || "Phone not available"}</Text>

        </View>
      </View>

      <View style={styles.actionButtons}>

        <TouchableOpacity style={styles.logoutButton} onPress={() => setPage('home')}>
          <Feather name="log-out" size={20} color="#6759FF" />
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.footer}>
      </View>
      <StatusBar style="dark" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    marginRight: 20,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
  },
  profileSection: {
    padding: 20,
    alignItems: 'center',
  },
  nameText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 10,
  },
  patientText: {
    fontSize: 18,
    color: '#757575',
    marginBottom: 20,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  detailText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#757575',
  },
  actionButtons: {
    paddingHorizontal: 20,
    marginTop: 30,
  },
  actionButton: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    marginBottom: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionButtonText: {
    color: '#6759FF',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  logoutButton: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoutButtonText: {
    color: '#6759FF',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  footer: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  footerText: {
    color: '#757575',
    fontSize: 14,
  },
});

export default ProfilePage;
