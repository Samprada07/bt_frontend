import React from "react";
import {
	BrowserRouter as Router,
	Route,
	Routes,
	useLocation,
} from "react-router-dom";
import Home from "./containers/Home";
import Login from "./containers/Login";
import Register from "./containers/Register";
import Upload from "./containers/Upload";
import AdminDashboard from "./containers/AdminDashboard";
import PredictionHistory from "./containers/PredictionHistory";
import AdminAnalytics from "./containers/AdminAnalytics";
import Navbar from "./containers/Navbar";
import ProtectedRoute from "./containers/ProtectedRoute";
import ForgotPassword from "./containers/ForgotPassword";
import ResetPassword from "./containers/ResetPassword";

function App() {
	return (
		<Router>
			<ConditionalNavbar />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/login" element={<Login />} />
				<Route path="/register" element={<Register />} />
				<Route path="/forgotpassword" element={<ForgotPassword />} />
				<Route path="/reset-password/:token" element={<ResetPassword />} />

				{/* Protected Routes for Normal Users  */}
				<Route element={<ProtectedRoute allowedRole="Normal user" />}>
					<Route path="/predictionhistory" element={<PredictionHistory />} />
					<Route path="/upload" element={<Upload />} />
				</Route>

				{/* Protected Routes for Admin */}
				<Route element={<ProtectedRoute allowedRole="admin" />}>
					<Route path="/admindashboard" element={<AdminDashboard />} />
					<Route path="/adminanalytics" element={<AdminAnalytics />} />
				</Route>
			</Routes>
		</Router>
	);
}

function ConditionalNavbar() {
	const location = useLocation(); // Get current route
	const hideNavbarOn = [
		"/",
		"/login",
		"/register",
		"/forgotpassword",
		"/reset-password/:token",
	];

	console.log("Current Path:", location.pathname); // Debugging

	return hideNavbarOn.includes(location.pathname) ? null : <Navbar />;
}

export default App;
