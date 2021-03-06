var express = require('express'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser');

var db;
if (process.env.ENV == 'Test') {
  db = mongoose.connect('mongodb://localhost/fxtest');
}else{
  db = mongoose.connect('mongodb://localhost/fx');
}


var Book = require('./models/bookModel');

var app = express();

var port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

bookRouter = require('./routes/bookRoutes')(Book);
app.use('/api/Books',bookRouter);
//app.use('/api/author',authorRouter);

app.get('/',function(req, res){
  res.send('Welcome to my API!');
});

app.listen(port, function(){
  console.log('Running on Port uisng gulp:', port);
});

module.exports = app;
