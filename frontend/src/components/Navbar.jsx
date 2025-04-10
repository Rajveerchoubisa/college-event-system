import { Link, useNavigate } from "react-router-dom";
import {
  FaUserShield,
  FaPlusCircle,
  FaChalkboardTeacher,
  FaSignOutAlt,
  FaSignInAlt,
} from "react-icons/fa";

export default function Navbar() {
  const navigate = useNavigate();

const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user")); // ✅ parse user
  const role = user?.role;
  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <nav className="bg-gradient-to-r from-gray-400 to-gray-500 text-white px-5 py-3 shadow-md flex justify-between items-center">
      <div className="flex gap-6 items-center font-medium text-[17px]">
        {token && role === "admin" && (
          <>
            <Link
              to="/admin/dashboard"
              className="flex items-center gap-2 hover:text-yellow-300 transition duration-200"
            >
              <FaUserShield className="text-lg" />
              Admin Dashboard
            </Link>
            <Link
              to="/admin/create-event"
              className="flex items-center gap-2 hover:text-yellow-300 transition duration-200"
            >
              <FaPlusCircle className="text-lg" />
              Create Event
            </Link>
          </>
        )}
        {token && role === "student" && (
          <Link
            to="/student/dashboard"
            className="flex items-center gap-2 hover:text-yellow-300 transition duration-200"
          >
            <FaChalkboardTeacher className="text-lg" />
            Student Dashboard
          </Link>
        )}
      </div>

      <div>
        {token ? (
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-white hover:text-red-500 font-semibold px-4 py-2 rounded-lg transition duration-300 shadow-sm"
          >
            <FaSignOutAlt />
            Logout
          </button>
        ) : (
          <Link
            to="/"
            className="flex items-center gap-2 bg-white text-blue-700 hover:bg-blue-100 font-semibold px-4 py-2 rounded-lg transition duration-300 shadow-sm"
          >
            <FaSignInAlt />
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}

