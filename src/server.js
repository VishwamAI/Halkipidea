const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { orchestrateAIModels } = require('./AI_Orchestrator/orchestrator');
const { processText } = require('./Natural_Language_Processing/nlp');
const { mlModel, cvModel, kgModel } = require('./ML_Models/models');
const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Routes
app.get('/', (req, res) => {
    res.send('Welcome to Halkipedia AI System');
});

// AI Orchestrator route
app.post('/orchestrate', orchestrateAIModels);

// Natural Language Processing route
app.post('/nlp', (req, res) => {
    const { text } = req.body;
    const result = processText(text);
    res.json(result);
});

// Machine Learning Models route
app.post('/ml', (req, res) => {
    const { inputData } = req.body;
    if (!inputData) {
        return res.status(400).json({ error: 'Invalid input data' });
    }
    const model = mlModel();
    // Placeholder logic for using the ML model
    const result = model.predict(inputData);
    res.json(result);
});

// Computer Vision route
app.post('/cv', (req, res) => {
    const { inputData } = req.body;
    if (!inputData) {
        return res.status(400).json({ error: 'Invalid input data' });
    }
    const model = cvModel();
    // Placeholder logic for using the CV model
    const result = model.predict(inputData);
    res.json(result);
});

// Knowledge Graph route
app.post('/kg', (req, res) => {
    const { inputData } = req.body;
    if (!inputData) {
        return res.status(400).json({ error: 'Invalid input data' });
    }
    const model = kgModel();
    // Placeholder logic for using the KG model
    const result = model.predict(inputData);
    res.json(result);
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
