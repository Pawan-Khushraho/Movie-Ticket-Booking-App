const movieController = require("../controllers/movie.controller");
const {validateMovieRequestBody,authJwt}= require("../middlewares/index")


module.exports = function(app){
    app.get("/mba/api/v1/movies",[authJwt.verifyToken],movieController.getAllMovies);
    app.get("/mba/api/v1/movies/:id",[authJwt.verifyToken],movieController.getMovie);
    app.post("/mba/api/v1/movies",[authJwt.verifyToken,authJwt.isAdmin,validateMovieRequestBody.validateMovieRequestBody],movieController.createMovie);
    app.put("/mba/api/v1/movies/:id",[authJwt.verifyToken,authJwt.verifyToken,validateMovieRequestBody.validateMovieRequestBody],movieController.updateMovie);
    app.delete("/mba/api/v1/movies/:id",[authJwt.verifyToken,authJwt.isAdmin],movieController.deleteMovie); 
}