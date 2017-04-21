var path = require('path');
var express = require('express');


var app = express();
var engine  = require('consolidate');
//var game = require('./app/main');

app.engine('html', engine.mustache);

// set .html as the default extension
app.set('view engine', 'html');
app.set('views', __dirname + '/views');

require('node-easel');
app.use(express.static(__dirname + '/app'));
app.use('/app', express.static(__dirname + '/app'));

app.route('/').get(function(req, res) {
    res.render('index');
});

app.listen(9999, function () {
    console.log('Example app listening on port 9999!')
});