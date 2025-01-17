import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const onSubmitForm = async (event) => {
    event.preventDefault();
    try {
      const apiUrl = "https://delhi-digits-1.onrender.com/auth/login";
      const response = await axios.post(
        apiUrl,
        {
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json", // Ensure JSON format
          },
        }
      );
      console.log(response.data.token);
      if (response.status === 200) {
        const token = response.data.token;
        Cookies.set("jwtToken", token, { expires: 7 });
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
        <button className="login-button">Login</button>
      </form>
    </div>
  );
};

export default Login;
