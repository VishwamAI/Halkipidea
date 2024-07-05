const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const { assessContentQuality } = require('../contentQualityAssessor');

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
        console.error('Error assessing content quality:', error);
        res.status(500).json({ error: 'Error assessing content quality' });
    }
});

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
        const readabilityScore = 68.94; // Placeholder value from calculateReadability function
        const accuracyScore = 40; // Placeholder value from calculateAccuracy function
        const relevanceScore = 100; // Placeholder value from calculateRelevance function
        const expectedQualityScore = (readabilityScore + accuracyScore + relevanceScore) / 3;
        expect(response.body).toEqual({ qualityScore: expectedQualityScore });
    });

    it('should return 500 if there is an error during content quality assessment', async () => {
        const mockAssessContentQuality = jest.spyOn(require('../contentQualityAssessor'), 'assessContentQuality').mockImplementation(async () => {
            console.log('Mock assessContentQuality called');
            throw new Error('Error assessing content quality');
        });
        const content = 'Sample content for quality assessment';
        const response = await request(app)
            .post('/content-quality')
            .send({ content });
        expect(response.status).toBe(500);
        expect(response.body.error).toBe('Error assessing content quality');
        mockAssessContentQuality.mockRestore();
    });
});
