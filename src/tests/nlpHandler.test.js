const tf = require('@tensorflow/tfjs-node');
const { processTextContent, generateTextContent, answerQuestion } = require('../Natural_Language_Processing/nlpHandler');
let server;

beforeAll((done) => {
    const app = require('../server'); // Import the actual server instance
    server = app.listen(0, () => {
        const port = server.address().port;
        console.log(`Test server running on port ${port}`);
        done();
    });
});

afterAll((done) => {
    server.close(done);
});

describe('NLP Handler', () => {
    it('should process text content without errors', async () => {
        const text = 'Sample text for processing';
        const predictions = await processTextContent(text);
        expect(predictions).toBeDefined();
        expect(predictions.shape).toBeDefined();
    });

    it('should generate text content without errors', async () => {
        const prompt = 'Once upon a time';
        const generatedText = await generateTextContent(prompt);
        expect(generatedText).toBeDefined();
        expect(typeof generatedText).toBe('string');
    });

    it('should answer questions based on a passage of text', async () => {
        const question = 'What is the capital of France?';
        const passage = 'The capital of France is Paris.';
        const answers = await answerQuestion(question, passage);
        expect(answers).toBeDefined();
        expect(Array.isArray(answers)).toBe(true);
        expect(answers.length).toBeGreaterThan(0);
    });
});
