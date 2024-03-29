const express = require("express");
const port = process.env.PORT || 5000;
const mongoose = require("mongoose");
const cors = require("cors");
const reservationRouter = require("./routes/reservation-routes");
const airing_time = require("./routes/airing_time-routes");
const movieRoutes = require("./routes/movie-routes");
const app = express();

app.use(cors());
app.use(express.json());

require("dotenv").config();
app.listen(port, () =>
  console.log(`Node JS Server is running on port ${port}`)
);

mongoose
  .connect(`${process.env.MONGODB_URI}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

app.use("/api/reservation", reservationRouter);
app.use("/api/airing-time", airing_time);
app.use("/api/movies", movieRoutes);

app.get("/movies", async (request, response) => {
  try {
    const movies = await Movie.find({});
    console.log("Movies:", movies);
    response.send(movies);
  } catch (error) {
    console.error("Error fetching movies:", error);
    response.status(500).send("Internal Server Error");
  }
});
