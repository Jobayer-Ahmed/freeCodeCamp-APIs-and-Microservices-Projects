// Dependencies
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// bodyParser middleware
app.use(bodyParser.json());

// Main request
app.get("/timestamp/:dateval", (req, res, next) => {
	let natural_date, unix_date;
	const ddmmyy = str => { 
		split = str.split('/'); 
		return `${split[1]}-${split[0]}-${split[2]}`
	}
	if(isNaN(req.params.dateval)) {
		natural_date = new Date(req.params.dateval).toLocaleDateString('en-us');
		unix_date = new Date(req.params.dateval).getTime()/1000;
	} else {
		unix_date = req.params.dateval;
		natural_date = new Date(req.params.dateval * 1000).toLocaleDateString('en-us');
	}

	res.json({
		unix: unix_date,
		natural: ddmmyy(natural_date)
	});
});

// Running app
app.listen(process.env.PORT || 3000, () => console.log(`App is running`));