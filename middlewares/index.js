const validateMovieRequestBody= require('./verifyMovieRequestBody');
const authJwt = require("./authJwt");
const validateUserReqBody = require('./verifyUserReqBody')

module.exports = {
    validateMovieRequestBody,
    authJwt,
    validateUserReqBody,

}