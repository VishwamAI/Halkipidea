import React, { useState } from 'react';
import axios from 'axios';
import './MainUI.css';

const MainUI = () => {
    const [inputData, setInputData] = useState('');
    const [response, setResponse] = useState(null);

    const handleInputChange = (e) => {
        setInputData(e.target.value);
    };

    const handleSubmit = async () => {
        try {
            const result = await axios.post('/orchestrate', { inputData });
            setResponse(result.data);
        } catch (error) {
            console.error('Error submitting data:', error);
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
