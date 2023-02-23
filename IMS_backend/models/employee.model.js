module.exports = (sequelize, DataTypes) => {

    const Employee = sequelize.define("employee", {
        // empKey: {type: DataTypes.INTEGER },
        deviceId: {type: DataTypes.INTEGER },
        fullName: {type: DataTypes.STRING },
        companyId: {type: DataTypes.STRING },
        role: {type: DataTypes.STRING },
        issueDate: {type: DataTypes.STRING },
        remark: {type: DataTypes.STRING },
        empStatus: {type: DataTypes.STRING},
        company: {type: DataTypes.STRING},
        city: {type: DataTypes.STRING},
        accessory: {type: DataTypes.STRING},
    })

    return Employee
}