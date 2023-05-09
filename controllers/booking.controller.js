const Booking = require("../models/booking.model");
const User = require("../models/user.model");
const constants = require("../utils/constants");

exports.getAllBookings = async(req,res)=>{
    const user = await User.findOne({
        userId: req.body.userId
    })

    const queryObj = {};
    if(user.userType == constants.userTypes.admin){

    }else{
        queryObj._id = user._id;
    }

    const bookings = await Booking.find(queryObj);

    res.status(200).send(bookings);
}

exports.getBookingById = async(req,res)=>{
    try {
        const bookings = await Booking.findOne({_id:req.params.id});
        res.status(200).send(bookings)

    } catch (error) {
        res.status(500).send({
            message:"Some Internal Error Occured while getting the bookings"
        })
    }
}

exports.createBooking = async(req,res)=>{
    const user = await User.findOne({
        userId: req.userId
    })

    var bookingObject = {
        theatreId: req.body.theatreId,
        movieId: req.body.movieId,
        userId: req.body.userId,
        timing: req.body.timing,
        noOfSeats: req.body.noOfSeats,
        totalCost: (req.body.noOfSeats * constants.ticketPrice)
    }

    try {
        const booking = await Booking.create(bookingObject);
        res.status(201).send(booking)
    } catch (error) {
        console.log(error.message)
        res.status(500).send({
            message:"Some Internal Error Occured while creating the bookings"
        })
    }
}

exports.updateBooking = async(req,res)=>{
    const booking = await Booking.findOne({
        _id: req.params.id
    })

    booking.theatreId = req.body.theatreId != undefined ? req.body.theatreId : booking.theatreId;
    booking.movieId = req.body.movieId != undefined ? req.body.movieId : booking.movieId;
    booking.userId = req.body.userId != undefined ? req.body.userId : booking.userId;
    booking.timing = req.body.timing != undefined ? req.body.timing:booking.timing;
    booking.noOfSeats = req.body.noOfSeats != undefined ? req.body.noOfSeats:booking.noOfSeats;
    booking.totalCost = req.body.totalCost != undefined ? req.body.totalCost:booking.totalCost;
    booking.status = req.body.status != undefined ? req.body.status:booking.status;


    try {
        const updateBooking = await booking.save();
        res.status(201).send(updateBooking)
    } catch (error) {
        console.log(error.message)
        res.status(500).send({
            message : "Some Internal Error Occured while updating the bookings"
        })
    }
}