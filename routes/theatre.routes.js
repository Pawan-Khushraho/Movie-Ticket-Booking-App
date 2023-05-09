const theatreController = require('../controllers/theatre.controller');
const {validateTheatreRequestBody,authJwt} = require('../middlewares')


module.exports = function(app){
    app.get("/mba/api/v1/theatres",[authJwt.verifyToken], theatreController.getAllTheatres);
    app.get("/mba/api/v1/theatres/:id", [authJwt.verifyToken],theatreController.getTheatre);
    app.post("/mba/api/v1/theatres", [authJwt.verifyToken,authJwt.isAdmin,validateTheatreRequestBody.validateTheatreRequestBody],theatreController.createTheatre);
    app.put("/mba/api/v1/theatres/:id", [authJwt.verifyToken,authJwt.isAdmin,validateTheatreRequestBody.validateTheatreRequestBody] ,theatreController.updateTheatre);
    app.delete("/mba/api/v1/theatres/:id",[authJwt.verifyToken,authJwt.isAdmin], theatreController.deleteTheatre);
    app.put("/mba/api/v1/theatres/:id/movies",[authJwt.verifyToken,authJwt.isAdmin],theatreController.addMovieToATheatre);
    app.get("/mba/api/v1/theatres/:theatreId/movies/:movieId",[authJwt.verifyToken],theatreController.checkMoviesInsideATheatre);
}