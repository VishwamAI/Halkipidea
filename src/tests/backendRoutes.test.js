const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());

const { orchestrateAIModels } = require('../AI_Orchestrator/orchestrator');
const { processText } = require('../Natural_Language_Processing/nlp');
const { mlModel, cvModel, kgModel } = require('../ML_Models/models');
const { processCMSData } = require('../cmsHandler');
const tf = require('@tensorflow/tfjs-node');

jest.mock('@tensorflow/tfjs-node', () => ({
    ...jest.requireActual('@tensorflow/tfjs-node'),
    loadLayersModel: jest.fn().mockImplementation(() => ({
        predict: jest.fn().mockReturnValue(tf.tensor([0.1, 0.9]))
    }))
}));

app.post('/orchestrate', orchestrateAIModels);
app.post('/nlp', (req, res) => {
    const { text } = req.body;
    const result = processText(text);
    res.json(result);
});
app.post('/ml', (req, res) => {
    const { inputData } = req.body;
    if (!inputData) {
        return res.status(400).json({ error: 'Invalid input data' });
    }
    const model = tf.loadLayersModel();
    try {
        const tensorInput = tf.tensor(inputData);
        const result = model.predict(tensorInput);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: 'Error processing ML model prediction' });
    }
});
app.post('/cv', (req, res) => {
    const { inputData } = req.body;
    if (!inputData) {
        return res.status(400).json({ error: 'Invalid input data' });
    }
    const model = tf.loadLayersModel();
    try {
        const tensorInput = tf.tensor(inputData);
        const result = model.predict(tensorInput);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: 'Error processing CV model prediction' });
    }
});
app.post('/kg', (req, res) => {
    const { inputData } = req.body;
    if (!inputData) {
        return res.status(400).json({ error: 'Invalid input data' });
    }
    const model = tf.loadLayersModel();
    try {
        const tensorInput = tf.tensor(inputData);
        const result = model.predict(tensorInput);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: 'Error processing KG model prediction' });
    }
});
app.post('/cms', (req, res) => {
    const { contentData } = req.body;
    if (!contentData) {
        return res.status(400).json({ error: 'Invalid content data' });
    }
    const result = processCMSData(contentData);
    res.json(result);
});

describe('Backend Routes', () => {
    it('should process NLP data correctly', async () => {
        const response = await request(app)
            .post('/nlp')
            .send({ text: 'Sample text for NLP' });
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('processedText');
    });

    it('should process ML data correctly', async () => {
        const response = await request(app)
            .post('/ml')
            .send({ inputData: [1, 2, 3, 4] });
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('predictions');
    });

    it('should process CV data correctly', async () => {
        const response = await request(app)
            .post('/cv')
            .send({ inputData: [5, 6, 7, 8] });
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('predictions');
    });

    it('should process KG data correctly', async () => {
        const response = await request(app)
            .post('/kg')
            .send({ inputData: [9, 10, 11, 12] });
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('predictions');
    });

    it('should process CMS data correctly', async () => {
        const response = await request(app)
            .post('/cms')
            .send({ contentData: { title: 'Sample Title', body: 'Sample body text.' } });
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('processedData');
    });
});
