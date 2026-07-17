import { useState } from "react";
import { useNavigate, useLocation, NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

import { loginUser } from "../service/authService";
import { useAuth } from "../context/AuthContext";

import BackGroundImage from "../../assets/background-green-book.png";

export default function Login() {
  const { login, loading } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const from = location.state?.from?.pathname || "/home";

    try {
      const data = await loginUser({ email, password });
      const user = data.auth_info.user;
      const token = data.auth_info.auth_token;

      login(user, token);
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.message);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="login-wrapper">
      {/* <img src={BackGroundImage} className="login-img"/> */}
    <form onSubmit={handleSubmit}>
      <div className="login-container">
        <div className="message-wrapper">
          <h2 className="log-title">Welcome to HabitSpark</h2>
          <div className="log-message-wrapper">
            <h3 className="log-message">Build small habits</h3>
            <h3 className="log-message"> Grow every day</h3>
          </div>
        </div>
        <div className="log-wrapper">
          <div className="login-input-wrapper">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <div>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              <FontAwesomeIcon
                icon={showPassword ? faEye: faEyeSlash}
                onClick={togglePasswordVisibility}
                className="eye-wrapper"
                title={showPassword ? "Hide password" : "Show password"}
              />
            </div>
            <button className="submit-button" type="submit">
              Login
            </button>
          </div>

          {error && <p className="error">{error}</p>}

          <NavLink className="navlink-create-user" to={"/create-account"}>
            Create an account
          </NavLink>
        </div>
      </div>
    </form>
    </div>
  );
}
