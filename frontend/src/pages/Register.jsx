import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Leaf
} from "lucide-react";

import { useAuth } from "../context/AuthContext";

export default function Register() {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const [showPassword, setShowPassword] =
    useState(false);

  const [showConfirm, setShowConfirm] =
    useState(false);

  const [error, setError] = useState("");
  const [loading, setLoading] =
    useState(false);

  const updateField = (field, value) => {
    setForm((prev) => ({
      ...prev,
      [field]: value
    }));
  };

  const passwordValid =
    form.password.length >= 8 &&
    /[A-Z]/.test(form.password) &&
    /[a-z]/.test(form.password) &&
    /\d/.test(form.password) &&
    /[^A-Za-z0-9]/.test(form.password);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    if (
      !form.name ||
      !form.email ||
      !form.password ||
      !form.confirmPassword
    ) {
      setError(
        "Please fill all required fields."
      );
      return;
    }

    if (!passwordValid) {
      setError(
        "Password must contain 8+ characters, uppercase, lowercase, number and special character."
      );
      return;
    }

    if (
      form.password !==
      form.confirmPassword
    ) {
      setError(
        "Passwords do not match."
      );
      return;
    }

    try {
      setLoading(true);

      await register({
        name: form.name,
        email: form.email,
        password: form.password
      });

      navigate("/dashboard");
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Registration failed."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-visual register-visual">
        <div className="auth-visual-overlay">
          <div className="auth-brand">
            <Leaf size={28} />
            <span>CropShield AI</span>
          </div>

          <div className="auth-message">
            <h1>
              Build a
              <br />
              Smarter Farm.
            </h1>

            <p>
              Bring crop monitoring, environmental
              intelligence and actionable insights
              together in one platform.
            </p>
          </div>

          <div className="auth-features">
            <span>📊 Farm Analytics</span>
            <span>🔍 Disease Detection</span>
            <span>🌦 Weather Intelligence</span>
          </div>
        </div>
      </div>

      <div className="auth-form-area">
        <div className="auth-card">
          <div className="mobile-brand">
            <Leaf size={24} />
            CropShield AI
          </div>

          <h2>Create your account</h2>

          <p className="auth-subtitle">
            Start managing your farm intelligently.
          </p>

          {error && (
            <div className="error-message">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <label>Full Name</label>

            <div className="input-wrapper">
              <User size={18} />

              <input
                type="text"
                placeholder="Your name"
                value={form.name}
                onChange={(e) =>
                  updateField(
                    "name",
                    e.target.value
                  )
                }
              />
            </div>

            <label>Email Address</label>

            <div className="input-wrapper">
              <Mail size={18} />

              <input
                type="email"
                placeholder="farmer@example.com"
                value={form.email}
                onChange={(e) =>
                  updateField(
                    "email",
                    e.target.value
                  )
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
                placeholder="Create password"
                value={form.password}
                onChange={(e) =>
                  updateField(
                    "password",
                    e.target.value
                  )
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

            <div className="password-hint">
              8+ chars • uppercase • lowercase •
              number • special character
            </div>

            <label>Confirm Password</label>

            <div className="input-wrapper">
              <Lock size={18} />

              <input
                type={
                  showConfirm
                    ? "text"
                    : "password"
                }
                placeholder="Confirm password"
                value={form.confirmPassword}
                onChange={(e) =>
                  updateField(
                    "confirmPassword",
                    e.target.value
                  )
                }
              />

              <button
                type="button"
                className="password-toggle"
                onClick={() =>
                  setShowConfirm(
                    !showConfirm
                  )
                }
              >
                {showConfirm ? (
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
                ? "Creating account..."
                : "Create Account"}
            </button>
          </form>

          <div className="auth-footer">
            Already have an account?
            <Link to="/login">
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}