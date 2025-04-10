// App.jsx (with router)
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './pages/Login.jsx'
import Register from "./pages/Register.jsx";
import StudentDashboard from '../src/pages/StudentDashboard.jsx'
import AdminDashboard from '../src/pages/AdminDashboard.jsx'
import CreateEvent from "./pages/CreateEvent.jsx"
import Navbar from "./components/Navbar.jsx";


function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/student/dashboard" element={<StudentDashboard />}/>
        <Route path="/admin/dashboard"element={<AdminDashboard />}/>
        <Route  path="/admin/create-event"element={<CreateEvent />}/>
      </Routes>
    </Router>
  );
}


export default App;
