var configValues = require("./config")

module.exports = {
    getDbConnectionString: function () {
        return `mongodb://${configValues.username}:${configValues.password}@ds135916.mlab.com:35916/node-todos`
    }
}