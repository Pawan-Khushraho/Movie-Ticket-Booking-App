const Theatre = require('../models/theatre.model');
const Movie = require("../models/movie.model")

exports.createTheatre = async (req, res) => {
    const theatreObject = {
        name: req.body.name,
        city: req.body.city,
        description: req.body.description,
        pinCode: req.body.pinCode

    }

    const theatre = await Theatre.create(theatreObject);
    res.status(201).send(theatre);
}
exports.getAllTheatres = async (req, res) => {
    const queryObj = {};

    if (req.query.name != undefined) {
        queryObj.name = req.query.name;
    }
    if (req.query.city != undefined) {
        queryObj.city = req.query.city;
    }
    if (req.query.pinCode != undefined) {
        queryObj.pinCode = req.query.pinCode;
    }
    var theatres = await Theatre.find(queryObj);

    if(req.query.movieId != undefined){
        theatres = theatres.filter(t=>t.movies.includes(req.query.movieId))
    }

    res.status(200).send(theatres);

}
exports.getTheatre = async (req, res) => {
    const theatre = await Theatre.findOne({
        _id: req.params.id
    });
    res.status(200).send(theatre);

}


exports.deleteTheatre = async (req, res)=>{

    await Theatre.deleteOne({
        _id: req.params.id
    });
    res.status(200).send({
        message: "Successfully deleted theatre with id [ " + req.params.id + " ]"
    });


}
exports.updateTheatre = async (req, res) => {

    const savedTheatre = await Theatre.findOne({ _id: req.params.id });

    if (!savedTheatre) {
        return res.status(400).send({
            message: "Theatre being updated doesn't exist"
        });
    }

    savedTheatre.name = req.body.name != undefined ? req.body.name : savedTheatre.name;
    savedTheatre.description = req.body.description != undefined ? req.body.description : savedTheatre.description;
    savedTheatre.city = req.body.city != undefined ? req.body.city : savedTheatre.city;
    savedTheatre.pinCode = req.body.pinCode != undefined ? req.body.pinCode : savedTheatre.pinCode;
   
    var updatedTheatre = await savedTheatre.save();

    res.status(200).send(updatedTheatre);
}



exports.addMovieToATheatre = async(req,res)=>{
    const savedTheatre = await Theatre.findOne({_id: req.params.id});

    movieIds = req.body.movieIds;

    if(req.body.insert){
        movieIds.forEach(movieId => {
            savedTheatre.movies.push(movieId);
        });
    }else{
        savedMovieIds = savedTheatre.movies;

        movieIds.forEach(movieId=>{
            savedMovieIds = savedMovieIds.filter(smi => smi != movieId);
        });
        savedTheatre.movies = savedMovieIds;
    }

    await savedTheatre.save();
    res.status(200).send(savedTheatre);
}


exports.checkMoviesInsideATheatre = async(req,res)=>{
    const savedTheatre = await Theatre.findOne({_id:req.params.theatreId});
    const savedMovie = await Movie.findOne({_id: req.params.movieId});

    const responseBody = {
        message: savedTheatre.movies.includes(savedMovie._id) ? "Movie is present": "Movie is not present"
    }


    res.status(200).send(responseBody)
}