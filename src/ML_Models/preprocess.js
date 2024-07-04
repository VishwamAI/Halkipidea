const fs = require('fs');
const path = require('path');

// Load the text corpus
const textPath = path.join(__dirname, 'shakespeare.txt');
const text = fs.readFileSync(textPath, 'utf-8');

// Clean the text by removing unwanted characters
const cleanText = text.replace(/[^a-zA-Z0-9.,;:!?'"()\s]/g, '');

// Tokenize the text into individual characters
const tokens = cleanText.split('');

// Create a vocabulary of unique characters
const vocab = Array.from(new Set(tokens));
const vocabSize = vocab.length;

// Create a mapping from characters to indices
const charToIndex = {};
const indexToChar = {};
vocab.forEach((char, index) => {
    charToIndex[char] = index;
    indexToChar[index] = char;
});

// Convert the tokens into numerical values (indices)
const tokenIndices = tokens.map(char => charToIndex[char]);

// Create sequences of numerical values for training
const seqLength = 100;
const sequences = [];
const nextChars = [];
for (let i = 0; i < tokenIndices.length - seqLength; i++) {
    sequences.push(tokenIndices.slice(i, i + seqLength));
    nextChars.push(tokenIndices[i + seqLength]);
}

// Save the preprocessed data to a JSON file in chunks
const outputPath = path.join(__dirname, 'preprocessed_data.json');
const writeStream = fs.createWriteStream(outputPath);
writeStream.write('{"sequences":[');

for (let i = 0; i < sequences.length; i++) {
    writeStream.write(JSON.stringify(sequences[i]));
    if (i < sequences.length - 1) {
        writeStream.write(',');
    }
}

writeStream.write('],"nextChars":[');

for (let i = 0; i < nextChars.length; i++) {
    writeStream.write(JSON.stringify(nextChars[i]));
    if (i < nextChars.length - 1) {
        writeStream.write(',');
    }
}

writeStream.write(`],"vocabSize":${vocabSize},"charToIndex":${JSON.stringify(charToIndex)},"indexToChar":${JSON.stringify(indexToChar)}}`);
writeStream.end();

console.log('Text data preprocessing complete. Preprocessed data saved to preprocessed_data.json.');
