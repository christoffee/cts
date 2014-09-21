game.module(
    'game.howtoplay'
).body(function () {

SceneHowToPlay = game.Scene.extend({
    score: 0,
    init: function () {
        //SCENE
        var colourString = game.flavours[game.theme][1].fill;
        game.system.stage.setBackgroundColor(colourString);
        this.createButton('back to menu', 1.13);
        this.createText('connect squares\nby changing a\nsquare to that\nindicated in the\ntop corner\nfor points.\n\neach square\nconnected is one\npoint.\n\nconnect 14+ (not\nincluding the\nsquare you change)\nfor bonus turns.', 8);
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

        this.stage.addChild(button);

        var buttonText = new game.BitmapText(text, { font: 'ctsFONT' });
        buttonText.position.x = -(buttonText.textWidth / 2);
        buttonText.position.y = -(buttonText.textHeight / 1.5);
        button.addChild(buttonText);
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

        this.stage.addChild(this.flavour);
    },

    buttonClicked: function () {
        game.system.setScene(SceneMenu);
    }
});
});
