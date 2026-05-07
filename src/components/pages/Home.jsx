import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

import logo from "../../assets/logo.png";
import userIcon from "../../assets/user-Icon.svg";
import { useAuth } from "../context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faPlus} from "@fortawesome/free-solid-svg-icons";

import Habits from "./Habits";
import { Clock } from "../helper/Clock";

export default function Home() {
  const { logout, user } = useAuth();
  const [isSelected, setIsSelected] = useState(null);
  
  return (
    <div className="home-page-cantainer">
      <div className="home-content-wrapper">
        <div className="title-wrapper">
          <NavLink className=" nav-link" to="/home">
            
            <img
              src={logo}
              alt="Habit Traker's Logo"
              style={{ width: "40px", height: "40px" }}
            />
            <h1 className="habit-spark-title">HabitSpark</h1>
            
          </NavLink>
        </div>
        <div className="user-wrapper">
          <div className="user-icon">
            <span>{user?.first_name[0]}{user?.last_name[0]}</span>
          </div>
          <p className="user-name">Hello {user?.username}</p>
        </div>
        <div className="midd-section-wrapper">

          <div className="add-habit-wrapper">
            <NavLink
              className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
              to="/addHabit"
              >
              <p className="add-habit-title">

              <FontAwesomeIcon icon={faPlus} style={{color: "rgb(255, 255, 253)",}} />
              Habit
              </p>
            </NavLink>
          </div>
          <div>
            <Clock/>
          </div>
          <div className="habits-wrapper">
            <NavLink
              className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
              to="/habits"
            >
              <p className="habits">

              Habits
              </p>
            </NavLink>
          </div>
        </div>

       
        
      </div>
    </div>
  );
}
