const mongoose = require("mongoose")

const clothSchema = new mongoose.Schema({
    name: String,
    brand:String,
    size:String,
    material: String,
    category: String,
    color: String,
    pirce:String,
    waterResistance: Boolean,
    insulationType: String,
    descruption: String,
    imageUrl: String,
})

const Jacket = mongoose.model("Jacket",clothSchema)

module.exports = Jacket