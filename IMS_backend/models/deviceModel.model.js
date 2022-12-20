module.exports = (sequelize, DataTypes) => {

    const DeviceModel = sequelize.define("deviceModel", {
        // deviceId: {type: DataTypes.INTEGER },
        brandId: {type: DataTypes.STRING },
        model: {type: DataTypes.STRING },
    })

    return DeviceModel
}