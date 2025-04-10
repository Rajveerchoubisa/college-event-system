// App.jsx (with router)
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './pages/Login.jsx'
import Register from "./pages/Register.jsx";
import StudentDashboard from '../src/pages/StudentDashboard.jsx'
import AdminDashboard from '../src/pages/AdminDashboard.jsx'
import CreateEvent from "./pages/CreateEvent.jsx"
import QRCodePage from "../src/pages/QRCodePage.jsx"


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/student/dashboard"
          element={
            <ProtectedRoute allowedRoles={["student"]}>
              <StudentDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
       <Route
          path="/admin/create-event"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <CreateEvent />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}


export default App;
