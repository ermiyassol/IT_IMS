module.exports = (sequelize, DataTypes) => {

    const Record = sequelize.define("record", {
        // deviceId: {type: DataTypes.INTEGER },
        date: {type: DataTypes.STRING },
        accessory: {type: DataTypes.STRING },
        description: {type: DataTypes.STRING },
        actionBy: {type: DataTypes.STRING },
    })

    return Record
}