module.exports = (sequelize, DataTypes) => {

    const History = sequelize.define("history", {
        // historyKey: {type: DataTypes.INTEGER },
        actionDate: {type: DataTypes.STRING },
        actionType: {type: DataTypes.STRING },
        deviceId: {type: DataTypes.INTEGER },
        description: {type: DataTypes.STRING },
        actionBy: {type: DataTypes.STRING },
    })

    return History
}