const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
  addName: String,
  phnNumber: String,
  houseNo: String,
  street: String,
  city: String,
  state: String,
  country: String,
  pincode: String,
  landmark: String,
});

const Address = mongoose.model("Address",addressSchema)

module.exports = Address