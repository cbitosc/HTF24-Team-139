import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import { jwtDecode } from 'jwt-decode';
import "./AuthStyles.css"
import Header from "../layout/Header";
import Footer from "../layout/Footer";

const Login = () => {
  const [message, setMessage] = useState("");
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await fetch("http://localhost:5000/login", {  // Updated port to 5000
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      let result;
      
      try {
        result = await response.json();
      } catch (error) {
        const text = await response.text();
        console.error("Response is not JSON:", text);
        setError("form", { type: "manual", message: "An error occurred: " + text });
        return;
      }

      if (response.ok) {
        setMessage("Login successful. Redirecting to dashboard...");

        // Store token and user data
        localStorage.setItem("token", result.token);
        const decodedToken = jwtDecode(result.token);
        const userId = decodedToken.userId;

        localStorage.setItem("userId", userId);
        
        // Store the user data directly from the login response
        localStorage.setItem("user", JSON.stringify(result.user));
        
        // Clear any session data
        sessionStorage.clear();

        // Navigate to dashboard
        navigate("/dashboard");
      } else {
        setError("form", { 
          type: "manual", 
          message: result.message || "Invalid email or password" 
        });
      }
    } catch (error) {
      console.error("There was an error!", error);
      setError("form", { 
        type: "manual", 
        message: "Server error. Please try again later." 
      });
    }
  };

  return (
    <>
    <Header/>
    <div className="Register">
      <div className="RLcard">
        <h1>Welcome back user!</h1>
        <h3>
          Don't have an account yet? <Link to="/signup">Sign-up!</Link>
        </h3>

        <form onSubmit={handleSubmit(onSubmit)}>
          <ul className="registerform">
            <li>
              <label htmlFor="email" className="labels">
                Email:
              </label>
              <input
                className={`inputel ${errors.email ? "error-border" : ""}`}
                placeholder="Email"
                type="text"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address"
                  }
                })}
              />
              {errors.email && <p className="error-text">{errors.email.message}</p>}
            </li>
            <li>
              <label htmlFor="password" className="labels">
                Password:
              </label>
              <input
                className={`inputel ${errors.password ? "error-border" : ""}`}
                placeholder="Password"
                type="password"
                {...register("password", {
                  required: "Password is required",
                  minLength: { value: 6, message: "Password must be at least 6 characters" }
                })}
              />
              {errors.password && <p className="error-text">{errors.password.message}</p>}
            </li>
            <li>
              <input
                disabled={isSubmitting}
                type="submit"
                value={isSubmitting ? "Logging in..." : "Login to BudgetBuddy"}
                className="inputSub"
              />
            </li>
            {errors.form && <p className="error-text">{errors.form.message}</p>}
            {message && <p className="success-text">{message}</p>}
          </ul>
        </form>
      </div>
    </div>
    <Footer/>
    
    </>
  );
};

export default Login;