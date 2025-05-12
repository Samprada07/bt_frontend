import React, { useEffect, useState } from "react";
import axios from "axios";
import { Spinner, Table, Container, Alert, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const PredictionHistory = () => {
	const navigate = useNavigate();
	const [history, setHistory] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");

	// Pagination state
	const [currentPage, setCurrentPage] = useState(1);
	const itemsPerPage = 10;

	useEffect(() => {
		const fetchHistory = async () => {
			try {
				const token = localStorage.getItem("token");
				if (!token) {
					setError("Please log in to view your prediction history.");
					setLoading(false);
					return;
				}

				const res = await axios.get(
					`${process.env.REACT_APP_API_BASE_URL}/users/prediction-history`,
					{ headers: { Authorization: `Bearer ${token}` } }
				);

				if (res.data) {
					setHistory(res.data.data);
				} else {
					setError("No data received from server.");
				}
			} catch (err) {
				console.error("Error fetching history:", err);
				setError("Failed to load prediction history. Please try again.");
			} finally {
				setLoading(false);
			}
		};
		fetchHistory();
	}, [navigate]);

	// Pagination logic
	const indexOfLastItem = currentPage * itemsPerPage;
	const indexOfFirstItem = indexOfLastItem - itemsPerPage;
	const paginatedHistory = history.slice(indexOfFirstItem, indexOfLastItem);
	const totalPages = Math.ceil(history.length / itemsPerPage);

	return (
		<div className="container-fluid bg-light min-vh-100 py-4">
			<Container>
				<h2 className="text-center mb-4">Your Prediction History</h2>
				<div className="d-flex my-2 justify-content-start">
					<button onClick={() => navigate("/upload")} className="btn bg-dark text-white">
						Go Back
					</button>
				</div>

				{loading ? (
					<div className="d-flex justify-content-center">
						<Spinner animation="border" variant="primary" />
					</div>
				) : error ? (
					<Alert variant="danger" className="text-center">{error}</Alert>
				) : history.length === 0 ? (
					<Alert variant="info" className="text-center">No predictions found.</Alert>
				) : (
					<div className="table-responsive">
						<Table striped bordered hover className="text-center">
							<thead className="table-dark">
								<tr>
									<th>S.N.</th>
									<th>MRI Image</th>
									<th>Prediction</th>
									<th>Date</th>
								</tr>
							</thead>
							<tbody>
								{paginatedHistory.map((entry, index) => (
									<tr key={entry.id || index}>
										<td>{indexOfFirstItem + index + 1}</td>
										<td>
											<img
												src={`${process.env.REACT_APP_API_BASE_URL}/${entry.file_path}`}
												alt="MRI"
												style={{ width: "80px", height: "80px", borderRadius: "8px" }}
											/>
										</td>
										<td><strong>{entry.result}</strong></td>
										<td>{new Date(entry.created_at).toLocaleDateString()}</td>
									</tr>
								))}
							</tbody>
						</Table>

						{/* Pagination Controls */}
						<div className="d-flex justify-content-center mt-3">
							<Button variant="secondary" className="me-2" disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}>
								Previous
							</Button>
							<span className="mt-2">Page {currentPage} of {totalPages}</span>
							<Button variant="secondary" className="ms-2" disabled={currentPage === totalPages} onClick={() => setCurrentPage(currentPage + 1)}>
								Next
							</Button>
						</div>
					</div>
				)}
			</Container>
		</div>
	);
};

export default PredictionHistory;
