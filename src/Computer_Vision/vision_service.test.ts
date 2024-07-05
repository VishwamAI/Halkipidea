import * as tf from '@tensorflow/tfjs-node';
import { processImageContent } from './vision_service';
import fs from 'fs';
import path from 'path';

// Polyfill fetch for TensorFlow.js
if (!globalThis.fetch) {
    globalThis.fetch = require('node-fetch');
}

// Mock TensorFlow.js functions
jest.mock('@tensorflow/tfjs-node', () => {
    const actualTf = jest.requireActual('@tensorflow/tfjs-node');
    return {
        ...actualTf,
        loadLayersModel: jest.fn().mockImplementation(() => ({
            predict: jest.fn().mockReturnValue(tf.tensor([0.1, 0.9]))
        }))
    };
});

describe('processImageContent', () => {
    it('should process an image buffer and return predictions', async () => {
        // Load a sample image buffer for testing
        const imagePath = path.resolve(__dirname, 'test_image.png');
        const imageBuffer = fs.readFileSync(imagePath);

        // Call the processImageContent function
        const predictions = await processImageContent(imageBuffer);

        // Check if the predictions are a tensor
        expect(predictions).toBeInstanceOf(tf.Tensor);

        // Check if the predictions tensor has the expected shape
        expect(predictions.shape).toEqual([1, 1000]); // Assuming MobileNet returns 1000 class predictions
    });
});
