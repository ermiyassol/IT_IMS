const express = require('express');
const { checkToken } = require('./controllers/auth..controller');
// const configs = require("./config/config");
const corsHandler = require('./middleware/cors');
const router = require('./routes/index.routes');

const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.options("*", corsHandler);
app.use(corsHandler);
// app.use((req, res, next) => {
//     res.setHeader("Access-Control-Allow-Origin", "*");
//     res.setHeader(
//       "Access-Control-Allow-Headers",
//       "Origin, X-Requested-With, Content-Type, Accept"
//     );
//     res.setHeader(
//       "Access-Control-Allow-Methods",
//       "GET, POST, PUT, PATCH, DELETE, OPTIONS"
//     );
//     next();
//   });
app.use((req, res, next) => {
    console.log(req.url);
    console.log("Request - Header - ", req.headers.authorization);
    console.log(checkToken(req.headers.authorization));
    if(req.url == "/api/auth/login" || checkToken(req.headers.authorization)) {
        next();
    } else {
        res.status(401).json(false);
        // throw(false);
    }
})

app.use("/api/auth", router.auth)
app.use("/api/device", router.device)
app.use("/api/device", router.deviceType)
app.use("/api/device", router.deviceBrand)
app.use("/api/device", router.deviceModel)
app.use("/api/employee", router.employee)
app.use("/api/history", router.history)
app.use("/api/company", router.company)
app.use("/api/city", router.city)
app.use("/api/account", router.account)
app.use("/api/purchase", router.purchase)
app.use("/api/dashboard", router.dashboard)
app.use("/api/accessory", router.accessory)
app.use("/api/record", router.record)

app.listen(8000, (state) => {
    console.log("Server Started Successfully!");
});