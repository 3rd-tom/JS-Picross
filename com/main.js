/***************************************************************************************
JAVASCRIPT PICROSS ENGINE
Author: Thomas Gattenhof

About: This is one of my first jumps into the HTML5 world, with shift towards more HTML5
projects in our sector I feel we need to skill up on Javascript in order to have
access to more clients. I don't see this as a replacement to Flash, but as of another
development option we can use.
***************************************************************************************/

/*globals Phaser, PixelTom, Picross*/

// initialize phaser, call create() once done
var game;

//******************************************************************************************************
// onPreload: 
// Preloader, called by Phaser Framework
//******************************************************************************************************
function onPreload() {
    'use strict';
    
    //game.load.image('tick', 'lib/yesButton.png'); <-- Example of loading image
    game.load.text('puzzle1', 'lib/puzzles/1.json');
    game.load.image('cross', 'lib/UI/cross.png');
    game.load.image('tick', 'lib/UI/checkmark.png');
}

//******************************************************************************************************
// create:
// Called by the Phaser framework after preload
//******************************************************************************************************
function create() {
    'use strict';
    
    var pJson = JSON.parse(game.cache.getText('puzzle1'));
    game.JSON = pJson;
    game.utils = new PixelTom.Utils(game);
    game.control = new Picross.Control(game);
    
    game.background = game.add.graphics(0, 0);
    game.background.lineStyle(2, 0x000000, 10);
    game.background.beginFill(0xFFFFFF, 10);
    game.background.drawRect(0, 0, game.width, game.height);
    game.background.endFill();
    
    game.tileGroup = new Picross.Grid(game);
    game.tileGroup.loadGrid(game.JSON.puzzle.WIDTH, game.JSON.puzzle.HEIGHT);
    
    game.bucketGroup = new Picross.BucketGroup(game, game.JSON.puzzle.COLOURS);
    
}

//******************************************************************************************************
// onUpdate:
// Called once per frame by the Phaser framework
//******************************************************************************************************
function onUpdate() {
	'use strict';
    
}

game = new Phaser.Game(640, 960, Phaser.AUTO, null, {preload: onPreload, create: create, update: onUpdate});