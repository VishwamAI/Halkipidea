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
const tf = __importStar(require("@tensorflow/tfjs-node"));
const vision_service_1 = require("./vision_service");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
// Polyfill fetch for TensorFlow.js
if (!globalThis.fetch) {
    globalThis.fetch = require('node-fetch');
}
describe('processImageContent', () => {
    it('should process an image buffer and return predictions', () => __awaiter(void 0, void 0, void 0, function* () {
        // Load a sample image buffer for testing
        const imagePath = path_1.default.resolve(__dirname, '../../src/Computer_Vision/test_image.png');
        const imageBuffer = fs_1.default.readFileSync(imagePath);
        // Call the processImageContent function
        const predictions = yield (0, vision_service_1.processImageContent)(imageBuffer);
        // Check if the predictions are a tensor
        expect(predictions).toBeInstanceOf(tf.Tensor);
        // Check if the predictions tensor has the expected shape
        expect(predictions.shape).toEqual([1, 1000]); // Assuming MobileNet returns 1000 class predictions
    }));
});
