const User = require('../models/user.model');
const constants = require('../utils/constants');

validateUserReqBody = async(req,res,next)=>{
    if(!req.body.name){
        res.status(400).send({
            message:"Failed! User name not provided"
        })
        return;
    }
    if(!req.body.userId){
        res.status(400).send({
            message:"Failed! UserId not provided"
        })
        return;
    }

    const user = await User.findOne({userId:req.body.userId});

    if(user != null){
        res.status(400).send({
            message:"User Already exists"
        })
        return;
    }
    

    if(!isValidEmail(req.body.email)){
        res.status(400).send({
            message:"Failed! user Email not valid"
        })
        return;
    }

    const email = await User.findOne({email:req.body.email});
    if(email != null){
        res.status(400).send({
            message:"Email Already exists"
        })
        return;
    }

    const userType = req.body.userType;
    const userTypes = [constants.userTypes.admin,constants.userTypes.customer,constants.userTypes.client]

    if(userType && !userTypes.includes(userType)){
        res.status(400).send({
            message:"User Type Provided is invalid. Possible values are CUSTOMER | ADMIN | CLIENT"
        })
        return;
    }

    next();
}


const isValidEmail = (email)=>{
    return String(email)
    .toLowerCase()
    .match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
}

validateUserStatusAndUserType = async(req,res,next)=>{
    const userType = req.body.userType;
    const userTypes = [constants.userTypes.admin,constants.userTypes.customer,constants.userTypes.client]

    if(userType && !userTypes.includes(userType)){
        res.status(400).send({
            message:"User Type Provided is invalid. Possible values are CUSTOMER | ADMIN | CLIENT"
        })
        return;
    }


    const userStatus = req.body.userStatus;
    const userStatuses = [constants.userStatus.approved,constants.userStatus.pending,constants.userStatus.rejected]

    if(userStatus && !userStatuses.includes(userStatus)){
        res.status(400).send({
            message:"User Status Provided is invalid. Possible values are APPROVED | PENDING | REJECTED"
        })
        return;
    }
    next();
}


module.exports = {
    validateUserReqBody: validateUserReqBody,
    validateUserStatusAndUserType: validateUserStatusAndUserType
}