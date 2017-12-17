import Var from 'Objects/entities/Vars';

class Layer {

	constructor(game) {

		let level    = game.level;

		let  bgLayer = game.add.group();
		let elfLayer = game.add.group();
		let guiLayer = game.add.group();
		let addLayer = game.add.group();

		addLayer.visible = false;
		addLayer.backgroundColor = "#4488AA";

		game.world.bringToTop(addLayer);

		elfLayer.name = "ElfLayer";
		guiLayer.name = "GuiLayer";

		let name    = 'level-' + level;
		if (game.intro) name = 'title';
		let gamemap = game.add.tilemap(name);

		//  The first parameter is the tileset name, as specified in the Tiled map editor (and in the tilemap json file)
		//  The second parameter maps this name to the Phaser.Cache key 'bgtiles'
		gamemap.addTilesetImage('tiles', 'bgtiles');

		bgLayer.add(gamemap.createLayer('Layer1'));
		bgLayer.add(gamemap.createLayer('Layer2'));

		// fit hor or fit vert?
		let mapwidth  = gamemap.width * gamemap.tileWidth;
		let mapheight = gamemap.height * gamemap.tileHeight;
		let window_aspect = window.innerWidth / window.innerHeight;
		let game_aspect = mapwidth / mapheight;
		let scale = 1;
		let yoffs = 0;
		let xoffs = 0;

		if (window_aspect > game_aspect) {
			scale = bgLayer.height / mapheight;
			xoffs = (game.world.width - mapwidth * scale) / 2;
		} else {
			scale = bgLayer.width / mapwidth;
			yoffs = (game.world.height - mapheight * scale) / 2;
		}

		let top = -yoffs;
		if (top > -10) top = -10;
		for (let x = -xoffs; x < mapwidth + xoffs; x += 66) {
			let mask = game.add.sprite(x, top, 'gui', 'rand');
			mask.alpha = .8;
			guiLayer.add(mask);
		}

		 bgLayer.x = xoffs;  bgLayer.y = yoffs;
		elfLayer.x = xoffs; elfLayer.y = yoffs;
		guiLayer.x = xoffs; guiLayer.y = yoffs;
		addLayer.x = xoffs; addLayer.y = yoffs;

		 bgLayer.scale.set(scale);
		elfLayer.scale.set(scale);
		guiLayer.scale.set(scale);
		addLayer.scale.set(scale);


		game.bgLayer  = bgLayer;
		game.elfLayer = elfLayer;
		game.guiLayer = guiLayer;
		game.addLayer = addLayer;

		game.gamemap   = gamemap;
		game.viewscale = scale;

	}

}


export default Layer;