const db = require("../config/db.config");
const Accessory = db.accessory;

addAccessory = async(req, res) => {
    let newAccessoryInfo = {
        name: req.body.name.toLowerCase(),
        new: req.body.quantity,
        return: 0,
    }
    const newAccessory = await Accessory.create(newAccessoryInfo);
    res.status(200).json(newAccessory);
}

fetchAllAccessory = async(req, res) => {
    let accessories = await Accessory.findAll({});
    res.status(200).json(accessories);
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
async function returnAccessory(data) { // data: bag|mouse
    const accessories = data.split("|");
    return await accessories.forEach(async(item) => {
        let accessory = await Accessory.findOne({ where: { name: item } });
        accessory.dataValues.return += 1;
        updatedAccessory = await Accessory.update(accessory.dataValues, { where: {id: accessory.id}});
    });
}

async function issueAccessory(data) { // data: {name: "bag", type: "new" || "return"}-
    return await data.forEach(async(item) => {
        let accessory = await Accessory.findOne({ where: { name: item.name } });
        if(item.type == "new") { accessory.dataValues.new -= 1;}
        if(item.type == "return") { accessory.dataValues.return -= 1;}
        updatedAccessory = await Accessory.update(accessory.dataValues, { where: {id: accessory.dataValues.id}});
    });
}

updateAccessory = async(req, res) => {
    const id = req.params.id;
    const updatedAccessory = await Accessory.update(req.body, { where: {id: id}});
    res.status(200).json({
        status: updatedAccessory[0],
        accessoryId: id,
        updatedValues: req.body
    });
}

deleteAccessory = async(req, res) => {
    const id = req.params.id;
    const deleteStatus = await Accessory.destroy({ where: {id: id}});
    res.status(200).json({
        status: deleteStatus,
        accessoryId: id,
    })
}

module.exports ={
    addAccessory, fetchAllAccessory, issueAccessory, updateAccessory, deleteAccessory, returnAccessory
}