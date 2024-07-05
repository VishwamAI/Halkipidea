const tf = require('@tensorflow/tfjs-node');

// Define the LSTM model for text generation
function createTextGenerationModel(vocabSize, embeddingDim, rnnUnits, batchSize) {
    const model = tf.sequential();
    model.add(tf.layers.embedding({ inputDim: vocabSize, outputDim: embeddingDim, batchInputShape: [batchSize, null] }));
    model.add(tf.layers.lstm({ units: rnnUnits, returnSequences: true, stateful: true, recurrentInitializer: 'glorotUniform' }));
    model.add(tf.layers.dense({ units: vocabSize }));
    return model;
}

// Train the LSTM model
async function trainTextGenerationModel(model, dataset, epochs) {
    model.compile({
        optimizer: tf.train.adam(),
        loss: tf.losses.sparseCategoricalCrossentropy({ fromLogits: true })
    });

    await model.fitDataset(dataset, {
        epochs: epochs,
        callbacks: {
            onEpochEnd: (epoch, logs) => {
                console.log(`Epoch ${epoch + 1}: loss = ${logs.loss}`);
            }
        }
    });

    // Save the trained model
    await model.save('file://./text-generation-model');
}

// Generate text using the trained model
async function generateText(model, startString, numGenerate) {
    const inputEval = tf.tensor1d(startString.split('').map(char => char.charCodeAt(0)));
    inputEval = inputEval.expandDims(0);

    let textGenerated = '';
    model.resetStates();

    for (let i = 0; i < numGenerate; i++) {
        const predictions = model.predict(inputEval);
        const predictedId = tf.argMax(predictions, -1).dataSync()[0];

        textGenerated += String.fromCharCode(predictedId);

        inputEval = tf.tensor1d([predictedId]).expandDims(0);
    }

    return textGenerated;
}

module.exports = {
    createTextGenerationModel,
    trainTextGenerationModel,
    generateText
};
