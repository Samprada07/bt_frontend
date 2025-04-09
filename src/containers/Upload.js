import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Upload.css';
import { Spinner } from 'react-bootstrap';
import { useFormSubmit } from '../hooks/useFormSubmit';

function Upload() {
    const navigate = useNavigate();
    const [file, setFile] = useState(null);
    const [uploadedImage, setUploadedImage] = useState(null);
    const [classificationResult, setClassificationResult] = useState(null);
    const [confidenceScore, setConfidenceScore] = useState(null);
    const { handleSubmit, isSubmitting, error } = useFormSubmit;

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleHistoryClick = () => {
        navigate('/predictionhistory');
    };

    const handleUpload = async () => {
        if (!file) {
            alert("Please select a file to upload.");
            return;
        }

        const formData = new FormData();
        formData.append("file", file);

        try {
            const token = localStorage.getItem("token");
            const response = await axios.post('http://127.0.0.1:8000/mri/upload', formData, {
                headers: { 
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`
                }
            });

            // Set uploaded image preview
            setUploadedImage(URL.createObjectURL(file));
            setClassificationResult(response.data.prediction);
            setConfidenceScore(response.data.confidence);

        } catch (error) {
            console.error("Upload error:", error);
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 200
                alert(`Error: ${error.response.data.message || error.response.data.error || 'Server error occurred'}`);
            } else if (error.request) {
                // The request was made but no response was received
                alert('No response received from server. Please check if the server is running.');
            } else {
                // Something happened in setting up the request that triggered an Error
                alert(`Error: ${error.message}`);
            }
        }
    };

    return (
        <div className="upload-container">
            {/* Upload Form */}
            <div className="upload-form-container">
                <h4 className="text-center mb-4">Upload MRI Image</h4>
                <form onSubmit={(e)=>{
                    e.preventDefault();
                    handleSubmit(handleUpload);
                }} className="upload-form">
                    <div className="mb-3">
                        <label className="form-label">Select File</label>
                        <input
                            type="file"
                            className="form-control"
                            onChange={handleFileChange}
                            required
                        />
                    </div>
                    <button type="submit" disabled={isSubmitting} className="btn btn-dark w-100 mb-3">{isSubmitting ? <Spinner/> : "Upload"}</button>
                    <button 
                        type="button" 
                        className="btn btn-outline-dark w-100"
                        onClick={handleHistoryClick}
                    >
                        View Prediction History
                    </button>
                </form>
            </div>

            {/* Display Results */}
            {uploadedImage && (
                <div className="result-container mt-4">
                    <h3 className="text-center">Classification Result</h3>
                    <div className="result-content text-center">
                        <img src={uploadedImage} alt="Uploaded MRI" className="uploaded-image mb-3" style={{ maxWidth: '300px' }} />
                        <p className="classification-text" style={{ fontSize: '20px', fontWeight: 'bold' }}>
                            Prediction: {classificationResult}<br />
                            Confidence Score: {confidenceScore}%
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Upload;
