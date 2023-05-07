const authController = require('../controllers/auth.controller');
const {validateUserReqBody}= require('../middlewares')

module.exports = function(app){
    app.post("/mba/api/v1/auth/signup",[validateUserReqBody.validateUserReqBody],authController.signup);
    app.post("/mba/api/v1/auth/signin",authController.signin);
}