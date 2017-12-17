import Phaser  from 'phaser'

class Preload extends Phaser.State {

	preload() {
		/* Preload required assets */

		this.game.maxlevel = 0;
		this.game.gamedata= this.game.cache.getJSON('game.json');

		let jsonbg= './assets/levels/title.json';
		this.game.load.tilemap('title', jsonbg, null, Phaser.Tilemap.TILED_JSON);

		for(let level in this.game.gamedata.levels){
			let name = 'level-' + level;
			let json = './assets/levels/level-'+level+'.json';
			this.game.load.tilemap(name, json, null, Phaser.Tilemap.TILED_JSON);
			this.game.maxlevel++;
		}


    	this.game.load.image('bgtiles', './assets/tiles/tiles.png');

		this.game.load.tilemap('panel', './assets/levels/panel.json', null, Phaser.Tilemap.TILED_JSON);
    	this.game.load.image('panel',   './assets/tiles/panel.png');
		this.game.load.tilemap('route', './assets/levels/route.json', null, Phaser.Tilemap.TILED_JSON);
    	this.game.load.image('route',   './assets/tiles/route.png');

		this.game.load.tilemap('totum', './assets/levels/totums.json', null, Phaser.Tilemap.TILED_JSON);
		this.game.load.image('totum',   './assets/tiles/totum-autum.png');

    	this.game.load.atlasJSONArray( 'elfs',     './assets/sprites/elfs.png',     './assets/sprites/elfs.json' );
    	this.game.load.atlasJSONArray( 'monsters', './assets/sprites/monsters.png', './assets/sprites/monsters.json' );
    	this.game.load.atlasJSONArray( 'gfx',      './assets/sprites/gfx.png',      './assets/sprites/gfx.json' );
    	this.game.load.atlasJSONArray( 'gui',      './assets/sprites/gui.png',      './assets/sprites/gui.json' );

    	this.game.load.bitmapFont('one',  './assets/sprites/gui.png',  './assets/sprites/one.fnt');
    	this.game.load.bitmapFont('wave', './assets/sprites/wave.png', './assets/sprites/wave.fnt');

	}

	create() {
		this.game.level = 1;
		this.game.intro = true;
//		this.game.state.start("Level");

		// read from game.json ?
		this.game.real_credits =  100;
		this.game.real_lifes   =   10;
		this.game.difficulty   =    7;

		this.game.state.start('GameTitle');
	}

}

export default Preload;
