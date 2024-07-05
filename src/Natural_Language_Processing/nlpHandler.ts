// Polyfill fetch function for Node.js environment
if (!globalThis.fetch) {
    globalThis.fetch = require('node-fetch');
}

import * as tf from '@tensorflow/tfjs-node';
import * as qna from '@tensorflow-models/qna';

// Function to process text content
export async function processTextContent(text: string): Promise<tf.Tensor> {
    // Convert text to tensor
    const textTensor = tf.tensor1d(text.split('').map(char => char.charCodeAt(0)));

    // Load pre-trained NLP model
    const model = await tf.loadLayersModel('file://./src/NLP/models/model.json');
    // Ensure input shape is specified
    const inputShape = [1, textTensor.shape[0]];
    const predictions = model.predict(textTensor.reshape(inputShape)) as tf.Tensor;

    return predictions;
}

// Function to generate text content
export async function generateTextContent(prompt: string): Promise<string> {
    // Convert prompt to tensor
    const promptTensor = tf.tensor1d(prompt.split('').map(char => char.charCodeAt(0)));

    // Load pre-trained text generation model
    const model = await tf.loadLayersModel('file://./src/NLP/models/model.json');
    // Ensure input shape is specified
    const inputShape = [1, promptTensor.shape[0]];
    const generatedTensor = model.predict(promptTensor.reshape(inputShape)) as tf.Tensor;

    // Convert tensor back to string
    const generatedText = String.fromCharCode(...(await generatedTensor.data()));

    return generatedText;
}

// Function to answer questions based on a passage of text
export async function answerQuestion(question: string, passage: string): Promise<any> {
    // Load the QnA model
    const model = await qna.load({
        modelUrl: 'https://storage.googleapis.com/kagglesdsdata/models/1207/1432/model.json?X-Goog-Algorithm=GOOG4-RSA-SHA256&X-Goog-Credential=gcp-kaggle-com%40kaggle-161607.iam.gserviceaccount.com%2F20240705%2Fauto%2Fstorage%2Fgoog4_request&X-Goog-Date=20240705T183638Z&X-Goog-Expires=259200&X-Goog-SignedHeaders=host&X-Goog-Signature=5570d3aa475dbe02b52ab28081d395d1f9acd42e5969086b2570f552e8b53d6f561d86c8359d24e429db52073686d0e75c7ef3591567fdd7d1b26130f9307bbfc79356f6a8310bcb9c556a05718d0f8d2455da9957aa2be0c3041ab351caacfebcb23b1562fd239c80dd140d2ab9a0b06ae961c120f5f5a635efd726faf46546f45f889bbb90eb379ee9a98e036dc4a31730e996287ed7573fecaa7c76087d9ac6eea4bc35f585c9c997e4f00e2388fd3f696ce18e5dd85bdee58dd22fa3621ff7ec0957650ff81efb7b3623e609b886627eccbce987cd1f3b0e79442ce40c78c036c987c17b92264b8bafd828f749b7cf770d9c36c1a2a93a833bead78bd0e7'
    });

    // Log the question and passage for debugging
    console.log('Question:', question);
    console.log('Passage:', passage);

    // Find the answers
    const answers = await model.findAnswers(question, passage);

    // Log the answers for debugging
    console.log('Answers:', answers);

    return answers;
}
