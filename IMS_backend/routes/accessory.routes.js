const express = require("express");
const { fetchAllAccessory, addAccessory, deleteAccessory, updateAccessory } = require("../controllers/accessory.controller");
const router = express.Router();


router.get("/fetchAllAccessory", fetchAllAccessory);
router.post("/addAccessory", addAccessory);
router.delete("/deleteAccessory/:id", deleteAccessory);
router.put("/updateAccessory/:id", updateAccessory);


module.exports = router;