import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./AuthPages.css"; // Import the shared CSS file
import image from "../assets/brain.jpg";
import { CustomInput } from "../components/CustomInput";
import { useFormSubmit } from "../hooks/useFormSubmit"; // Import the custom hook
import { Spinner } from "react-bootstrap";

const Login = () => {
	const [formData, setFormData] = useState({
		email: "",
		password: "",
	});
	const navigate = useNavigate();
	const { handleSubmit, isSubmitting, error } = useFormSubmit(); // Destructure the hook

	const handleLogin = async () => {
		const res = await axios.post("http://127.0.0.1:8000/auth/login", {
			email: formData.email,
			password: formData.password,
		});
		console.log(res.data);
		localStorage.setItem("token", res.data.data.token);
		localStorage.setItem("role", res.data.data.role); // Store role
		localStorage.setItem("name", res.data.data.name);

		if (res.data.data.role === "admin") {
			navigate("/AdminDashboard"); // Redirect Admin
		} else {
			navigate("/upload"); // Redirect Normal User
		}
	};

	const handleChange = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
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
				<Link to="/" className="text-decoration-none">
					<h1 className="navbar-brand w-fit bg-dark fw-bold fs-4 h-100 text-warning">
						BrainScan AI
					</h1>
				</Link>
			</div>
			{/* Transparent Form */}
			<div className="auth-form-overlay">
				<div className="auth-form">
					<h2 className="text-center mb-4">Login</h2>
					<form
						onSubmit={(e) => {
							e.preventDefault();
							handleSubmit(handleLogin); // Use handleSubmit from the hook
						}}
					>
						<CustomInput
							label={"Email"}
							type={"email"}
							name={"email"}
							onChange={handleChange}
							required={true}
							value={formData.email}
						/>
						<CustomInput
							label={"Password"}
							type={"password"}
							name={"password"}
							onChange={handleChange}
							required={true}
							value={formData.password}
						/>
						<button type="submit" className="btn btn-dark w-100" disabled={isSubmitting}>
							{isSubmitting ? <Spinner/> : "Login"} {/* Show loading when submitting */}
						</button>
					</form>
					{error && <p className="text-danger text-center mt-2">{error}</p>} {/* Display error message */}
					<p className="text-center mt-2">
						<Link to="/forgotpassword">Forgot Password?</Link>
					</p>
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
