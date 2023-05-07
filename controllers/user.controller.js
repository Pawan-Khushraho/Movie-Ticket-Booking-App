const User = require('../models/user.model');
var bcrypt = require('bcryptjs');

exports.update = async(req,res)=>{
    const UserIdReq = req.userId;

    try {
        const user = await User.findOneAndUpdate({
            userId:UserIdReq
        },{
            password:bcrypt.hashSync(req.body.password,8)
        }).exec();

        res.status(200).send({
            message:"user record has been updated"
        })
    } catch (error) {
        console.log("error while updating record ",error.message)

        res.status(500).send({
            message:"Some internal error occured"
        })
    }
}


exports.updateUser = async(req,res)=>{
    const UserIdReq = req.userId;

    try {
        const user = await User.findOneAndUpdate({
            userId:UserIdReq
        },{
           name: req.body.name,
           userStatus: req.body.userStatus,
           userType: req.body.userType
        }).exec();

        res.status(200).send({
            message:"user record has been updated"
        })
    } catch (error) {
        console.log("error while updating record ",error.message)

        res.status(500).send({
            message:"Some internal error occured"
        })
    }
}