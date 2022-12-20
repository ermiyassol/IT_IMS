const fs = require('fs');


exports.updateDeviceType = async(req, res) => {
    var jsonContent = JSON.stringify(req.body);
    
    fs.writeFile("data/device_type.json", jsonContent, 'utf8', function (err) {
        if (err) {
            console.log("An error occurred while writing JSON Object to File.");
            return console.log(err);
        }
});
}

exports.fetchAllDeviceType = async(req, res) => {
    fs.readFile("data/device_type.json", (err, data) => {       
        if (err) throw err;

        const response = JSON.parse(data.toString('utf8'));
        res.status(200).json(response);
})
}
