module.exports = (sequelize, DataTypes) => {

    const Device = sequelize.define("device", {
        // deviceId: {type: DataTypes.INTEGER },
        brand: {type: DataTypes.STRING },
        serialNumber: {type: DataTypes.STRING },
        assetTagNumber: {type: DataTypes.STRING },
        model: {type: DataTypes.STRING },
        status: {type: DataTypes.STRING },
    })

    return Device
}