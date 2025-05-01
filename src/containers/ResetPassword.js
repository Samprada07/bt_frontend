import React, { useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useFormSubmit } from "../hooks/useFormSubmit";
import { Spinner } from "react-bootstrap";

const ResetPassword = () => {
	const { token } = useParams();
	const navigate = useNavigate();
	const [password, setPassword] = useState("");
	const [msg, setMsg] = useState("");
	const { handleSubmit, isSubmitting, error } = useFormSubmit();

	const handleReset = async () => {
		if (password.length < 6) {
			alert("Password must be more than 5 characters.");
			return;
		  }
		try {
			await axios.post(`${process.env.REACT_APP_API_BASE_URL}/auth/reset-password/${token}`, {
				password: password,
			});
			setMsg("Password updated. Redirecting to login...");
			setTimeout(() => navigate("/login"), 3000);
		} catch (err) {
			setMsg("Reset failed or link expired.");
		}
	};

	return (
		<div className="container d-flex justify-content-center align-items-center vh-100">
			<div className="card p-4 shadow-lg w-50">
				<h2 className="text-center mb-4">Reset Password</h2>
				<form
					onSubmit={(e) => {
						e.preventDefault();
						handleSubmit(handleReset);
					}}
				>
					<div className="mb-3">
						<label className="form-label">New Password</label>
						<input
							type="password"
							className="form-control"
							required
							onChange={(e) => setPassword(e.target.value)}
						/>
					</div>
					<button
						type="submit"
						disabled={isSubmitting}
						className="btn btn-success w-100"
					>
						{isSubmitting ? <Spinner /> : "Reset Password"}
					</button>
				</form>
				{msg && <p className="text-center mt-3 text-info">{msg}</p>}
			</div>
		</div>
	);
};

export default ResetPassword;
