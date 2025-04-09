import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./AuthPages.css"; // Import shared CSS file
import image from "../assets/brain.jpg";
import { CustomInput } from "../components/CustomInput";
import { useFormSubmit } from "../hooks/useFormSubmit";
import { Spinner } from "react-bootstrap";

const Register = () => {
	const [formData, setFormData] = useState({
		username: "",
		email: "",
		password: "",
	});
	const { handleSubmit, isSubmitting, error } = useFormSubmit();
	const navigate = useNavigate();

	const handleRegister = async () => {
		try {
			await axios.post("http://127.0.0.1:8000/users/register", {
				username: formData.username,
				email: formData.email,
				password: formData.password,
			});
			alert("Registration successful! Please login.");
			navigate("/login");
		} catch (error) {
			alert("Error during registration. Try again.");
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
				<img src={image} alt="Register Background" className="auth-image" />
			</div>
			<div
				className="text-center"
				style={{ position: "absolute", top: "20px", width: "13%", zIndex: 2 }}
			>
				<Link to="/" style={{ textDecoration: "none" }}>
				<h1 className="navbar-brand bg-dark w-fit" style={{ fontWeight: "bold", fontSize: "1.5rem", color:"#FFC107"}}>BrainScan AI</h1>
				</Link>
			</div>
			{/* Transparent Form on Left */}
			<div className="auth-form-overlay">
				<div className="auth-form">
					<h2 className="text-center mb-4">Register</h2>
					<form onSubmit={(e) => {
						e.preventDefault();
						handleSubmit(handleRegister)
					}}>
						<CustomInput
							label={"Username"}
							type={"text"}
							name={"username"}
							onChange={handleChange}
							required={true}
							value={formData.username}
						/>
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
						<button type="submit" disabled={isSubmitting} className="btn btn-dark w-100">
						{isSubmitting ? <Spinner/> : "Register"}
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
