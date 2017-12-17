'use strict';

import 'pixi';
import 'p2';
import Phaser from 'phaser';

import Boot       from 'States/Boot';
import Preload    from 'States/Preload';
import Level      from 'States/Level';
import GameOver   from 'States/GameOver';
import GameTitle  from 'States/GameTitle';

class Game extends Phaser.Game {

	constructor() {

		let width  = window.innerWidth  * window.devicePixelRatio;
		let height = window.innerHeight * window.devicePixelRatio;

		super(width, height, Phaser.AUTO, 'phaser', null);

		this.state.add('Boot',      Boot,      false);
		this.state.add('Preload',   Preload,   false);
		this.state.add('GameTitle', GameTitle, false);
		this.state.add('Level',     Level,     false);
		this.state.add('GameOver',  GameOver,  false);

		this.state.start('Boot');
	}

}

window.game = new Game();
