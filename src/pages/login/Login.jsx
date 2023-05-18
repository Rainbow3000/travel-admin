import React, { useState } from "react";
import "./login.scss";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isError, setIsError] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault(); 
    try {
      const response = await axios.post(
        "http://localhost:8080/api/v1/auth/login",
        {
          email,
          password,
        }
      );

      if (response.data?.message === "SUCCESS") {
        localStorage.setItem("user", JSON.stringify(response.data?.data));
        setEmail("");
        setPassword("");
        navigate("/");
      } else {
        setIsError(true);
      }
    } catch (error) {}
  };

  return (
    <div className="login-container" onSubmit={handleSubmit}>
      <form action="">
        <h1>ADMIN LOGIN</h1>
        {isError && (
          <span style={{ color: "red" }}>
            Tài khoản hoặc mật khẩu không chính xác
          </span>
        )}
        <input
          value={email}
          type="text"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          value={password}
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
