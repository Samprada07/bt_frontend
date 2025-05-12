import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const PIE_COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']; 
const BAR_COLORS = ['#4A90E2', '#50E3C2', '#F5A623']; 

const StatCard = ({ title, value, bgColor }) => (
    <div className="col-md-3 mb-3">
        <div className={`card ${bgColor}`} style={{height:"150px"}}>
            <div className="card-body d-flex flex-column justify-content-between text-center">
                <h5 className="text-white">{title}</h5>
                <h3 className="mb-3 text-warning">{value}</h3>
            </div>
        </div>
    </div>
);

const ChartContainer = ({ title, children }) => (
    <div className="col-md-6">
        <h5 className="text-center">{title}</h5>
        <ResponsiveContainer width="100%" height={300}>
            {children}
        </ResponsiveContainer>
    </div>
);

const UserActivityTable = ({ userActivity }) => (
    <div className="mt-4">
        <h5 className="text-center mb-3">Top Active Users</h5>
        <table className="table table-bordered table-striped">
            <thead className="table-dark">
                <tr>
                    <th>User ID</th>
                    <th>Total Uploads</th>
                    <th>Last Upload</th>
                </tr>
            </thead>
            <tbody>
                {userActivity.map(user => (
                    <tr key={user.user_id}>
                        <td>{user.user_id}</td>
                        <td>{user.uploads}</td>
                        <td>{user.last_upload}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
);

const AdminAnalytics = () => {
    const [stats, setStats] = useState({});
    const [predictionData, setPredictionData] = useState([]);
    const [userActivity, setUserActivity] = useState([]);

    useEffect(() => {
        const fetchAnalyticsData = async () => {
            try {
                const { data } = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/classification/analytics`);
                console.log("Fetched Analytics Data:", data);
    
                // Set statistics data
                setStats({
                    totalUsers: data.data.total_users,
                    totalPredictions: data.data.total_predictions,
                    positivePredictions: data.data.positive_predictions,
                    negativePredictions: data.data.negative_predictions,
                    averageConfidence: data.data.average_confidence.toFixed(2)
                });
    
                // Ensure prediction_distribution is defined and not null
                if (!data.data.prediction_distribution || Object.keys(data.data.prediction_distribution).length === 0) {
                    console.error("Missing or empty prediction_distribution in API response");
                    return;
                }
    
                // Format prediction distribution for the pie chart
                const formattedData = Object.keys(data.data.prediction_distribution).map(key => ({
                    name: key.replace("_", " "), // Format names
                    value: data.data.prediction_distribution[key]
                }));
                setPredictionData(formattedData);
    
                // Ensure user_activity is defined and not null
                if (!data.data.user_activity || data.data.user_activity.length === 0) {
                    console.error("Missing or empty user_activity in API response");
                    return;
                }
    
                // Set user activity data
                setUserActivity(data.data.user_activity);
            } catch (err) {
                console.error("Error fetching analytics data", err);
            }
        };
    
        fetchAnalyticsData();
    }, []);

    return (
        <div className="container mt-4 p-4 rounded" style={{ backgroundColor: 'rgb(194, 197, 197)', minHeight: '100vh' }}>
            <h2 className="text-center mb-4">Admin Analytics Dashboard</h2>

            {/* Statistics Cards */}
            <div className="row mb-4">
                <StatCard title="Total Users" value={stats.totalUsers} bgColor="bg-dark" />
                <StatCard title="Total Predictions" value={stats.totalPredictions} bgColor="bg-success" />
                <StatCard title="Avg Confidence" value={`${stats.averageConfidence}%`} bgColor="bg-dark" />
                <StatCard title="Tumor Positive" value={stats.positivePredictions} bgColor="bg-success" />
            </div>

            {/* Charts Section */}
            <div className="row mb-3">
                <ChartContainer title="Prediction Distribution">
                    <PieChart width={400} height={400}>
                        <Pie
                            data={predictionData}
                            cx="50%"
                            cy="50%"
                            outerRadius={100}
                            labelLine={false}
                            dataKey="value"
                            label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                        >
                            {predictionData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip />
                    </PieChart>
                </ChartContainer>

                <ChartContainer title="Predictions per User">
                    <BarChart data={userActivity}>
                        <XAxis dataKey="user_id" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="uploads" fill={BAR_COLORS[0]} name="Uploads" />
                    </BarChart>
                </ChartContainer>
            </div>
            {/* User Activity Table */}
            <UserActivityTable userActivity={userActivity} />
        </div>
    );
};

export default AdminAnalytics;
