import { useState } from "react";
import { registerUser } from "@/service/userService";
import { useNavigate, NavLink } from "react-router-dom";

const CreateAccount = () => {
  const [formData, setFormData] = useState({
    first_name:"",
    last_name:"",
    username: "",
    email: "",
    phone: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      first_name: formData.first_name,
      last_name: formData.last_name,
      username: formData.username,
      email: formData.email,
      phone: formData.phone,
      password: formData.password,
    };
    try {
      const data = await registerUser(payload);
      navigate("/login");
    } catch (error) {
      console.error("Unable to create user", error);
    }
  };

  return (
    <div className="create-account-container">
      <h2 className="create-account">Create Account</h2>

      <form onSubmit={handleSubmit}>
       
        <label htmlFor="first_name">First Name</label>
        <input
          type="text"
          name="first_name"
          placeholder="First Name"
          value={formData.first_name}
          onChange={handleChange}
          required
        />
        <label htmlFor="last_name">Last Name</label>
        <input
          type="text"
          name="last_name"
          placeholder="Last Name"
          value={formData.last_name}
          onChange={handleChange}
          required
        />
         <label htmlFor="username">Username</label>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          required
        />

        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <label htmlFor="phone">Phone</label>
        <input
          type="tel"
          name="phone"
          placeholder="Phone"
          value={formData.phone}
          onChange={handleChange}
          required
        />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <button className="submit-button" type="submit">
          Create Account
        </button>
        <NavLink className="navlink-create-user" to={"/login"}>
          Back to login
        </NavLink>
      </form>
    </div>
  );
};

export default CreateAccount;
