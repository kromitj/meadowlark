// This is the called the "app file" in the book
var PORT = 3000;
var express = require('express');

var app = express();

var fortunes = [
  "Take it to the limit",
  "Yoooooooooooo......",
  "Don't stop believing?"
];


var handlebars = require('express-handlebars')
  .create({ defaultLayout: 'main' });
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.use(express.static(__dirname + '/public'));
app.set('port', process.env.PORT || PORT);

app.get('/', function(req, res) {
  res.render('home');
});

app.get('/about', function(req, res) {
  var randomFortune = fortunes[0];
  console.log(randomFortune);
  res.render('about', { fortune: randomFortune});
});

//custom 404 page
app.use(function(req, res) {
  res.status(404);
  res.render('404');
});

// custom 500 page
// app.use is a method that Express uses to add middleware
// basically this catches a request that didn't match any route
app.use(function(req, res) {
  console.error(err.stack);
  res.status(500);
  res.render('500');
});

app.listen(app.get('port'), function() {
  console.log( 'Express started on http://localhost:' +
    app.get('port') + '; press Ctrl-C to terminate.'  
  );
})