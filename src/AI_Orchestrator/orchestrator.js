const { processText } = require('../Natural_Language_Processing/nlp');
const { mlModel, cvModel, kgModel } = require('../ML_Models/models');
const tf = require('@tensorflow/tfjs-node');

const orchestrateAIModels = async (req, res) => {
    // Extract data from the request body
    const { inputData } = req.body;

    // Process text using NLP model
    let nlpResult;
    try {
        nlpResult = await processText(inputData.text);
    } catch (error) {
        return res.status(500).json({ error: 'Error processing NLP model prediction' });
    }

    // Process data using ML model
    let mlResult;
    try {
        const mlModelInstance = await mlModel();
        const tensorInput = tf.tensor(inputData.mlData);
        mlResult = mlModelInstance.predict(tensorInput);
    } catch (error) {
        return res.status(500).json({ error: 'Error processing ML model prediction' });
    }

    // Process data using CV model
    let cvResult;
    try {
        const cvModelInstance = await cvModel();
        const tensorInput = tf.tensor(inputData.cvData);
        cvResult = cvModelInstance.predict(tensorInput);
    } catch (error) {
        return res.status(500).json({ error: 'Error processing CV model prediction' });
    }

    // Process data using KG model
    let kgResult;
    try {
        const kgModelInstance = await kgModel();
        const tensorInput = tf.tensor(inputData.kgData);
        kgResult = kgModelInstance.predict(tensorInput);
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
