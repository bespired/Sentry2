
class Totum extends Phaser.Group{

	constructor(game, id){
 		super(game);

 		// find totum layer with id in cahe data
		let layer, totum = game.cache.getTilemapData('totum').data;
		totum.layers.forEach((l)=>{
			if ( l.name == id ) layer = l;
		});

		if ( !layer){
			console.error(`layer ${id} not found.`);
			return;
		}

	    // add totum to cache
		let tmtotum = game.add.tilemap('totum');
		tmtotum.addTilesetImage('totum', 'totum');
		console.log( tmtotum );

		let totumheight = totum.tileheight * layer.data.length;
		console.log( totum, totumheight );

		Phaser.Group.call(this, game);
		this.name = "totum";
		this.x = 80 * game.totum.x;
		this.y = 72 * game.totum.y - totumheight;

		console.log(game.cache);
		// Totums are made with Tiled.
		// add totum...
//		console.log( game.mapLayer );

	}


	update(){



	}

}

export default Totum;
