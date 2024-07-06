import { answerQuestion } from './nlpHandler';
import Tokenizer, { tokenizerFromJson } from './tokenizer';

// Polyfill fetch function for Node.js environment
if (!globalThis.fetch) {
    globalThis.fetch = require('node-fetch');
}

describe('NLP Handler', () => {
    it('should return answers based on a passage of text', async () => {
        const question = 'What is the capital of France?';
        const passage = 'Paris is the capital of France. It is known for its art, culture, and history.';

        const answers = await answerQuestion(question, passage);

        expect(answers).toBeDefined();
        expect(answers.length).toBeGreaterThan(0);
        expect(answers[0].text).toBe('Paris');
    });
});

describe('Tokenizer', () => {
    it('should clean text correctly', () => {
        const tokenizer = new Tokenizer();
        const text = 'Hello, World!';
        const cleanedText = tokenizer.cleanText(text);
        expect(cleanedText).toEqual(['hello', 'world']);
    });

    it('should fit on texts and convert texts to sequences', () => {
        const tokenizer = new Tokenizer();
        const texts = ['Hello, World!', 'Goodbye, World!'];
        tokenizer.fitOnTexts(texts);
        const sequences = tokenizer.textsToSequences(texts);
        expect(sequences.length).toBe(2);
        expect(sequences[0].length).toBeGreaterThan(0);
        expect(sequences[1].length).toBeGreaterThan(0);
    });

    it('should convert tokenizer to JSON and back', () => {
        const tokenizer = new Tokenizer();
        const texts = ['Hello, World!', 'Goodbye, World!'];
        tokenizer.fitOnTexts(texts);
        const json = tokenizer.toJson();
        const newTokenizer = Tokenizer.fromJson(json);
        const sequences = newTokenizer.textsToSequences(texts);
        expect(sequences.length).toBe(2);
        expect(sequences[0].length).toBeGreaterThan(0);
        expect(sequences[1].length).toBeGreaterThan(0);
    });
});
