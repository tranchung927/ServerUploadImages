var mongoose = require("mongoose")

var Schema = mongoose.Schema

var imageSchema = new Schema({
    path: String,
    description: String
}, {
    collection: 'images'
})

var Image = mongoose.model("Image", imageSchema)

module.exports = Image