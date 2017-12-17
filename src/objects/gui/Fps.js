class Fps {

	constructor(game){

		this.game = game;

		let style = {fontSize: 32, font: 'monospace', fill: 'white' };
		this.fps = game.add.text(8, 14, "--", style);

		game.time.advancedTiming = true;

	}

	update(pass){
		let mem = window.performance.memory;
		let fps = this.game.time.fps || '--';
		let total = Math.floor(mem.totalJSHeapSize / 1000);
		let used  = Math.floor(mem.usedJSHeapSize / 1000);
		let monsters = this.game.wave_monsters;

		this.fps.text = fps + ' '  + monsters + ' ' + pass.toFixed(2) + ' ' + total + ' ' + used;

	}

}

export default Fps;
