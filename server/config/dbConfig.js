//Import the mongoose
const mongoose = require('mongoose');
//Connect mongoose with the object.
mongoose.connect(process.env.mongo_url);
//Create the connection object.
const connection = mongoose.connection;
//verify the connection
connection.on('connected', ()=>{
console.log('MongoDB connection Successful');
})
//Connection error
connection.on('error', (err)=>{
console.log('MongoDB Connection Failed');
})