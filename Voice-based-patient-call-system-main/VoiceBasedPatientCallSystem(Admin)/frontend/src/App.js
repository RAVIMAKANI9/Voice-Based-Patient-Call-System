
import { BrowserRouter as Router, Routes, Route, Navigate,useNavigate } from "react-router-dom"; 
import { useState, useEffect } from "react";
import { Layout} from "antd";
import HomeScreen from './pages/HomeScreen';
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Nurses from "./pages/Nurses";
import NewNurse from "./pages/NewNurse";
import NurseRecords from "./pages/NurseRecords";
import Patients from "./pages/Patients";
import NewPatient from "./pages/NewPatient";
import PatientRecords from "./pages/PatientRecords";
import Statistics from "./pages/Statistics";
import AdminAlerts from "./pages/AdminAlerts";

const { Content } = Layout;

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const storedAuth = localStorage.getItem("isAuthenticated")=== "true";
        if (storedAuth !== isAuthenticated) {
          setIsAuthenticated(storedAuth);
        }
    }, [isAuthenticated]);

    const setAuth = (auth) => {
        setIsAuthenticated(auth);
        localStorage.setItem("isAuthenticated", auth);
    };

    return (
        <Router>
            <AppContent isAuthenticated={isAuthenticated} setAuth={setAuth} />
        </Router>
    );
}

function AppContent({ isAuthenticated, setAuth }) {
    const navigate = useNavigate(); 

    const handleLogout = () => {
        localStorage.removeItem("token");
        setAuth(false);  
    navigate("/login");
    };

    return (
        <Layout 
        style={{ minHeight: "100vh" }}>
            <Layout>
                <Content style={{ padding: "20px" }}>
                    <Routes>
                        <Route path="/" element={<HomeScreen />} />
                        <Route path="/login" element={<Login setAuth={setAuth} />} />
                        <Route path="/dashboard" element={isAuthenticated ? <Dashboard handleLogout={handleLogout} /> : <Navigate to="/login" />} />
                        <Route path="/logout" element={isAuthenticated ? <Navigate to="/" replace={true} /> : <Navigate to="/login" replace={true} />} />
                        <Route path="/patients" element={isAuthenticated ? <Patients /> : <Navigate to="/login" />} />
                        <Route path="/patients/new" element={isAuthenticated ? <NewPatient /> : <Navigate to="/login" />} />
                        <Route path="/patients/records" element={isAuthenticated ? <PatientRecords /> : <Navigate to="/login" />} />
                        <Route path="/nurses" element={isAuthenticated ? <Nurses /> : <Navigate to="/login" />} />
                        <Route path="/nurses/new" element={isAuthenticated ? <NewNurse /> : <Navigate to="/login" />} />
                        <Route path="/nurses/records" element={isAuthenticated ? <NurseRecords /> : <Navigate to="/login" />} />
                        <Route path="/statistics" element={isAuthenticated ? <Statistics /> : <Navigate to="/login" />} />
                        <Route path="/alerts" element={isAuthenticated ? <AdminAlerts /> : <Navigate to="/login" />} />
                    </Routes>
                </Content>
            </Layout>
        </Layout>
    );
}

export default App;
