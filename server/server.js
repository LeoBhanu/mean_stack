// Server that serves data to our application


const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');


const PORT = 3000; //express server running port number
const api = require('./routes/api'); //importing the router from api.js
const app = express(); // instance of express

app.use(cors());
app.use(bodyparser.json()) //specifying bodyparser to handle json data

app.use('/api', api); //when we make request to 3000/api server then uses the api router
app.get('/', function(req, res) {
    res.send('hello bhanu');
})

app.listen(PORT, function() { //listening the request in the specified port


    console.log('server on ' + PORT);
})