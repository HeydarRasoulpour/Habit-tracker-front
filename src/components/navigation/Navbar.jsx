import { NavLink } from "react-router-dom";
import { useState } from "react";
import logo from "../../assets/logo.png";
import { useAuth } from "../context/AuthContext";


export default function Navbar() {
  const { logout, user } = useAuth();
  const [isSelected, setIsSelected] = useState(null);

  return (
    <div className="navbar-cantainer">
      <div className="navbar-wrapper">
        <NavLink className=" nav-logo" to="/home">
          <h1>
            <img
              src={logo}
              alt="Habit Traker's Logo"
              style={{ width: "25px" }}
            />
            HabitSpark
          </h1>
        </NavLink>
        <div className="side-bar-wrapper">
          <div className="usr-icon">
            <span>{user?.first_name[0]}{user?.last_name[0]}</span>
          </div>
          <p className="user-name">Hello {user?.username}</p>
        </div>

        <NavLink
          className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
          to="/addHabit"
        >
          Add New Habit
        </NavLink>

        <NavLink
          className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
          to="/habits"
        >
          View Habits
        </NavLink>

        <NavLink
          className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
          to="/habit-tracker"
        >
          HabitTracker
        </NavLink>

        <NavLink
          className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
          to="/completed"
        >
          Completed Habits
        </NavLink>
      
          <div className="nav-link log-out" onClick={logout}>
            Logout
          </div>
      </div>
    </div>
  );
}
