import * as tf from '@tensorflow/tfjs-node';

async function testModelLoading() {
    try {
        // Log the path to the model file
        const modelPath = 'file://./model.json';
        console.log('Loading model from path:', modelPath);

        // Load the pre-trained MobileNet model
        const model = await tf.loadLayersModel(modelPath);
        console.log('Model loaded successfully:', model);

        // Log the model summary
        model.summary();
    } catch (error) {
        console.error('Error loading model:', error);
    }
}

testModelLoading();
