var express = require("express")
var bodyParser = require("body-parser")
var app = express()
var ejs = require("ejs")
var multer = require("multer")
var config = require("./config")

var imageController = require("./controllers/ImageController")
var adminController = require("./controllers/AdminImageController")

var port = process.env.PORT || 3000

var mongoose = require("mongoose")
mongoose.connect(config.getDbConnectionString(), { useMongoClient: true })
mongoose.Promise = global.Promise
app.use("/admin/images", express.static(__dirname + "/uploads"))
app.use("/assets", express.static(__dirname + "/public"))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.set("view engine", "ejs")

imageController(app)
adminController(app)

app.listen(port, function () {
    console.log("App listening on port: " + port)
})