const db = require("../config/db.config");

const DeviceModel = db.deviceModel;


exports.addDeviceModel = async(req, res) => {
    let newDeviceModelInfo = {
        brandId: req.body.brandId.toLowerCase(),
        model: req.body.model.toLowerCase(),
    }
    const newDeviceModel = await DeviceModel.create(newDeviceModelInfo);
    res.status(200).json(newDeviceModel);
}

exports.fetchAllDeviceModel = async(req, res) => {
    let deviceModels = await DeviceModel.findAll({});
    res.status(200).json(deviceModels);
}

exports.deleteDeviceModel = async(req, res) => {
    const id = req.params.id;
    const deleteStatus = await DeviceModel.destroy({ where: {id: id}});
    res.status(200).json({
        status: deleteStatus,
        brandId: id,
    })
}
