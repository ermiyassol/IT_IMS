const express = require("express");
const { addDeviceModel, fetchAllDeviceModel, deleteDeviceModel } = require("../controllers/deviceModel.controller");
const router = express.Router();


router.post("/addDeviceModel", addDeviceModel);
router.get("/fetchAllDeviceModel", fetchAllDeviceModel);
router.delete("/deleteDeviceModel/:id", deleteDeviceModel);

module.exports = router;