const { timeStamp } = require('console')
const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
    userId: {type: mongoose.Schema.Types.ObjectId,ref:"eComUser"},
    items:{
        type:{
            type:String,
            enum:["Game","Phone","Jacket","Book"]            
        },
        itemId:{
            type:mongoose.Schema.Types.ObjectId,
            refPath:'items.type'
        },
        quantity:{
            type:Number,
            default:1
        }
    }
},
{
    timeStamps:true
})

module.exports = mongoose.model;('Order',orderSchema)