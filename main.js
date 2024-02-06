const express = require('express');
const winston = require('winston');

const app = express();

// Configure Winston logger
const logger = winston.createLogger({
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: 'logs.log' })
    ]
});

app.get('/', (req, res) => {
    res.send('Hello, World!');
});

// GET method
app.get('/api/adjust/callback', (req, res) => {
    // Log the query
    logger.info(`Received GET request with query: ${JSON.stringify(req.query)}`);
    // console.log("req ", req);
    logger.info(`GET HEADER : ${JSON.stringify(req.headers)}`);
    console.log("req.headers.url ", req?.headers?.host.toString());

    // Create the response object
    const response = {
        data: req?.headers?.host.toString(),
        message: 'Params logged successfully!',
        params: req.query
    };

    // Send the response as JSON
    res.json(response);
});

// Start the server
app.listen(4000, () => {
    console.log('Server is running on port 4000');
});