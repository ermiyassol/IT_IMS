const express = require("express");
const { addEmployee, fetchAllEmployee, findEmployee, updateEmployee, deleteEmployee, countEmployee } = require("../controllers/employee.controller");
const router = express.Router();


router.get("/countEmployee", countEmployee);
router.post("/addEmployee", addEmployee);
router.get("/fetchAllEmployee", fetchAllEmployee);
router.get("/findEmployee/:id", findEmployee);
router.put("/updateEmployee/:id", updateEmployee);
router.post("/deleteEmployee/:id", deleteEmployee);

module.exports = router;