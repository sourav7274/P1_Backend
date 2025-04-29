const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: String,
  address: [
    {
      addName: String,
      phnNumber: String,
      houseNo: String,
      street: String,
      city: String,
      state: String,
      country: String,
      pincode: String,
      landmark: String,
    },
  ],
  wishlist: [
    {
      proID: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
      quantity: {
        type: Number,
       
      },
    },
  ],
  cart: [
    {
      proID: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
      quantity: {
        type: Number,
       
      },
    },
  ],
  orderHistory: [{ type: mongoose.Schema.Types.ObjectId, ref: "Order" }],
});

module.exports = mongoose.model("eComUser", userSchema);
