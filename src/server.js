const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { orchestrateAIModels } = require('./AI_Orchestrator/orchestrator');
const { processText } = require('./Natural_Language_Processing/nlp');
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

// Placeholder for Machine Learning Models route
app.post('/ml', (req, res) => {
    // Logic for ML models will go here
    res.send('ML models endpoint');
});

// Placeholder for Computer Vision route
app.post('/cv', (req, res) => {
    // Logic for CV model will go here
    res.send('CV model endpoint');
});

// Placeholder for Knowledge Graph route
app.post('/kg', (req, res) => {
    // Logic for KG model will go here
    res.send('KG model endpoint');
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
