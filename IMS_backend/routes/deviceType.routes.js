const express = require("express");
const { updateDeviceType, fetchAllDeviceType } = require("../controllers/deviceType.controller");
const router = express.Router();


router.post("/updateDeviceType", updateDeviceType);
router.get("/fetchAllDeviceType", fetchAllDeviceType);

module.exports = router;