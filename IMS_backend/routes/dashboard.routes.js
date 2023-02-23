const express = require("express");
const { generalStat, specificStat, specificModelStat, totalDeviceStat } = require("../controllers/dashboard.controller");
const router = express.Router();


router.get("/fetchGeneralStat", generalStat);
router.post("/fetchSpecificStat", specificStat);
router.post("/fetchSpecificModelStat", specificModelStat);
router.get("/totalDeviceStat", totalDeviceStat);
module.exports = router;