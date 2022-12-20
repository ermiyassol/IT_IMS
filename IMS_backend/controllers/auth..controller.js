// const db = require("../config/db.config");

const { auth } = require("../middleware/ldap")
const db = require("../config/db.config");

const Account = db.account;


exports.login = async(req, res) => {
    console.log(req.body);
    auth(req.body.userName, req.body.password).then(async(success) => {
        // console.log("Success Message");
        // console.log(success);
        const userName = success.sAMAccountName.toLowerCase();
        const account = await Account.findOne({where: {userName: userName}});
    if(account == null) {
        res.status(404).json({status: 0, message: "You are not entitled to use the system!"});
    } else {
        res.status(200).json({status: 1, data: account});
    }
      }, error => {
        // console.log("error");
        // console.log(error);
        res.status(404).json({status: 0, message: "Incorrect username/password, Please try again!"});
      });
}                       