const mongoose = require("mongoose")
const { type } = require("os")

const gameSchema = new mongoose.Schema({
    name:String,
    category:({
        type:String,
        enum :[
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
            "MMORPG"
          ]
    }),
    pgRating: ({
        type:String,
        enum: [
                "E",        // Everyone
                "E10+",     // Everyone 10 and older
                "T",        // Teen
                "M",        // Mature
                "AO",       // Adults Only
                "RP",       // Rating Pending
                "PG",       // Parental Guidance (less common in video games, more common in movies)
                "C",        // Early Childhood
                "D",        // Suggestive Themes
                "H",        // Horror
                "S",        // Sexual Content
                "V",        // Violence
            ]
    }),
    completionTime: Number,
    userRating:({
        type:Number,
        default:1,
        max:10,
        min:1
    }),
    metaCriticRating:({
        type:Number,
        default:1,
        max:10,
        min:1
    }),
    studio:String,
    publisher:String,
    price:Number,
    realeaseDate: Date ,
    platform: String ,
    multiplayer: {
        type: Boolean,
        default: false
    },
    imageUrl: String
})

const Game = mongoose.model("Game",gameSchema)

module.exports = Game