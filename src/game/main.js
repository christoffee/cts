game.module(
    'game.main'
)
.require(
    'game.assets',
    'game.menu',
    'game.themes',
    'game.squares',
    'game.settings',
    'game.howtoplay'
)
.body(function() {

	game.System.orientation = game.System.PORTRAIT;
	game.System.idtkScale = 'ScaleAspectFill';

	game.start(SceneMenu, 768, 1024);

});
