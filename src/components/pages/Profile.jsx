import { useContext } from "react";
import { useAuth } from "../context/AuthContext";

import "react-toastify/dist/ReactToastify.css";

export default function Profile() {
  const { user, logout } = useAuth;

  return (
    <div className="profile-wrapper">
      <p>{user?.username}</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
}
