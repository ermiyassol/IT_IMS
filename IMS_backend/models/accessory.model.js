module.exports = (sequelize, DataTypes) => {

    const Accessory = sequelize.define("accessory", {
        // deviceId: {type: DataTypes.INTEGER },
        name: {type: DataTypes.STRING },
        new: {type: DataTypes.INTEGER },
        return: {type: DataTypes.INTEGER },
    })

    return Accessory
}