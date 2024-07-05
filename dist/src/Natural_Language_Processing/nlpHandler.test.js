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
Object.defineProperty(exports, "__esModule", { value: true });
const nlpHandler_1 = require("./nlpHandler");
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
