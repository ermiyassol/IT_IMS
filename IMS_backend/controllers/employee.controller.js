const db = require("../config/db.config");

const Employee = db.employee;



exports.countEmployee = async(req, res) => {
    const count = await Employee.count();
    res.status(200).json(count);
}

exports.addEmployee = async(req, res) => {
    let newEmployeeInfo = {
        deviceId: req.body.deviceId.toLowerCase(),
        fullName: req.body.fullName.toLowerCase(),
        role: req.body.role.toLowerCase(),
        issueDate: req.body.issueDate.toLowerCase(),
        remark: req.body.remark.toLowerCase(),
        empStatus: req.body.empStatus.toLowerCase(),
        company: req.body.company.toLowerCase(),
        city: req.body.city.toLowerCase(),
    }
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
    const deleteStatus = await Employee.destroy({ where: {id: id}});
    res.status(200).json({
        status: deleteStatus,
        employeeId: id,
    })
}
