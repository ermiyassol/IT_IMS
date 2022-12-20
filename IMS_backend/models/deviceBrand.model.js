module.exports = (sequelize, DataTypes) => {

    const DeviceBrand = sequelize.define("deviceBrand", {
        // deviceId: {type: DataTypes.INTEGER },
        brandName: {type: DataTypes.STRING },
        deviceType: {type: DataTypes.STRING },
    })

    return DeviceBrand
}