module.exports = (sequelize, DataTypes) => {

    const Company = sequelize.define("company", {
        // deviceId: {type: DataTypes.INTEGER },
        employmentType: {type: DataTypes.STRING },
        title: {type: DataTypes.STRING },
    })

    return Company
}