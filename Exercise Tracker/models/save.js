const mongoose = require('mongoose'),
	  Schema = mongoose.Schema;

const SaveSchema = new Schema({
	username: {
		type: String,
		required: true,
		unique: true
	},
	description: {
		type: String,
		required: true
	},
	duration: {
		type: Number,
		required: true
	},
	date: {
		type: Date,
		required: true
	}
});

const Model = mongoose.model('Save', SaveSchema);

module.exports = Model;