const express = require("express");
const { addDevice, fetchAllDevice, findDevice, updateDevice, deleteDevice, countDevice } = require("../controllers/device.controller");
const router = express.Router();


router.get("/countDevice", countDevice);
router.post("/addDevice", addDevice);
router.get("/fetchAllDevice", fetchAllDevice);
router.get("/findDevice/:id", findDevice);
router.put("/updateDevice/:id", updateDevice);
router.delete("/deleteDevice/:id", deleteDevice);

module.exports = router;