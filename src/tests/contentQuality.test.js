const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

async function assessContentQuality(content) {
    const readabilityScore = calculateReadability(content);
    const accuracyScore = calculateAccuracy(content);
    const relevanceScore = calculateRelevance(content);
    const qualityScore = (readabilityScore + accuracyScore + relevanceScore) / 3;
    return qualityScore;
}

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

// Function to calculate the readability score of the content
function calculateReadability(content) {
    const words = content.split(/\s+/).length;
    const sentences = content.split(/[.!?]/).length;
    const syllables = content.split(/[aeiouy]+/).length - 1;
    const readabilityScore = 206.835 - (1.015 * (words / sentences)) - (84.6 * (syllables / words));
    return readabilityScore;
}

// Function to calculate the accuracy score of the content
function calculateAccuracy(content) {
    const factualKeywords = ['fact', 'data', 'evidence', 'research', 'study'];
    let accuracyScore = 0;
    factualKeywords.forEach(keyword => {
        if (content.includes(keyword)) {
            accuracyScore += 20;
        }
    });
    accuracyScore = Math.min(accuracyScore, 100);
    return accuracyScore;
}

// Function to calculate the relevance score of the content
function calculateRelevance(content) {
    const relevantKeywords = ['Halkipedia', 'AI', 'knowledge', 'content', 'quality'];
    let relevanceScore = 0;
    relevantKeywords.forEach(keyword => {
        if (content.includes(keyword)) {
            relevanceScore += 20;
        }
    });
    relevanceScore = Math.min(relevanceScore, 100);
    return relevanceScore;
}

module.exports = { assessContentQuality };

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
        expect(response.body).toEqual({ qualityScore: (calculateReadability(content) + calculateAccuracy(content) + calculateRelevance(content)) / 3 });
    });

    it('should return 500 if there is an error during content quality assessment', async () => {
        jest.spyOn(module.exports, 'assessContentQuality').mockImplementation(async () => {
            throw new Error('Error assessing content quality');
        });
        const content = 'Sample content for quality assessment';
        const response = await request(app)
            .post('/content-quality')
            .send({ content });
        expect(response.status).toBe(500);
        expect(response.body.error).toBe('Error assessing content quality');
    });
});

describe('Content Quality Functions', () => {
    it('should calculate readability score correctly', () => {
        const content = 'This is a simple sentence.';
        const score = calculateReadability(content);
        expect(score).toBeCloseTo(68.94, 2);
    });

    it('should calculate accuracy score correctly', () => {
        const content = 'This content contains fact and data.';
        const score = calculateAccuracy(content);
        expect(score).toBe(40);
    });

    it('should calculate relevance score correctly', () => {
        const content = 'Halkipedia is an AI knowledge content platform that ensures quality.';
        const score = calculateRelevance(content);
        expect(score).toBe(100);
    });
});
