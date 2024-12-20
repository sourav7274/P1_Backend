const mongoose = require("mongoose")

const clothSchema = new mongoose.Schema({
    name: String,
    brand: [{
    type: String,
    enum: [
        'North Face', 'Columbia', 'Patagonia', 'Adidas', 'Nike', 
        "Levi's", 'Zara', 'H&M', 'Uniqlo', 'Marmot',
        'Puma', 'Reebok', 'Under Armour', 'Wrangler', 'Carhartt'
    ]
    }],
    color: [{
    type: String,
    enum: [
        'red', 'white', 'blue', 'green', 'yellow', 'black', 'purple', 'orange', 
        'pink', 'brown', 'gray', 'cyan', 'magenta', 'lime', 'navy', 'teal', 
        'maroon', 'olive', 'coral', 'gold', 'silver', 'indigo', 'violet', 
        'peach', 'lavender', 'turquoise'
    ]
    }],
    material: [{
    type: String,
    enum: [
        'cotton', 'polyester', 'wool', 'silk', 'linen', 'denim', 
        'leather', 'nylon', 'rayon', 'spandex'
    ]
    }],
    category: [{
    type: String,
    enum: [
        'bomber', 'denim', 'leather', 'parka', 'trench', 
        'puffer', 'windbreaker', 'blazer', 'sports', 'utility',
        'rain', 'fleece', 'motorcycle', 'hiking', 'varsity'
    ]
    }],
    price:Number,
    waterResistance: Boolean,
    insulationType: String,
    description: String,
    imageUrl: String,
    stock: {
    type: Number,
    default: 0 // Default value for new products
    },
    ratings: {
        type: Number,
        min: 0,
        max: 5
    },
    description:String,
    images:{
        type:[String]
    }
})

const Jacket = mongoose.model("Jacket",clothSchema)

module.exports = Jacket