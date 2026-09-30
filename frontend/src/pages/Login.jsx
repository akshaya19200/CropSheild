import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  Leaf
} from "lucide-react";

import { useAuth } from "../context/AuthContext";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] =
    useState("");

  const [showPassword, setShowPassword] =
    useState(false);

  const [error, setError] = useState("");
  const [loading, setLoading] =
    useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    if (!email || !password) {
      setError(
        "Please enter your email and password."
      );
      return;
    }

    try {
      setLoading(true);

      await login(email, password);

      navigate("/dashboard");
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Login failed. Please check your credentials."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-visual">
        <div className="auth-visual-overlay">
          <div className="auth-brand">
            <Leaf size={28} />
            <span>CropShield AI</span>
          </div>

          <div className="auth-message">
            <h1>
              Smarter Farming.
              <br />
              Healthier Crops.
            </h1>

            <p>
              Monitor crop health, detect risks,
              optimize water usage and make
              data-driven farming decisions.
            </p>
          </div>

          <div className="auth-features">
            <span>🌱 Crop Intelligence</span>
            <span>💧 Smart Water Management</span>
            <span>☁ Weather Insights</span>
          </div>
        </div>
      </div>

      <div className="auth-form-area">
        <div className="auth-card">
          <div className="mobile-brand">
            <Leaf size={24} />
            CropShield AI
          </div>

          <h2>Welcome back</h2>

          <p className="auth-subtitle">
            Sign in to manage your smart farm.
          </p>

          {error && (
            <div className="error-message">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <label>Email Address</label>

            <div className="input-wrapper">
              <Mail size={18} />

              <input
                type="email"
                placeholder="farmer@example.com"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
              />
            </div>

            <label>Password</label>

            <div className="input-wrapper">
              <Lock size={18} />

              <input
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                placeholder="Enter password"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
              />

              <button
                type="button"
                className="password-toggle"
                onClick={() =>
                  setShowPassword(
                    !showPassword
                  )
                }
              >
                {showPassword ? (
                  <EyeOff size={18} />
                ) : (
                  <Eye size={18} />
                )}
              </button>
            </div>

            <button
              type="submit"
              className="primary-button full"
              disabled={loading}
            >
              {loading
                ? "Signing in..."
                : "Sign In"}
            </button>
          </form>

          <div className="auth-footer">
            Don't have an account?
            <Link to="/register">
              Create account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}