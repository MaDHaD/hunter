'use strict';

function init() {
    let canvas = document.getElementById("stageCanvas");
    let socket = io();

    let game = new Game(socket, canvas);
    game.createStage(canvas);
    
    socket.on('connect', function() {
        let player = Player.getPlayer(socket.id);
        socket.emit('new-player', {id: socket.id, player: player});
        game.addPlayer({id: socket.id, player: player});

        socket.on('updateStage', function (players) {
            Object.keys(players).forEach(function(key) {
                if(key !== socket.id) {
                    let player = Player.getPlayer(players[key].id);
                    game.addPlayer({id: key, player: player});
                    game.run(key)
                }
            });
        });

        window.addEventListener("keydown", function (e) {
            game.playerMovement(socket.id, e);
            socket.emit('playerMove', {socketId: socket.id, e: {keyCode: e.keyCode}});
        });

        window.addEventListener("keyup", function (e) {
            game.playerStop(socket.id, e);
            socket.emit('playerStop', {socketId: socket.id, e: {keyCode: e.keyCode}});
        });


        socket.on('player-disconnected', function() {
            game.removePlayer(socket.id);
            game.stage.update();
        });

        socket.on('movement', function (playerData) {
            game.playerMovement(playerData.socketId, playerData.e);
        });

        socket.on('stop', function (playerData) {
            game.playerStop(playerData.socketId, playerData.e);
            // let player = game.getPlayerPos(data.socketId);
            // game.updateStage(data.socketId, player)
        });

        game.run(socket.id)
    });

    



    // socket.on('movement', function (playerData) {
    //     let data = JSON.parse(playerData);
    //     game.playerMovement(data.socketId, data.e);
    // });
    //
    // socket.on('stop', function (playerData) {
    //     let data = JSON.parse(playerData);
    //     game.playerStop(data.socketId, data.e);
    //     let player = game.getPlayerPos(data.socketId);
    //     game.updateStage(data.socketId, player)
    // });
    

    // // Creating stage
    // game.createStage(canvas);
    // game.addBackgroundToStage();
    // socket.on('new-player', function (id) {
    //     let player = Player.getPlayer(id);
    //     game.addPlayer({id: id, player: player});
    //     game.run(id)
    // });
    //
    
    //
    // window.addEventListener("keydown", function (e) {
    //     game.playerMovement(socket.id, e);
    //     socket.emit('playerMove', JSON.stringify({socketId: socket.id, e: {keyCode: e.keyCode}}));
    // });
    //
    // window.addEventListener("keyup", function (e) {
    //     game.playerStop(socket.id, e);
    //     socket.emit('playerStop', JSON.stringify({socketId: socket.id, e: {keyCode: e.keyCode}}));
    // });
    //
    //
    // socket.on('movement', function (playerData) {
    //     let data = JSON.parse(playerData);
    //     game.playerMovement(data.socketId, data.e);
    // });
    //
    // socket.on('stop', function (playerData) {
    //     let data = JSON.parse(playerData);
    //     game.playerStop(data.socketId, data.e);
    //     let player = game.getPlayerPos(data.socketId);
    //     game.updateStage(data.socketId, player)
    // });
}
