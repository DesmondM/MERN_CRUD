const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
//const {Mongoose} = require('mongoose');

require('dotenv').config(); // environment variables

//creates an express server
const app = express();  
const port = process.env.PORT || 5000;

//middleware
app.use(cors());
app.use(express.json());  //parse json, since server receives json

const uri = process.env.ATLAS_URI;
 mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true});

const connection = mongoose.connection;
connection.once('open', () => {
   console.log("MongoDB database connection established successfully-finally");
 }) 

/* const MongoClient = require('mongodb').MongoClient;
//const uri = "mongodb+srv://dbDes:poppie@cluster0.zklft.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
console.log("MongoDB database connection established successfully-finally");
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  console.log("MongoDB database connection established successfully-finally ZZZZZZZ");
  client.close();
  
})*/

const exercisesRouter = require('./routes/exercises');
const usersRouter = require('./routes/users'); 

app.use('/exercises', exercisesRouter);
app.use('/users', usersRouter);

app.listen(port, ()=>{
    console.log(`Server is running on port: ${port}`);
})



