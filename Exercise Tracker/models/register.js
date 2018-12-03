const mongoose = require('mongoose'),
	  Schema = mongoose.Schema;

const ResisterSchema = new Schema({
	username: {
		type: String,
		required: true,
		unique: true
	}
});

const Model = mongoose.model('Register', ResisterSchema);

module.exports = Model;