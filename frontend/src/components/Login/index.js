import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

const Login = () => {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const navigate = useNavigate();

  const onSubmitForm = async (event) => {
    event.preventDefault();
    try {
      const apiUrl = "https://delhi-digits-1.onrender.com/auth/login";
      const response = await axios.post(
        apiUrl,
        {
          email: loginEmail,
          password: loginPassword,
        },
        {
          headers: {
            "Content-Type": "application/json", // Ensure JSON format
          },
        }
      );
      if (response.status === 200) {
        Cookies.set("jwtToken", response.data.token, { expires: 7 });
        navigate("/");
      }
    } catch (error) {
      alert("Invalid Email or Password");
    }
  };

  return (
    <div className="Login">
      <form className="form-container" onSubmit={onSubmitForm}>
        <h1>Login</h1>

        <div className="input-container">
          <label>Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            required
            onChange={(e) => setLoginEmail(e.target.value)}
          />
        </div>
        <div className="input-container">
          <label>Password</label>
          <input
            type="password"
            placeholder="Enter your Password"
            required
            onChange={(e) => setLoginPassword(e.target.value)}
          />
        </div>
        <button className="login-button">Login</button>
      </form>
    </div>
  );
};

export default Login;
