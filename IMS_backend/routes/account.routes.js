const express = require("express");
const { countAccount, addAccount, fetchAllAccount, findAccount, updateAccount, deleteAccount } = require("../controllers/account.controller");
const router = express.Router();


router.get("/countAccount", countAccount);
router.post("/addAccount", addAccount);
router.get("/fetchAllAccount", fetchAllAccount);
router.get("/findAccount/:id", findAccount);
router.put("/updateAccount/:id", updateAccount);
router.delete("/deleteAccount/:id", deleteAccount);

module.exports = router;