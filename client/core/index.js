const Rectangle = createjs.Rectangle;
const Graphics = createjs.Graphics;
const Shape = createjs.Shape;
const Ticker = createjs.Ticker;
const Stage = createjs.Stage;

class Game {
    constructor() {
        this.stage = null;
        this.ticker = Ticker;
        this.players = {};
        this.events = 0;
    }

    createStage(canvas) {
        this.bounds = new Rectangle();
        this.bounds.width = 800;
        this.bounds.height = 800;
        this.stage = new Stage(canvas);
    }

    addBackgound() {
        let background = new createjs.Bitmap('/app/img/Background.jpg');
        background.scaleX = 2;
        background.scaleY = 2.7;
        this.stage.addChildAt(background);
    }

    addPlayer(data) {
        data.player.keys = [];
        data.player.x = data.x || 10;пше 
        data.player.y = data.y || 0;
        this.stage.addChild(data.player);
        this.players[data.id] = data.player;
    }

    runKeyEvent(playerData) {
        if (this.players[playerData.id].keys[38]) {
            this.players[playerData.id].gotoAndPlay("moveUp");
        }
        if (this.players[playerData.id].keys[40]) {
            this.players[playerData.id].gotoAndPlay("moveDown");
        }
        if (this.players[playerData.id].keys[39]) {
            this.players[playerData.id].gotoAndPlay("moveRight");
        }
        if (this.players[playerData.id].keys[37]) {
            this.players[playerData.id].gotoAndPlay("moveLeft");
        }
        // this.handleTick(playerData.id)
        this.players[playerData.id].events++;
    }

    playerMovement(playerId, event) {
        this.players[playerId].keys[event.keyCode] = true;
        if(!this.players[playerId].events) {
            this.runKeyEvent({id: playerId, player: this.players[playerId]});
        }
    }

    playerStop(playerId, event) {
        this.players[playerId].keys[event.keyCode] = false;
        this.players[playerId].gotoAndStop("idle");
        this.players[playerId].events = 0;
    }

    removePlayer(id) {
        this.stage.removeChild(this.players[id])
    }

    handleTick(playerId) {
        if (this.players[playerId].keys[38] && (this.players[playerId].y >= 0)) {
            this.players[playerId].y -= 5;
        }
        if (this.players[playerId].keys[40] && (this.players[playerId].y < (this.bounds.height - 64))) {
            this.players[playerId].y += 5;
        }
        if (this.players[playerId].keys[39] && (this.players[playerId].x < (this.bounds.width - 64))) {
            this.players[playerId].x += 5;
        }
        if (this.players[playerId].keys[37] && (this.players[playerId].x >= 0)) {
            this.players[playerId].x -= 5;
        }
        this.stage.update();
    }

    run(playerId) {
        this.addBackgound();
        this.stage.update();
        this.ticker.setFPS(60);
        this.ticker.addEventListener("tick", this.handleTick.bind(this, playerId));
    }
}