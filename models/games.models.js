const mongoose = require("mongoose")

const gameSchema = new mongoose.Schema({
    name : String,
    category:[{
        type:String,
        enum :["Action","Adventure","Role-Playing Game (RPG)","Sports","Racing",
            "Simulation","Strategy","Puzzle","Shooter","Fighting",
            "Platformer","Open World","Survival","Horror","Card",
            "MMORPG"
          ]
    }],
    pgRating: [{
        type:String,
        enum: ["E","E10+","T", "M", "AO","RP","S","V"]
    }],
    completionTime: Number,
    userRating:{
        type:Number,
        default:1,
        max:10,
        min:1
    },
    metaCriticRating:{
        type:Number,
        default:1,
        max:100,
        min:1
    },
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
   },
   {
    timestamps: true
   }
)

const Game = mongoose.model("Game",gameSchema)

module.exports = Game