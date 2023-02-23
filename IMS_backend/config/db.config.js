const { Sequelize, DataTypes } = require("sequelize");
const configs = require("./config")

const sequelize = new Sequelize(
    configs.DB.DB, configs.DB.USER, configs.DB.PASSWORD, {
        host: configs.DB.host,
        dialect: configs.DB.dialect,
        operatorsAliases: 0,
        pool: {
            max: configs.POOL.max,
            min: configs.POOL.min,
            acquire: configs.POOL.acquire,
            idle: configs.POOL.idle
        }
    }
)

sequelize.authenticate().then(() => {
    console("Connected To the database!")
}).catch(err => {
    console.log("Error "+ err);
})

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.device = require("../models/device.model.js")(sequelize, DataTypes);
// db.deviceType = require("../models/deviceType.model.js")(sequelize, DataTypes);
db.deviceBrand = require("../models/deviceBrand.model.js")(sequelize, DataTypes);
db.deviceModel = require("../models/deviceModel.model.js")(sequelize, DataTypes);
db.employee = require("../models/employee.model.js")(sequelize, DataTypes);
db.history = require("../models/history.model.js")(sequelize, DataTypes);
db.purchase = require("../models/purchase.model.js")(sequelize, DataTypes);
db.accessory = require("../models/accessory.model.js")(sequelize, DataTypes);
db.company = require("../models/company.model.js")(sequelize, DataTypes);
db.account = require("../models/account.model.js")(sequelize, DataTypes);
db.record = require("../models/record.model.js")(sequelize, DataTypes);

db.sequelize.sync({force: false}).then(() => {
    console.log("Yes re-sync done!");
})


module.exports = db;