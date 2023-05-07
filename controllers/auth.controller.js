const User = require('../models/user.model');
const constants = require('../utils/constants');
var brcrypt = require("bcryptjs");
var jwt = require('jsonwebtoken');
const config = require('../configs/auth.config');

exports.signup = async(req,res)=>{
    var userStatus = req.body.userStatus;

    if(!req.body.userStatus){
        if(!req.body.userType || req.body.userType == constants.userTypes.customer){
            userStatus = constants.userStatus.approved;
        }else{
            userStatus = constants.userStatus.pending;
        }
    }


    const userObj = {
        name: req.body.name,
        userId: req.body.userId,
        email: req.body.email,
        userType: req.body.userType,
        password: brcrypt.hashSync(req.body.password,8),
        userStatus: userStatus
    }

    try {
        const userCreated = await User.create(userObj);
        const postResponse= {
            name: userCreated.name,
            userId: userCreated.userId,
            email: userCreated.email,
            userType: userCreated.userType,
            userStatus: userCreated.userStatus,
            createdAt: userCreated.createdAt,
            updatedAt: userCreated.updatedAt
        }


        res.status(201).send(postResponse)
    } catch (error) {
        console.log("some error while saving the user in db",err.message);
        res.status(500).send({
            message:"Some internal error while inserting the element"
        })
    }
}

exports.signin = async(req,res)=>{
    
}