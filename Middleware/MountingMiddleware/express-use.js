// app.use() in Express is a function used to mount middleware functions at a specified path. 
// This means that when a request is made to a certain route, the middleware function will be executed. 

// Usage: for incorporating middleware into the application's request handling pipeline.

const express = require('express');
const app = express();

// Middleware function to log all requests
const logger = (req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
};

// Mount the logger middleware for all requests
app.use(logger);

// Middleware function to handle errors
const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
};

// Mount the error handler middleware
app.use(errorHandler);

app.get('/', (req, res) => {
  res.send('Hello, world!');
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
