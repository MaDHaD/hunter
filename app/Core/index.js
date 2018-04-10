'use strict';

const Rectangle = createjs.Rectangle;
const Graphics = createjs.Graphics;
const Shape = createjs.Shape;
const Ticker = createjs.Ticker;
const Stage = createjs.Stage;

class Core {
    constructor() {
        this.stage = null;
        this.players = {};
    }
    
    getStage() {
        return this.stage;
    }
    
    getPlayers() {
        return this.players
    }
    
    setStage(canvas) {
        this.bounds = new Rectangle();
        this.bounds.width = 800;
        this.bounds.height = 800;
        this.stage = new Stage(canvas);
    }
}

module.exports = Core;

// class Core {
//     constructor() {
//         this.stage = null;
//         this.ticker = Ticker;
//         this.players = [];
//         this.events = 0;
//     }
//
//     createStage(canvas) {
//         this.bounds = new Rectangle();
//         this.bounds.width = 800;
//         this.bounds.height = 800;
//         this.stage = new Stage(canvas);
//     }
//    
//     addBackgroundToStage() {
//         let background = new createjs.Bitmap('/app/img/Background.jpg');
//         background.scaleX = 2;
//         background.scaleY = 2.7;
//         this.stage.addChild(background);
//     }
//
//     addPlayer(data) {
//         console.log(data)
//         data.player.keys = [];
//         this.stage.addChild(data.player);
//         data.player.x = 0;
//         data.player.y = 0;
//         this.players[data.id] = data.player;
//     }
//
//     removePlayer(id) {
//         this.stage.removeChild(this.players[id])
//     }
//
//     getAllPlayers() {
//         return this.players;
//     }
//
//     getPlayerPos(playerId) {
//         return this.players[playerId];
//     }
//
//     handleTick(playerId) {
//         if (this.players[playerId].keys[38] && (this.players[playerId].y >= 0)) {
//             this.players[playerId].y -= 5;
//         }
//         if (this.players[playerId].keys[40] && (this.players[playerId].y < (this.bounds.height - 64))) {
//             this.players[playerId].y += 5;
//         }
//         if (this.players[playerId].keys[39] && (this.players[playerId].x < (this.bounds.width - 64))) {
//             this.players[playerId].x += 5;
//         }
//         if (this.players[playerId].keys[37] && (this.players[playerId].x >= 0)) {
//             this.players[playerId].x -= 5;
//         }
//
//         this.stage.update();
//     }
//
//     runKeyEvent(playerData) {
//         if (this.players[playerData.id].keys[38]) {
//             playerData.player.gotoAndPlay("moveUp");
//         }
//         if (this.players[playerData.id].keys[40]) {
//             playerData.player.gotoAndPlay("moveDown");
//         }
//         if (this.players[playerData.id].keys[39]) {
//             playerData.player.gotoAndPlay("moveRight");
//         }
//         if (this.players[playerData.id].keys[37]) {
//             playerData.player.gotoAndPlay("moveLeft");
//         }
//         this.events++;
//     }
//
//     updateStage(playerId, playerData) {
//         this.players[playerId].x = playerData.x;
//         this.players[playerId].y = playerData.y;
//         this.stage.update();
//     }
//
//     playerMovement(playerId, event) {
//         this.players[playerId].keys[event.keyCode] = true;
//         if(!this.events) {
//             this.runKeyEvent({id: playerId, player: this.players[playerId]});
//         }
//     }
//
//     playerStop(playerId, event) {
//         this.players[playerId].keys[event.keyCode] = false;
//         this.players[playerId].gotoAndStop("idle");
//         this.events = 0;
//     }
//
//     run(playerId) {
//         this.stage.update();
//         this.ticker.setFPS(60);        
//         this.ticker.addEventListener("tick", this.handleTick.bind(this, playerId));
//     }
// }