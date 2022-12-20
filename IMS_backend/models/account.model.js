module.exports = (sequelize, DataTypes) => {

    const Account = sequelize.define("account", {
        userName: {type: DataTypes.STRING },
        role: {type: DataTypes.STRING },
        status: {type: DataTypes.BOOLEAN },
    })

    return Account
}