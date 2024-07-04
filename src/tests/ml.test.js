const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const { mlModel } = require('../ML_Models/models');
const tf = require('@tensorflow/tfjs-node');

const app = express();
app.use(bodyParser.json());

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

describe('POST /ml', () => {
    it('should return 400 if inputData is not provided', async () => {
        const response = await request(app)
            .post('/ml')
            .send({});
        expect(response.status).toBe(400);
        expect(response.body.error).toBe('Invalid input data');
    });

    it('should return 200 and the prediction result if inputData is provided', async () => {
        const inputData = [1, 2, 3, 4];
        const response = await request(app)
            .post('/ml')
            .send({ inputData });
        expect(response.status).toBe(200);
        // Add more assertions based on the expected result of the model prediction
    });

    it('should return 500 if there is an error during model prediction', async () => {
        const inputData = 'invalid data';
        const response = await request(app)
            .post('/ml')
            .send({ inputData });
        expect(response.status).toBe(500);
        expect(response.body.error).toBe('Error processing ML model prediction');
    });
});
