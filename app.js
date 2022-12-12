const express = require("express");

const app = express();


app.use(express.json());

const port = 5522;

const welcome = (req, res) => {
  res.send("Welcome to my favourite movie list");
};

app.get("/", welcome);

const movieHandlers = require("./movieHandlers");
const userHandlers = require("./userHandlers");

app.get("/api/movies", movieHandlers.getMovies);
app.get("/api/movies/:id", movieHandlers.getMovieById);

app.listen(port, (err) => {
  if (err) {
    console.error("Something bad happened");
  } else {
    console.log(`Server is listening on ${port}`);
  }
});

const { hashPassword } = require("./auth.js");

app.post("/api/users", hashPassword, userHandlers.postUser);
app.get("/api/users", userHandlers.getUsers)