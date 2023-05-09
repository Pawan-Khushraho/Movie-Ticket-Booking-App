const serverConfig = require("./configs/server.config");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const dbConfig = require('./configs/db.config');
const Movie = require("./models/movie.model");
const Theatre = require("./models/theatre.model");
const User = require('./models/user.model');
const bcrypt = require('bcryptjs');


const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}))


mongoose.connect(dbConfig.DB_URL);

const db = mongoose.connection;
db.on("error",()=>{
    console.log("error while connecting to db");
})
db.once("open",()=>{
    init()
    console.log("connected to MongoDB");
    
})

async function init() {
    await Movie.collection.drop();
    try {
        var movie1 =await Movie.create({
            name: "Bachhan Pandey",
            description: "Comedy Masala Movie",
            casts: ["Akshay Kumar", "Jacqueline Fernandiz"],
            director: "Farhad Samji",
            trailerUrl: "http://bacchanpandey/trailers/1",
            posterUrl: "http://bacchanpandey/posters/1",
            language: "Hindi",
            releaseDate: "18-03-2022",
            releaseSatus: "RELEASED"
        });
        var movie2 = await Movie.create({
            name: "Jalsa",
            description: "Intense Drama Movie",
            casts: ["Vidya Balan", "Shefali Shah"],
            director: "Suresh Triveni",
            trailerUrl: "http://jalsa/trailers/1",
            posterUrl: "http://jalsa/posters/1",
            language: "Hindi",
            releaseDate: "18-03-2022",
            releaseSatus: "RELEASED"
        });
        await Movie.create({
            name: "Jhund",
            description: "Comedy Drama Movie",
            casts: ["Amitabh Bachchan", "Abhinay Raj"],
            director: "Nagraj Manjule",
            trailerUrl: "http://jhund/trailers/1",
            posterUrl: "http://jhund/posters/1",
            language: "Hindi",
            releaseDate: "04-03-2022",
            releaseSatus: "RELEASED"
        });
        await Movie.create({
            name: "Radhe Shyam",
            description: "Comedy Drama Movie",
            casts: ["Prabhas", "Pooja Hegde"],
            director: "Radha Krishna Kumar",
            trailerUrl: "http://RadheShyam/trailers/1",
            posterUrl: "http://RadheShyam/posters/1",
            language: "Hindi",
            releaseDate: "11-03-2022",
            releaseSatus: "RELEASED"
        });
        await Movie.create({
            name: "The Kashmir Files",
            description: "Intense Movie",
            casts: ["Mithun Chakraborty", "Anupam Kher"],
            director: "Vivek Agnihotri",
            trailerUrl: "http://TheKashmirFiles/trailers/1",
            posterUrl: "http://TheKashmirFiles/posters/1",
            language: "Hindi",
            releaseDate: "11-03-2022",
            releaseSatus: "RELEASED"
        });

        console.log("Movies inserted in the db");
       
       

    } catch (e) {
        console.error(e.message);
    }


    try {
         //creating few initial sets of theatre
        await Theatre.collection.drop();
        await Theatre.create({
            name:"FunCinemas",
            city:"Bangalore",
            description:"Top class Theatre",
            pinCode:560052,
            movies:[movie1._id,movie2._id]
        })
        await Theatre.create({
            name:"PVR",
            city:"Bangalore",
            description:"Top class Theatre",
            pinCode:560052,
            movies:[movie1._id,movie2._id]
        })

        console.log("theatre created")
    } catch (e) {
        console.error(e.message);
    }
    await User.collection.drop();
    try {
        user = await User.create({
            name:"Pawan",
            userId:"admin",
            email:"pawan@gmail.com",
            userType:"ADMIN",
            password: bcrypt.hashSync("welcome",8)
        })
    } catch (error) {
        console.log(error.message)
    }
}


require('./routes/movie.routes')(app);
require("./routes/theatre.routes")(app);
require("./routes/auth.routes")(app);
require("./routes/user.routes")(app);
require('./routes/booking.routes')(app);


app.listen(serverConfig.PORT,()=>{
    console.log(`Application Started on port no. ${serverConfig.PORT}`)
})