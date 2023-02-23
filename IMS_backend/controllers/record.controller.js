const db = require("../config/db.config");
const path = require('path');
const { issueAccessory, returnAccessory } = require("./accessory.controller");
const Record = db.record;


exports.addRecord = async(req, res) => {
    let newRecordInfo = {
        date: req.body.date.toLowerCase(),
        description: req.body.description.toLowerCase(),
        accessory: req.body.accessory.toLowerCase(),
        actionBy: req.body.actionBy.toLowerCase(),
    }

    if(req.body.accessory != "") {
       await issueAccessory([{name: req.body.accessory, type: req.body.type}])
    }

    const newRecord = await Record.create(newRecordInfo);
    res.status(200).json(newRecord);
}

exports.fetchAllRecord = async(req, res) => {
    let records = await Record.findAll({});
    res.status(200).json(records);
}

// exports.findDevice = async(req, res) => {
//     const id = req.params.id;
//     const device = await Device.findOne({where: {id: id}});
//     if(device == null) {
//         res.status(404).json({status: 0});
//     } else {
//         res.status(200).json({status: 1, deviceData: device});
//     }
// }

exports.updateRecord = async(req, res) => {
    const id = req.params.id;
    const updatedRecord = await Record.update(req.body, { where: {id: id}});
    res.status(200).json({
        status: updatedRecord[0],
        recordId: id,
        updatedValues: req.body
    });
}

exports.deleteRecord = async(req, res) => {
    const id = req.params.id;
    const rec = await Record.findOne({attributes: ["accessory"], where: {id: id}});
    if(rec.dataValues.accessory != "") {
        console.log(rec.dataValues);
        await returnAccessory(rec.dataValues.accessory);
    }
    const deleteStatus = await Record.destroy({ where: {id: id}});
    res.status(200).json({
        status: deleteStatus,
        recordId: id,
    })
}
