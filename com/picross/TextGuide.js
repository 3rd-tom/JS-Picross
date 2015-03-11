/**==================================================================================0
* @author       Thomas Gattenhof <tom@pixeltom.net>
* @copyright    2015 Thomas Gattenhof
*/

/**==================================================================================0
* The text guide appears at the left and the top of the grid
* Indicates what tiles occur in their row / column, and reacts when the tiles are filled in with crosses and such
*
* @class Picross.TextGuide
* @constructor
*/

// JSLint globals, variables defined in other files so JSLint stops warning you about them
/*global Picross, console, Phaser, game */

var buildRow, buildColumn, countArray, groupedArray;

//===================================================================================0
//----- 
//===================================================================================0
Picross.TextGuide = function (game, x, y, grid, isRow, position) {
    'use strict';
    
    Phaser.Sprite.call(this, game, x, y);
    
    this.crosses = [];
    this.ticks = [];
    
    if (isRow) {
        this.CalculateRow(game.JSON.puzzle.GRID[position]);
        buildRow(this);
    } else {
        this.CalculateColumn(game.JSON.puzzle.GRID, position);
        buildColumn(this);
    }
    
};

Picross.TextGuide.prototype = Object.create(Phaser.Sprite.prototype);
Picross.TextGuide.prototype.constructor = Picross.TextGuide;

//===================================================================================0
//----- 
//===================================================================================0
buildRow = function (ref) {
    'use strict';
    
    var i, txt, colour, circle, cross, tick;
    
    ref.x -= countArray.length * 17;
    
    for (i = 0; i < countArray.length; i += 1) {
        colour = game.JSON.puzzle.COLOURS[i];
        
        circle = game.add.graphics(0, 0);
        circle.beginFill(colour);
        circle.drawCircle(6 + (i * 30), 12, 29);
        circle.endFill();
        ref.addChild(circle);
        
        colour = '#' + colour.substr(2, 6);
        
        txt = game.add.text((i * 30), 0, String(countArray[i]));
        txt.fontSize = 22;
        txt.font = 'Arial';
        txt.addColor(colour, 0);
        if (groupedArray[i] === true) {
            txt.addColor('#FFFFFF', 0);
        } else {
            circle.visible = false;
        }
        
        cross = game.add.sprite((i * 30) - 6, 0, 'cross');
        cross.scale.x = 0.5;
        cross.scale.y = 0.5;
        cross.tint = 0xFF0000;
        ref.crosses.push(cross);
        
        tick = game.add.sprite((i * 30) - 6, 0, 'tick');
        tick.scale.x = 0.5;
        tick.scale.y = 0.5;
        tick.tint = 0x00FF00;
        ref.crosses.push(tick);
        
        if (countArray[i] >= 10) {
            txt.x -= 8;
        }
        
        if (txt.text === '0') {
            txt.alpha = 0.5;
        }
        
        cross.visible = false;
        tick.visible = false;
        
        ref.addChild(txt);
        ref.addChild(cross);
        ref.addChild(tick);
    }
};

//===================================================================================0
//----- 
//===================================================================================0
buildColumn = function (ref) {
    'use strict';
    
    var i, txt, colour, circle, cross, tick;
    
    ref.y -= countArray.length * 23;
    
    for (i = 0; i < countArray.length; i += 1) {
        colour = game.JSON.puzzle.COLOURS[i];
        
        circle = game.add.graphics(0, 0);
        circle.beginFill(colour);
        circle.drawCircle(6, 12 + (i * 35), 29);
        circle.endFill();
        ref.addChild(circle);
        
        colour = '#' + colour.substr(2, 6);
        
        txt = game.add.text(0, (i * 35), String(countArray[i]));
        txt.fontSize = 22;
        txt.font = 'Arial';
        txt.addColor(colour, 0);
        if (groupedArray[i] === true) {
            txt.addColor('#FFFFFF', 0);
        } else {
            circle.visible = false;
        }
        
        cross = game.add.sprite(-6, (i * 35), 'cross');
        cross.scale.x = 0.5;
        cross.scale.y = 0.5;
        cross.tint = 0xFF0000;
        ref.crosses.push(cross);
        
        tick = game.add.sprite(-6, (i * 35), 'tick');
        tick.scale.x = 0.5;
        tick.scale.y = 0.5;
        tick.tint = 0x00FF00;
        ref.crosses.push(tick);
        
        if (countArray[i] >= 10) {
            txt.x -= 8;
        }
        
        if (txt.text === '0') {
            txt.alpha = 0.5;
        }
        
        cross.visible = false;
        tick.visible = false;
        
        ref.addChild(txt);
        ref.addChild(cross);
        ref.addChild(tick);
    }
    
};

//===================================================================================0
//----
//===================================================================================0
Picross.TextGuide.prototype.CalculateRow = function (input) {
    'use strict';
    
    var i, j, colourID, groupCount, startIndex;
    
    countArray = [];
    groupedArray = [];
    
    // Establish the count and group arrays
    for (i = 0; i < game.JSON.puzzle.COLOURS.length; i += 1) {
        countArray.push(0);
        groupedArray.push(true);
    }
    
    // Load up the numbers
    for (i = 0; i < input.length; i += 1) {
        colourID = input.charAt(i);
        countArray[colourID] += 1;
    }
    
    for (i = 0; i < countArray.length; i += 1) {
        startIndex = input.indexOf(i);
        if (startIndex >= 0) {
            groupCount = countArray[i];
            if (groupCount > 1) {
                for (j = 1; j < groupCount; j += 1) {
                    if (input[startIndex + j] !== input[startIndex]) {
                        groupedArray[i] = false;
                    }
                }
            } else {
                groupedArray[i] = false;
            }
        } else {
            groupedArray[i] = false;
        }
    }
};

//===================================================================================0
//----
//===================================================================================0
Picross.TextGuide.prototype.CalculateColumn = function (input, position) {
    'use strict';
    
    var checkString, i;
    
    checkString = "";
    
    for (i = 0; i < input.length; i += 1) {
        checkString += input[i][position];
    }
    
    this.CalculateRow(checkString);
    
    //return this.CalculateRow(checkString);
};

//===================================================================================0
//----
//===================================================================================0
Picross.TextGuide.prototype.onChange = function () {
    'use strict';
    
    console.log('onChage called');
    
};