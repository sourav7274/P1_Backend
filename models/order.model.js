const { timeStamp } = require('console')
const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
    userId: {type: mongoose.Schema.Types.ObjectId,ref:"eComUser"},
    items:{
        itemId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Product"
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