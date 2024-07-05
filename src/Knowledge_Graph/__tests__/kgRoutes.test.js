import request from 'supertest';
import app from '../../server';

describe('Knowledge Graph Routes', () => {
    it('should integrate data into the knowledge graph', async () => {
        const response = await request(app)
            .post('/kg/integrate')
            .send({
                data: {
                    id: '1',
                    name: 'Test Entity',
                    type: 'Test Type',
                    properties: {
                        key: 'value'
                    }
                }
            });
        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Data integrated successfully');
    });

    it('should query data from the knowledge graph', async () => {
        const response = await request(app)
            .get('/kg/query')
            .query({ id: '1' });
        expect(response.status).toBe(200);
        expect(response.body.data).toEqual({
            id: '1',
            name: 'Test Entity',
            type: 'Test Type',
            properties: {
                key: 'value'
            }
        });
    });
});
