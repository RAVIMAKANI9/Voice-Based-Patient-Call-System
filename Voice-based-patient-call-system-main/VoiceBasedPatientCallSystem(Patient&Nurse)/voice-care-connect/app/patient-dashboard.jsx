import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, StatusBar } from "react-native";
import { Feather } from "@expo/vector-icons";
import axios from "axios";

const API_URL = "http://192.168.73.1:5000/api/patientRequests"; // Use your actual local IP

const PatientDashboard = ({ setPage, user }) => {
  const [requests, setRequests] = useState([]);
  const [showPastRequests, setShowPastRequests] = useState(false);
  const patientName = user.user.name || "Guest"; // Use patient's name if available

  // ✅ Fetch past requests from the database when the user changes
  useEffect(() => {
    const fetchPastRequests = async () => {
      try {
        if (!patientName || patientName === "Guest") return;

        const response = await axios.get(`${API_URL}/history/${encodeURIComponent(patientName)}`);

        if (response.data.length > 0) {
          const formattedRequests = response.data.map((req) => ({
            text: req.requestText,
            time: new Date(req.timestamp).toLocaleString("en-US", {
              weekday: "short",
              hour: "numeric",
              minute: "2-digit",
              hour12: true,
            }),
          }));

          setRequests(formattedRequests.slice(0, 3));
          setShowPastRequests(true);
        }
      } catch (error) {
        console.error("Error fetching past requests", error);
      }
    };

    fetchPastRequests();
  }, [user]); // Runs when `user` changes

  // ✅ Handle request submission
  const handleRequestSelect = async (requestText) => {
    if (!user || patientName === "Guest") return;

    try {
      await axios.post(`${API_URL}/submit`, { patientName, requestText });
      updatePastRequests(requestText);
    } catch (error) {
      console.error("Error submitting request", error);
    }
  };

  // ✅ Update recent requests dynamically and maintain consistency
  const updatePastRequests = (newRequestText) => {
    const now = new Date();
    const formattedTime = now.toLocaleString("en-US", {
      weekday: "short",
      hour: "numeric",
      minute: "2-digit",
    });

    const newRequest = { text: newRequestText, time: formattedTime };

    setRequests((prevRequests) => [newRequest, ...prevRequests].slice(0, 3));
    setShowPastRequests(true);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => setPage("home")}>
          <Feather name="arrow-left" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Patient Dashboard</Text>
      </View>

      <Text style={styles.pageTitle}>Patient Activity</Text>
      <ScrollView style={styles.content}>
        <Text style={styles.nameText}>{patientName}</Text>
        <Text style={styles.greetingText}>Good to see you again</Text>

        <View style={styles.requestsContainer}>
          <TouchableOpacity style={styles.requestItem} onPress={() => handleRequestSelect("Request a prescription refill")}>
            <Text style={styles.requestText}>Request a prescription refill</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.requestItem} onPress={() => handleRequestSelect("Register for flu shot")}>
            <Text style={styles.requestText}>Register for flu shot</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.requestItem} onPress={() => handleRequestSelect("Request medical record")}>
            <Text style={styles.requestText}>Request medical record</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.requestItem} onPress={() => handleRequestSelect("Ask nurse a question")}>
            <Text style={styles.requestText}>Ask nurse a question</Text>
          </TouchableOpacity>
        </View>

        {/* ✅ Show Past Requests (if available) */}
        {showPastRequests && (
          <View style={styles.pastRequestsSection}>
            <Text style={styles.pastRequestsTitle}>Recent Requests</Text>
            {requests.length === 0 ? (
              <Text style={styles.noRequestsText}>No requests</Text>
            ) : (
              requests.map((request, index) => (
                <View key={index} style={styles.pastRequestItem}>
                  <Text style={styles.pastRequestText}>{request.text}</Text>
                  <Text style={styles.pastRequestTime}>{request.time}</Text>
                </View>
              ))
            )}
          </View>
        )}

        <TouchableOpacity style={styles.submitButton} onPress={() => { updatePastRequests("Quick Request"); setPage("profilePage"); }}>
          <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>

        <View style={styles.bottomNavigation}>
          <TouchableOpacity style={styles.navItem} onPress={() => { setPage("home"); setShowPastRequests(false); }}>
            <Feather name="home" size={24} color="#BDBDBD" />
            <Text style={styles.navText}>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navItem} onPress={() => { setPage("voiceRequestPage"); setShowPastRequests(false); }}>
            <Feather name="mic" size={24} color="#BDBDBD" />
            <Text style={styles.navText}>Voice Request</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navItem} onPress={() => { setPage("profilePage"); setShowPastRequests(false); }}>
            <Feather name="user" size={24} color="#BDBDBD" />
            <Text style={styles.navText}>Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navItem} onPress={() => { setPage("services"); setShowPastRequests(false); }}>
            <Feather name="grid" size={24} color="#BDBDBD" />
            <Text style={styles.navText}>Services</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
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
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
  },
  backButton: {
    marginRight: 20,
  },
  content: {
    paddingHorizontal: 20,
    marginTop: 30,
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 20,
    textAlign: 'center',
  },
  nameText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 10,
  },
  greetingText: {
    fontSize: 16,
    color: '#757575',
    marginBottom: 20,
  },
  requestsContainer: {
    marginBottom: 30,
  },
  requestItem: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  requestText: {
    fontSize: 16,
    color: '#333333',
  },
  pastRequestsSection: {
    marginBottom: 20,
  },
  pastRequestsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 15,
  },
  pastRequestItem: {
    backgroundColor: "#FFFFFF",  // Ensure it's white
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  pastRequestText: {
    fontSize: 16,
    color: "#333333",  // Ensure the text is dark
    fontWeight: "500",
  },
  pastRequestTime: {
    fontSize: 14,
    color: "#757575",
  },
  bottomNavigation: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#FFFFFF',
    paddingVertical: 15,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  navItem: {
    alignItems: 'center',
  },
  navText: {
    fontSize: 12,
    color: '#BDBDBD',
    marginTop: 5,
  },
  submitButton: {
    backgroundColor: '#6759FF',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
    marginHorizontal: 20,
  },
  submitButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
    searchContainer: {
    display: 'none'
  }
});

export default PatientDashboard;