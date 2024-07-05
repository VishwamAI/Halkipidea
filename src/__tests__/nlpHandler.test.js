import * as tf from '@tensorflow/tfjs-node';
import * as qna from '@tensorflow-models/qna';
import { processTextContent, generateTextContent, answerQuestion } from '../Natural_Language_Processing/nlpHandler';

jest.mock('@tensorflow/tfjs-node', () => {
    return {
        ...tf,
        loadLayersModel: jest.fn().mockResolvedValue({
            predict: jest.fn().mockReturnValue(tf.tensor([0.1, 0.9]))
        })
    };
});

jest.mock('@tensorflow-models/qna', () => ({
    load: jest.fn().mockResolvedValue({
        findAnswers: jest.fn().mockResolvedValue([{ text: 'Paris', score: 0.9 }])
    })
}));

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
