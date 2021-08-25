// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Middleware*/
const bodyParser = require('body-parser');

//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');

// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
const port = 8080;
app.listen(port, () => {
  console.log(`server is running at port: ${port}.`);
});
app.get("/weatherData", (req, res) => {
  res.send(projectData);
  console.log(projectData);
});


app.post('/addWeather', (req, res) => {
  projectData.date = req.body.date;
  projectData.temp = req.body.temperature;
  projectData.content = req.body.content;
  console.log(projectData);
});
