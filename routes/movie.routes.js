const movieController = require("../controllers/movie.controller");
const {validateMovieRequestBody}= require("../middlewares/index")


module.exports = function(app){
    app.get("/mba/api/v1/movies",movieController.getAllMovies);
   app.get("/mba/api/v1/movies/:id",movieController.getMovie);
     app.post("/mba/api/v1/movies",[validateMovieRequestBody.validateMovieRequestBody],movieController.createMovie);
    app.put("/mba/api/v1/movies/:id",[validateMovieRequestBody.validateMovieRequestBody],movieController.updateMovie);
     app.delete("/mba/api/v1/movies/:id",movieController.deleteMovie); 
}