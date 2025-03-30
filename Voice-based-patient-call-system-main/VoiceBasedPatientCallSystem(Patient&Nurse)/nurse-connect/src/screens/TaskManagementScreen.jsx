import React, { useState,useEffect } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity,ScrollView } from "react-native";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import * as SecureStore from 'expo-secure-store';
import axios from 'axios';


const GET_API_URL = "http://192.168.20.7:3000/api/nurse/getPatientRequests";
const UPDATE_API_URL = "http://192.168.20.7:3000/api/nurse/updatePatientRequests";

const TaskManagementScreen = () => {
  const [tasks, setTasks] = useState([]);
  const [username, setUsername] = useState("");

  useEffect(() => {

    const fetchTasks = async () => {
      try {

        const token = await SecureStore.getItemAsync("JWTToken");
        const response = await axios.get(GET_API_URL, {headers: { Authorization: `Bearer ${token}` }});
        setTasks(response.data);

        const name = SecureStore.getItemAsync("userName");
        setUsername(name);
      } 
      catch (error) 
      {
        console.error("Error fetching tasks:", error);
      }
    };
    fetchTasks();
  }, []);

  const toggleTask = async (taskId, currentStatus) => {
    let newStatus;
    if (currentStatus === "pending") {
      newStatus = "inProgress";
    } else if (currentStatus === "inProgress") {
      newStatus = "completed";
    }
    
    try {
      const token = await SecureStore.getItemAsync("JWTToken");
      await axios.put(UPDATE_API_URL, { requestId: taskId, status: newStatus }, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setTasks(tasks.map(task =>
        task._id === taskId ? { ...task, status: newStatus } : task
      ));
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const pendingTasks = tasks.filter(task => task.status === "pending");
  const inProgressTasks = tasks.filter(task => task.status === "inProgress");
  const completedTasks = tasks.filter(task => task.status === "completed");
 
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Tasks Status</Text>
        <Image source={require("../assets/profile-image.jpg")} style={styles.profileImage} />
      </View>
      <Text style={styles.welcomeText}>Welcome back, {username}</Text>
      <View style={styles.statusContainer}>
        <View style={styles.statusBox}>
          <FontAwesome name="clock-o" size={24} color="#4359d0" />
          <Text style={styles.statusText}>Pending - {pendingTasks.length}</Text>
        </View>
        <View style={styles.statusBox}>
          <FontAwesome name="arrow-right" size={24} color="#4359d0" />
          <Text style={styles.statusText}>In-progress - {inProgressTasks.length}</Text>
        </View>
        <View style={styles.statusBox}>
          <FontAwesome name="check-circle-o" size={24} color="#4359d0" />
          <Text style={styles.statusText}>Completed - {completedTasks.length}</Text>
        </View>
      </View>
      <ScrollView>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Pending Tasks</Text>
          {pendingTasks.map((task) => (
            <TouchableOpacity
              key={task._id}
              style={styles.taskRow}
              onPress={() => toggleTask(task._id, task.status)}
            >
              <FontAwesome name="square-o" size={22} color="#4359d0" />
              <Text style={styles.taskText}>{task.request}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>In-progress Tasks</Text>
          {inProgressTasks.map((task) => (
            <TouchableOpacity
              key={task._id}
              style={styles.taskRow}
              onPress={() => toggleTask(task._id, task.status)}
            >
              <FontAwesome name="arrow-right" size={22} color="#4359d0" />
              <Text style={styles.taskText}>{task.request}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Completed Tasks</Text>
          {completedTasks.map((task) => (
            <View style={styles.taskRow} key={task._id}>
              <FontAwesome name="check-circle" size={22} color="green" />
              <Text style={styles.completedTaskText}>
                {task.request}
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );



};
// const TaskManagementScreen = () => {
//   // Task Lists with State for Checkboxes
//   const username = SecureStore.getItemAsync("userName");
//   const [pendingTasks, setPendingTasks] = useState([
//     { id: 1, text: "Administer medication at 2 PM", checked: false },
//     { id: 2, text: "Prepare for patient discharge at 3 PM", checked: false },
//     { id: 3, text: "Check blood levels for patient in 305", checked: false },
//   ]);

//   const [inProgressTasks, setInProgressTasks] = useState([
//     { id: 4, text: "Monitoring vital signs for Room 301.", checked: false },
//     { id: 5, text: "Setting up IV for Patient 302.", checked: false },
//     { id: 6, text: "Assisting Patient 303 with mobility.", checked: false },
//   ]);

//   const completedTasks = ["Patient discharge for Room 304"];

//   // Function to toggle task completion
//   const toggleTask = (taskId, category) => {
//     if (category === "pending") {
//       setPendingTasks((prevTasks) =>
//         prevTasks.map((task) =>
//           task.id === taskId ? { ...task, checked: !task.checked } : task
//         )
//       );
//     } else if (category === "inProgress") {
//       setInProgressTasks((prevTasks) =>
//         prevTasks.map((task) =>
//           task.id === taskId ? { ...task, checked: !task.checked } : task
//         )
//       );
//     }
//   };

//   return (
//     <View style={styles.container}>

      
//       {/* Header */}
//       <View style={styles.header}>
//         <Text style={styles.title}>Tasks Status</Text>
//         <Image
//           source={require("../assets/profile-image.jpg")}
//           style={styles.profileImage}
//         />
//       </View>

//       {/* Welcome Text */}
//       <Text style={styles.welcomeText}>Welcome back, {username}</Text>

//       {/* Task Status Overview */}
//       <View style={styles.statusContainer}>
//         <View style={styles.statusBox}>
//           <FontAwesome name="clock-o" size={24} color="#4359d0" />
//           <Text style={styles.statusText}>Pending {pendingTasks.length}</Text>
//         </View>
//         <View style={styles.statusBox}>
//           <FontAwesome name="arrow-right" size={24} color="#4359d0" />
//           <Text style={styles.statusText}>
//             In-progress {inProgressTasks.length}
//           </Text>
//         </View>
//         <View style={styles.statusBox}>
//           <FontAwesome name="check-circle-o" size={24} color="#4359d0" />
//           <Text style={styles.statusText}>
//             Completed {completedTasks.length}
//           </Text>
//         </View>
//       </View>


//       <ScrollView>
//       {/* Pending Tasks Section */}
//       <View style={styles.section}>
     
//         <Text style={styles.sectionTitle}>Pending Tasks</Text>
//         {pendingTasks.map((task) => (
//           <TouchableOpacity
//             key={task.id}
//             style={styles.taskRow}
//             onPress={() => toggleTask(task.id, "pending")}
//           >
//             <FontAwesome
//               name={task.checked ? "check-square" : "square-o"}
//               size={22}
//               color="#4359d0"
//             />
//             <Text style={[styles.taskText, task.checked && styles.checkedText]}>
//               {task.text}
//             </Text>
//           </TouchableOpacity>
//         ))}
//       </View>

//       {/* In-Progress Tasks Section */}
//       <View style={styles.section}>
//         <Text style={styles.sectionTitle}>In-progress Tasks</Text>
//         {inProgressTasks.map((task) => (
//           <TouchableOpacity
//             key={task.id}
//             style={styles.taskRow}
//             onPress={() => toggleTask(task.id, "inProgress")}
//           >
//             <FontAwesome
//               name={task.checked ? "check-square" : "square-o"}
//               size={22}
//               color="#4359d0"
//             />
//             <Text style={[styles.taskText, task.checked && styles.checkedText]}>
//               {task.text}
//             </Text>
//           </TouchableOpacity>
//         ))}
//       </View>

//       {/* Completed Tasks Section */}
//       <View style={styles.section}>
//         <Text style={styles.sectionTitle}>Completed Tasks</Text>
//         {completedTasks.map((task, index) => (
//           <Text style={styles.completedTaskText} key={index}>
//             ✔ {task}
//           </Text>
//         ))}
//       </View>
   
//       </ScrollView>   
            
     
     
//     </View>
   
//   );
// };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 36,
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
  welcomeText: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 36,
  },
  statusContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 40,
  },
  statusBox: {
    alignItems: "center",
  },
  statusText: {
    fontSize: 17,
    marginTop: 5,
  },
  section: {
    backgroundColor: "#EDEFFD",
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 18,
    color: "#383838",
  },
  taskRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  taskText: {
    fontSize: 17,
    marginLeft: 10,
    color: "#383838",
  },
  checkedText: {
    textDecorationLine: "line-through",
    color: "gray",
  },
  completedTaskText: {
    fontSize: 16,
    marginLeft: 10,
    color: "blue",
  },
});

export default TaskManagementScreen;
