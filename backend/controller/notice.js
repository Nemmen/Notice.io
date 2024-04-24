const Notice = require("../models/notice")

exports.noticeController = async (req,res) => {
	try {
		const {title,date, reff, description , postedBy} = req.body

		const notice = new Notice({
			title,
			reff,
			date,
			description,
			postedBy
		})
		await notice.save()
		res.status(200).json({message: "Notice Downloaded/posted successfully"})
	} catch (err) {
		res.status(500).json({message: err.message})
	}
}