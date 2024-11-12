const mongoose = require('mongoose')


const phoneSchema = new mongoose.Schema({
  name: String,
  brand: String,
  model:String,
  ram:String,
  storage:String,
  camera:String,
  battery:String,
  displaySize: String,
  os: [{
    type: String,
    enum: [ "iOS","Andriod","Others" ]
  }],
  releaseDate: Date,
  price:String,
  color:[{
    type:String,
   enum: [    "Black",
    "White",
    "Silver",
    "Gold",
    "Rose Gold",
    "Blue",
    "Red",
    "Green",
    "Purple",
    "Pink",
    "Gray",
    "Yellow",
    "Orange",
    "Teal"
  ]}],
  imageUrl: String,
  weight:String
})

const Phone = mongoose.model("Phone",phoneSchema)

module.exports = Phone