var express = require('express');
var path = require('path');
var exphbs = require('express-handlebars');

var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var db = require('./models');


var app = express();


app.use(express.static(path.join(__dirname, 'public')));

var PORT = process.env.PORT || 3000;

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');




app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(methodOverride('_method'));

var routes = require('./controllers/movie_controller.js');
app.use('/', routes);


db.sequelize.sync().then(function() {
    app.listen(PORT, function() {
        console.log('listening on port ' + PORT);
    });
});