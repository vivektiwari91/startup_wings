import React, { useState } from "react";
import { X, Eye, EyeOff, Mail, Lock, User } from "lucide-react";
import "./css/authmodal.css";

const AuthModal = ({ isOpen, onClose, onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  if (!isOpen) return null;

  const API_BASE_URL = "http://localhost:5000/api";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    
    // Client-side validation
    if (!isLogin && formData.password !== formData.confirmPassword) {
      setError("Passwords don't match!");
      setLoading(false);
      return;
    }

    try {
      const endpoint = isLogin ? "/auth/login" : "/auth/register";
      const payload = isLogin 
        ? { email: formData.email, password: formData.password }
        : { 
            name: formData.name, 
            email: formData.email, 
            password: formData.password, 
            confirmPassword: formData.confirmPassword
          };

      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (data.success) {
        // Store JWT token in localStorage
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        
        // Success message
        alert(isLogin 
          ? `Welcome back, ${data.user.name}!` 
          : `Account created successfully! Welcome, ${data.user.name}!`
        );
        
        // Reset form and close modal
        setFormData({
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
        });
        
        // Call the onLogin callback to update parent state
        if (onLogin) {
          onLogin(data.user);
        }
        
        onClose();
      } else {
        // Handle API errors
        setError(data.message || "Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Auth error:", error);
      setError("Network error. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    
    // Clear error when user starts typing
    if (error) setError("");
  };

  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
    setError("");
    setFormData({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
  };

  return (
    <div className="auth-overlay">
      <div className="auth-backdrop" onClick={onClose}></div>

      <div className="auth-card">
        {/* Header */}
        <div className="auth-header">
          <h2>{isLogin ? "Welcome back" : "Create account"}</h2>
          <button className="close-btn" onClick={onClose} disabled={loading}>
            <X size={18} />
          </button>
        </div>
        <p className="auth-description">
          {isLogin
            ? "Sign in to your account to continue"
            : "Get started with your startup journey"}
        </p>

        {/* Error Message - Updated to use CSS classes */}
        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="auth-form">
          {!isLogin && (
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <div className="input-wrapper">
                <User className="input-icon" size={16} />
                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required={!isLogin}
                  disabled={loading}
                />
              </div>
            </div>
          )}

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <div className="input-wrapper">
              <Mail className="input-icon" size={16} />
              <input
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleInputChange}
                required
                disabled={loading}
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div className="input-wrapper">
              <Lock className="input-icon" size={16} />
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleInputChange}
                required
                disabled={loading}
                minLength={6}
              />
              <button
                type="button"
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
                disabled={loading}
              >
                {showPassword ? (
                  <EyeOff size={16} />
                ) : (
                  <Eye size={16} />
                )}
              </button>
            </div>
          </div>

          {!isLogin && (
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <div className="input-wrapper">
                <Lock className="input-icon" size={16} />
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  required={!isLogin}
                  disabled={loading}
                  minLength={6}
                />
                <button
                  type="button"
                  className="toggle-password"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  disabled={loading}
                >
                  {showConfirmPassword ? (
                    <EyeOff size={16} />
                  ) : (
                    <Eye size={16} />
                  )}
                </button>
              </div>
            </div>
          )}

          {/* Updated button to use CSS loading class */}
          <button 
            type="submit" 
            className={`auth-btn ${loading ? 'loading' : ''}`}
            disabled={loading}
          >
            {loading 
              ? (isLogin ? "Signing In..." : "Creating Account...") 
              : (isLogin ? "Sign In" : "Create Account")
            }
          </button>
        </form>

        {/* Toggle */}
        <div className="auth-toggle">
          <p>
            {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
            <button 
              type="button" 
              onClick={toggleAuthMode}
              disabled={loading}
            >
              {isLogin ? "Sign up" : "Sign in"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;