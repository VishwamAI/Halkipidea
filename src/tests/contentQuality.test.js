const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

app.post('/content-quality', async (req, res) => {
    const { content } = req.body;
    if (!content) {
        return res.status(400).json({ error: 'Invalid content input' });
    }
    try {
        const qualityScore = await assessContentQuality(content);
        res.json({ qualityScore });
    } catch (error) {
        res.status(500).json({ error: 'Error assessing content quality' });
    }
});

async function assessContentQuality(content) {
    // Placeholder logic for content quality assessment
    return 85; // Static quality score
}

describe('POST /content-quality', () => {
    it('should return 400 if content is not provided', async () => {
        const response = await request(app)
            .post('/content-quality')
            .send({});
        expect(response.status).toBe(400);
        expect(response.body.error).toBe('Invalid content input');
    });

    it('should return 200 and the quality score if content is provided', async () => {
        const content = 'Sample content for quality assessment';
        const response = await request(app)
            .post('/content-quality')
            .send({ content });
        expect(response.status).toBe(200);
        expect(response.body).toEqual({ qualityScore: 85 });
    });

    it('should return 500 if there is an error during content quality assessment', async () => {
        const content = 'Sample content for quality assessment';
        jest.spyOn(global, 'assessContentQuality').mockImplementation(() => {
            throw new Error('Error assessing content quality');
        });
        const response = await request(app)
            .post('/content-quality')
            .send({ content });
        expect(response.status).toBe(500);
        expect(response.body.error).toBe('Error assessing content quality');
    });
});
