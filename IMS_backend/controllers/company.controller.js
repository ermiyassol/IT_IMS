const db = require("../config/db.config");

const Company = db.company;


exports.addCompany = async(req, res) => {
    let newCompanyInfo = {
        employmentType: req.body.employmentType.toLowerCase(),
        title: req.body.title.toLowerCase(),
    }
    const newCompany = await Company.create(newCompanyInfo);
    res.status(200).json(newCompany);
}

exports.fetchAllCompany = async(req, res) => {
    let company = await Company.findAll({});
    res.status(200).json(company);
}

exports.deleteCompany = async(req, res) => {
    const id = req.params.id;
    const deleteStatus = await Company.destroy({ where: {id: id}});
    res.status(200).json({
        status: deleteStatus,
        companyId: id,
    })
}
