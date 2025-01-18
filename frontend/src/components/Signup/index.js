import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./index.css";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  console.log(password);

  const navigate = useNavigate();

  const onSubmitSignupForm = async (e) => {
    e.preventDefault();

    try {
      const apiUrl = "https://delhi-digits-1.onrender.com/auth/signup";
      const response = await axios.post(
        apiUrl,
        { username, email, password },
        {
          headers: {
            "Content-Type": "application/json", // Ensure JSON format
          },
        }
      );
      console.log(response);
      if (response.status === 201) {
        alert("User Registration Successful");
        navigate("/login");
      }
    } catch (error) {
      console.log(error.response.data.message);
      setUsername("");
      setPassword("");
      setEmail("");
      alert(error.response.data.message);
    }
  };

  return (
    <div className="Login">
      <form className="form-container" onSubmit={onSubmitSignupForm}>
        <h1>Signup</h1>
        <div className="input-container">
          <label>Username</label>
          <input
            type="text"
            placeholder="Enter Username"
            required
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className="input-container">
          <label>Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="input-container">
          <label>Password</label>
          <input
            type="password"
            placeholder="Enter your Password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button className="login-button" type="submit">
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignUp;
