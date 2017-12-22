var Image = require("../models/Image")
var upload = require("./UploadController")
var fs = require("fs")

module.exports = function (app) {
    app.get("/admin", function (req, res, next) {
        res.render("index")
    })

    app.get("/assets/images", function (req, res) {
        Image
        .find({})
        .exec(function (err, data) {
            if (err) return next(err)
            res.render("images", {
                data: data
            })
        })
    })

    app.post("/admin/file_upload", upload.single("img"), function (req, res) {
        var image = {
            path: req.file.filename,
            description: req.body.description
        }
        Image.create(image, function (err, image) {
            if (err) {
                throw err
            } else {
                return res.redirect("/assets/images")
            }
        })
    })
}