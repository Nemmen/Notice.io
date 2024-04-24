const express = require("express");
const router = express.Router();

import { noticeController } from "../controller/notice";


router.post("/unique", noticeController)

module.exports = router