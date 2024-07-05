// Polyfill fetch function for Node.js environment
if (!globalThis.fetch) {
    globalThis.fetch = require('node-fetch');
}

import * as tf from '@tensorflow/tfjs-node';
import * as qna from '@tensorflow-models/qna';

// Function to process text content
export async function processTextContent(text: string): Promise<tf.Tensor> {
    // Convert text to tensor
    const textTensor = tf.tensor1d(text.split('').map(char => char.charCodeAt(0)));

    // Load pre-trained NLP model
    const model = await tf.loadLayersModel('file://./src/NLP/models/model.json');
    // Ensure input shape is specified
    const inputShape = [1, textTensor.shape[0]];
    const predictions = model.predict(textTensor.reshape(inputShape)) as tf.Tensor;

    return predictions;
}

// Function to generate text content
export async function generateTextContent(prompt: string): Promise<string> {
    // Convert prompt to tensor
    const promptTensor = tf.tensor1d(prompt.split('').map(char => char.charCodeAt(0)));

    // Load pre-trained text generation model
    const model = await tf.loadLayersModel('file://./src/NLP/models/model.json');
    // Ensure input shape is specified
    const inputShape = [1, promptTensor.shape[0]];
    const generatedTensor = model.predict(promptTensor.reshape(inputShape)) as tf.Tensor;

    // Convert tensor back to string
    const generatedText = String.fromCharCode(...(await generatedTensor.data()));

    return generatedText;
}

// Function to answer questions based on a passage of text
export async function answerQuestion(question: string, passage: string): Promise<any> {
    // Load the QnA model
    const model = await qna.load({
        modelUrl: 'https://cdn.jsdelivr.net/npm/@tensorflow-models/qna'
    });

    // Find the answers
    const answers = await model.findAnswers(question, passage);

    return answers;
}
