import React, { useState } from "react";
import { X, Eye, EyeOff, Mail, Lock, User } from "lucide-react";
import "./css/authmodal.css";

const AuthModal = ({ isOpen, onClose }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    onClose();
  };

  const handleInputChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="auth-overlay">
      <div className="auth-backdrop" onClick={onClose}></div>

      <div className="auth-card">
        {/* Header */}
        <div className="auth-header">
          <h2>{isLogin ? "Welcome back" : "Create account"}</h2>
          <button className="close-btn" onClick={onClose}>
            <X size={18} />
          </button>
        </div>
        <p className="auth-description">
          {isLogin
            ? "Sign in to your account to continue"
            : "Get started with your startup journey"}
        </p>

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
              />
              <button
                type="button"
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff size={16} />
                ) : (
                  <Eye size={16} />
                )}
              </button>
            </div>
          </div>

          <button type="submit" className="auth-btn">
            {isLogin ? "Sign In" : "Create Account"}
          </button>
        </form>

        {/* Toggle */}
        <div className="auth-toggle">
          <p>
            {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
            <button type="button" onClick={() => setIsLogin(!isLogin)}>
              {isLogin ? "Sign up" : "Sign in"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
