// const db = require("../config/db.config");

const { auth } = require("../middleware/ldap")
const db = require("../config/db.config");

const Account = db.account;
Tokens = [];

exports.checkToken = (token) => {
    return Tokens.includes(token);
}

deleteToken = (index) => {
    setTimeout(() => {
        Tokens.splice(index, 1);
    }, 1000 * 60 * 60);
}

exports.login = async(req, res) => {
    auth(req.body.userName, req.body.password).then(async(success) => {
        // console.log("Success Message");
        // console.log(success);
        const userName = success.sAMAccountName.toLowerCase();
        const account = await Account.findOne({where: {userName: userName}});
        console.log("account - ", account);
    if(account == null || account.dataValues.role == "") {
        res.status(404).json({status: 0, message: "You are not entitled to use the system!"});
    } else  if(account.dataValues.status == false) {
        res.status(404).json({status: 0, message: "Your account is disabled, Ask your system administrator!"});
    } else {
        account.dataValues.token = Math.random().toString().split(".")[1];
        deleteToken(Tokens.length);
        Tokens.push(account.dataValues.token);
        res.status(200).json({status: 1, data: account});
    }
      }, error => {
        // console.log("error");
        // console.log(error);
        res.status(404).json({status: 0, message: "Incorrect username/password, Please try again!"});
      });
}