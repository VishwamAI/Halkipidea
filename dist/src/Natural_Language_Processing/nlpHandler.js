"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.processTextContent = processTextContent;
exports.generateTextContent = generateTextContent;
exports.answerQuestion = answerQuestion;
const tf = __importStar(require("@tensorflow/tfjs-node"));
const qna = __importStar(require("@tensorflow-models/qna"));
// Function to process text content
function processTextContent(text) {
    return __awaiter(this, void 0, void 0, function* () {
        // Convert text to tensor
        const textTensor = tf.tensor1d(text.split('').map(char => char.charCodeAt(0)));
        // Load pre-trained NLP model
        const model = yield tf.loadLayersModel('file://./src/NLP/models/model.json');
        // Ensure input shape is specified
        const inputShape = [1, textTensor.shape[0]];
        const predictions = model.predict(textTensor.reshape(inputShape));
        return predictions;
    });
}
// Function to generate text content
function generateTextContent(prompt) {
    return __awaiter(this, void 0, void 0, function* () {
        // Convert prompt to tensor
        const promptTensor = tf.tensor1d(prompt.split('').map(char => char.charCodeAt(0)));
        // Load pre-trained text generation model
        const model = yield tf.loadLayersModel('file://./src/NLP/models/model.json');
        // Ensure input shape is specified
        const inputShape = [1, promptTensor.shape[0]];
        const generatedTensor = model.predict(promptTensor.reshape(inputShape));
        // Convert tensor back to string
        const generatedText = String.fromCharCode(...(yield generatedTensor.data()));
        return generatedText;
    });
}
// Function to answer questions based on a passage of text
function answerQuestion(question, passage) {
    return __awaiter(this, void 0, void 0, function* () {
        // Load the QnA model
        const model = yield qna.load({
            modelUrl: 'https://cdn.jsdelivr.net/npm/@tensorflow-models/qna'
        });
        // Find the answers
        const answers = yield model.findAnswers(question, passage);
        return answers;
    });
}
