const express = require('express');
const path = require('path');
const moviesRouter = require('./routes/movies');
const app = express();

app.listen(3017, function() {
    console.log ('Running on 3017')
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));


app.use('/movies' , moviesRouter);

