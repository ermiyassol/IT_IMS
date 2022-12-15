const express = require('express');
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
  
app.use("/api/device", router.device)
app.use("/api/employee", router.employee)
app.use("/api/history", router.history)

app.listen(8000, (state) => {
    console.log("Server Started Successfully!");
});