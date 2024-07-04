const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const { generateTextContent } = require('../Natural_Language_Processing/nlpHandler');
const app = express();

app.use(bodyParser.json());

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

describe('POST /generate-text', () => {
    it('should generate text based on the provided prompt', async () => {
        const prompt = 'Once upon a time';
        const response = await request(app)
            .post('/generate-text')
            .send({ prompt });

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('generatedText');
        expect(typeof response.body.generatedText).toBe('string');
    });

    it('should return 400 if prompt is not provided', async () => {
        const response = await request(app)
            .post('/generate-text')
            .send({});

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('error', 'Invalid prompt input');
    });

    it('should return 500 if an error occurs during text generation', async () => {
        const prompt = 'This will cause an error';
        jest.spyOn(global, 'generateTextContent').mockImplementation(() => {
            throw new Error('Test error');
        });

        const response = await request(app)
            .post('/generate-text')
            .send({ prompt });

        expect(response.status).toBe(500);
        expect(response.body).toHaveProperty('error', 'Error generating text content');
    });
});
