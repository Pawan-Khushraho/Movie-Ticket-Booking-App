const validateMovieRequestBody= require('./verifyMovieRequestBody');
const authJwt = require("./authJwt");
const validateUserReqBody = require('./verifyUserReqBody')
const validateTheatreRequestBody = require('./verifyTheatreReqBody')
module.exports = {
    validateMovieRequestBody,
    authJwt,
    validateUserReqBody,
    validateTheatreRequestBody
}