var multer = require("multer")
var path = require("path")

var storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, "./uploads")
    },
    filename: function (req, file, callback) {
        callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})

module.exports = multer({
    storage: storage
})