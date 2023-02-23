const db = require("../config/db.config");

const Purchase = db.purchase;


exports.addPurchase = async(req, res) => {
    let newPurchaseInfo = {
        purchaseOrder: req.body.purchaseOrder.toLowerCase(),
        receivedAt: new Date(req.body.receivedAt).toDateString(),
    }
    const newPurchase = await Purchase.create(newPurchaseInfo);
    res.status(200).json(newPurchase);
}

exports.fetchAllPurchase = async(req, res) => {
    let purchases = await Purchase.findAll({});
    res.status(200).json(purchases);
}

exports.deletePurchase = async(req, res) => {
    const id = req.params.id;
    const deleteStatus = await Purchase.destroy({ where: {id: id}});
    res.status(200).json({
        status: deleteStatus,
        purchaseId: id,
    })
}
