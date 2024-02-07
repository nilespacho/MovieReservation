const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
//Since we are using .env environment variables
require("dotenv").config();
//Add the DB Config
const dbConfig = require("./config/dbConfig");
//let us now start the server
app.listen(port, () => console.log(`Node JS Server is running on port ${port}`));