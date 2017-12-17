import Phaser   from 'phaser';
import Layer    from 'Objects/gui/Layer';
import Map      from 'Objects/gui/Map';

class GameTitle extends Phaser.State {

	create() {
        this.game.stage.backgroundColor = '#7b9412';

		new Layer(this.game);
		new Map(this.game);
	}

	startGame() {
		this.game.state.start('Level');
	}

}

export default GameTitle;
