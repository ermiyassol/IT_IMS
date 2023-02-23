const express = require("express");
const { addPurchase, fetchAllPurchase, deletePurchase } = require("../controllers/purchase.controller");
const router = express.Router();


router.post("/addPurchase", addPurchase);
router.get("/fetchAllPurchase", fetchAllPurchase);
router.delete("/deletePurchase/:id", deletePurchase);

module.exports = router;