const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  type: [
    {
      type: String,
      enum: ["games", "phones", "books", "jackets"],
    },
  ],
  title: {
    type: String,
  },
  author: {
    type: String,
  },
  publishedYear: {
    type: Number,
  },
  language: {
    type: String,
  },
  country: {
    type: String,
    default: "United States",
  },
  rating: {
    type: Number,
    min: 0,
    max: 10,
    default: 0,
  },
  imageUrl: String,
  price: Number,
  description: String,
  images: {
    type: [String],
  },
  genre: [
    {
      type: String,
      enum: [
        "Fiction",
        "Autobiography",
        "Non-fiction",
        "Mystery",
        "Thriller",
        "Science Fiction",
        "Fantasy",
        "Romance",
        "Historical",
        "Business",
        "Biography",
        "Self-help",
        "Other",
      ],
    },
  ],
  gcategory: [
    {
      type: String,
      enum: [
        "Action",
        "Adventure",
        "Role-Playing Game (RPG)",
        "Sports",
        "Racing",
        "Simulation",
        "Strategy",
        "Puzzle",
        "Shooter",
        "Fighting",
        "Platformer",
        "Open World",
        "Survival",
        "Horror",
        "Card",
        "MMORPG",
      ],
    },
  ],
  pgRating: [
    {
      type: String,
      enum: ["E", "E10+", "T", "M", "AO", "RP", "S", "V"],
    },
  ],
  completionTime: Number,
  userRating: {
    type: Number,
    default: 1,
    max: 10,
    min: 1,
  },
  metaCriticRating: {
    type: Number,
    default: 1,
    max: 100,
    min: 1,
  },
  studio: String,
  publisher: String,

  realeaseDate: Date,
  platform: String,
  multiplayer: {
    type: Boolean,
    default: false,
  },
  bbrand: [
    {
      type: String,
      enum: [
        "North Face",
        "Columbia",
        "Patagonia",
        "Adidas",
        "Nike",
        "Levi's",
        "Zara",
        "H&M",
        "Uniqlo",
        "Marmot",
        "Puma",
        "Reebok",
        "Under Armour",
        "Wrangler",
        "Carhartt",
      ],
    },
  ],
  color: [
    {
      type: String,
      enum: [
        "red",
        "white",
        "blue",
        "green",
        "yellow",
        "black",
        "purple",
        "orange",
        "pink",
        "brown",
        "gray",
        "cyan",
        "magenta",
        "lime",
        "navy",
        "teal",
        "maroon",
        "olive",
        "coral",
        "gold",
        "silver",
        "indigo",
        "violet",
        "peach",
        "lavender",
        "turquoise",
      ],
    },
  ],
  material: [
    {
      type: String,
      enum: [
        "cotton",
        "polyester",
        "wool",
        "silk",
        "linen",
        "denim",
        "leather",
        "nylon",
        "rayon",
        "spandex",
      ],
    },
  ],
  category: [
    {
      type: String,
      enum: [
        "bomber",
        "denim",
        "leather",
        "parka",
        "trench",
        "puffer",
        "windbreaker",
        "blazer",
        "sports",
        "utility",
        "rain",
        "fleece",
        "motorcycle",
        "hiking",
        "varsity",
      ],
    },
  ],

  waterResistance: Boolean,
  insulationType: String,
  stock: {
    type: Number,
    default: 0, // Default value for new products
  },
  ratings: {
    type: Number,
    min: 0,
    max: 5,
  },
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
      "Lenovo",
    ],
  },
  model: String,
  ram: {
    type: String,
    enum: ["2GB", "4GB", "6GB", "8GB", "12GB", "16GB", "32GB"],
  },
  storage: {
    type: String,
    enum: ["16GB", "32GB", "64GB", "128GB", "256GB", "512GB", "1TB"],
  },
  camera: {
    type: String,
    enum: ["8MP", "12MP", "16MP", "24MP", "32MP", "48MP", "64MP", "108MP"],
  },
  battery: {
    type: String,
    enum: ["2000mAh", "3000mAh", "4000mAh", "5000mAh", "6000mAh", "7000mAh"],
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
      "7.0 inches",
    ],
  },
  os: [
    {
      type: String,
      enum: ["iOS", "Android", "HarmonyOS", "Others"],
    },
  ],
  releaseDate: Date,

  pcolor: [
    {
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
        "Starlight",
      ],
    },
  ],
  weight: {
    type: String,
    enum: ["100g", "150g", "200g", "250g", "300g"],
  },
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
