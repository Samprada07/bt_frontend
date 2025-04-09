import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const AdminDashboard = () => {
	const [users, setUsers] = useState([]);
	const [classificationResults, setClassificationResults] = useState([]);
	const [activeTab, setActiveTab] = useState("users");
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const navigate = useNavigate();

	// Pagination state
	const [currentPage, setCurrentPage] = useState(1);
	const [itemsPerPage] = useState(5); // Adjustable for different page sizes

	const checkAuthAndFetchData = async () => {
		try {
			const token = localStorage.getItem("token");
			const role = localStorage.getItem("role");

			if (!token || role !== "admin") {
				setError("You are not authorized to access this page");
				navigate("/login");
				return;
			}

			const headers = { Authorization: `Bearer ${token}` };
			const [usersRes, classificationRes] = await Promise.all([
				axios.get("http://localhost:8000/users/all", { headers }),
				axios.get("http://localhost:8000/classification/history", { headers }),
			]);

			if (usersRes.data.data) setUsers(usersRes.data.data);
			if (classificationRes.data.data)
				setClassificationResults(classificationRes.data.data);

			setError(null);
		} catch (error) {
			console.error("Error in AdminDashboard:", error);
			setError("An unexpected error occurred. Please try again.");
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		checkAuthAndFetchData();
	}, [navigate]);

	// Delete User
	const deleteUser = async (user_id) => {
		if (!window.confirm("Are you sure you want to delete this user?")) return;
		try {
			const token = localStorage.getItem("token");
			await axios.delete(`http://localhost:8000/users/${user_id}`, {
				headers: { Authorization: `Bearer ${token}` },
			});
			checkAuthAndFetchData();
			alert("User deleted successfully");
		} catch (error) {
			console.error("Error deleting user:", error);
			alert("Error deleting user");
		}
	};

	// Delete Classification
	const deleteClassification = async (classificationId) => {
		if (
			!window.confirm(
				"Are you sure you want to delete this classification result?"
			)
		)
			return;
		try {
			const token = localStorage.getItem("token");
			await axios.delete(
				`http://localhost:8000/classification/results/${classificationId}`,
				{
					headers: { Authorization: `Bearer ${token}` },
				}
			);
			setClassificationResults(
				classificationResults.filter((result) => result.id !== classificationId)
			);
			alert("Classification result deleted successfully");
		} catch (error) {
			console.error("Error deleting classification result:", error);
			alert("Error deleting classification result");
		}
	};

	// Pagination logic
	const indexOfLastItem = currentPage * itemsPerPage;
	const indexOfFirstItem = indexOfLastItem - itemsPerPage;

	const paginatedUsers = users.slice(indexOfFirstItem, indexOfLastItem);
	const paginatedClassificationResults = classificationResults.slice(
		indexOfFirstItem,
		indexOfLastItem
	);

	const totalPages = Math.ceil(
		(activeTab === "users" ? users.length : classificationResults.length) /
			itemsPerPage
	);

	const handlePageChange = (pageNumber) => {
		if (pageNumber >= 1 && pageNumber <= totalPages) {
			setCurrentPage(pageNumber);
		}
	};

	return (
		<div className="container-fluid bg-light min-vh-100 py-4">
			<div className="container">
				<h2 className="text-center">Admin Dashboard</h2>

				{loading ? (
					<div className="d-flex justify-content-center">
						<div className="spinner-border text-primary" role="status">
							<span className="visually-hidden">Loading...</span>
						</div>
					</div>
				) : error ? (
					<div className="alert alert-danger text-center">{error}</div>
				) : (
					<>
						{/* Tabs */}
						<ul className="nav nav-tabs mb-4">
							<li className="nav-item">
								<button
									className={`nav-link ${
										activeTab === "users" ? "active" : ""
									}`}
									onClick={() => setActiveTab("users")}
								>
									Users
								</button>
							</li>
							<li className="nav-item">
								<button
									className={`nav-link ${
										activeTab === "classification" ? "active" : ""
									}`}
									onClick={() => setActiveTab("classification")}
								>
									Classification Results
								</button>
							</li>
						</ul>

						{/* Users Table */}
						{activeTab === "users" && (
							<div className="table-responsive">
								<table className="table table-striped table-hover">
									<thead className="table-dark">
										<tr>
											<th>ID</th>
											<th>Username</th>
											<th>Email</th>
											<th>Actions</th>
										</tr>
									</thead>
									<tbody>
										{paginatedUsers.map((user) => (
											<tr key={user.id}>
												<td>{user.id}</td>
												<td>{user.username}</td>
												<td>{user.email}</td>
												<td>
													<button
														className="btn btn-danger btn-sm"
														onClick={() => deleteUser(user.id)}
													>
														Delete
													</button>
												</td>
											</tr>
										))}
									</tbody>
								</table>

								{/* Pagination Controls */}
								<div className="d-flex justify-content-center mt-3">
									<button
										className="btn btn-secondary me-2"
										disabled={currentPage === 1}
										onClick={() => handlePageChange(currentPage - 1)}
									>
										Previous
									</button>
									<span className="mt-2">
										Page {currentPage} of {totalPages}
									</span>
									<button
										className="btn btn-secondary ms-2"
										disabled={currentPage === totalPages}
										onClick={() => handlePageChange(currentPage + 1)}
									>
										Next
									</button>
								</div>
							</div>
						)}

						{/* Classification Table */}
						{activeTab === "classification" && (
							<div className="table-responsive">
								<table className="table table-striped table-hover">
									<thead className="table-dark">
										<tr>
											<th>ID</th>
											<th>User</th>
											<th>MRI Image</th>
											<th>Result</th>
											<th>Created At</th>
											<th>Actions</th>
										</tr>
									</thead>
									<tbody>
										{paginatedClassificationResults.map((result) => (
											<tr key={result.id}>
												<td>{result.id}</td>
												<td>{result.username}</td>
												<td>
													<img
														src={`http://localhost:8000/${result.file_path}`}
														alt="MRI"
														className="img-thumbnail"
														style={{
															width: "100px",
															height: "100px",
															objectFit: "cover",
														}}
													/>
												</td>
												<td>{result.result}</td>
												<td>{new Date(result.created_at).toLocaleString()}</td>
												<td>
													<button
														className="btn btn-danger btn-sm"
														onClick={() => deleteClassification(result.id)}
													>
														Delete
													</button>
												</td>
											</tr>
										))}
									</tbody>
								</table>
								{/* Pagination Controls */}
								<div className="d-flex justify-content-center mt-3">
									<button
										className="btn btn-secondary me-2"
										disabled={currentPage === 1}
										onClick={() => handlePageChange(currentPage - 1)}
									>
										Previous
									</button>
									<span className="mt-2">
										Page {currentPage} of {totalPages}
									</span>
									<button
										className="btn btn-secondary ms-2"
										disabled={currentPage === totalPages}
										onClick={() => handlePageChange(currentPage + 1)}
									>
										Next
									</button>
								</div>
							</div>
						)}
					</>
				)}
			</div>
		</div>
	);
};

export default AdminDashboard;
