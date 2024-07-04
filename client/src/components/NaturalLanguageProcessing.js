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
        <div className="p-4 bg-white rounded shadow-md">
            <h2 className="text-2xl font-bold mb-4">Natural Language Processing</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Enter text for NLP"
                    className="w-full p-2 border border-gray-300 rounded"
                />
                <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                    Process Text
                </button>
            </form>
            {error && <div className="mt-4 text-red-500">Error: {error}</div>}
            {nlpData && <pre className="mt-4 p-2 bg-gray-100 rounded">{JSON.stringify(nlpData, null, 2)}</pre>}
        </div>
    );
};

export default NaturalLanguageProcessing;
