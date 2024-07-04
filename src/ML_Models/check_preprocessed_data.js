const fs = require('fs');
const path = require('path');

// Path to the preprocessed data file
const dataPath = path.join(__dirname, 'preprocessed_data.json');

// Function to read the beginning and end of the file
function checkPreprocessedData(filePath) {
    const readStream = fs.createReadStream(filePath, { encoding: 'utf-8', start: 0, end: 1024 });
    const readStreamEnd = fs.createReadStream(filePath, { encoding: 'utf-8', start: fs.statSync(filePath).size - 1024 });

    console.log('--- Beginning of the file ---');
    readStream.on('data', chunk => {
        console.log(chunk);
    });

    readStream.on('end', () => {
        console.log('--- End of the file ---');
        readStreamEnd.on('data', chunk => {
            console.log(chunk);
        });
    });
}

// Check the preprocessed data file
checkPreprocessedData(dataPath);
