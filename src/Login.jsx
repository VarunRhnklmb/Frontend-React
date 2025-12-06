import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { LoginUser } from "./store";
import { ToastContainer, toast } from "react-toastify";
import "./Login.css";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, user } = useSelector((state) => state.Login);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  

  const submitLogin = (data) => {
    dispatch(LoginUser(data))
      .unwrap()
      .then(() => {
        toast.success("Login Successful 🔐", {
        position: "top-center",
        theme: "dark",
});
        reset();
        setTimeout(() => {
        navigate("/Home");
      }, 1800); 
      })
      .catch(() => {
        toast.error("Invalid Email or Password");
      });
  };

  // ✅ LOGOUT HANDLER
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userData");
    toast.info("Logged out successfully 🔓", {
    position: "top-center",
    theme: "dark",
});
    setTimeout(() => {
    window.location.reload();
  }, 2000);
};

  return (
    <div className="login-wrapper">

      {/* LOGIN CARD */}
      <div className="login-box">
        {user && (
            <p className="text-success text-center mt-2">
             🎉 Welcome, {user.user.name}!
            </p>
          )}
        <h2 className="text-center mb-3" style={{ color: "#1b5e20" }}>
          Login to FreshMart
        </h2>

        <form onSubmit={handleSubmit(submitLogin)}>
          <input
            type="email"
            placeholder="Enter Email"
            className="login-input"
            {...register("email", { required: "Email is required" })}
          />
          {errors.email && <p className="error">{errors.email.message}</p>}

          <input
            type="password"
            placeholder="Enter Password"
            className="login-input"
            {...register("password", { required: "Password required" })}
          />
          {errors.password && <p className="error">{errors.password.message}</p>}

          <button
            className="btn primary"
            type="submit"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          {error && <p className="error text-center mt-2">{error}</p>}

          
        </form>

        {/* ✅ LOGOUT BUTTON */}
        <button
          className="btn logout-btn"
          onClick={handleLogout}
          disabled={!user}
        >
          Logout
        </button>
      </div>

      {/* FOOTER */}
      <div className="footer-section">
        <h3>About FreshMart</h3>
        <p>Fresh groceries delivered to your home.</p>
        <p className="copyright">© 2025 FreshMart. All rights reserved.</p>
      </div>

      <ToastContainer />
    </div>
  );
}

export default Login;
