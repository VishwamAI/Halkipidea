const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Routes
app.get('/', (req, res) => {
    res.send('Welcome to Halkipedia AI System');
});

// Placeholder for AI Orchestrator route
app.post('/orchestrate', (req, res) => {
    // Logic for orchestrating AI models will go here
    res.send('AI Orchestrator endpoint');
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
