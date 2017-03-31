'use strict';

var Rectangle = createjs.Rectangle;
var Graphics = createjs.Graphics;
var Shape = createjs.Shape;
var Ticker = createjs.Ticker;
var Stage = createjs.Stage;

var stage;
var player,
    cat = [],
    river,
    grechka;

var speed = 5,
    keys = [];

var catCountToSpawn = 5;

//item radius
var bonusItemsRadius = 5;
var playerRadius = 10;
var catRadius = 7;
var riverRadius = 30;

//happy counters
var eatedGrechka = 0;
var droppedCats = 0;

var bounds;
var game = {
    init: function () {
        var wrapper = document.getElementById("canvasWrapper");
        var canvas = document.getElementById("stageCanvas");

        bounds = new Rectangle();
        bounds.width = canvas.width;
        bounds.height = canvas.height;
        stage = new Stage(canvas);

        /**
         * Player setup
         */
        var playerGraphics= new Graphics();
        playerGraphics.setStrokeStyle(1);
        playerGraphics.beginStroke(Graphics.getRGB(0, 0, 0, .7));
        playerGraphics.drawCircle(10, 10, playerRadius);

        player = new Shape(playerGraphics);
        player.x = 10;
        player.y = canvas.height / 2;
        player.radius = playerRadius;
        stage.addChild(player);

        /**
         * River setup
         */
        var riverGraphics= new Graphics();
        riverGraphics.setStrokeStyle(3);
        riverGraphics.beginStroke('#000');
        riverGraphics.beginFill("#004eba");
        riverGraphics.drawCircle(10, 10, riverRadius);

        river = new Shape(riverGraphics);
        river.x = 700;
        river.y = 700;
        river.radius = riverRadius;
        stage.addChild(river);

        /**
         * Cat setup
         */
        var catGraphics = new Graphics();
        catGraphics.setStrokeStyle(1);
        catGraphics.beginStroke("#000000");
        catGraphics.beginFill("black");
        catGraphics.drawCircle(0, 0, catRadius);

        for(var i =0; i<catCountToSpawn; i++) {
            cat[i] = new Shape(catGraphics);
            cat[i].x = randomInteger(20, 750);
            cat[i].y = randomInteger(20, 750);
            stage.addChild(cat[i]);
        }

        /**
         * Bonus Items
         */
        var randBonusItem = new Graphics();
        randBonusItem.setStrokeStyle(1);
        randBonusItem.beginStroke('#6b4424');
        randBonusItem.beginFill('#6b4424');
        randBonusItem.drawCircle(5, 5, bonusItemsRadius);
        grechka = new Shape(randBonusItem);

        //random grechka spawner
        setInterval(function () {
            grechka.x = randomInteger(20, 750);
            grechka.y = randomInteger(20, 750);
            grechka.radius = bonusItemsRadius;
            stage.addChild(grechka);
        },10000);

        //setInterval(function(){ console.log('player x: ' + player.x); console.log('player y: ' + player.y) }, 5000);

        stage.update();
        Ticker.setFPS(52);

        //watch on events
        window.addEventListener("keydown", function (e) {
            keys[e.keyCode] = true;
        });
        window.addEventListener("keyup", function (e) {
            keys[e.keyCode] = false;
        });
        Ticker.addEventListener("tick", this.update);
    },
    update: function () {
        //check collision on bonusItem
        if(isCollide(player, grechka)) {
            if(stage.removeChild(grechka)) {
                eatedGrechka++;
                var div = document.getElementById('eatedGrechka');
                div.innerHTML = eatedGrechka;
                speed = 10;
                setTimeout(function(){ speed = 5 }, 3000);
            }
        }

        cat.forEach(function (kitty) {

            if (
                ((player.x + 10) >= kitty.x) &&
                ((player.x - 10) <= kitty.x) &&
                ((player.y + 10) >= kitty.y) &&
                ((player.y - 10) <= kitty.y)
            ) {
                kitty.x = player.x;
                kitty.y = player.y;

                if(!( player.x >= river.x + riverRadius*2
                    || player.x + playerRadius*4 <= river.x
                    || player.y >= river.y + riverRadius*2
                    || player.y + playerRadius*4 <= river.y )) {
                    if(stage.removeChild(kitty)) {
                        droppedCats++;
                        var div = document.getElementById('droppedCats');
                        div.innerHTML = droppedCats;
                    }
                }
            }
        });

        //check player moves
        if (keys[38]) {
            if (player.y >= (playerRadius / 2)) {
                player.y -= speed;
            }
        }
        if (keys[40]) {
            if (player.y < (bounds.height - playerRadius * 2)) {
                player.y += speed;
            }
        }
        if (keys[39]) {
            if (player.x < (bounds.width - playerRadius * 2)) {
                player.x += speed;
            }
        }
        if (keys[37]) {
            if (player.x >= (playerRadius / 2)) {
                player.x -= speed;
            }
        }

        stage.update();
    }
};


function randomInteger(min, max) {
    var rand = min - 0.5 + Math.random() * (max - min + 1)
    rand = Math.round(rand);
    return rand;
}

function isCollide(player, item) {
    return !(
        ((player.y + player.radius) <= (item.y)) ||
        (player.y >= (item.y + item.radius)) ||
        ((player.x + player.radius) <= item.x) ||
        (player.x >= (item.x + item.radius))
    );
}