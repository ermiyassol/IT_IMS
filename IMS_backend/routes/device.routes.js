const express = require("express");
const { bulkAddDevice, addDevice, fetchAllDevice, findDevice, updateDevice, deleteDevice, countDevice, downloadBulkTemplate } = require("../controllers/device.controller");
const router = express.Router();


router.post("/bulkAddDevice", bulkAddDevice)
router.get("/downloadBulkTemplate", downloadBulkTemplate)
router.get("/countDevice", countDevice);
router.post("/addDevice", addDevice);
router.get("/fetchAllDevice", fetchAllDevice);
router.get("/findDevice/:id", findDevice);
router.put("/updateDevice/:id", updateDevice);
router.delete("/deleteDevice/:id", deleteDevice);

module.exports = router;