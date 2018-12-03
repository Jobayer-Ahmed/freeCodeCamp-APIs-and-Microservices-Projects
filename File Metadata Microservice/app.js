// Dependencies
const express = require('express'),
      multer = require('multer'),
      bodyParser = require('body-parser'),
      app = express(),
      upload = multer({dist: 'files/'});

// using bodyParser
app.use(bodyParser.json());

// bypass cors
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
app.all('*', function(req, res, next) {
	var origin = req.get('origin'); 
	res.header('Access-Control-Allow-Origin', origin);
	res.header("Access-Control-Allow-Headers", "X-Requested-With");
	res.header('Access-Control-Allow-Headers', 'Content-Type');
	next();
});

// root route for index.html
app.get('/', (req, res, next) => {
	res.sendFile(__dirname + '/public/index.html')

});

// route for getting info about input file
app.post('/file', upload.single('file'), (req, res, next) => {
    if(req.file) {
    	return res.json(req.file);
    } else {
    	return res.send("Please go back and choose your file first");
    }
});

// declearing the port
const PORT = process.env.PORT || 3000;

// listing app
app.listen(PORT, () => {
    console.log(`App is listening on port ${PORT}`);
});