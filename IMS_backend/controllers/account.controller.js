const db = require("../config/db.config");

const Account = db.account;

exports.countAccount = async(req, res) => {
    const count = await Account.count();
    res.status(200).json(count);
}

exports.addAccount = async(req, res) => {
    let newAccountInfo = {
        userName: req.body.userName.toLowerCase(),
        role: req.body.role.toLowerCase(),
        status: req.body.status,
    }
    const newAccount = await Account.create(newAccountInfo);
    res.status(200).json(newAccount);
}

exports.fetchAllAccount = async(req, res) => {
    let accounts = await Account.findAll({});
    res.status(200).json(accounts);
}

exports.findAccount = async(req, res) => {
    const id = req.params.id;
    const account = await Account.findOne({where: {id: id}});
    if(account == null) {
        res.status(404).json({status: 0});
    } else {
        res.status(200).json({status: 1, accountData: account});
    }
}

exports.updateAccount = async(req, res) => {
    const id = req.params.id;
    const updatedAccount = await Account.update(req.body, { where: {id: id}});
    res.status(200).json({
        status: updatedAccount[0],
        accountId: id,
        updatedValues: req.body
    });
}

exports.deleteAccount = async(req, res) => {
    const id = req.params.id;
    const deleteStatus = await Account.destroy({ where: {id: id}});
    res.status(200).json({
        status: deleteStatus,
        accountId: id,
    })
}
