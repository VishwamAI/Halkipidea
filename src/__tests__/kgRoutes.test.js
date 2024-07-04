const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const { ingestExternalData, integrateDataIntoKG, queryKnowledgeGraph } = require('../Knowledge_Graph/kgHandler');

const app = express();
app.use(bodyParser.json());

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

describe('Knowledge Graph Routes', () => {
    it('should ingest external data successfully', async () => {
        const response = await request(app)
            .post('/ingest-external-data')
            .send({ sourceUrl: 'http://example.com/data' });
        expect(response.status).toBe(200);
        expect(response.body).toBeDefined();
    });

    it('should return error for invalid source URL', async () => {
        const response = await request(app)
            .post('/ingest-external-data')
            .send({ sourceUrl: '' });
        expect(response.status).toBe(400);
        expect(response.body.error).toBe('Invalid source URL');
    });

    it('should integrate data into knowledge graph successfully', async () => {
        const response = await request(app)
            .post('/integrate-data-kg')
            .send({ data: { key: 'value' } });
        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Data integrated into knowledge graph successfully');
    });

    it('should return error for invalid data input', async () => {
        const response = await request(app)
            .post('/integrate-data-kg')
            .send({ data: '' });
        expect(response.status).toBe(400);
        expect(response.body.error).toBe('Invalid data input');
    });

    it('should query knowledge graph successfully', async () => {
        const response = await request(app)
            .post('/query-kg')
            .send({ query: 'MATCH (n) RETURN n' });
        expect(response.status).toBe(200);
        expect(response.body).toBeDefined();
    });

    it('should return error for invalid query input', async () => {
        const response = await request(app)
            .post('/query-kg')
            .send({ query: '' });
        expect(response.status).toBe(400);
        expect(response.body.error).toBe('Invalid query input');
    });
});
