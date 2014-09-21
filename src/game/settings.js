game.module(
    'game.settings'
)
.body(function() {

SceneSettings = game.Scene.extend({
    score: 0,

    init: function() {
        //SCENE
        var colourString = game.flavours[game.theme][1].fill;
        game.system.stage.setBackgroundColor(colourString);
        this.createButton('back to menu', 1.13);
        this.addArrow('left', 'background', 4);
        this.createText('background colour', 10);
        this.createText('no', 4.5);
        this.addArrow('right', 'background', 4);
        this.addArrow('left', 'colour', 2);
        this.createText('colour blind help', null, 3);
        this.createText('off', 'colour', 2.1);
        this.addArrow('right', 'colour', 2);
    },

    createButton: function (text, location) {
        var self = this;
        var button = new game.BitmapText(text, { font: 'ctsFONT' });

        button.position.set(game.system.width / 2, game.system.height / 2);
        button.position.x = (game.system.width / 2) - (button.textWidth / 2);
        button.position.y = game.system.height / location;
        button.interactive = true;
        button.buttonMode = true;
        button.mousedown = function() {
            self.backToMenu(this);
        };
        button.touchstart = function() {
            self.backToMenu(this);
        };

        this.stage.addChild(button);
    },

    addArrow: function (arrow, settings, location) {
        var arrowSprite = 'media/arrow.png', self = this, arrowPNG;

        arrowPNG = new game.Sprite(arrowSprite);
        arrowPNG.interactive = true;
        arrowPNG.buttonMode = true;
        arrowPNG.anchor.set(0.5, 0.5);

        switch (arrow) {
            case 'left':
                arrowPNG.position.set(game.system.width / 7, game.system.height / location);
                break;
            case 'right':
                arrowPNG.position.set(game.system.width / 1.16, game.system.height / location);
                arrowPNG.rotation = 3.1215;
                break;
        }

        arrowPNG.name = arrow;
        arrowPNG.settingsName = settings;

        arrowPNG.mousedown = function() {
            self.changeSettings(this);
        };
        arrowPNG.touchstart = function() {
            self.changeSettings(this);
        };
        this.stage.addChild(arrowPNG);
    },

    changeBackground: function () {
        var colourString = game.flavours[game.theme][1].fill;
        game.system.stage.setBackgroundColor(colourString);
    },

    createText: function (text, setting, location) {
        if (setting === 'colour') {
            if (game.settings.colourBlindHelp) {
                text = 'on';
            }
            else {
                text = 'off';
            }
        }
        this.flavour = new game.BitmapText(text, { font: 'ctsFONTnormal' });
        this.flavour.position.set(game.system.width / 2, game.system.height / 2);
        this.flavour.position.x = (game.system.width / 2) - (this.flavour.textWidth / 2);
        this.flavour.position.y = game.system.height / location;

        this.stage.addChild(this.flavour);
    },

    backToMenu: function () {
        game.system.setScene(SceneMenu);
    },

    changeSettings: function (e) {
        if (this.settingsName === 'colour') {
            if (game.settings.colourBlindHelp) {
                game.settings.colourBlindHelp = false;
            }
            else {
                game.settings.colourBlindHelp = true;
            }
        }
        this.changeBackground();
        this.changeFlavourText();
    }
});
});
