"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nlpHandler_1 = require("./nlpHandler");
const tokenizer_1 = __importDefault(require("./tokenizer"));
// Polyfill fetch function for Node.js environment
if (!globalThis.fetch) {
    globalThis.fetch = require('node-fetch');
}
describe('NLP Handler', () => {
    it('should return answers based on a passage of text', () => __awaiter(void 0, void 0, void 0, function* () {
        const question = 'What is the capital of France?';
        const passage = 'Paris is the capital of France. It is known for its art, culture, and history.';
        const answers = yield (0, nlpHandler_1.answerQuestion)(question, passage);
        expect(answers).toBeDefined();
        expect(answers.length).toBeGreaterThan(0);
        expect(answers[0].text).toBe('Paris');
    }));
});
describe('Tokenizer', () => {
    it('should clean text correctly', () => {
        const tokenizer = new tokenizer_1.default();
        const text = 'Hello, World!';
        const cleanedText = tokenizer.cleanText(text);
        expect(cleanedText).toEqual(['hello', 'world']);
    });
    it('should fit on texts and convert texts to sequences', () => {
        const tokenizer = new tokenizer_1.default();
        const texts = ['Hello, World!', 'Goodbye, World!'];
        tokenizer.fitOnTexts(texts);
        const sequences = tokenizer.textsToSequences(texts);
        expect(sequences.length).toBe(2);
        expect(sequences[0].length).toBeGreaterThan(0);
        expect(sequences[1].length).toBeGreaterThan(0);
    });
    it('should convert tokenizer to JSON and back', () => {
        const tokenizer = new tokenizer_1.default();
        const texts = ['Hello, World!', 'Goodbye, World!'];
        tokenizer.fitOnTexts(texts);
        const json = tokenizer.toJson();
        const newTokenizer = tokenizer_1.default.fromJson(json);
        const sequences = newTokenizer.textsToSequences(texts);
        expect(sequences.length).toBe(2);
        expect(sequences[0].length).toBeGreaterThan(0);
        expect(sequences[1].length).toBeGreaterThan(0);
    });
});
