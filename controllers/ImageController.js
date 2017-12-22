var Image = require("../models/Image")
var upload = require("./UploadController")
var fs = require("fs")
function getImages(res) {
    Image.find(function (err, images) {
        if (err) {
            res.status(500).json(err)
        } else {
            res.json(images)
        }
    })
}

module.exports = function (app) {
    // Get all image
    app.get("/api/images", function (req, res) {
        getImages(res)
    })

    // Get one image
    app.get("/api/images/:id", function (req, res) {
        Image.findById({ _id: req.params.id }, function (err, image) {
            if (err) {
                throw err
            } else {
                res.json(image)
            }
        })
    })

    // Creat image
    app.post("/api/create_image", upload.single("img"), function (req, res) {
        var image = {
            path: req.file.filename,
            description: req.body.description
        }
        Image.create(image, function (err, image) {
            if (err) {
                throw err
            } else {
                getImages(res)
            }
        })
    })
    // Delete image
    app.delete("/api/images/:id", function (req, res) {
        Image.findById({ _id: req.params.id }, function (err, image) {
            if (err) {
                throw err
            } else {
                Image.remove({
                    _id: req.params.id
                }, function (err) {
                    if (err) throw err
                    fs.unlink(`./uploads/${image.path}`, function (err) {
                        if (err) {
                            return res.status(500).json(err)
                        } else {
                            getImages(res)
                            console.log("Successfully deleted image")
                        }
                    })
                })
            }
        })
    })
}