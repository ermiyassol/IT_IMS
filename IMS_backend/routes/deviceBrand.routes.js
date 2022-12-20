const express = require("express");
const { addDeviceBrand, fetchAllDeviceBrand, deleteDeviceBrand } = require("../controllers/deviceBrand.controller");
// const { addDevice, fetchAllDevice, findDevice, updateDevice, deleteDevice, countDevice } = require("../controllers/device.controller");
const router = express.Router();


router.post("/addDeviceBrand", addDeviceBrand);
router.get("/fetchAllDeviceBrand", fetchAllDeviceBrand);
router.delete("/deleteDeviceBrand/:id", deleteDeviceBrand);

module.exports = router;