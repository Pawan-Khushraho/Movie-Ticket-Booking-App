const bookingController = require("../controllers/booking.controller");
const {authJwt,validateBookingRequestBody} = require('../middlewares');

module.exports = function(app){
    app.get("/mba/api/v1/bookings",[authJwt.verifyToken],bookingController.getAllBookings);
    app.get("/mba/api/v1/bookings/:id",[authJwt.verifyToken],bookingController.getBookingById);
    app.post("/mba/api/v1/bookings",[authJwt.verifyToken,validateBookingRequestBody.validateBookingRequestBody],bookingController.createBooking);
    app.put("/mba/api/v1/bookings/:id",[authJwt.verifyToken],bookingController.updateBooking);
}