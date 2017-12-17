import Vars     from 'Objects/entities/Vars';
import Gfx      from 'Objects/gui/Gfx';

class Spell extends Phaser.Sprite{

	constructor(game,x,y, spell, strength, monster){
 		super(game,x,y);

		let vars= new Vars();
 		let framecount = vars.spells[spell].framecount;
 		this.endframe = spell + framecount;

		Phaser.Sprite.call(this, game, x, y, 'gfx', spell + '1');

		this.alpha = .8;
		if (spell == 'rocket'){
			this.scale.setTo(.7, .3);
		}
		this.anchor.setTo(.5, .5);

		game.add.existing(this);

		let frames= Phaser.Animation.generateFrameNames(spell, 1, framecount);

		this.animations.add('spawn-anim', frames);
		this.animations.play('spawn-anim', 20, false, true);

		this.blendMode = vars.spells[spell].blend;

		game.guiLayer.add(this);

		this.rotspeed= this.game.rnd.frac() * 4 - 2;

		game.physics.enable(this, Phaser.Physics.ARCADE);

		let p1= new Phaser.Point(x, y);
		let p2= new Phaser.Point(monster.x+40, monster.y + Math.random() * 4 );

		this.rotspeed += 5;
		this.fireangle = game.math.radToDeg(game.math.angleBetweenPoints(p1, p2));
		this.firespeed = 3 * game.math.distance(x, y, monster.x+40, monster.y );
		this.angle     = this.fireangle;
		this.strength  = strength;
		this.monster   = monster;
		this.slowtime  = 0;
		if ( spell == 'ice' ) this.slowtime = strength * 100;
		this.game = game;
	}

	update(){

		this.scale.x += .005;
		this.scale.y += .005;

		if ( this.firespeed > 0)
		{
			this.game.physics.arcade.velocityFromAngle(this.fireangle, this.firespeed, this.body.velocity);
		}

		if (this.animations.currentFrame.name == this.endframe)
		{
			this.monster.health -= (this.strength * this.monster.damage) / this.game.difficulty;
			this.monster.slowing = this.slowtime;
			this.destroy();
		}
	}

}

export default Spell;
