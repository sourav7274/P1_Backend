const mongoose = require('mongoose');

const phoneSchema = new mongoose.Schema({
  name: String,
  brand: {
    type: String,
    enum: [
      "Apple",
      "Samsung",
      "Google",
      "OnePlus",
      "Xiaomi",
      "Oppo",
      "Vivo",
      "Huawei",
      "Sony",
      "LG",
      "Motorola",
      "Realme",
      "Nokia",
      "Asus",
      "Lenovo"
    ]
  },
  model: String,
  ram: {
    type: String,
    enum: [
      "2GB",
      "4GB",
      "6GB",
      "8GB",
      "12GB",
      "16GB",
      "32GB"
    ]
  },
  storage: {
    type: String,
    enum: [
      "16GB",
      "32GB",
      "64GB",
      "128GB",
      "256GB",
      "512GB",
      "1TB"
    ]
  },
  camera: {
    type: String,
    enum: [
      "8MP",
      "12MP",
      "16MP",
      "24MP",
      "32MP",
      "48MP",
      "64MP",
      "108MP"
    ]
  },
  battery: {
    type: String,
    enum: [
      "2000mAh",
      "3000mAh",
      "4000mAh",
      "5000mAh",
      "6000mAh",
      "7000mAh"
    ]
  },
  displaySize: {
    type: String,
    enum: [
      "4.7 inches",
      "5.5 inches",
      "6.1 inches",
      "6.4 inches",
      "6.5 inches",
      "6.7 inches",
      "7.0 inches"
    ]
  },
  os: [{
    type: String,
    enum: ["iOS", "Android", "HarmonyOS", "Others"]
  }],
  releaseDate: Date,
  price: Number,
  color: [{
    type: String,
    enum: [
      "Black",
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
      "Teal",
      "Midnight",
      "Starlight"
    ]
  }],
  imageUrl: String,
  description:String,
  images:{
      type:[String]
  },
  weight: {
    type: String,
    enum: [
      "100g",
      "150g",
      "200g",
      "250g",
      "300g"
    ]
  }
});

const Phone = mongoose.model("Phone", phoneSchema);

module.exports = Phone;
