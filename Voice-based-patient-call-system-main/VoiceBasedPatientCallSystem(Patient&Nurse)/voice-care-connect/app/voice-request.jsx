import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Audio } from 'expo-av';
import * as FileSystem from 'expo-file-system';

const BACKEND_URL = 'http://192.168.73.1:5000/api/voice-request';

const VoiceRequestPage = ({ setPage }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioFile, setAudioFile] = useState(null);
  const [recording, setRecording] = useState(null);
  const [errorMessage, setErrorMessage] = useState(""); // For failures only

  useEffect(() => {
    const requestPermissions = async () => {
      const { status } = await Audio.requestPermissionsAsync();
      if (status !== 'granted') {
        console.error("Permission to access microphone was denied");
      }
    };
    requestPermissions();
  }, []);

  const startRecording = async () => {
    try {
      console.log("Starting recording...");
      await Audio.setAudioModeAsync({ allowsRecordingIOS: true, playsInSilentModeIOS: true });
      const newRecording = new Audio.Recording();
      await newRecording.prepareToRecordAsync(Audio.RecordingOptionsPresets.HIGH_QUALITY);
      await newRecording.startAsync();
      setRecording(newRecording);
      setIsRecording(true);
      console.log("Recording started...");
    } catch (error) {
      console.error("Error starting recording:", error);
    }
  };

  const stopRecording = async () => {
    try {
      if (!recording) return;
      console.log("Stopping recording...");
      await recording.stopAndUnloadAsync();
      const uri = recording.getURI();
      console.log("Recording saved at:", uri);
      const newPath = FileSystem.documentDirectory + "voice_input.wav";
      await FileSystem.moveAsync({ from: uri, to: newPath });
      console.log("File moved to:", newPath);
      setAudioFile(newPath);
      setIsRecording(false);
      setRecording(null);
    } catch (error) {
      console.error("Error stopping recording:", error);
    }
  };

  const sendAudioToBackend = async () => {
    if (!audioFile) {
      console.error("No audio file to send");
      return;
    }

    console.log("Sending audio for transcription...");

    const formData = new FormData();
    formData.append("audio", { uri: audioFile, name: "voice_input.wav", type: "audio/wav" });

    try {
      const response = await fetch(`${BACKEND_URL}/transcribe`, {
        method: "POST",
        body: formData,
        headers: { "Accept": "application/json" },
      });

      const data = await response.json();
      console.log("Transcription received:", data);

      // ✅ Show pop-up for success
      Alert.alert("Request Accepted", "Your voice request has been successfully sent!", [
        { text: "OK", onPress: () => setAudioFile(null) } // Reset audio after closing popup
      ]);

    } catch (error) {
      console.error("Error processing audio:", error);
      setErrorMessage("❌ Failed to process request. Please try again.");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => setPage('patientDashboard')}>
          <Feather name="arrow-left" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Voice Request</Text>
      </View>

      <TouchableOpacity
        style={styles.voiceInputContainer}
        onPressIn={startRecording}
        onPressOut={stopRecording}
      >
        <Feather name="mic" size={60} color={isRecording ? "red" : "#6759FF"} />
        <Text style={styles.voiceInputText}>
          {isRecording ? "Recording..." : "Press & Hold to Speak"}
        </Text>
      </TouchableOpacity>

      {audioFile && (
        <>
          <TouchableOpacity style={styles.sendButton} onPress={sendAudioToBackend}>
            <Text style={styles.sendButtonText}>Send Audio</Text>
          </TouchableOpacity>

          {/* ❌ Error Message (Only shown when request fails) */}
          {errorMessage !== "" && <Text style={styles.errorMessage}>{errorMessage}</Text>}
        </>
      )}

      <View style={styles.bottomNavigation}>
        <TouchableOpacity style={styles.navItem} onPress={() => setPage('home')}>
          <Feather name="home" size={24} color="#BDBDBD" />
          <Text style={styles.navText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => setPage('voiceRequestPage')}>
          <Feather name="mic" size={24} color="#6759FF" />
          <Text style={styles.navText}>Voice Request</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => setPage('profilePage')}>
          <Feather name="user" size={24} color="#BDBDBD" />
          <Text style={styles.navText}>Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => setPage('services')}>
          <Feather name="grid" size={24} color="#BDBDBD" />
          <Text style={styles.navText}>Services</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F5F5F5',
    justifyContent: 'space-between',
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
    marginBottom: 20,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
  },
  backButton: {
    marginRight: 20,
  },
  voiceInputContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 15,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    flex: 1,
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  voiceInputText: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 10,
    color: '#333',
  },
  sendButton: {
    backgroundColor: '#6759FF',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    alignItems: 'center',
  },
  sendButtonText: {
    color: '#FFF',
    fontSize: 16,
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
});

export default VoiceRequestPage;