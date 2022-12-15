const cors = require("cors");

const options={
    origin:"*",
    credentials:true,
    optionSuccessStatus:200,
};

const corsHandler = cors(options);

module.exports = corsHandler;