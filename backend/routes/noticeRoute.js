const express = require("express");
const router = express.Router();

const {noticeController , acadmicController , getAcadmicController , getNoticeController} = require("../controller/notice")


router.post("/unique", noticeController)
router.post("/academic", acadmicController)
router.get("/getnotice",getNoticeController )
router.get("/getacadmic", getAcadmicController )

module.exports = router