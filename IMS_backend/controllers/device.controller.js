const db = require("../config/db.config");
const path = require('path');
const fs = require("fs");
const PizZip = require("pizzip");
const Docxtemplater = require("docxtemplater");

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


exports.generateLiabilityForm = async(req, res) => {
// Load the docx file as binary content
const condition = req.body.deviceType == "laptop" && req.body.type == "single"; //todo should be changed to req.body.deviceType
const content = fs.readFileSync(
    path.resolve(__dirname, condition ? `../data/liability form.docx` : `../data/liability form(1).docx`),
    "binary"
);

const zip = new PizZip(content);

const doc = new Docxtemplater(zip, {
    paragraphLoop: true,
    linebreaks: true,
});

// Render the document (Replace {first_name} by John, {last_name} by Doe, ...)
if(condition) {
    doc.render({
        brand: req.body.brand,
        model: req.body.model,
        serialNumber: req.body.serialNumber,
        assetTagNumber: req.body.assetTagNumber,
        fullName: req.body.fullName,
        companyId: "",
        department: req.body.department,
    });
} else {
    doc.render({
        deviceType: req.body.deviceType,
        reason: req.body.reason,
        fullName: req.body.fullName,
        devices: req.body.devices,
        department: req.body.department,
    });
}

const buf = doc.getZip().generate({
    type: "nodebuffer",
    compression: "DEFLATE",
});

fs.writeFileSync(path.resolve(__dirname, "../data/liability document.docx"), buf);
const file = path.resolve(__dirname, "../data/liability document.docx");
    //No need for special headers
    // console.log("liability downloader is working!");
    // res.download(file); 
    res.status(200).json(true);
}

exports.downloadLiabilityDoc = async(req, res) => {
    const file = path.resolve(__dirname, `../data/liability document.docx`);
    //No need for special headers
    res.download(file); 
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
