game.module(
    'game.menu'
)

.require(
    'engine.particle'
)
.body(function() {

SceneMenu = game.Scene.extend({
    score: 0,
    themeChanged: 0,
    init: function() {
    //SCENE
        game.crazy = false;
        if (!game.theme) {
            game.theme = 0;
            game.system.stage.setBackgroundColor(0x662d91);
        }
        else {
            this.changeBackground();
        }
        this.menuContainer = new game.Container();
        this.menuContainer.position.set(0, 0);
        this.stage.addChild(this.menuContainer);

        this.logo = new game.Sprite('media/logo.png');
        this.logo.anchor.set(0.5, 0.5);
        this.logo.position.set(game.system.width / 2, game.system.height / 5);
        this.menuContainer.addChild(this.logo);

        this.createLastScoreText(game.lastScore, 2.7);
        this.addArrow('left');
        this.createText(game.flavours[game.theme].name, 1.95);
        this.addArrow('right');
        this.createButton('how to play', 1.4);
        this.createButton('play', 1.13);
    },

    addArrow: function (arrow) {
        var arrowSprite = 'media/arrow.png', self = this, arrowPNG;

        arrowPNG = new game.Sprite(arrowSprite);
        arrowPNG.interactive = true;
        arrowPNG.buttonMode = true;
        arrowPNG.anchor.set(0.5, 0.5);

        switch (arrow) {
            case 'left':
                arrowPNG.position.set(game.system.width / 5, game.system.height / 1.85);
                break;
            case 'right':
                arrowPNG.position.set(game.system.width / 1.24, game.system.height / 1.85);
                arrowPNG.rotation = 3.1215;
                break;
        }

        arrowPNG.name = arrow;

        arrowPNG.mousedown = function() {
            var tween1 = new game.Tween(this.scale);
            tween1.to({ x: 1.2, y: 1.2 }, 100);
            
            var tween2 = new game.Tween(this.scale);
            tween2.to({ x: 1, y: 1 }, 100);
            
            tween1.chain(tween2);
            tween1.start();
            self.changeTheme(this);
        };
        arrowPNG.touchstart = function() {
            var tween1 = new game.Tween(this.scale);
            tween1.to({ x: 1.2, y: 1.2 }, 100);
            
            var tween2 = new game.Tween(this.scale);
            tween2.to({ x: 1, y: 1 }, 100);
            
            tween1.chain(tween2);
            tween1.start();
            self.changeTheme(this);
        };
        this.menuContainer.addChild(arrowPNG);
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
            self.buttonClicked(this);
        };
        button.touchstart = function() {
            self.buttonClicked(this);
        };

        this.menuContainer.addChild(button);

        var buttonText = new game.BitmapText(text, { font: 'ctsFONT' });
        buttonText.position.x = -(buttonText.textWidth / 2);
        buttonText.position.y = -(buttonText.textHeight / 1.5);
        button.addChild(buttonText);
    },

    changeTheme: function (e) {
        if (e.name === 'left') {
            game.theme++;
        }
        else {
            game.theme--;
        }
        
        if (game.theme > game.flavours.length - 1) {
            game.theme = 0;
        }

        if (game.theme < 0) {
            game.theme = game.flavours.length - 1;
        }
        console.log(this.themeChanged);
        this.changeBackground();
        this.changeFlavourText();
    },

    changeFlavourText: function () {
        this.flavour.setText(game.flavours[game.theme].name);
        this.flavour.updateTransform();
        this.flavour.position.x = (game.system.width / 2) - (this.flavour.textWidth / 2);
    },

    changeBackground: function () {
        var colourString = game.flavours[game.theme][1].fill;
        game.system.stage.setBackgroundColor(colourString);
    },

    createText: function (text, location) {
        this.flavour = new game.BitmapText(text, { font: 'ctsFONTnormal' });
        this.flavour.position.set(game.system.width / 2, game.system.height / 2);
        this.flavour.position.x = (game.system.width / 2) - (this.flavour.textWidth / 2);
        this.flavour.position.y = game.system.height / location;
        this.menuContainer.addChild(this.flavour);
    },

    createLastScoreText: function (text, location) {
        if (text === undefined) {
            text = 'not played yet!';
        }
        else {
            text = 'last score : ' + text;
        }
    
        this.lastScore = new game.BitmapText(text, { font: 'ctsFONTnormal' });
        this.lastScore.position.set(game.system.width / 2, game.system.height / 2);
        this.lastScore.position.x = (game.system.width / 2) - (this.lastScore.textWidth / 2);
        this.lastScore.position.y = game.system.height / location;

        this.menuContainer.addChild(this.lastScore);
    },

    buttonClicked: function (e) {
        switch (e.name) {
        case 'play':
            this.startGame();
            break;
        case 'don\'t press':
            this.dontPress();
            break;
        case 'how to play':
            this.howToPlay();
            break;
        default:
          
        }
    },

    changeFlavour: function () {
        this.changeTheme();
    },

    startGame: function() {
        this.stage.removeChild(this.menuContainer);
        game.system.setScene(SceneGame);
    },

    howToPlay: function() {
        this.stage.removeChild(this.menuContainer);
        game.system.setScene(SceneHowToPlay);
    }
});
});
