import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "./store.js";
import "./App.css";
import "./Registration.css";
import { useNavigate } from "react-router-dom"; 

function Registration() {
  const dispatch = useDispatch();
   const navigate = useNavigate();
  const { loading, success, error } = useSelector((state) => state.registration);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
  });

  const [errors, setErrors] = useState({
    password: "",
    phone: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Special handling for phone input → allow only digits
    if (name === "phone") {
      const cleaned = value.replace(/\D/g, ""); // remove non-numbers
      if (cleaned.length <= 10) {
        setFormData({ ...formData, phone: cleaned });
        setErrors({ ...errors, phone: "" });
      }
      return;
    }

    // Normal handling for other fields
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let newErrors = {};

    // 🔐 Password validation
    if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
    }

    // 📱 Phone number validation
    if (formData.phone.length < 10) {
      newErrors.phone = "Please enter a valid 10-digit mobile number.";
    }

    // if errors exist, stop submit
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    dispatch(registerUser(formData));
  };

  return (
    <div className="reg-container">
      <div className="reg-card">
        <p className="reg-subtext">
        Sign up and log in to see all products.</p>
        <h2 className="reg-title">Create Your Account 🎉</h2>

        <form onSubmit={handleSubmit} className="reg-form">

          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Create Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          {errors.password && <p className="error-msg">{errors.password}</p>}

          {/* ✅ Updated Mobile Number Input */}
          <input
            type="text"
            name="phone"
            placeholder="Mobile Number"
            value={formData.phone}
            onChange={handleChange}
            required
          />
          {errors.phone && <p className="error-msg">{errors.phone}</p>}

          <button className="reg-btn" type="submit" disabled={loading}>
            {loading ? "Signing up..." : "Sign Up"}
          </button>
        </form>
        
        {/* ✅ Login Button */}
        <p className="login-text">
            Already have an account?{" "}
           <button
              className="login-btn"
              onClick={() => navigate("/login")}
              >Login</button>
       </p>

        {success && <p className="success-msg">Registration Successful! 🎉</p>}
        {error && <p className="error-msg">{error}</p>}
      </div>
      <div className="footer-section">
        <h3>About FreshMart</h3>
        <p>Fresh groceries delivered to your home.</p>
        <p className="copyright">© 2025 FreshMart. All rights reserved.</p>
      </div>
    </div>
  );
}

export default Registration;
