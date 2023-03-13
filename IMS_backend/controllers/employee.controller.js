const db = require("../config/db.config");
const path = require('path');
const multer = require('multer');
const { issueAccessory, returnAccessory } = require("./accessory.controller");
const { throws } = require("assert");

const Employee = db.employee;

// const PATH = '../data/liability';
// let storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, PATH);
//   },
//   filename: (req, file, cb) => {
//     cb(null, file.fieldname + '-' + Date.now())
//   }
// });
// let upload = multer({
//   storage: storage
// });
exports.downloadSignedLiabilityDoc = async(req, res) => {
    const file = path.resolve(__dirname, '../data/liability_doc/emp-' + req.params.id + '-liability.pdf');
    // //No need for special headers
    console.log("File - ", file);
    if(file) {
        res.download(file); 
    } else {
        throws("No file found!");
    }
}

exports.uploadLiabilityForm = async(req, res) => {
    if (!req.file) {
      console.log("No file is available!");
      return res.send({
        success: false
      });
    } else {
      console.log('File is available!');
      return res.send({
        success: true
      })
    }
  };
  

exports.countEmployee = async(req, res) => {
    const count = await Employee.count();
    res.status(200).json(count);
}

exports.addEmployee = async(req, res) => {
    const accessory = req.body.accessory.map(item => item.name ).join("|");

    let newEmployeeInfo = {
        deviceId: req.body.deviceId.toLowerCase(),
        fullName: req.body.fullName.toLowerCase(),
        role: req.body.role.toLowerCase(),
        issueDate: req.body.issueDate.toLowerCase(),
        remark: req.body.remark.toLowerCase(),
        empStatus: req.body.empStatus.toLowerCase(),
        company: req.body.company.toLowerCase(),
        city: req.body.city.toLowerCase(),
        accessory: accessory.toLowerCase(),
    }

    await issueAccessory(req.body.accessory);
    console.log(newEmployeeInfo);
    const newEmployee = await Employee.create(newEmployeeInfo);
    res.status(200).json(newEmployee);
}

exports.fetchAllEmployee = async(req, res) => {
    let employees = await Employee.findAll({});
    res.status(200).json(employees);
}

exports.findEmployee = async(req, res) => {
    const id = req.params.id;
    const employee = await Employee.findOne({where: {id: id}});
    if(employee == null) {
        res.status(404).json({status: 0});
    } else {
        res.status(200).json({status: 1, employeeData: employee});
    }
}

exports.updateEmployee = async(req, res) => {
    const id = req.params.id;
    const updatedEmployee = await Employee.update(req.body, { where: {id: id}});
    res.status(200).json({
        status: updatedEmployee[0],
        employeeId: id,
        updatedValues: req.body
    });
}

exports.deleteEmployee = async(req, res) => {
    const id = req.params.id;
    const emp = await Employee.findOne({attributes: ["accessory"], where: {id: id}});
    if(emp.dataValues.accessory != "" && req.body.currentStatus == "returned") {
        await returnAccessory(emp.dataValues.accessory);
    }
    const deleteStatus = await Employee.destroy({ where: {id: id}});
    res.status(200).json({
        status: deleteStatus,
        employeeId: id,
    })
}
