const express = require('express');
const app = express();
const moviesRouter = require('./routes/movies')

//Template engine EJS
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));


app.listen(3000, function(){
    console.log('Running on 3000');
});

//Routes
app.use('/', moviesRouter);
app.use('/movies', moviesRouter);
