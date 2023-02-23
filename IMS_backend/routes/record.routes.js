const express = require("express");
const { addRecord, fetchAllRecord, updateRecord, deleteRecord } = require("../controllers/record.controller");
const router = express.Router();


router.post("/addRecord", addRecord);
router.get("/fetchAllRecord", fetchAllRecord);
router.put("/updateRecord/:id", updateRecord);
router.delete("/deleteRecord/:id", deleteRecord);

module.exports = router;