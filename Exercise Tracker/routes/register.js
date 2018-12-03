const express = require('express');
const router = express.Router();
const UserData = require('../models/register.js');
const SaveData = require('../models/save.js');

router.post('/register', (req, res) => {
	let usr = new UserData();
	usr.username = req.body.name;
	usr.save((err, mgs) => {
		if (err) throw err
		return res.send(mgs);
	});
});

router.post('/save', (req, res) => {
	UserData.findOne({username: req.body.name}, (err, usr) => {
		if(err) throw err;
		if (usr) {
			SaveData.findOne({username: req.body.name}, (error, urs) => {
				if(error) {
					return res.send(error);
				}
				if(urs) {
					SaveData.update({username: req.body.name}, {$set: {
						description: req.body.desc,
						duration: req.body.duration,
						date: req.body.date
					}}, (failed, mgs) => {
						if(failed) {
							return res.send(failed);
						}
						return res.send(mgs);
					});
				}
				if(!urs) {
					let saveData = new SaveData();
					saveData.username = req.body.name;
					saveData.description = req.body.desc;
					saveData.duration = req.body.duration;
					saveData.date = req.body.date;
					saveData.save((err, mgs) => {
						if (err) {
							return res.send(err);
						};
						return res.send(mgs);
					});
				}
			});
		}
		if(!usr) {
			return res.send("No user found")
		}
	});
});

router.get("/", (req, res) => {
	SaveData.find({}, (err, mgs) => {
		if(err) {
			return res.send(err);
		}
		return res.send(mgs);
	})
});

router.get('/user/:name', (req, res) => {
	SaveData.findOne({username: req.params.name}, (err, data) => {
		if (err) {
			return res.send(err);
		};
		return res.send(data)
	})
})

module.exports = router;