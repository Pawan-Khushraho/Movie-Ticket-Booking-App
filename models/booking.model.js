const mongoose = require("mongoose");

let bookingSchema = new mongoose.Schema({
    theatreId:{
        type: mongoose.SchemaTypes.ObjectId,
        ref:"Theatre",
        required: true,
        
    },
    movieId:{
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Movie",
        required: true
        
    },
    userId:{
        type: mongoose.SchemaTypes.ObjectId,
        ref: "User",
        required: true,
       
    },
    timing:{
        type: String,
        required:true,
    },
    status:{
        type:String,
        required:true,
        default:"IN_PROGRESS"
    },
    createdAt:{
        type: Date,
        immutable:true,
        default:()=>{
            return Date.now()
        }
    },
    updatedAt:{
        type: Date,
        default:()=>{
            return Date.now()
        }
    },
    noOfSeats:{
        type:Number,
        required:true,
    },
    totalCost:{
        type:Number
    }
})


module.exports = mongoose.model('Booking',bookingSchema);