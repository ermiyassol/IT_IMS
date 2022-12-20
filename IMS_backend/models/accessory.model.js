module.exports = (sequelize, DataTypes) => {

    const Accessory = sequelize.define("accessory", {
        // deviceId: {type: DataTypes.INTEGER },
        employeeId: {type: DataTypes.STRING },
        mouse: {type: DataTypes.BOOLEAN },
        bag: {type: DataTypes.BOOLEAN },
        cableTie: {type: DataTypes.BOOLEAN },
    })

    return Accessory
}