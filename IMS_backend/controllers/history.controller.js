const db = require("../config/db.config");

const History = db.history;


exports.countHistory = async(req, res) => {
    const count = await History.count();
    res.status(200).json(count);
}

exports.addHistory = async(req, res) => {
    let newHistoryInfo = {
        actionDate: req.body.actionDate.toLowerCase(),
        actionType: req.body.actionType.toLowerCase(),
        deviceId: req.body.deviceId.toLowerCase(),
        description: req.body.description.toLowerCase(),
        actionBy: req.body.actionBy.toLowerCase(),
    }

    const newHistory = await History.create(newHistoryInfo);
    res.status(200).json(newHistory);
}

exports.fetchAllHistory = async(req, res) => {
    let histories = await History.findAll({});
    res.status(200).json(histories);
}

exports.findHistory = async(req, res) => {
    const id = req.params.id;
    const history = await History.findAll({where: {deviceId: id}});
    if(history == null) {
        res.status(404).json({status: 0});
    } else {
        res.status(200).json({status: 1, historyData: history});
    }
}

exports.updateHistory = async(req, res) => {
    const id = req.params.id;
    const updatedHistory = await History.update(req.body, { where: {id: id}});
    res.status(200).json({
        status: updatedHistory[0],
        historyId: id,
        updatedValues: req.body
    });
}

exports.deleteHistory = async(req, res) => {
    const id = req.params.id;
    const deleteStatus = await History.destroy({ where: {id: id}});
    res.status(200).json({
        status: deleteStatus,
        historyId: id,
    })
}
