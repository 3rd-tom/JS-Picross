/**==================================================================================0
* @author       Thomas Gattenhof <tom@pixeltom.net>
* @copyright    2014 Thomas Gattenhof
*/

/**==================================================================================0
* A Tile is a single clickable tile in the Picross Grid.
*
* @class Picross.Tile
* @constructor
* @param {number} x - X position of the Tile in the Grid
* @param {number} y - Y position of the Tile in the Grid
* @param {number} id - Internal ID number
*/

// JSLint globals, variables defined in other files so JSLint stops warning you about them
/*global Picross, console, Phaser, game */

var beginFill, continueFill;

//===================================================================================0
//----- 
//===================================================================================0
Picross.Tile = function (game, x, y, targetColour, refTop, refLeft) {
    'use strict';
    
    Phaser.Sprite.call(this, game, x * 50, y * 50);
    
    this.game = game;
	this.gridX = x;
	this.gridY = y;
    this.name = "TILE" + this.gridX + "_" + this.gridY;
	this.id = String(x) + '_' + String(y);
    this.inputEnabled = true;
    this.lastFillID = -1;
    this.targetColour = targetColour;
    this.refTop = refTop;
    this.refLeft = refLeft;
    console.log(this.name);
    this.graph = game.add.graphics(0, 0);
    this.graph.lineStyle(2, 0x000000);
    this.graph.beginFill(game.utils.WHITE);
    this.graph.drawRect(0, 0, 50, 50);
    this.graph.endFill();
    
    this.cross = game.add.sprite(0, 0, 'cross');
    this.cross.visible = false;
    
    this.addChild(this.graph);
    this.addChild(this.cross);
    
    this.events.onInputDown.add(beginFill, this);
    this.events.onInputOver.add(continueFill, this);
};

Picross.Tile.prototype = Object.create(Phaser.Sprite.prototype);
Picross.Tile.prototype.constructor = Picross.Tile;

//===================================================================================0
//----- 
//===================================================================================0
beginFill = function (sprite, pointer) {
    'use strict';
    
    this.game.control.beginFill();
    sprite.attemptFill();
};

//===================================================================================0
//----- 
//===================================================================================0
continueFill = function (sprite, pointer) {
    'use strict';
    
    if (!pointer.isDown) {
        return;
    }
    sprite.attemptFill();
};

//===================================================================================0
//----- 
//===================================================================================0
Picross.Tile.prototype.attemptFill = function () {
    'use strict';
    
    if (this.game.control.fillID === this.lastFillID) {
        return;
    }
    
    this.lastFillID = this.game.control.fillID;
    
    if (this.graph.tint !== this.game.control.paintColour) {
        this.graph.tint = this.game.control.paintColour;
    }
    
    if (this.game.control.paintColour !== this.targetColour) {
        this.cross.visible = true;
        this.refTop.onChange(true, false);
        this.refLeft.onChange(true, false);
    } else {
        this.cross.visible = false;
    }
    
};

