import { answerQuestion } from './nlpHandler';

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
