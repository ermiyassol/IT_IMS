const express = require("express");
const { addEmployee, fetchAllEmployee, findEmployee, updateEmployee, deleteEmployee, countEmployee, uploadLiabilityForm, downloadSignedLiabilityDoc } = require("../controllers/employee.controller");
const router = express.Router();
const path = require('path');
const multer = require('multer');

const PATH = path.resolve(__dirname, '../data/liability_doc');
let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, PATH);
  },
  filename: (req, file, cb) => {
    console.log("request - ", );
    cb(null, 'emp-' + req.params.id + '-liability.pdf')
  }
});
let upload = multer({
  storage: storage
});

router.get("/countEmployee", countEmployee);
router.post("/addEmployee", addEmployee);
router.get("/fetchAllEmployee", fetchAllEmployee);
router.get("/findEmployee/:id", findEmployee);
router.put("/updateEmployee/:id", updateEmployee);
router.post("/deleteEmployee/:id", deleteEmployee);
router.post("/uploadLiabilityForm/:id", upload.single("file"), uploadLiabilityForm);
router.get("/downloadLiabilityDoc/:id", downloadSignedLiabilityDoc);

module.exports = router;