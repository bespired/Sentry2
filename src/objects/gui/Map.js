import Var from 'Objects/entities/Vars';

class Map {

	constructor(game)
	{
		let map       = game.gamedata.map;
		let mapLayer  = game.add.group();
		mapLayer.name = "MapLayer";
		mapLayer.x= 280 + game.bgLayer.x;
		mapLayer.y= -1000;

		let panel    = game.add.tilemap('panel');
		let route    = game.add.tilemap('route');
		panel.addTilesetImage('panel', 'panel');
		route.addTilesetImage('route', 'route');

		let pathLayer = route.create('level', 22, 16, 40, 40);

		mapLayer.add(panel.createLayer('map'));
		// move the map background so the content gets more room.
		mapLayer.children[0].cameraOffset.x = -80;
		mapLayer.children[0].cameraOffset.y = -30;

		let next= {};
		for (let l = 0; l <= 30; l++) {
			if (map[l].open)
			{
				// get small part of route and put in map.
				let layer = this.layerByName(game, l);
				if (layer) this.drawmap(route, pathLayer, layer.data);

				// figure out if color of dot should be yellow or green.
				next[l] = false;
				if (map[l].next != 0 ){
					let nexts = JSON.parse('['+map[l].next+']');
					for(let i in nexts){
						next[nexts[i]] = true;
					}
				}
			}
		}
		mapLayer.add(pathLayer);

		let dopxmin= 9999, dopxmax= 0, dopy= 0, dopn= 0;
		for (let l = 1; l <= 30; l++) {

			if ((map[l].open) || (next[l]))
			{
				let dot= (next[l]) ? 'dot_g' : 'dot_y';
				let dop = this.draw(game, dot, l);
				dop.x = map[l].x;
				dop.y = map[l].y;
				dop.name = 'level-' + l;
				dop.level = l;
				dop.dot  = true;
				dop.input.useHandCursor = true;
				dop.events.onInputOver.add(this.over, this);
				dop.events.onInputOut.add(this.out, this);
				dop.events.onInputDown.add(this.down, this);

				mapLayer.add(dop);
				if (dop.y > dopy) dopy= dop.y;
				if (dop.x > dopxmax) dopxmax= dop.x;
				if (dop.x < dopxmin) dopxmin= dop.x;
			}
		}

		// setup Elf highlite as separate sprite so it's not in the onInputOver
		this.elf = game.add.sprite(0, 0, 'elfs', 'spike-1-f');
		this.elf.anchor.setTo(.5, .9);
		this.elf.scale.setTo(.8, .8);
		this.elf.alpha = 0;
		mapLayer.add(this.elf);

		mapLayer.scale.set(game.viewscale);
		game.mapLayer = mapLayer;
		this.game = game;

		this.levelnotes(dopxmin + (dopxmax-dopxmin)/2, dopy);

		this.game.add
			.tween(this.game.mapLayer)
			.to({y: 90 + game.bgLayer.y}, 1200, Phaser.Easing.Elastic.Out,true);

		if (!this.game.intro)
		{
			let mapdata = JSON.stringify( this.game.gamedata.map );
			localStorage.setItem('credits', this.game.real_credits );
			localStorage.setItem('lifes',   this.game.real_lifes );
			localStorage.setItem('map',     mapdata );

		}

	}

	over(pointer)
	{
		// swap elf
		this.elf.frameName= pointer.elf;
		this.elf.x = pointer.x;
		this.elf.y = pointer.y;
		this.elf.alpha = 1;

		pointer.children[0].alpha = 1;
	}

	out(pointer)
	{
		this.elf.alpha = 0;
		pointer.children[0].alpha = 0;
	}

	down(pointer)
	{
		let dots= this.game.mapLayer.children;
		for(let i = dots.length-1; i>=0; i--) {
			if ( dots[i].dot )
				if ( dots[i].name != pointer.name )
					this.game.mapLayer.children[i].kill();
		}

		this.game.add.tween(this.game.mapLayer).to({y: -1000}, 1200, Phaser.Easing.Elastic.In,true);

		this.game.intro = false;
		this.game.level = pointer.level;

		this.game.time.events.add(1400, this.startLevel, this);

	}

	startLevel()
	{
		this.game.state.start("Level");
	}

	draw(game, base, l)
	{
		let elfs = [ 'spike', 'ice', 'tree', 'olive', 'pink', 'rose', 'purple', 'gold'];

		let dop = game.add.sprite(0, 0, 'gui', base);
		dop.anchor.setTo(.5, .5);
		dop.inputEnabled = true;

		let hover = game.add.sprite(0, 0, 'gui', base + '_hover');
		hover.anchor.setTo(.5, .5);
		hover.alpha = 0;
		dop.addChild(hover);
		dop.elf = elfs[l % 8] + '-1-f';

		// let nr  = game.add.bitmapText(0, 6, 'one', l, 32);
		// nr.anchor.setTo(.5, .5);
		// dop.addChild(nr);

		return dop;
	}

	layerByName(game, name)
	{
		let l=game.cache.getTilemapData('route').data.layers.length;
		for( l--; l>=0 ; l--){
			let layer = game.cache.getTilemapData('route').data.layers[l];
			if ( layer.name == name ) return layer;
		}
		return null;
	}

	drawmap(route, pathLayer, map)
	{
		// Phaser (Tiled) cached map is indexed, not x,y
		let i=0;
		for(let y=0; y<16; y++)
		{
			for(let x=0; x<22; x++)
			{
				let id = parseInt(map[i++]);
				if (id > 0 ) {
					route.putTile(id, x, y, pathLayer);
				}
			}
		}
	}

	addnote(text, x, y)
	{
		let note = this.game.add.bitmapText(x, y, 'one', text, 32);
		note.anchor.setTo(.5, .5);
		note.alpha = .5;
		this.game.mapLayer.addChild(note);

		note = this.game.add.bitmapText(x-2, y-2, 'one', text, 32);
		note.anchor.setTo(.5, .5);
		this.game.mapLayer.addChild(note);
	}


	levelnotes(dopx, dopy)
	{
		let notes = this.game.gamedata.note;

		// this is a bit weird... draw comments of level;
		let lines = notes[this.game.level];
		if ( lines === undefined ) return;

		let base = dopy + 100;
		if ( base < 400 ) base = 400;
		if ( base > 600 ) { base = 620; dopx= 680; }

 		for( let l in lines )
		{
			this.addnote( lines[l], dopx, base + l * 50);
		}

	}

}

export default Map;