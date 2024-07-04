const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const tf = require('@tensorflow/tfjs-node');
const { orchestrateAIModels } = require('./AI_Orchestrator/orchestrator');
const { processText } = require('./Natural_Language_Processing/nlp');
const { mlModel, cvModel, kgModel } = require('./ML_Models/models');
const { processCMSData } = require('./cmsHandler');
const { generateRecommendations } = require('./Recommendation_Engine/recommendationEngine');
const { processUserInteractionData } = require('./User_Interaction/userInteractionHandler');
const { processTextContent, generateTextContent } = require('./Natural_Language_Processing/nlpHandler');
const { processImageContent, processVideoContent } = require('./vision_service');
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

app.post('/process-text', async (req, res) => {
    const { text } = req.body;
    if (!text) {
        return res.status(400).json({ error: 'Invalid text input' });
    }
    try {
        const result = await processTextContent(text);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: 'Error processing text content' });
    }
});

app.post('/generate-text', async (req, res) => {
    const { prompt } = req.body;
    if (!prompt) {
        return res.status(400).json({ error: 'Invalid prompt input' });
    }
    try {
        const generatedText = await generateTextContent(prompt);
        res.json({ generatedText });
    } catch (error) {
        res.status(500).json({ error: 'Error generating text content' });
    }
});

app.post('/ingest-external-data', async (req, res) => {
    const { sourceUrl } = req.body;
    if (!sourceUrl) {
        return res.status(400).json({ error: 'Invalid source URL' });
    }
    try {
        const data = await ingestExternalData(sourceUrl);
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Error ingesting external data' });
    }
});

app.post('/integrate-data-kg', async (req, res) => {
    const { data } = req.body;
    if (!data) {
        return res.status(400).json({ error: 'Invalid data input' });
    }
    try {
        await integrateDataIntoKG(data);
        res.json({ message: 'Data integrated into knowledge graph successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error integrating data into knowledge graph' });
    }
});

app.post('/query-kg', async (req, res) => {
    const { query } = req.body;
    if (!query) {
        return res.status(400).json({ error: 'Invalid query input' });
    }
    try {
        const result = await queryKnowledgeGraph(query);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: 'Error querying knowledge graph' });
    }
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
    const result = processCMSData(contentData);
    res.json(result);
});

// Placeholder routes for additional components

// User Interaction Data route
app.post('/user-interaction', (req, res) => {
    const { interactionData } = req.body;
    if (!interactionData) {
        return res.status(400).json({ error: 'Invalid interaction data' });
    }
    try {
        const processedData = processUserInteractionData(interactionData);
        res.json(processedData);
    } catch (error) {
        res.status(500).json({ error: 'Error processing user interaction data' });
    }
});

// External Data Sources route
app.post('/external-data', async (req, res) => {
    const { sourceUrl } = req.body;
    if (!sourceUrl) {
        return res.status(400).json({ error: 'Invalid source URL' });
    }
    try {
        const response = await fetch(sourceUrl);
        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching external data' });
    }
});

// Image/Video Content route
app.post('/image-video', async (req, res) => {
    const { contentType, contentBuffer } = req.body;
    if (!contentType || !contentBuffer) {
        return res.status(400).json({ error: 'Invalid content input' });
    }
    try {
        let result;
        if (contentType === 'image') {
            result = await processImageContent(contentBuffer);
        } else if (contentType === 'video') {
            result = await processVideoContent(contentBuffer);
        } else {
            return res.status(400).json({ error: 'Unsupported content type' });
        }
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: 'Error processing content' });
    }
});

// Text Content route
app.post('/text-content', (req, res) => {
    res.json({ message: 'Text Content route placeholder' });
});

// Recommendation Engine route
app.post('/recommendation', (req, res) => {
    const { userData } = req.body;
    if (!userData) {
        return res.status(400).json({ error: 'Invalid user data' });
    }
    const recommendations = generateRecommendations(userData);
    res.json(recommendations);
});

// Automated Content Generation route
app.post('/automated-content', (req, res) => {
    res.json({ message: 'Automated Content Generation route placeholder' });
});

// Content Quality Assessment route
app.post('/content-quality', (req, res) => {
    res.json({ message: 'Content Quality Assessment route placeholder' });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
