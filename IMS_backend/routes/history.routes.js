const express = require("express");
const { addHistory, fetchAllHistory, findHistory, updateHistory, deleteHistory, countHistory } = require("../controllers/history.controller");
const router = express.Router();


router.get("/countHistory", countHistory);
router.post("/addHistory", addHistory);
router.get("/fetchAllHistory", fetchAllHistory);
router.get("/findHistory/:id", findHistory);
router.put("/updateHistory/:id", updateHistory);
router.delete("/deleteHistory/:id", deleteHistory);

module.exports = router;