const constants = require("../utils/constants")


validateMovieRequestBody = async(req,res,next)=>{
    if(!req.body.name){
        return res.status(400).send({
            message:"Failed! Movie Name is not provided."
        })
    }

    if(!req.body.releaseStatus){
        return res.status(400).send({
            message:"Failed! Movie release Status is not provided."
        })
    }


    const releaseStatus = req.body.releaseStatus;
    const releaseStatusType = [constants.releaseStatus.blocked,constants.releaseStatus.released,constants.releaseStatus.unreleased];

    if(!releaseStatusType.includes(releaseStatus)){
        return res.status(400).send({
            message:"Movie release status provided is invalid! Possible Values are BLOCKED | RELEASED | UNRELEASED."
        })
    }


    if(!req.body.releaseDate){
        return res.status(400).send({
            message:"Failed! Movie release Date is not provided."
        })
    }


    next();
}


module.exports = {
    validateMovieRequestBody : validateMovieRequestBody
}