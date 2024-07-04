import React, { useState } from 'react';
import axios from 'axios';
import './MainUI.css';

const MainUI = () => {
    const [inputData, setInputData] = useState('');
    const [response, setResponse] = useState(null);
    const [error, setError] = useState(null);

    const handleInputChange = (e) => {
        setInputData(e.target.value);
    };

    const handleSubmit = async () => {
        try {
            const result = await axios.post('/orchestrate', { inputData });
            setResponse(result.data);
            setError(null); // Clear any previous errors
        } catch (error) {
            console.error('Error submitting data:', error);
            setError('An error occurred while submitting the data. Please try again.');
        }
    };

    return (
        <div className="main-ui">
            <h1>Halkipedia AI Orchestrator</h1>
            <input
                type="text"
                value={inputData}
                onChange={handleInputChange}
                placeholder="Enter input data"
            />
            <button onClick={handleSubmit}>Submit</button>
            {error && (
                <div className="error">
                    <p>{error}</p>
                </div>
            )}
            {response && (
                <div className="response">
                    <h2>Response:</h2>
                    <pre>{JSON.stringify(response, null, 2)}</pre>
                </div>
            )}
        </div>
    );
};

export default MainUI;
