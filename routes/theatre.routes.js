const theatreController = require('../controllers/theatre.controller');
const {validateTheatreRequestBody} = require('../middlewares')


module.exports = function(app){
    app.get("/mba/api/v1/theatres", theatreController.getAllTheatres);
    app.get("/mba/api/v1/theatres/:id", theatreController.getTheatre);
    app.post("/mba/api/v1/theatres", [validateTheatreRequestBody.validateTheatreRequestBody],theatreController.createTheatre);
    app.put("/mba/api/v1/theatres/:id", [validateTheatreRequestBody.validateTheatreRequestBody] ,theatreController.updateTheatre);
    app.delete("/mba/api/v1/theatres/:id", theatreController.deleteTheatre);
    app.put("/mba/api/v1/theatres/:id/movies",theatreController.addMovieToATheatre);
    app.get("/mba/api/v1/theatres/:theatreId/movies/:movieId",theatreController.checkMoviesInsideATheatre);
}