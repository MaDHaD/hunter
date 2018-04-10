const http = require('http');
const express = require('express');
const path = require('path');
const socketIO = require('socket.io');
const app = express();
const server = http.Server(app);
const io = socketIO(server);
const engine = require('consolidate');
const _ = require('lodash');

app.engine('html', engine.mustache);

require('node-easel');
// set .html as the default extension
app.set('view engine', 'html');
app.use(express.static(__dirname + '/client'));
app.use('/client', express.static(__dirname + '/client'));

app.set('views', __dirname + '/client');

app.use(express.static(__dirname + '/app'));
app.use('/app', express.static(__dirname + '/app'));

app.route('/').get(function(req, res) {
    res.render('index');
});

server.listen(9999, function () {
    console.log('Example app listening on port 9999!')
});

let Core = require('./app/Core');
let Player = require('./app/Core/player');
let game = new Core();

io.on('connection', function(client) {
    client.on('new-player', function (playerData) {
        game.players[playerData.id] = playerData.player;
        io.sockets.emit('updateStage', game.getPlayers());
    });
    
    
    // client.on('updateState', function (e) {
    //     client.emit('updateStage', e)
    // });

    client.on('playerMove', function (playerData) {
        // console.log(game.players[playerData.socketId])
        io.sockets.emit('movement', playerData);
    });

    client.on('playerStop', function (playerData) {
        io.sockets.emit('stop', playerData);
    });

    client.on('disconnect', function () {
        delete game.players[client.id];
        client.emit('player-disconnected', client.id);
    });
});