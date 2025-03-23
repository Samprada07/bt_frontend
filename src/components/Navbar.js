import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/dist/js/bootstrap.bundle.min';


const Navbar = () => {
	const navigate = useNavigate();

	const handleLogout = () => {
		localStorage.removeItem("token");
		localStorage.removeItem("role");
		navigate("/login");
	};

	return (
		<nav className="navbar navbar-expand-lg navbar-dark bg-dark">
			<div className="container">
				<Link className="navbar-brand" style={{ fontWeight: "bold", fontSize: "1.5rem", color:"#FFC107"}} to="/">
					BrainScan AI
				</Link>
				<button
					className="navbar-toggler"
					type="button"
					data-bs-toggle="collapse"
					data-bs-target="#navbarNav"
				>
					<span className="navbar-toggler-icon"></span>
				</button>
				<div className="collapse navbar-collapse" id="navbarNav">
					<ul className="navbar-nav ms-auto">
						
						<li className="nav-item">
							<button className="btn btn-warning" onClick={handleLogout}>
								Logout
							</button>
						</li>
					</ul>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;

/*{localStorage.getItem("role") === "admin" ? (
	<li className="nav-item">
		<Link className="nav-link" to="/admin-dashboard">
			Admin Dashboard
		</Link>
	</li>
) : (
	<li className="nav-item">
		<Link className="nav-link" to="/upload">
			Upload MRI
		</Link>
	</li>
)}*/