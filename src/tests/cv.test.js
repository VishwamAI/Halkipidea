const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const tf = require('@tensorflow/tfjs-node');

jest.mock('@tensorflow/tfjs-node', () => {
    const actualTf = jest.requireActual('@tensorflow/tfjs-node');
    return {
        ...actualTf,
        loadLayersModel: jest.fn().mockImplementation(() => ({
            predict: jest.fn().mockReturnValue({ data: [0.1, 0.9] })
        }))
    };
});

const app = express();
app.use(bodyParser.json());

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

describe('POST /cv', () => {
    it('should return 400 if inputData is not provided', async () => {
        const response = await request(app)
            .post('/cv')
            .send({});
        expect(response.status).toBe(400);
        expect(response.body.error).toBe('Invalid input data');
    });

    it('should return 200 and the prediction result if inputData is provided', async () => {
        const inputData = [1, 2, 3, 4];
        const response = await request(app)
            .post('/cv')
            .send({ inputData });
        expect(response.status).toBe(200);
        expect(response.body).toEqual({ data: [0.1, 0.9] });
    });

    it('should return 500 if there is an error during model prediction', async () => {
        const inputData = 'invalid data';
        const response = await request(app)
            .post('/cv')
            .send({ inputData });
        expect(response.status).toBe(500);
        expect(response.body.error).toBe('Error processing CV model prediction');
    });
});
