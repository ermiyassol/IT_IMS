module.exports = (sequelize, DataTypes) => {

    const Purchase = sequelize.define("purchase", {
        // deviceId: {type: DataTypes.INTEGER },
        purchaseOrder: {type: DataTypes.STRING },
        receivedAt: {type: DataTypes.STRING },
    })

    return Purchase
}