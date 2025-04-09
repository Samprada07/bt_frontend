import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

const Navbar = () => {
	const navigate = useNavigate();
	const pathName = useLocation();

	const handleLogout = () => {
		localStorage.removeItem("token");
		localStorage.removeItem("role");
		localStorage.removeItem("name");
		navigate("/login");
	};
	const isAdmin = localStorage.getItem("role") === "admin";
	const name = localStorage.getItem("name");

	return (
		<nav className="navbar navbar-expand-lg navbar-dark bg-dark">
			<div className="container">
				<Link
					className="navbar-brand"
					style={{ fontWeight: "bold", fontSize: "1.5rem", color: "#FFC107" }}
					to="/"
				>
					BrainScan AI
				</Link>
				{name && (
					<div className="nav-item d-flex align-items-center">
						<p className="text-white fs-5 fw-bold me-4 my-2">
							Hello, {name.charAt(0).toUpperCase() + name.slice(1)}
						</p>
					</div>
				)}
				<button
					className="navbar-toggler mb-2"
					type="button"
					data-bs-toggle="collapse"
					data-bs-target="#navbarNav"
				>
					<span className="navbar-toggler-icon"></span>
				</button>
				<div className="collapse navbar-collapse" id="navbarNav">
					<ul className="navbar-nav lg:flex-row align-items-end ms-auto gap-2">
						{isAdmin && (
							<li className="nav-item">
								<button
									className={`btn my-2 ${
										pathName.pathname === "/AdminAnalytics"
											? "btn-secondary"
											: "btn-warning"
									}`}
									onClick={() => navigate("/AdminAnalytics")}
								>
									Analytics
								</button>
							</li>
						)}
						{isAdmin && (
							<li className="nav-item">
								<button
									className={`btn my-2 ${
										pathName.pathname === "/AdminDashboard"
											? "btn-secondary"
											: " btn-warning"
									}`}
									onClick={() => navigate("/AdminDashboard")}
								>
									Dashboard
								</button>
							</li>
						)}
						<li className="nav-item">
							<button
								className="btn btn-outline-warning my-2"
								onClick={handleLogout}
							>
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
