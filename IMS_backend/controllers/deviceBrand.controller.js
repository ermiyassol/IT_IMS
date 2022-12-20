const db = require("../config/db.config");

const DeviceBrand = db.deviceBrand;


exports.addDeviceBrand = async(req, res) => {
    let newDeviceBrandInfo = {
        brandName: req.body.brandName.toLowerCase(),
        deviceType: req.body.deviceType.toLowerCase(),
    }
    const newDeviceBrand = await DeviceBrand.create(newDeviceBrandInfo);
    res.status(200).json(newDeviceBrand);
}

exports.fetchAllDeviceBrand = async(req, res) => {
    let deviceBrands = await DeviceBrand.findAll({});
    res.status(200).json(deviceBrands);
}

exports.deleteDeviceBrand = async(req, res) => {
    const id = req.params.id;
    const deleteStatus = await DeviceBrand.destroy({ where: {id: id}});
    res.status(200).json({
        status: deleteStatus,
        brandId: id,
    })
}
