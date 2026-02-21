import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "./logins.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

    try {
      const res = await axios.post(`${VITE_BACKEND_URL}/login`, {
        email,
        password,
      });

      console.log(res.data);

      // adjust based on your backend response
      if (res.data === "Success") {
        navigate("/home");
      } else {
        alert("Invalid email or password");
      }
    } catch (err) {
      console.log(err);
      alert("Login failed. Try again.");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
      <div className="bg-white p-3 rounded w-25">
        <h2>Login</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label><strong>Email</strong></label>
            <input
              type="email"
              placeholder="Enter email"
              className="form-control rounded-0"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label><strong>Password</strong></label>
            <input
              type="password"
              placeholder="Enter password"
              className="form-control rounded-0"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* submit button */}
          <button type="submit" className="btn btn-success w-100 rounded-0">
            Login
          </button>
        </form>

        <p className="mt-3">Don't have an account?</p>

        <Link
          to="/register"
          className="btn btn-default border w-100 bg-light rounded-0 text-decoration-none"
        >
          Signup
        </Link>
      </div>
    </div>
  );
}

export default Login;