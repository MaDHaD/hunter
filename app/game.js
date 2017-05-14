'use strict';

var Rectangle = createjs.Rectangle;
var Graphics = createjs.Graphics;
var Shape = createjs.Shape;
var Ticker = createjs.Ticker;
var Stage = createjs.Stage;

//sheets
var catSheet = {};




var stage;
var cat = [],
    catObject = [],
    grechka;

var hittest = [];

var animationSpeed = 0.2,
    speed = 5,
    keys = [],
    eventListener = 0;

var catCountToSpawn = 3;

//item radius
var bonusItemsRadius = 5;
var playerRadius = 20;
var playerHadCats = false;
var catRadius = 7;
var riverRadius = 30;

var playerSpriteImg = ["/app/img/test.png"];

//happy counters
var eatedGrechka = 0;
var droppedCats = 0;

var bounds;
var game = {
    init: function () {
        //Building canvas bord
        var wrapper = document.getElementById("canvasWrapper");
        var canvas = document.getElementById("stageCanvas");

        bounds = new Rectangle();
        bounds.width = canvas.width;
        bounds.height = canvas.height;

        //creating empty stage
        stage = new Stage(canvas);


        //var background = new createjs.Bitmap('/app/img/Background.jpg');
        //background.scaleX = 2;
        //background.scaleY = 2.7;
        //stage.addChild(background);


        /**
         * Player setup
         */
        var playerSheet =  new createjs.SpriteSheet({
            frames: {
                width:64,
                height:64,
                count:36,
                regX: 0,
                regY: 0,
                spacing:0,
                margin:0
            },
            "animations": {
                "idle": [19, 19, false, 1],
                "moveRight": [29, 35, "moveRight", animationSpeed],
                "moveLeft": [9, 17, "moveLeft", animationSpeed],
                "moveUp": [1, 8, "moveUp", animationSpeed],
                "moveDown": [18, 26, "moveDown", animationSpeed]
            },
            "images": playerSpriteImg
        });
        //Preparing and spawning default player position
        var playerAnimations = new createjs.Sprite(playerSheet, "idle");
        var player = stage.addChild(playerAnimations);
        player.x = 0;
        player.y = 0;

        /**
         * River/Well setup
         */
        var wellSheet =  new createjs.SpriteSheet({
            frames: {
                width:150,
                height:150,
                count:1,
                regX: 0,
                regY: 0,
                spacing:0,
                margin:0
            },
            "images": ["/app/img/well.png"]
        });
        //Spawn well
        var well = new createjs.Sprite(wellSheet);
        well.x = 600;
        well.y = 600;
        well.radius = riverRadius;
        stage.addChild(well);

        /**
         * Bonus Items
         */
        var randBonusItem = new Graphics();
        randBonusItem.setStrokeStyle(1);
        randBonusItem.beginStroke('#6b4424');
        randBonusItem.beginFill('#6b4424');
        randBonusItem.drawCircle(5, 5, bonusItemsRadius);
        grechka = new Shape(randBonusItem);

        //random bonus item spawner
        setInterval(function () {
            grechka.x = randomInteger(20, 750);
            grechka.y = randomInteger(20, 750);
            grechka.radius = bonusItemsRadius;
            stage.addChild(grechka);
        },10000);

        //First updating stage and start listening events
        window.addEventListener("keydown", function (e) {
            this.keys[e.keyCode] = true;
            if(!eventListener) {
                runKeyEvent(playerAnimations);
            }
        });
        window.addEventListener("keyup", function (e) {
            this.keys[e.keyCode] = false;
            playerAnimations.gotoAndStop("idle");
            eventListener = 0;
        });

        catSpawner();

        //first update, setts fps, start tick
        stage.update();
        Ticker.setFPS(60);
        Ticker.addEventListener("tick", handleTick);

        function handleTick(e) {
            //move frame regarding user key press
            if (keys[38]) {
                player.y -= speed;
            }
            if (keys[40]) {
                player.y += speed;
            }
            if (keys[39]) {
                player.x += speed;
            }
            if (keys[37]) {
                player.x -= speed;
            }


            for(var i =0; i<catCountToSpawn; i++) {
                hittest = player.localToLocal(64, 64, catObject[i]);

                if (player.hitTest(hittest.x, hittest.y)) {
                    if (!playerHadCats) {
                        playerHadCats = true;
                        stage.removeChild(catObject[i]);
                    }
                }
            }

            var hittestToWell = player.localToLocal(64, 64, well);
            if (playerHadCats) {
                if (player.hitTest(hittestToWell.x, hittestToWell.y)) {
                    playerHadCats = false;
                    droppedCats++;


                    var div = document.getElementById('droppedCats');
                    div.innerHTML = droppedCats;
                }
            }

                //console.log(pt.x, pt.y);
            //if(player.hitTest(pt.x, pt.y)) {
            //    catObject[0].x = player.x + 20;
            //    catObject[0].y = player.y + 20;
            //    console.log((player.hitTest(pt.x, pt.y)));
            //    console.log(catObject[0]);
            //}

            //check collide in bonus item
            //if(isCollide(playerAnimations, grechka)) {
            //    if(stage.removeChild(grechka)) {
            //        eatedGrechka++;
            //        var div = document.getElementById('eatedGrechka');
            //        div.innerHTML = eatedGrechka;
            //        speed = 10;
            //        animationSpeed = 1;
            //        setTimeout(function(){ speed = 5; animationSpeed = 0.3 }, 3000);
            //    }
            //}

            //Check collide in bonusStage item
            //cat.forEach(function (kitty) {
            //    if (
            //        ((playerAnimations.x + 10) >= kitty.x) &&
            //        ((playerAnimations.x - 10) <= kitty.x) &&
            //        ((playerAnimations.y + 10) >= kitty.y) &&
            //        ((playerAnimations.y - 10) <= kitty.y)
            //    ) {
            //        kitty.x = playerAnimations.x;
            //        kitty.y = playerAnimations.y;
            //
            //        if(!( playerAnimations.x >= well.x + riverRadius*2
            //            || playerAnimations.x + playerRadius*4 <= well.x
            //            || playerAnimations.y >= well.y + riverRadius*2
            //            || playerAnimations.y + playerRadius*4 <= well.y )) {
            //            if(stage.removeChild(kitty)) {
            //                droppedCats++;
            //                var div = document.getElementById('droppedCats');
            //                div.innerHTML = droppedCats;
            //            }
            //        }
            //    }
            //});

            stage.update();
        }
    }
};

