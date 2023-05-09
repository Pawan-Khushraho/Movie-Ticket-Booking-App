const constants = require('../utils/constants');
var ObjectId = require('mongoose').Types.ObjectId;
const Booking = require("../models/booking.model");


validatePaymentReqBody = async(req,res,next)=>{
    if(!req.body.bookingId){
        return res.status(400).send({
            message:"Failed! bookingId is not provided!"
        })
    }

    if(!ObjectId.isValid(req.body.bookingId)){
        return res.status(400).send({
            message:"Failed! bookingId is not valid!"
        })
    }

    const booking = await Booking.findOne({_id: req.booking.bookingId});

    if(booking == null){
        return res.status(400).send({
            message:"Failed! bookingId passed doesn't exist!"
        })
    }

    if(req.body.amount < booking.totalCost){
        return res.status(400).send({
            message:"Failed! can't do the payment as the payment amount is less than the booking amount"
        })
    }

    next();
}


module.exports = {
    validatePaymentReqBody : validatePaymentReqBody
}