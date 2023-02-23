const { Sequelize } = require("../config/db.config");
const db = require("../config/db.config");
const { Op } = require("sequelize");
const { getPreviousSevenDates } = require("../middleware/date");

const Device = db.device;
const History = db.history;
const Purchase = db.purchase;
const Brands = db.deviceBrand;

// [Op.and]: [{ a: 5 }, { b: 6 }]

exports.generalStat = async(req, res) => {
    let stockDevices = await Device.findAll({attributes: [[Sequelize.fn("COUNT", Sequelize.col("id")), "value"], ["deviceType", "name"]], where: {[Op.or]: [{ status: "new" }, { status: "returned" }]}, group: "deviceType" });

    let previousDates = getPreviousSevenDates();
    let weeklyProgress = [];
    for (let index = 0; index < 7; index++) {
        const date = previousDates[index];
        const count = await countHistory(date);
        weeklyProgress.push({name: new Date(date).toDateString(), value: count})
    }
    let changeLogs = await History.findAll({order: [ [ 'createdAt', 'DESC' ]], limit: 40})

    let purchaseOrdersDetail = [];
    let purchases = await Purchase.findAll({attributes: ["id", "purchaseOrder", "receivedAt"]});
    for (let index = 0; index < purchases.length; index++) {
        const element = purchases[index];
        let poDetails = await Device.findAll({attributes: [[Sequelize.fn("COUNT", Sequelize.col("id")), "value"], ["deviceType", "device"]], where: {poId: purchases[index].id}, group: "deviceType" });
        
        purchaseOrdersDetail.push({po: purchases[index].purchaseOrder, receivedAt: purchases[index].receivedAt, poDetails: poDetails});
    }

    
    // res.status(200).json(purchaseOrdersDetail);

    // todo uncomment
    let stat = {stockDevice: stockDevices, weeklyProgress: weeklyProgress, changeLogs: changeLogs, purchaseOrdersDetail: purchaseOrdersDetail};
    res.status(200).json(stat);
}

countHistory = async(date) => {
    return await History.count({where: {actionDate: date}})
    // return await History.findAll({attributes: [[Sequelize.fn("COUNT", Sequelize.col("id")), "value"], ["actionDate", "name"]], group: "actionDate", limit: 7 });
}

exports.specificStat = async(req, res) => {
    const deviceType = req.body.deviceType;
    // console.log("device Type - ", deviceType);
    let deviceStatus = await Device.findAll({attributes: [[Sequelize.fn("COUNT", Sequelize.col("id")), "value"], ["status", "name"]], where: {deviceType: deviceType}, group: "status" });

    let deviceBrands = [];
    brands = await Brands.findAll({attributes: ["id", "brandName"], where: {deviceType: deviceType}});
    for (let index = 0; index < brands.length; index++) {
        let brand = brands[index];
        let count = await Device.count({where: {brand: brand.id}});
        deviceBrands.push({name: brand.brandName, value: count});
    }

    const [q1Results, q1Metadata] = await db.sequelize.query(
        `SELECT * FROM employees JOIN devices ON employees.deviceId = devices.id WHERE devices.deviceType = '${deviceType}'`
      );
      
      var employeeCompanyCount = q1Results.reduce((p, c) => {
        var company = c.company;
        if (!p.hasOwnProperty(company)) {
          p[company] = 0;
        }
        p[company]++;
        return p;
      }, {});

      employeeCompany = [];
      for (const key in employeeCompanyCount) {
            const companyName = key;
            employeeCompany.push({name: companyName, value: employeeCompanyCount[key]});
      }

    //City
    const [q2Results, q2Metadata] = await db.sequelize.query(
        `SELECT * FROM employees JOIN devices ON employees.deviceId = devices.id WHERE devices.deviceType = '${deviceType}'`
      );

      var employeeCityCount = q2Results.reduce((p, c) => {
        var city = c.city;
        if (!p.hasOwnProperty(city)) {
          p[city] = 0;
        }
        p[city]++;
        return p;
      }, {});

      
      employeeCity = [];
      for (const key in employeeCityCount) {
        const companyName = key;
        employeeCity.push({name: companyName, value: employeeCityCount[key]});
      }
      

      
    // PO / specific laptop
    const [q3Results, q3Metadata] = await db.sequelize.query(
        `SELECT * FROM devices JOIN purchases ON devices.poId = purchases.id WHERE devices.deviceType = '${deviceType}'`
      );
      var devicesPoCount = q3Results.reduce((p, c) => {
        var poDetail = c.purchaseOrder + "-" + c.receivedAt + "-" + c.poId;
        if (!p.hasOwnProperty(poDetail)) {
          p[poDetail] = 0;
        }
        p[poDetail]++;
        return p;
      }, {});

      devicesPO = [];
      for (const key in devicesPoCount) {
            const [po, receivedAt, poId] = key.split("-"); 
            devicesPO.push({po: po, receivedAt: receivedAt, poId: poId, value: devicesPoCount[key]});
      }

    let stat = {deviceStatus: deviceStatus, deviceBrands: deviceBrands, employeeCompany: employeeCompany, employeeCity: employeeCity, devicesPO: devicesPO};
    res.status(200).json(stat);
}

exports.specificModelStat = async(req, res) => {
    const brandId = req.body.brandId;
    let deviceModels = await Device.findAll({attributes: [[Sequelize.fn("COUNT", Sequelize.col("id")), "value"], ["model", "name"]], where: {brand: brandId}, group: "model" });
    res.status(200).json(deviceModels);
}

 exports.totalDeviceStat = async(rew, res) => {
  let totalDevices = await Device.findAll({attributes: [[Sequelize.fn("COUNT", Sequelize.col("id")), "value"], ["deviceType", "name"]], group: "deviceType" });
  res.status(200).json(totalDevices);
 }