//return correct int regarding min/max
function randomInteger(min, max) {
    var rand = min - 0.5 + Math.random() * (max - min + 1);
    rand = Math.round(rand);
    return rand;
}

/**
 *
 * Check collide on some item
 *
 * @param player (should contains "x,y,radius" )
 * @param item (should contains "x,y,radius" )
 * @returns {boolean}
 */
function isCollide(player, item) {
    return !(
        ((player.y + player.radius) <= (item.y)) ||
        (player.y >= (item.y + item.radius)) ||
        ((player.x + player.radius) <= item.x) ||
        (player.x >= (item.x + item.radius))
    );
}

/**
 * Start animation in playerSprite regarding user key pressed
 * @param playerAnimations
 */
function runKeyEvent(playerAnimations) {
    if (keys[38]) {
        playerAnimations.gotoAndPlay("moveUp");
    }
    if (keys[40]) {
        playerAnimations.gotoAndPlay("moveDown");
    }
    if (keys[39]) {
        playerAnimations.gotoAndPlay("moveRight");
    }
    if (keys[37]) {
        playerAnimations.gotoAndPlay("moveLeft");
    }
    eventListener++;
}


function catSpawner() {
    /**
     * Cat setup
     */
    catSheet =  new createjs.SpriteSheet({
        frames: {
            width:20,
            height:20,
            count:8,
            regX: 0,
            regY: 0,
            spacing:0,
            margin:0
        },
        "animations": {
            "idle": [0, 7, true, 0.2]
            //"moveRight": [28, 36, "moveRight", animationSpeed],
            //"moveLeft": [10, 18, "moveLeft", animationSpeed],
            //"moveDown": [0, 9, "moveDown", animationSpeed],
            //"moveUp": [19, 27, "moveUp", animationSpeed]
        },
        "images": ["/app/img/cat.png"]
    });

    for(var i =0; i<catCountToSpawn; i++) {
        cat[i] = new createjs.Sprite(catSheet, "idle");
        //cat[i].radius = catRadius;
        catObject[i] = stage.addChild(cat[i]);
        catObject[i].x = randomInteger(20, 750);
        catObject[i].y = randomInteger(20, 750);
    }
}