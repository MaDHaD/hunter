'use strict';

const SpriteSheet = createjs.SpriteSheet;
const Sprite = createjs.Sprite;

class Player {
    static getPlayerSheet(id) {
        return new SpriteSheet({
            id: id,
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
                "moveRight": [29, 35, "moveRight", 0.2],
                "moveLeft": [9, 17, "moveLeft", 0.2],
                "moveUp": [1, 8, "moveUp", 0.2],
                "moveDown": [18, 26, "moveDown", 0.2]
            },
            "images": ["/app/img/player.png"]
        });
    }

    static createPlayerSprite(playerSheet) {
        return new Sprite(playerSheet, "idle");
    }

    static getPlayer(id) {
        return Player.createPlayerSprite(Player.getPlayerSheet(id))
    }
}