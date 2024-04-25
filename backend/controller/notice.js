const Notice = require("../models/notice");

const Acadmic = require("../models/acadmic");

exports.noticeController = async (req, res) => {
  try {
    const { title, date, reff, description, postedBy } = req.body;
    console.log(req.body);

    const notice = new Notice({
      title,
      reff,
      date,
      description,
      postedBy,
    });
    await notice.save();
    res.status(200).json({ message: "Notice Downloaded/posted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.acadmicController = async (req, res) => {
	console.log(req.body)
  try {
    const { dateValue, descValue, refValue, postedBy } = req.body;

    const academic = new Acadmic({
      refValue,
      descValue,
      dateValue,
      postedBy,
    });
    await academic.save();
    res.status(200).json({ message: "Notice Downloaded/posted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
    console.log(err);
  }
};

exports.getNoticeController = async (req, res) => {
  try {
    const notices = await Notice.find().populate("postedBy", "name");
    res.status(200).json(notices);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

exports.getAcadmicController = async (req, res) => {
  try {
    const acadmics = await Acadmic.find().populate("postedBy", "name");
    res.status(200).json(acadmics);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}