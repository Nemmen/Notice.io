const mongoose = require("mongoose")

const acadmicSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
	},
	refValue: {
		type: String,
		required: true,
	},
	descValue: {
		type: String,
		required: true,
	},
	dateValue: {
		type: String,
		required: true,
	},
	postedBy: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: "User"
	}]
 })

 module.exports = mongoose.model("Acadmic",acadmicSchema)
 