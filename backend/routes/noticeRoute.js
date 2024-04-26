const express = require("express");
const router = express.Router();

const {noticeController , acadmicController , getAcadmicController , getNoticeController , uniqueDelete ,acadmicDelete} = require("../controller/notice")


router.post("/unique", noticeController)
router.post("/academic", acadmicController)
router.get("/getnotice",getNoticeController )
router.get("/getacadmic", getAcadmicController )
router.delete("/unique/:id", uniqueDelete )
router.delete("/acadmic/:id", acadmicDelete )

module.exports = router