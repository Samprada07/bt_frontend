import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./AuthPages.css"; // Import shared CSS file
import image from "../assets/brain.jpg";

const Register = () => {
	const [username, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const navigate = useNavigate();

	const handleRegister = async (e) => {
		e.preventDefault();
		try {
			await axios.post("http://127.0.0.1:8000/users/register", {
				username,
				email,
				password,
			});
			alert("Registration successful! Please login.");
			navigate("/login");
		} catch (error) {
			alert("Error during registration. Try again.");
		}
	};

	return (
		<div className="auth-container">
			{/* Background Image */}
			<div className="auth-image-container">
				<img src={image} alt="Register Background" className="auth-image" />
			</div>
			<div
				className="text-center"
				style={{ position: "absolute", top: "20px", width: "13%", zIndex: 2 }}
			>
				<Link to="/" style={{ textDecoration: "none" }}>
				<h1 className="navbar-brand bg-dark" style={{ fontWeight: "bold", fontSize: "1.5rem", color:"#FFC107"}}>BrainScan AI</h1>
				</Link>
			</div>
			{/* Transparent Form on Left */}
			<div className="auth-form-overlay">
				<div className="auth-form">
					<h2 className="text-center mb-4">Register</h2>
					<form onSubmit={handleRegister}>
						<div className="mb-3">
							<label className="form-label text-white">Username</label>
							<input
								type="text"
								className="form-control"
								onChange={(e) => setName(e.target.value)}
								required
							/>
						</div>
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
							Register
						</button>
					</form>
					<p className="text-center mt-3 text-white">
						Already have an account?{" "}
						<Link to="/login" className="text-warning">
							Login
						</Link>
					</p>
				</div>
			</div>
		</div>
	);
};

export default Register;
