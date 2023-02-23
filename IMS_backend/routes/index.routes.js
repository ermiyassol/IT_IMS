const device = require("../routes/device.routes");
const employee = require("../routes/employee.routes");
const history = require("../routes/history.routes");
const deviceType = require("../routes/deviceType.routes");
const deviceBrand = require("../routes/deviceBrand.routes");
const deviceModel = require("../routes/deviceModel.routes");
const company = require("../routes/company.routes");
const city = require("../routes/city.routes");
const auth = require("../routes/auth.routes");
const account = require("../routes/account.routes")
const purchase = require("../routes/purchase.routes")
const dashboard = require("../routes/dashboard.routes")
const accessory = require("../routes/accessory.routes")
const record = require("../routes/record.routes")

module.exports = {record, accessory, account, auth, company, city, device, employee, history, deviceType, deviceBrand, deviceModel, purchase, dashboard}