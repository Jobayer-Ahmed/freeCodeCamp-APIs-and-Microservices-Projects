// Dependences
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());

// Core request
app.get("/whoami", (req, res, next) => {
	ip = req.ip;
	lang = req.acceptsLanguages();
	user_agent = req.get("User-Agent");
	ip = ip.split(":")[3];

	res.json({ip, lang, user_agent});
});

app.listen(process.env.PORT || 3000, () => console.log("App is running"))