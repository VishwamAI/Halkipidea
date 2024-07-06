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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.processTextContent = processTextContent;
exports.generateTextContent = generateTextContent;
exports.answerQuestion = answerQuestion;
// Polyfill fetch function for Node.js environment
if (!globalThis.fetch) {
    globalThis.fetch = require('node-fetch');
}
const tf = __importStar(require("@tensorflow/tfjs-node"));
const qna = __importStar(require("@tensorflow-models/qna"));
const tokenizer_js_1 = __importDefault(require("./tokenizer.js"));
// Function to process text content
function processTextContent(text) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Tokenize text
            const tokenizer = new tokenizer_js_1.default();
            tokenizer.fitOnTexts([text]);
            const sequences = tokenizer.textsToSequences([text]);
            const textTensor = tf.tensor2d(sequences, [1, sequences[0].length]);
            // Load pre-trained NLP model
            const model = yield tf.loadLayersModel('file://./src/NLP/models/model.json');
            // Ensure input shape is specified
            const inputShape = [1, textTensor.shape[1]];
            const predictions = model.predict(textTensor.reshape(inputShape));
            // Log tensor shapes for debugging
            console.log('Text Tensor Shape:', textTensor.shape);
            console.log('Input Shape:', inputShape);
            console.log('Predictions Shape:', predictions.shape);
            return predictions;
        }
        catch (error) {
            console.error('Error in processTextContent:', error);
            throw error;
        }
    });
}
// Function to generate text content
function generateTextContent(prompt) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Convert prompt to tensor
            const promptTensor = tf.tensor1d(prompt.split('').map(char => char.charCodeAt(0)));
            // Load pre-trained text generation model
            const model = yield tf.loadLayersModel('file://./src/NLP/models/model.json');
            // Ensure input shape is specified
            const inputShape = [1, promptTensor.shape[0]];
            const generatedTensor = model.predict(promptTensor.reshape(inputShape));
            // Log tensor shapes for debugging
            console.log('Prompt Tensor Shape:', promptTensor.shape);
            console.log('Input Shape:', inputShape);
            console.log('Generated Tensor Shape:', generatedTensor.shape);
            // Convert tensor back to string
            const generatedText = String.fromCharCode(...(yield generatedTensor.data()));
            return generatedText;
        }
        catch (error) {
            console.error('Error in generateTextContent:', error);
            throw error;
        }
    });
}
// Function to answer questions based on a passage of text
function answerQuestion(question, passage) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Load the QnA model
            const model = yield qna.load({
                modelUrl: 'https://storage.googleapis.com/kagglesdsdata/models/1207/1432/model.json?X-Goog-Algorithm=GOOG4-RSA-SHA256&X-Goog-Credential=gcp-kaggle-com%40kaggle-161607.iam.gserviceaccount.com%2F20240705%2Fauto%2Fstorage%2Fgoog4_request&X-Goog-Date=20240705T183638Z&X-Goog-Expires=259200&X-Goog-SignedHeaders=host&X-Goog-Signature=5570d3aa475dbe02b52ab28081d395d1f9acd42e5969086b2570f552e8b53d6f561d86c8359d24e429db52073686d0e75c7ef3591567fdd7d1b26130f9307bbfc79356f6a8310bcb9c556a05718d0f8d2455da9957aa2be0c3041ab351caacfebcb23b1562fd239c80dd140d2ab9a0b06ae961c120f5f5a635efd726faf46546f45f889bbb90eb379ee9a98e036dc4a31730e996287ed7573fecaa7c76087d9ac6eea4bc35f585c9c997e4f00e2388fd3f696ce18e5dd85bdee58dd22fa3621ff7ec0957650ff81efb7b3623e609b886627eccbce987cd1f3b0e79442ce40c78c036c987c17b92264b8bafd828f749b7cf770d9c36c1a2a93a833bead78bd0e7'
            });
            // Log the question and passage for debugging
            console.log('Question:', question);
            console.log('Passage:', passage);
            // Find the answers
            const answers = yield model.findAnswers(question, passage);
            // Log the answers for debugging
            console.log('Answers:', answers);
            return answers;
        }
        catch (error) {
            console.error('Error in answerQuestion:', error);
            throw error;
        }
    });
}
