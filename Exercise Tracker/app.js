// Dependencies
const express = require('express'),
	  mongoose = require('mongoose'),
	  bodyParser = require('body-parser');

const app = express();

// mongodb connection
mongoose.connect('mongodb://localhost/exercise_tracker', (err) => {
	if(err) throw err;
});

// Express middleware
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); // "*" for public access and www.example.com for specific uses
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === 'OPTIONS') {
      res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
      return res.status(200).json({});
  }
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/route', require('./routes/register'));
app.get('/', (req, res, next) => {
  res.sendFile(__dirname + '/public/index.html')

});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
	console.log(`App is running on port ${PORT}`);
});