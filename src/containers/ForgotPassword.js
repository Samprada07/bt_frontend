import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./AuthPages.css"; // Reuse the same CSS
import image from "../assets/brain.jpg";
import { CustomInput } from "../components/CustomInput";
import { useFormSubmit } from "../hooks/useFormSubmit";
import { Spinner } from "react-bootstrap";

const ForgotPassword = () => {
	const [email, setEmail] = useState("");
	const [message, setMessage] = useState("");
	const { handleSubmit, isSubmitting, error } = useFormSubmit();

	const handleForgotPassword = async () => {
		try {
			await axios.post(`${process.env.REACT_APP_API_BASE_URL}/auth/forgot-password`, { email });
			setMessage("Reset link sent to your email.");
		} catch (err) {
			setMessage("Failed to send reset link.");
		}
	};

	return (
		<div className="auth-container">
			{/* Background Image */}
			<div className="auth-image-container">
				<img
					src={image}
					alt="Forgot Password Background"
					className="auth-image"
				/>
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
					<h2 className="text-center mb-4">Forgot Password</h2>
					<form
						onSubmit={(e) => {
							e.preventDefault();
							handleSubmit(handleForgotPassword);
						}}
					>
						<CustomInput
							label={"Email"}
							type={"email"}
							name={"email"}
							onChange={(e) => setEmail(e.target.value)}
							required={true}
							value={email}
						/>
						<button
							type="submit"
							disabled={isSubmitting}
							className="btn btn-dark w-100"
						>
							{isSubmitting ? <Spinner /> : "Send Reset Link"}
						</button>
					</form>
					{message && (
						<p className="text-center mt-3 text-white fw-semibold">{message}</p>
					)}
					<p className="text-center mt-3 text-white">
						Back to{" "}
						<Link to="/login" className="text-warning">
							Login
						</Link>
					</p>
				</div>
			</div>
		</div>
	);
};

export default ForgotPassword;
