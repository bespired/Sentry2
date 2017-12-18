import EasyStar  from '../ai/EasyStar.js'

class Pathfind {

	constructor(game){
		this.path;
		this.dirs      = [];
		this.towers    = [];
		this.pebble    = [10,11,12,13,14,15,16,17,18];
		this.land      = [1,2,3,4,5,6,7,8,9,19,20,21,22,23,24,25];
		this.arrows    = { 1: 'up', 2: 'right', 3: 'down', 4: 'left', 5: 'goal' };
		this.starttile = 10;
		this.goaltile  = 18;

		this.goal = {x:0, y:0};
		this.start= {x:0, y:0};

		this.w =  game.gamemap.width;
		this.h =  game.gamemap.height;

		this.findpath(game);
		this.easystar();
		this.drawdirs(game);
		this.findland(game);

		game.dirs   = this.dirs;
		game.towers = this.towers;
		game.goal   = this.goal;
		game.start  = this.start;


	}

	findland(game)
	{
		this.game = game;
		let map = game.gamemap;
		let maplayer = map.layers[0].data;

		let objlayer;
		if (map.layers[1]) objlayer = map.layers[1].data;

		for(let y=0; y < map.height; y++)
		{
			this.towers[y] = [];
			for(let x=0; x < map.width; x++)
			{
				let idx= maplayer[y][x].index;
				this.towers[y][x] = this.land.indexOf(idx) > -1 ? 0 : 1;

				if (objlayer !== undefined){
					let obj= objlayer[y][x].index;
				 	if ( obj != -1 ) this.towers[y][x] = -1;
				}

			}
		}
	}

	findpath(game)
	{
		this.path = [];
		this.game = game;
		let map = game.gamemap;
		let maplayer = map.layers[0].data;

		for(let y=0; y < map.height; y++)
		{
			this.path[y]   = [];
			this.dirs[y]   = [];
			for(let x=0; x < map.width; x++)
			{
				let idx= maplayer[y][x].index;
				this.path[y][x]   = this.pebble.indexOf(idx) > -1 ? 1 : 0;
				this.dirs[y][x]   = 0;
				if (idx == this.goaltile)  this.goal = { x: x, y: y };
				if (idx == this.starttile) this.start= { x: x, y: y };

			}
		}
	}

	easystar()
	{
		let a_star = new EasyStar();
		let dirs   = this.dirs;

		var found= a_star.findPath(this.path, this.start, this.goal);

		this.path2grid(found);

		a_star = null;
	}

	path2grid(path, dirs)
	{


		if (path === null) {
    		console.log("Path was not found.");
		} else {
			let l = path.length-1, px, py;
			for(let p=l; p >= 0; p--)
			{
				let x= path[p][0],
					y= path[p][1],
					dir= 5;

				if ( p < l ) dir= this.dirnum(x, y, px, py);

				this.dirs[y][x] = dir;
				px= x; py= y;
			}
		}
	}

	dirnum(x,y, ox,oy)
	{
		if ( x == ox )
		{
			return y > oy ? 1 : 3;
		}
		return x > ox ? 4 : 2;
	}

	drawdirs(game)
	{
		let dirs = this.dirs;
		let h    = dirs.length;
		let w    = dirs[0].length;

		for(let y=0; y < h; y++)
		{
			var row= dirs[y];
			for(let x=0; x < w; x++)
			{
				let idx= row[x];
				if (idx > 0){

					let a= game.add.sprite(x * 80, y * 72, 'gui', 'arrows-' + this.arrows[idx]);
					game.bgLayer.add(a);
				}
			}
		}
	}

}

export default Pathfind;
