const constants = require('../utils/constants');
const Theatre = require('../models/theatre.model');


validateTheatreRequestBody = async(req,res,next)=>{
    if (!req.body.name) {
        return res.status(400).send({
            message:"Failed! Theatre Name Not Provided"
        })
    }

    if(!req.body.description){
        return res.status(400).send({
            message:"Failed! Theatre Description Not Provided"
        })
    }

    if(!req.body.city){
        return res.status(400).send({
            message:"Failed! Theatre City Not Provided"
        })
    }

    if(!req.body.pinCode){
        return res.status(400).send({
            message:"Failed! Theatre pinCode Not Provided"
        })
    }
    const theatre = await Theatre.findOne({
        name:req.body.name,
        pincode: req.body.pinCode
    })

    if(theatre != null){
        return res.status(400).send({
            message:"Failed! Same theatre in same locationa already added"
        })
    }


    next();
}


module.exports = {
    validateTheatreRequestBody : validateTheatreRequestBody
}