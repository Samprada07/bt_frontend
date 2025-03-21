import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./AuthPages.css"; // Import the shared CSS file
import image from "../assets/brain.jpg";

const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const navigate = useNavigate();

	const handleLogin = async (e) => {
		e.preventDefault();
		try {
			const res = await axios.post("http://127.0.0.1:8000/auth/login", {
				email,
				password,
			});
			localStorage.setItem("token", res.data.token);
			localStorage.setItem("role", res.data.role); // Store role

			if (res.data.role === "admin") {
				navigate("/AdminDashboard"); // Redirect Admin
			} else {
				navigate("/upload"); // Redirect Normal User
			}
		} catch (error) {
			alert("Invalid email or password");
		}
	};

	return (
		<div className="auth-container">
			{/* Background Image */}
			<div className="auth-image-container">
				<img src={image} alt="Login Background" className="auth-image" />
			</div>
			<div
				className="text-center"
				style={{ position: "absolute", top: "20px", width: "13%", zIndex: 2 }}
			>
				<Link to="/" style={{ textDecoration: "none"}}>
					<h1 className="navbar-brand bg-dark" style={{ fontWeight: "bold", fontSize: "1.5rem", color:"#FFC107"}}>BrainScan AI</h1>
				</Link>
			</div>
			{/* Transparent Form */}
			<div className="auth-form-overlay">
				<div className="auth-form">
					<h2 className="text-center mb-4">Login</h2>
					<form onSubmit={handleLogin}>
						<div className="mb-3">
							<label className="form-label text-white">Email</label>
							<input
								type="email"
								className="form-control"
								onChange={(e) => setEmail(e.target.value)}
								required
							/>
						</div>
						<div className="mb-3">
							<label className="form-label text-white">Password</label>
							<input
								type="password"
								className="form-control"
								onChange={(e) => setPassword(e.target.value)}
								required
							/>
						</div>
						<button type="submit" className="btn btn-dark w-100">
							Login
						</button>
					</form>
					<p className="text-center mt-3 text-white">
						Don't have an account?{" "}
						<Link to="/register" className="text-warning">
							Register
						</Link>
					</p>
				</div>
			</div>
		</div>
	);
};

export default Login;
