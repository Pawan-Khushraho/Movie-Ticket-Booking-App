const validateMovieRequestBody= require('./verifyMovieRequestBody');
const authJwt = require("./authJwt");
const validateUserReqBody = require('./verifyUserReqBody')
const validateTheatreRequestBody = require('./verifyTheatreReqBody')
const validateBookingRequestBody = require("./verifyBookingReqBody")

module.exports = {
    validateMovieRequestBody,
    authJwt,
    validateUserReqBody,
    validateTheatreRequestBody,
    validateBookingRequestBody
}