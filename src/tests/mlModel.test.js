const tf = require('@tensorflow/tfjs');
const { mlModel } = require('../ML_Models/models');

describe('mlModel', () => {
    it('should load the ML model without errors', async () => {
        try {
            const model = await mlModel();
            expect(model).toBeDefined();
            expect(model.layers).toBeDefined();
            expect(model.layers.length).toBeGreaterThan(0);
        } catch (error) {
            throw new Error('Failed to load ML model: ' + error.message);
        }
    });
});
