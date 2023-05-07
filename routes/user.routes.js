const userController = require('../controllers/user.controller');
const {validateUserReqBody,authJwt}= require("../middlewares");

module.exports= function(app){
    app.put('/mba/api/v1/users',[authJwt.verifyToken],userController.update);
    app.put('/mba/api/v1/users/:userId',[authJwt.verifyToken,authJwt.isAdmin,validateUserReqBody.validateUserStatusAndUserType],userController.updateUser);
}