const db = require("../config/db.config");
const path = require('path');
const Device = db.device;

exports.bulkAddDevice = async(req, res) => {
    const response = [];
    for (const data of req.body) {
        let newDeviceInfo = {
            poId: data.poId.toLowerCase(),
            deviceType: data.deviceType.toLowerCase(),
            brand: data.brand.toLowerCase(),
            serialNumber: data.serialNumber.toLowerCase(),
            assetTagNumber: data.assetTagNumber.toLowerCase(),
            model: data.model.toLowerCase(),
            status: data.status.toLowerCase(),
        }
        const newDevice = await Device.create(newDeviceInfo);
        response.push(newDevice);
      }
      res.status(200).json(response);
}

exports.downloadBulkTemplate = async(req, res) => {
    const file = path.resolve(__dirname, `../data/IT_IMS_device_bulk_template.csv`);
    //No need for special headers
    res.download(file); 
}

exports.countDevice = async(req, res) => {
    const count = await Device.count();
    res.status(200).json(count);
}

exports.addDevice = async(req, res) => {
    let newDeviceInfo = {
        poId: req.body.poId.toLowerCase(),
        deviceType: req.body.deviceType.toLowerCase(),
        brand: req.body.brand.toLowerCase(),
        serialNumber: req.body.serialNumber.toLowerCase(),
        assetTagNumber: req.body.assetTagNumber.toLowerCase(),
        model: req.body.model.toLowerCase(),
        status: req.body.status.toLowerCase(),
    }
    const newDevice = await Device.create(newDeviceInfo);
    res.status(200).json(newDevice);
}

exports.fetchAllDevice = async(req, res) => {
    let devices = await Device.findAll({});
    res.status(200).json(devices);
}

exports.findDevice = async(req, res) => {
    const id = req.params.id;
    const device = await Device.findOne({where: {id: id}});
    if(device == null) {
        res.status(404).json({status: 0});
    } else {
        res.status(200).json({status: 1, deviceData: device});
    }
}

exports.updateDevice = async(req, res) => {
    const id = req.params.id;
    const updatedDevice = await Device.update(req.body, { where: {id: id}});
    res.status(200).json({
        status: updatedDevice[0],
        deviceId: id,
        updatedValues: req.body
    });
}

exports.deleteDevice = async(req, res) => {
    const id = req.params.id;
    
    const deleteStatus = await Device.destroy({ where: {id: id}});
    res.status(200).json({
        status: deleteStatus,
        deviceId: id,
    })
}
