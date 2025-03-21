import React from 'react';
import { BrowserRouter as Router, Route, Routes,  useLocation } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import Upload from './components/Upload';
import AdminDashboard from './components/AdminDashboard';
import PredictionHistory from "./components/PredictionHistory";
import AdminAnalytics from './components/AdminAnalytics';
import Navbar from './components/Navbar';
//import ProtectedRoute from './components/ProtectedRoute';



function App() {
  return (
    <Router>
      <ConditionalNavbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="/admindashboard" element={<AdminDashboard />} />
        <Route path="/predictionhistory" element={<PredictionHistory />} />
        <Route path='/adminanalytics' element={<AdminAnalytics/>}/>

        {/* Protected Routes for Normal Users */}
        {/*<Route element={<ProtectedRoute allowedRole="user" />}>
          <Route path="/upload" element={<Upload />} />
        </Route>

        {/* Protected Routes for Admin */}
        {/*<Route element={<ProtectedRoute allowedRole="admin" />}>
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
        </Route>*/}
      </Routes>
    </Router>
  );
}

function ConditionalNavbar() {
  const location = useLocation(); // Get current route
  const hideNavbarOn = [ "/", "/login", "/register"]; 

  console.log("Current Path:", location.pathname); // Debugging

  return hideNavbarOn.includes(location.pathname) ? null : <Navbar />;
}



export default App;