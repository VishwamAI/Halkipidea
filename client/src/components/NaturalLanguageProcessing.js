import React, { useState } from 'react';
import axios from 'axios';

const NaturalLanguageProcessing = () => {
    const [text, setText] = useState('');
    const [nlpData, setNlpData] = useState(null);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/nlp', { text });
            setNlpData(response.data);
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div>
            <h2>Natural Language Processing</h2>
            <form onSubmit={handleSubmit}>
                <textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Enter text for NLP"
                />
                <button type="submit">Process Text</button>
            </form>
            {error && <div>Error: {error}</div>}
            {nlpData && <pre>{JSON.stringify(nlpData, null, 2)}</pre>}
        </div>
    );
};

export default NaturalLanguageProcessing;
