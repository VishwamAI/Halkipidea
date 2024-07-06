const { processTextContent, generateTextContent, answerQuestion } = require('../../dist/Natural_Language_Processing/nlpHandler.js');
const { mlModel, cvModel, kgModel } = require('../ML_Models/models');
const tf = require('@tensorflow/tfjs-node');

let cachedNlpModel;
let cachedMlModel;
let cachedCvModel;
let cachedKgModel;

const loadModels = async () => {
    if (!cachedNlpModel) {
        cachedNlpModel = await processTextContent();
    }
    if (!cachedMlModel) {
        cachedMlModel = await mlModel();
    }
    if (!cachedCvModel) {
        cachedCvModel = await cvModel();
    }
    if (!cachedKgModel) {
        cachedKgModel = await kgModel();
    }
};

const orchestrateAIModels = async (req, res) => {
    // Extract data from the request body
    const { inputData } = req.body;

    // Validate input data
    if (!inputData || typeof inputData !== 'object') {
        return res.status(400).json({ error: 'Invalid input data' });
    }

    // Load models if not already loaded
    await loadModels();

    // Process text using NLP model
    let nlpResult;
    try {
        if (!inputData.text || typeof inputData.text !== 'string') {
            throw new Error('Invalid text data');
        }
        nlpResult = await cachedNlpModel(inputData.text);
    } catch (error) {
        return res.status(500).json({ error: 'Error processing NLP model prediction' });
    }

    // Process data using ML model
    let mlResult;
    try {
        if (!Array.isArray(inputData.mlData)) {
            throw new Error('Invalid ML data');
        }
        const tensorInput = tf.tensor(inputData.mlData);
        mlResult = cachedMlModel.predict(tensorInput);
    } catch (error) {
        return res.status(500).json({ error: 'Error processing ML model prediction' });
    }

    // Process data using CV model
    let cvResult;
    try {
        if (!Array.isArray(inputData.cvData)) {
            throw new Error('Invalid CV data');
        }
        const tensorInput = tf.tensor(inputData.cvData);
        cvResult = cachedCvModel.predict(tensorInput);
    } catch (error) {
        return res.status(500).json({ error: 'Error processing CV model prediction' });
    }

    // Process data using KG model
    let kgResult;
    try {
        if (!Array.isArray(inputData.kgData)) {
            throw new Error('Invalid KG data');
        }
        const tensorInput = tf.tensor(inputData.kgData);
        kgResult = cachedKgModel.predict(tensorInput);
    } catch (error) {
        return res.status(500).json({ error: 'Error processing KG model prediction' });
    }

    // Construct response
    const response = {
        message: 'AI Orchestrator is working',
        inputData: inputData,
        nlpResult: nlpResult,
        mlResult: mlResult,
        cvResult: cvResult,
        kgResult: kgResult
    };

    res.json(response);
};

module.exports = {
    orchestrateAIModels
};
