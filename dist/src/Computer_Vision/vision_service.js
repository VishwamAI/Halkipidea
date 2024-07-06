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
exports.processImageContent = processImageContent;
exports.processVideoContent = processVideoContent;
const tf = __importStar(require("@tensorflow/tfjs-node"));
// Function to process image content
function processImageContent(imageBuffer) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Log the first few bytes of the image buffer for debugging
            console.log('First few bytes of image buffer:', imageBuffer.slice(0, 20));
            // Convert the image buffer to a base64 string for inspection
            const base64Image = imageBuffer.toString('base64');
            console.log('Base64 image string:', base64Image.slice(0, 100)); // Log the first 100 characters
            // Convert the Node.js Buffer to a Uint8Array
            const uint8Array = new Uint8Array(imageBuffer);
            // Decode the image buffer to a tensor
            console.log('Attempting to decode image buffer to tensor...');
            const imageTensor = yield tf.node.decodeImage(uint8Array, 3); // Specify 3 channels (RGB)
            console.log('Image tensor shape after decoding:', imageTensor.shape);
            console.log('Image tensor dtype after decoding:', imageTensor.dtype);
            // Normalize the image tensor
            const processedImage = imageTensor.div(tf.scalar(255.0));
            console.log('Image tensor shape after normalization:', processedImage.shape);
            console.log('Image tensor dtype after normalization:', processedImage.dtype);
            // Log the path to the model file
            const modelPath = 'file://./src/Computer_Vision/models/model.json';
            console.log('Loading model from path:', modelPath);
            // Load the pre-trained MobileNet model
            const model = yield tf.loadLayersModel(modelPath);
            const predictions = model.predict(processedImage.expandDims(0));
            console.log('Predictions tensor shape:', predictions.shape);
            return predictions;
        }
        catch (error) {
            console.error('Error processing image content:', error);
            console.error('Image buffer:', imageBuffer);
            throw new Error('Failed to process image content');
        }
    });
}
// Function to process video content
function processVideoContent(videoBuffer) {
    return __awaiter(this, void 0, void 0, function* () {
        // Placeholder logic for processing video content
        const videoFrames = []; // Placeholder for video frames extraction logic
        // Mock the video recognition model loading process for testing
        const model = {
            predict: (input) => tf.tensor([0.1, 0.9]) // Mock prediction output
        };
        const predictions = videoFrames.map(frame => model.predict(frame.expandDims(0)));
        return predictions;
    });
}
// TODO: Specify the correct path to the pre-trained model JSON files for both image and video recognition models.
// TODO: Implement the logic for extracting video frames from the video buffer in the processVideoContent function.
// TODO: Ensure that the models are available at the specified paths or set up a process to train the models if they are not already available.
