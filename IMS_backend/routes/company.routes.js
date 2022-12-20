const express = require("express");
const { addCompany, fetchAllCompany, deleteCompany } = require("../controllers/company.controller");
const router = express.Router();


router.post("/addCompany", addCompany);
router.get("/fetchAllCompany", fetchAllCompany);
router.delete("/deleteCompany/:id", deleteCompany);

module.exports = router;