game.module(
    'game.squares'
)
.body(function() {

SceneGame = game.Scene.extend({
    score: 0,
    turns: 10,
    squareArr: [],
    touchingSquares: [],
    squaresStack: [],

    init: function() {
        this.backgroundColour = 1;
        this.changeBackground(this.backgroundColour);
        this.createSquares(4);
        this.createScoreText('score: 0', 9);
        this.createTurnsText('turns: 10', 19);
        this.addedTurnsText('+1', 2);
        this.createButton('back to menu', 1.1);
        this.disableCurrentColour(this.backgroundColour);
        this.addIndicator();
    },

    createTurnsText: function (text, location) {
        this.TurnsText = new game.BitmapText(text, { font: 'ctsFONTnormal' });
        //this.TurnsText.position.set(game.system.width / 2, game.system.height / 2);
        this.TurnsText.position.x = (game.system.width / 5.2);
        this.TurnsText.position.y = game.system.height / location;

        this.stage.addChild(this.TurnsText);
    },

    createScoreText: function (text, location) {
        this.scoreText = new game.BitmapText(text, { font: 'ctsFONTnormal' });
        //this.scoreText.position.set(game.system.width / 2, game.system.height / 2);
        this.scoreText.position.x = (game.system.width / 5.2);
        this.scoreText.position.y = game.system.height / location;

        this.stage.addChild(this.scoreText);
    },

    addedTurnsText: function (text, location) {
        this.addedTurnsText = new game.BitmapText(text, { font: 'ctsFONT' });
        this.addedTurnsText.scale.x = 4;
        this.addedTurnsText.scale.y = 4;
        this.addedTurnsText.alpha = 0;

        this.stage.addChild(this.addedTurnsText);

        this.addedTurnsText.position.set(game.system.width / 2, game.system.height / 2);
        this.addedTurnsText.position.y = game.system.height / 2.6;
        this.addedTurnsText.position.x = (game.system.width / 2) - ((this.addedTurnsText.textWidth * 4) / 2);
    },

    updateScore: function () {
        this.scoreText.setText('score: ' + this.score);
        this.scoreText.updateTransform();
        this.scoreText.position.x = (game.system.width / 5.2);
    },

    updateTurns: function () {
        this.turns-- ;
        this.TurnsText.setText('turns: ' + this.turns);
        this.TurnsText.updateTransform();
        this.TurnsText.position.x = (game.system.width / 5.2);
    },

    addBonusTurns: function (bonusTurns) {
        this.turns += bonusTurns;
        this.tweenBonusText(bonusTurns);
        console.log('bonusTurns', bonusTurns);
    },

    tweenBonusText: function (bonusTurns) {
        this.addedTurnsText.setText('+' + bonusTurns);
        this.addedTurnsText.position.set(game.system.width / 2, game.system.height / 2);
        this.addedTurnsText.position.y = game.system.height / 2.6;
        this.addedTurnsText.position.x = (game.system.width / 2) - ((this.addedTurnsText.textWidth * 4) / 2);
        this.addedTurnsText.alpha = 1;

        var tween = new game.Tween(this.addedTurnsText);
        tween.to({ alpha: 0 }, 800);
        tween.easing(game.Tween.Easing.Quadratic.In);
        tween.start();
    },

    checkForGameOver: function() {
        if (this.turns === 0) {
            this.gameOver();
        }
    },

    createButton: function (text, location) {
        var self = this;
        var button = new game.Sprite('media/buttonBG.png');

        button.position.set(game.system.width / 2, game.system.height / 2);
        button.anchor.set(0.5, 0.5);
        button.name = text;
        button.position.y = game.system.height / location;
        button.tint = '0x' + game.flavours[game.theme][1].fill;
        button.interactive = true;
        button.buttonMode = true;

        button.mousedown = function() {
            self.backToMenu(this);
        };
        button.touchstart = function() {
            self.backToMenu(this);
        };

        this.stage.addChild(button);

        var buttonText = new game.BitmapText(text, { font: 'ctsFONT' });
        buttonText.position.x = -(buttonText.textWidth / 2);
        buttonText.position.y = -(buttonText.textHeight / 1.5);
        button.addChild(buttonText);
    },

    createHalfButton: function (text, locationX, locationY) {
        var self = this;
        var button = new game.Sprite('media/halfButton.png');

        button.position.set(game.system.width / locationX, game.system.height / locationY);
        button.anchor.set(0.5, 0.5);
        button.name = text;
        button.tint = '0x' + game.flavours[game.theme][1].fill;
        button.interactive = true;
        button.buttonMode = true;

        button.mousedown = function() {
            self.playAgain(this);
        };
        button.touchstart = function() {
            self.playAgain(this);
        };

        this.stage.addChild(button);

        var buttonText = new game.BitmapText(text, { font: 'ctsFONT' });
        buttonText.position.x = -(buttonText.textWidth / 2);
        buttonText.position.y = -(buttonText.textHeight / 1.5);
        button.addChild(buttonText);
    },

    backToMenu: function () {
        if (this.squares) {
            this.stage.removeChild(this.squares);
            this.stage.removeChild(this.scoreText);
            this.stage.removeChild(this.TurnsText);
            this.stage.removeChild(this.indicator);
        }
        game.system.setScene(SceneMenu);
    },

    playAgain: function () {
        if (this.squares) {
            this.stage.removeChild(this.squares);
            this.stage.removeChild(this.scoreText);
            this.stage.removeChild(this.TurnsText);
            this.stage.removeChild(this.indicator);
        }
        game.system.setScene(SceneGame);
    },

    generateRandomArray: function (numberOfColours) {
        this.squareArr = [];

        for (var i = 0; i < 35; i++) {
            this.squareArr.push(Math.floor(1 + Math.random() * numberOfColours));
        }
    },

    createSquares: function (colours) {
        var self = this, button, xSpacing = game.system.width / 8, ySpacing = game.system.width / 4, squareLine = 0;

        this.generateRandomArray(colours);
        this.squares = new game.Container();
        this.squares.position.set(50, 50);
        this.stage.addChild(this.squares);

        for (var i = 1; i < this.squareArr.length + 1; i++) {
            var buttonSprite = 'media/' + game.flavours[game.theme][self.squareArr[i - 1]].button + '.png';
            x = (xSpacing * (i - squareLine * 5) + xSpacing / 2);
            y = (xSpacing * squareLine) + ySpacing;

            button = new game.Sprite(buttonSprite);
            button.anchor.set(0.5, 0.5);
            button.position.set(x, y);
            button.hasBeenChecked = false;
            button.name = i;
            button.colorCode = self.squareArr[i - 1];

            button.tweenOut = function () {
                var thisButton = this;
                var tween = new game.Tween(this.scale);
                tween.to({ x: 0.1, y: 0.1 }, 500);
                tween.easing(game.Tween.Easing.Back.InOut);
                tween.start();
            };
            button.tweenIn = function () {
                var tween = new game.Tween(this.scale);
                tween.to({ x: 1, y: 1 }, 500);
                tween.easing(game.Tween.Easing.Back.InOut);
                tween.start();
            };
            button.disable = function () {
                this.interactive = false;
                this.buttonMode = false;
            };
            button.enable = function () {
                this.interactive = true;
                this.buttonMode = true;
            };
            button.mousedown = function() {
                self.squareClicked(this);
            };
            button.touchstart = function() {
                self.squareClicked(this);
            };

            self.squares.addChild(button);

            if ((i / 5) % 1 === 0) {
                //newline
                squareLine++;
            }
        }
    },

    gameOver: function() {
        game.lastScore = this.score;
        this.stage.removeChild(this.squares);
        this.stage.removeChild(this.scoreText);
        this.stage.removeChild(this.TurnsText);
        this.stage.removeChild(this.indicator);
        this.squares = null;
        this.addGameCertificate(this.score.toString());
    },

    addGameCertificate: function(score) {
        this.gameoverText = new game.Container();
        this.stage.addChild(this.gameoverText);

        this.certSquares = new game.Container();
        this.certSquares.position.set(50, 50);
        this.gameoverText.addChild(this.certSquares);

        var xSpacing = game.system.width / 7, ySpacing = game.system.width / 10, squareLine = 0, self = this;

        for (var i = 1; i < 5; i++) {
            var buttonSprite = 'media/' + game.flavours[game.theme][i].button + '.png';
            var x = (xSpacing * (i - squareLine * 5) + xSpacing / 2), y = (xSpacing * squareLine) + ySpacing;

            button = new game.Sprite(buttonSprite);
            button.anchor.set(0.5, 0.5);
            button.position.set(x, y);
            self.certSquares.addChild(button);
        };

        var congrats = new game.BitmapText('certificate', { font: 'ctsFONT' });
        congrats.position.x = (game.system.width / 2) - (congrats.textWidth / 2);
        congrats.position.y = game.system.height / 5;
        congrats.tint = '0x' + game.flavours[game.theme][1].fill;
        this.gameoverText.addChild(congrats);

        var award = new game.BitmapText('for score of', { font: 'ctsFONTnormal' });
        award.position.x = (game.system.width / 2) - (award.textWidth / 2);
        award.position.y = game.system.height / 3.6;
        this.gameoverText.addChild(award);

        var score = new game.BitmapText(score, { font: 'ctsFONTscore' });
        score.position.x = (game.system.width / 2) - (score.textWidth / 2);
        score.position.y = game.system.height / 2.9;
        this.gameoverText.addChild(score);

        var by = new game.BitmapText('awarded by', { font: 'ctsFONTnormal' });
        by.position.x = (game.system.width / 2) - (by.textWidth / 2);
        by.position.y = game.system.height / 1.97;
        this.gameoverText.addChild(by);

        var logo = new game.Sprite('media/logo.png');
        logo.anchor.set(0.5, 0.5);
        logo.scale.x = 0.8;
        logo.scale.y = 0.8;
        logo.position.set(game.system.width / 2, game.system.height / 1.53);
        this.gameoverText.addChild(logo);

        var stamp = new game.Sprite('media/stamp.png');
        stamp.anchor.set(0.5, 0.5);
        stamp.position.set(game.system.width / 3.2, game.system.height / 3);
        stamp.alpha = 0.5;
        this.gameoverText.addChild(stamp);

        this.createHalfButton('play', 1.5, 1.25);
    },

    checkSquares: function (square, colour) {
        var self = this;

        this.squareCheck(square, colour, self, true);

        while (this.squaresStack.length > 0) {
            square = self.squaresStack.pop();
            self.squareCheck(square, colour, self, false);
        }
    },

    squareCheck: function (square, colour, context, firstCall) {
        var targetSquare, aboveSquare, rightSquare, belowSquare, leftSquare;

        if (firstCall) {
            targetSquare = square;
            square = square - 1;
            context.squares.getChildAt(square).hasBeenChecked = true;
            context.touchingSquares.push(square);
        }
        else {
            targetSquare = square + 1;
        }

        //SQUARE ABOVE
        if (!(targetSquare <= 5)) {
            aboveSquare = square - 5;
            if (colour === context.squares.children[aboveSquare].colorCode && !context.squares.children[aboveSquare].hasBeenChecked) {
                context.squares.children[aboveSquare].hasBeenChecked = true;
                context.score += 1;
                context.touchingSquares.push(aboveSquare);
                context.squaresStack.push(aboveSquare);
            }
        }

        //SQUARE RIGHT
        if (!((targetSquare / 5) % 1 === 0)) {
            rightSquare = square + 1;
            if (colour === context.squares.children[rightSquare].colorCode && !context.squares.children[rightSquare].hasBeenChecked) {
                context.squares.children[rightSquare].hasBeenChecked = true;
                context.score += 1;
                context.touchingSquares.push(rightSquare);
                context.squaresStack.push(rightSquare);
            }
        }

        //SQUARE BELOW
        if (!(targetSquare > 30)) {
            belowSquare = square + 5;
            if (colour === context.squares.children[belowSquare].colorCode && !context.squares.children[belowSquare].hasBeenChecked) {
                context.squares.children[belowSquare].hasBeenChecked = true;
                context.score += 1;
                context.touchingSquares.push(belowSquare);
                context.squaresStack.push(belowSquare);
            }
        }

        //SQUARE LEFT
        if (!(targetSquare === 1 || ((targetSquare - 1) / 5) % 1 === 0)) {
            leftSquare = square - 1;
            if (colour === context.squares.children[leftSquare].colorCode && !context.squares.children[leftSquare].hasBeenChecked) {
                context.squares.children[leftSquare].hasBeenChecked = true;
                context.score += 1;
                context.touchingSquares.push(leftSquare);
                context.squaresStack.push(leftSquare);
            }
        }
    },

    changeBackground: function (colour) {
        var colourString = game.flavours[game.theme][colour].fill;
        game.system.stage.setBackgroundColor(colourString);
    },

    squareClicked: function (e) {
        this.disableALlButtons();
        var self = this;
        var buttonSprite = 'media/' + game.flavours[game.theme][this.backgroundColour].button + '.png';

        e.setTexture(buttonSprite);

        this.checkSquares(e.name, this.backgroundColour);

        this.tweenSquaresOut();

        if ((this.touchingSquares.length - 1) > 14) {
            this.addBonusTurns(this.touchingSquares.length - 15);
        }

        setTimeout(function() {
            self.newSquares(4);
        }, 500);
    },

    addIndicator: function () {
        var indicatorSprite = 'media/' + game.flavours[game.theme][this.backgroundColour].button + '.png';

        this.indicator = new game.Sprite(indicatorSprite);
        this.indicator.anchor.set(0.5, 0.5);
        this.indicator.position.set(game.system.width / 1.33, game.system.height / 9);

        this.stage.addChild(this.indicator);
    },

    changeIndicator: function () {
        var indicatorSprite = 'media/' + game.flavours[game.theme][this.backgroundColour].button + '.png';
        this.indicator.setTexture(indicatorSprite);
    },

    clearChecks: function () {
        this.updateScore();
        this.updateTurns();
        var self = this;
        for (var i = 0; i < 35; i++) {
            self.squares.children[i].hasBeenChecked = false;
        }
    },

    newSquares: function (numberOfColours) {
        var self = this;

        for (var i = 0; i < this.touchingSquares.length; i++) {
            var squareID = this.touchingSquares[i];
            var newColour = this.randomNumber(numberOfColours, this.backgroundColour);
            var buttonSprite = 'media/' + game.flavours[game.theme][newColour].button + '.png';

            self.squares.children[squareID].setTexture(buttonSprite);
            self.squareArr.splice(squareID, 1, newColour);
            self.squares.children[squareID].colorCode = newColour;
            self.squares.children[squareID].enable();
            self.squares.children[squareID].tweenIn();
        }

        this.touchingSquares = [];
        this.clearChecks();
        this.backgroundColour++;

        if (this.backgroundColour === 5) {
            this.backgroundColour = 1;
        }

        this.changeIndicator();

        this.disableCurrentColour(this.backgroundColour);
        this.checkForGameOver();
    },

    tweenSquaresOut: function () {
        var self = this;
        for (var i = 0; i < this.touchingSquares.length; i++) {
            var squareID = this.touchingSquares[i];
            self.squares.children[squareID].tweenOut();
        }
    },

    randomNumber: function (numberOfColours, avoidedNumber) {
        var number = Math.floor(1 + Math.random() * numberOfColours);

        while (number === avoidedNumber) {
            number = Math.floor(1 + Math.random() * numberOfColours);
        }
        return number;
    },

    disableCurrentColour: function (colour) {
        var self = this;

        for (var i = 0; i < 35; i++) {
            if (self.squares.children[i].colorCode === colour) {
                self.squares.children[i].disable();
            }
            else {
                self.squares.children[i].enable();
            }
        }
    },

    disableALlButtons: function () {
        var self = this;

        for (var i = 0; i < 35; i++) {
            self.squares.children[i].disable();
        }
    }
});
});
