
const PORT = process.env.PORT || 8000


const POOL = {
    max: 50,
    min: 0,
    acquire: 30000,
    idle: 10000
};

const DB = {
    HOST: "localhost",
    USER: "root",
    PASSWORD: "",
    DB: "safaricom_ims",
    dialect: "mysql"
}

const configs = {
    PORT,
    POOL,
    DB
};


module.exports = configs;