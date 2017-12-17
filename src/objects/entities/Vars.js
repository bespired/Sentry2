class Vars {

	constructor(game){
		//                                 hop
 		this.offset= {
 			'medic':     {x:   0, y: -40, h: 0.5, turn: 1.0, speed: 500, damage: 20, profit: 10},
 			'breadman':  {x: -18, y: -40, h: 0.5, turn: 1.0, speed: 350, damage: 80, profit:  2},
 			'centurion': {x:   0, y: -40, h: 1.0, turn: 2.2, speed: 350, damage: 50, profit:  3},
 			'decturion': {x:   0, y: -40, h: 1.0, turn: 2.1, speed: 330, damage: 45, profit:  3},
 			'knight':    {x:   0, y: -40, h: 1.0, turn: 2.0, speed: 320, damage: 40, profit:  3},
 			'wizard':    {x:  -8, y: -40, h: 1.0, turn: 0.2, speed: 320, damage: 33, profit:  4},
 			'clown':     {x:   0, y: -60, h: 4.0, turn: 2.0, speed: 250, damage: 25, profit:  5},
 			'queen':     {x:   0, y: -40, h: 1.0, turn: 1.2, speed: 350, damage: 50, profit:  3},
 			'king':      {x:   0, y: -40, h: 1.0, turn: 1.2, speed: 350, damage: 50, profit:  3},
 			'dragon':    {x:  -8, y: -40, h: 0.4, turn: 1.0, speed: 250, damage: 20, profit:  7},
 			'gozilla':   {x: -20, y: -55, h: 0.3, turn: 0.4, speed: 250, damage: 10, profit: 20},
 			'reaper' :   {x: -20, y: -55, h: 0.3, turn: 0.4, speed: 200, damage:  5, profit: 25}
 		};
 		this.elfs={
 			1: { name: 'spike',  cost:  10, spell: 'dust'   },
 			2: { name: 'ice',    cost:  35, spell: 'ice'    },
 			3: { name: 'tree',   cost:  50, spell: 'spell'  },
 			4: { name: 'olive',  cost: 120, spell: 'circle' },
 			5: { name: 'pink',   cost: 150, spell: 'rocket' },
 			6: { name: 'rose',   cost: 200, spell: 'bubbl'  },
 			7: { name: 'purple', cost: 250, spell: 'spra'   },
 			8: { name: 'gold',   cost: 400, spell: 'elvsh'  }
 		};
 		this.spells={
 			'spawn'  : {  framecount: 8, blend: PIXI.blendModes.ADD },
 			'dust'   : {  framecount: 7, blend: PIXI.blendModes.ADD },
 			'spell'  : {  framecount: 7, blend: PIXI.blendModes.OVERLAY },
 			'rocket' : {  framecount: 7, blend: PIXI.blendModes.OVERLAY },
 			'bubbl'  : {  framecount: 7, blend: PIXI.blendModes.ADD },
 			'circle' : {  framecount: 7, blend: PIXI.blendModes.ADD },
 			'elvsh'  : {  framecount: 7, blend: PIXI.blendModes.OVERLAY },
 			'spra'   : {  framecount: 7, blend: PIXI.blendModes.OVERLAY },
 			'dust'   : {  framecount: 7, blend: PIXI.blendModes.OVERLAY },
 			'ice'    : {  framecount: 7, blend: PIXI.blendModes.ADD }
 		};
 		// this.slots= ['elf-1', 'elf-2', 'elf-3', 'elf-4', '', 'elf-5', 'elf-6', 'elf-7', 'elf-8'];
	}

	walk(type){
		 return {
			'right': [ type + '-ne', type + '-se' ],
			'left':  [ type + '-nw', type + '-sw' ],
			'up':    [ type + '-ne', type + '-nw' ],
			'down':  [ type + '-se', type + '-sw' ]
		};
	}

	budspots(){
		return [
			{ x:-108, y: -123 },
			{ x: -36, y: -123 },
			{ x:  36, y: -123 },
			{ x:-108, y:  -41 },
			{ x: -36, y:  -41 },
			{ x:  36, y:  -41 },
			{ x:-108, y:   41 },
			{ x: -36, y:   41 },
			{ x:  36, y:   41 }
		];
	}

	slotspots(){
		return {
			'topleft'     : [0,1,1, 1,1,1, 1,1,1],
			'top'         : [1,0,1, 1,1,1, 1,1,1],
			'topright'    : [1,1,0, 1,1,1, 1,1,1],
			'left'        : [1,1,1, 0,1,1, 1,1,1],
			'right'       : [1,1,1, 1,1,0, 1,1,1],
			'bottomleft'  : [1,1,1, 1,1,1, 0,1,1],
			'bottom'      : [1,1,1, 1,1,1, 1,0,1],
			'bottomright' : [1,1,1, 1,1,1, 1,1,0]
		};
	}

	addOffs(){
		return {
			'topleft'     : 8,
			'top'         : 7,
			'topright'    : 6,
			'left'        : 5,
			'right'       : 3,
			'bottomleft'  : 2,
			'bottom'      : 1,
			'bottomright' : 0
		};
	}

}

export default Vars;