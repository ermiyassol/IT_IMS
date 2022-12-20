const express = require("express");
const { updateCity, fetchAllCity } = require("../controllers/city.controller");
const router = express.Router();


router.post("/updateCity", updateCity);
router.get("/fetchAllCity", fetchAllCity);

module.exports = router;