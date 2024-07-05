import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AIOrchestrator = () => {
    const [nlpData, setNlpData] = useState(null);
    const [mlData, setMlData] = useState(null);
    const [cvData, setCvData] = useState(null);
    const [kgData, setKgData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch data from the NLP route
        axios.post('/api/nlp', { text: 'Sample text for NLP' })
            .then(response => setNlpData(response.data))
            .catch(error => setError(error.message));

        // Fetch data from the ML route
        axios.post('/api/ml', { inputData: [1, 2, 3, 4] })
            .then(response => setMlData(response.data))
            .catch(error => setError(error.message));

        // Fetch data from the CV route
        axios.post('/api/cv', { inputData: [5, 6, 7, 8] })
            .then(response => setCvData(response.data))
            .catch(error => setError(error.message));

        // Fetch data from the KG route
        axios.post('/api/kg', { inputData: [9, 10, 11, 12] })
            .then(response => setKgData(response.data))
            .catch(error => setError(error.message));
    }, []);

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <h1>AI Orchestrator</h1>
            <div>
                <h2>Natural Language Processing</h2>
                {nlpData ? <pre>{JSON.stringify(nlpData, null, 2)}</pre> : <p>Loading...</p>}
            </div>
            <div>
                <h2>Machine Learning Models</h2>
                {mlData ? <pre>{JSON.stringify(mlData, null, 2)}</pre> : <p>Loading...</p>}
            </div>
            <div>
                <h2>Computer Vision</h2>
                {cvData ? <pre>{JSON.stringify(cvData, null, 2)}</pre> : <p>Loading...</p>}
            </div>
            <div>
                <h2>Knowledge Graph</h2>
                {kgData ? <pre>{JSON.stringify(kgData, null, 2)}</pre> : <p>Loading...</p>}
            </div>
        </div>
    );
};

export default AIOrchestrator;
