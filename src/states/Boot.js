import Phaser  from 'phaser';

class Boot extends Phaser.State {

	preload() {
		this.game.load.json('game.json', './assets/levels/game.json');
	}

	create() {
		this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		this.game.state.start('Preload');
	}

}

export default Boot;