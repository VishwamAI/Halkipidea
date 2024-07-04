const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const tf = require('@tensorflow/tfjs-node');
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
    try {
        const tensorInput = tf.tensor(inputData);
        const result = model.predict(tensorInput);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: 'Error processing ML model prediction' });
    }
});

// Computer Vision route
app.post('/cv', (req, res) => {
    const { inputData } = req.body;
    if (!inputData) {
        return res.status(400).json({ error: 'Invalid input data' });
    }
    const model = cvModel();
    try {
        const tensorInput = tf.tensor(inputData);
        const result = model.predict(tensorInput);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: 'Error processing CV model prediction' });
    }
});

// Knowledge Graph route
app.post('/kg', (req, res) => {
    const { inputData } = req.body;
    if (!inputData) {
        return res.status(400).json({ error: 'Invalid input data' });
    }
    const model = kgModel();
    try {
        const tensorInput = tf.tensor(inputData);
        const result = model.predict(tensorInput);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: 'Error processing KG model prediction' });
    }
});

// Content Management System route
app.post('/cms', (req, res) => {
    const { contentData } = req.body;
    if (!contentData) {
        return res.status(400).json({ error: 'Invalid content data' });
    }
    // Placeholder logic for processing CMS data
    const result = { message: 'CMS data processed successfully' };
    res.json(result);
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
