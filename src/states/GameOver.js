import Phaser  from 'phaser';

class GameOver extends Phaser.State {

	create() {

	}

	restartGame() {
		this.game.state.start("Level");
	}

}

export default GameOver;
