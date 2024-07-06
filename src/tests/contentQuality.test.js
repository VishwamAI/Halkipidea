const request = require('supertest');

describe('POST /content-quality', () => {
    let server;
    let port;
    let app;

    beforeAll((done) => {
        // Mock the assessContentQuality function before importing the server
        jest.spyOn(require('../contentQualityAssessor'), 'assessContentQuality').mockImplementation(async () => {
            console.log('Mock assessContentQuality called');
            throw new Error('Error assessing content quality');
        });

        app = require('../server'); // Import the actual server instance after mocking

        server = app.listen(0, () => {
            port = server.address().port;
            console.log(`Test server running on port ${port}`);
            done();
        });
    });

    afterAll((done) => {
        server.close(done);
    });

    it('should return 400 if content is not provided', async () => {
        const response = await request(app)
            .post('/content-quality')
            .send({});
        expect(response.status).toBe(400);
        expect(response.body.error).toBe('Invalid content input');
    });

    it('should return 200 and the quality score if content is provided', async () => {
        const content = 'Sample content for quality assessment with fact, data, evidence, research, study, Halkipedia, AI, knowledge, content, quality';
        const response = await request(app)
            .post('/content-quality')
            .send({ content });
        expect(response.status).toBe(200);
        const words = content.split(/\s+/).length;
        const sentences = content.split(/[.!?]/).length;
        const syllables = content.split(/[aeiouy]+/).length - 1;
        const readabilityScore = 206.835 - (1.015 * (words / sentences)) - (84.6 * (syllables / words));
        const accuracyScore = 100; // Actual value from calculateAccuracy function
        const relevanceScore = 100; // Actual value from calculateRelevance function
        const expectedQualityScore = (readabilityScore + accuracyScore + relevanceScore) / 3;
        expect(response.body).toEqual({ qualityScore: expectedQualityScore });
    });

    it('should return 500 if there is an error during content quality assessment', async () => {
        const content = 'Sample content for quality assessment';
        const response = await request(app)
            .post('/content-quality')
            .send({ content });
        console.log('Response status:', response.status);
        console.log('Response body:', response.body);
        expect(response.status).toBe(500);
        expect(response.body.error).toBe('Error assessing content quality');
    });
});
