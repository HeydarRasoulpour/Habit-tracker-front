// This code is for login and logout in a React app.
// It creates a shared place where the app remembers:
// Who is logged in
// Their login token
// How to log in
// How to log out
// So any page in the app can know if the user is logged in.
import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// These are React tools:
// useState → stores data (like variables)
// createContext → creates a global storage
// useContext → lets you read that global storage

const AuthContext = createContext();
// the global storage that we create and give it the name AuthContext.Think of this like a global box
// You can put login info in it and any component can open the box.

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const savedToken = localStorage.getItem("authToken");
    const savedUser = localStorage.getItem("authUser");
    if (savedToken && savedUser) {
      setToken(savedToken);
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  // useEffect(() => {
  //   const storedToken = localStorage.getItem("authToken");
  //   if (storedToken) {
  //     setToken(storedToken);
  //   }
  // }, []);

  const login = (user, token) => {
    setToken(token);
    setUser(user);
    localStorage.setItem("authToken", token);
    localStorage.setItem("authUser", JSON.stringify(user))
    navigate("/home");
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("authToken",token);
    localStorage.removeItem("authUser");
    navigate("/login");
  };

  return (
    // AuthContext: This is the Context Provider created above earlie
    // This line is providing authentication data and functions to the rest of your app using React Context.
    // The(Provider) Provider’s job is to share data globally with any component wrapped inside it.
    // Value: This object is what you’re sharing with the app. Any component inside this provider can access these without prop drilling.
    <AuthContext.Provider value={{ user, token, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
    // {children} : This represents all components wrapped by AuthProvider its acte as a place holder
  );
};

export const useAuth = () => useContext(AuthContext);
