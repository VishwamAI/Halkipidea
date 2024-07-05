import * as tf from '@tensorflow/tfjs-node';
import * as qna from '@tensorflow-models/qna';
import { processTextContent, generateTextContent, answerQuestion } from '../Natural_Language_Processing/nlpHandler';
import fetch from 'node-fetch';

// Assign node-fetch to global fetch
global.fetch = fetch;

describe('NLP Handler Functions', () => {
    test('processTextContent should process text and return a tensor', async () => {
        const text = 'Hello, world!';
        const result = await processTextContent(text);
        expect(result).toBeInstanceOf(tf.Tensor);
    });

    test('generateTextContent should generate text based on a prompt', async () => {
        const prompt = 'Once upon a time';
        const result = await generateTextContent(prompt);
        expect(typeof result).toBe('string');
    });

    test('answerQuestion should return answers based on a question and passage', async () => {
        const question = 'What is the capital of France?';
        const passage = 'The capital of France is Paris.';
        const result = await answerQuestion(question, passage);
        expect(Array.isArray(result)).toBe(true);
        expect(result.length).toBeGreaterThan(0);
    });
});
