import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./AuthStyles.css"
import Header from "../layout/Header";
import Footer from "../layout/Footer";

const SignupPage = () => {
  const [message, setMessage] = useState("");
  const {
    register,
    handleSubmit,
    setError,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      // Updated port to 5000 to match backend
      const response = await fetch("http://localhost:5000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          password: data.password
          // Removed confirmPassword as it's not needed in the backend
        }),
      });
  
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Registration failed');
      }
  
      if (result.message === "Registration successful") {
        setMessage("Registration successful. Redirecting to dashboard...");
        
        // Store auth data in localStorage
        localStorage.setItem("token", result.token);
        localStorage.setItem("user", JSON.stringify(result.user));
        
        // Set authorization header for future requests
        const authHeader = `Bearer ${result.token}`;
        localStorage.setItem("authHeader", authHeader);
  
        setTimeout(() => {
          navigate("/dashboard");
        }, 2000);
      } else {
        setError("form", { 
          type: "manual", 
          message: result.message || "Registration failed" 
        });
      }
    } catch (error) {
      console.error("Registration error:", error);
      setError("form", { 
        type: "manual", 
        message: error.message || "An error occurred during registration" 
      });
    }
  };
  
  return (
    <>
    <Header/>
      <div className="Register">
        <div className="RLcard">
          <h1>Signup</h1>
          <h3>
            Already have an account? <Link to="/login">Login here!</Link>
          </h3>

          <form onSubmit={handleSubmit(onSubmit)}>
            <ul className="registerform">
              <div className="name-container">
                <li>
                  <label htmlFor="firstName" className="labels">
                    First Name:
                  </label>
                  <input
                    className={`inputel ${errors.firstName ? "error-border" : ""}`}
                    placeholder="First Name"
                    type="text"
                    {...register("firstName", {
                      required: { value: true, message: "First name is required" },
                      minLength: { value: 2, message: "First name must be at least 2 characters" },
                      maxLength: { value: 50, message: "First name cannot exceed 50 characters" },
                      pattern: { 
                        value: /^[a-zA-Z\s-']+$/,
                        message: "First name can only contain letters, spaces, hyphens and apostrophes"
                      }
                    })}
                  />
                  {errors.firstName && (
                    <span className="error-icon" title={errors.firstName.message}>!</span>
                  )}
                  {errors.firstName && <p className="error-text">{errors.firstName.message}</p>}
                </li>
                <li>
                  <label htmlFor="lastName" className="labels">
                    Last Name:
                  </label>
                  <input
                    className={`inputel ${errors.lastName ? "error-border" : ""}`}
                    placeholder="Last Name"
                    type="text"
                    {...register("lastName", {
                      required: { value: true, message: "Last name is required" },
                      minLength: { value: 2, message: "Last name must be at least 2 characters" },
                      maxLength: { value: 50, message: "Last name cannot exceed 50 characters" },
                      pattern: { 
                        value: /^[a-zA-Z\s-']+$/,
                        message: "Last name can only contain letters, spaces, hyphens and apostrophes"
                      }
                    })}
                  />
                  {errors.lastName && (
                    <span className="error-icon" title={errors.lastName.message}>!</span>
                  )}
                  {errors.lastName && <p className="error-text">{errors.lastName.message}</p>}
                </li>
              </div>
              <li>
                <label htmlFor="email" className="labels">
                  Email:
                </label>
                <input
                  className={`inputel ${errors.email ? "error-border" : ""}`}
                  placeholder="Email"
                  type="email"
                  {...register("email", {
                    required: { value: true, message: "Email is required" },
                    pattern: { 
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address"
                    }
                  })}
                />
                {errors.email && (
                  <span className="error-icon" title={errors.email.message}>!</span>
                )}
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
                    required: { value: true, message: "Password is required" },
                    minLength: { value: 8, message: "Password must be at least 8 characters" },
                    pattern: {
                      value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
                      message: "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
                    }
                  })}
                />
                {errors.password && (
                  <span className="error-icon" title={errors.password.message}>!</span>
                )}
                {errors.password && <p className="error-text">{errors.password.message}</p>}
              </li>
              <li>
                <label htmlFor="confirmPassword" className="labels">
                  Confirm Password:
                </label>
                <input
                  className={`inputel ${errors.confirmPassword ? "error-border" : ""}`}
                  placeholder="Confirm Password"
                  type="password"
                  {...register("confirmPassword", {
                    required: { value: true, message: "Please confirm your password" },
                    validate: (value) =>
                      value === getValues("password") || "Passwords do not match"
                  })}
                />
                {errors.confirmPassword && (
                  <span className="error-icon" title={errors.confirmPassword.message}>!</span>
                )}
                {errors.confirmPassword && <p className="error-text">{errors.confirmPassword.message}</p>}
              </li>
              <li>
                <input
                  disabled={isSubmitting}
                  type="submit"
                  value={isSubmitting ? "Signing up..." : "Sign-up to BudgetBuddy"}
                  className="inputSub"
                />
              </li>
              {isSubmitting && <div className="loading-text">Processing your registration...</div>}
              {errors.form && <div className="error-text">{errors.form.message}</div>}
              {message && <div className="success-text">{message}</div>}
            </ul>
          </form>
        </div>
      </div>
      <Footer/>
    </>
  );
};



export default SignupPage;