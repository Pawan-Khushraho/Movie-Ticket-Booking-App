const constants = require("../utils/constants");
var ObjectId = require("mongoose").Types.ObjectId;
const Theatre = require("../models/theatre.model");

validateBookingRequestBody = async(req,res,next)=>{
    if(!req.body.theatreId){
        return res.status(400).send({
            message:"Failed! Theatre Id is not provided"
        })
    }

    if(!ObjectId.isValid(req.body.theatreId)){
        return res.status(400).send({
            message:"Failed! Theatre Id is not in valid format"
        })
    }

    if(!req.body.movieId){
        return res.status(400).send({
            message:"Failed! Movie Id is not provided"
        })
    }

    if(!ObjectId.isValid(req.body.movieId)){
        return res.status(400).send({
            message:"Failed! Movie Id is not in valid format"
        })
    }

    const theatre = await Theatre.findOne({_id:req.body.theatreId});
    if(theatre == null){
        return res.status(400).send({
            message:"Failed! Theatre doesn't exist !"
        })
    }
    
    if(!theatre.movies.includes(req.body.movieId)){
        return res.status(400).send({
            message:"Failed! movieId passed is not available in the theatre!"
        })
    }

    if(!req.body.timing){
        return res.status(400).send({
            message:"Failed! Movie timing not provided!"
        })
    }

    if(!req.body.noOfSeats){
        return res.status(400).send({
            message:"Failed! no. of seats not provided!"
        })
    }


    next();
    
}


module.exports = {
    validateBookingRequestBody : validateBookingRequestBody
}