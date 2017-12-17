class Gfx extends Phaser.Sprite{

	constructor(game,x,y, name, monster){
 		super(game,x,y);

 		let framecount = 6;
		if (name == 'spawn') framecount= 8;
		if (name == 'dust')  framecount= 7;

 		this.endframe = name + framecount;

		Phaser.Sprite.call(this, game, x, y, 'gfx', name + '1');
		this.anchor.setTo(.5, .5);
		// this.scale.setTo(.9, .9);

		game.add.existing(this);

		let frames= Phaser.Animation.generateFrameNames(name, 1, framecount);

		this.animations.add('spawn-anim', frames);
		this.animations.play('spawn-anim', 20, false, true);

		// game.guiLayer.add(this);
		game.elfLayer.add(this);

		this.rotspeed= this.game.rnd.frac() * 4 - 2;

		game.physics.enable(this, Phaser.Physics.ARCADE);
		this.fireangle = 0;
		this.firespeed = 0;

    	if ( monster )
    	{
			let p1= new Phaser.Point(x, y);
			let p2= new Phaser.Point(monster.x+40, monster.y);
			this.rotspeed += 5;
			this.fireangle = game.math.radToDeg(game.math.angleBetweenPoints(p1, p2));
			this.firespeed = 3*game.math.distance(x, y, monster.x+40, monster.y );
//			console.log(game.math.distance(x, y, monster.x+40, monster.y ));
    	}

		this.game = game;
	}

	update(){

		if ( this.endframe == 'gone6'){
			this.angle += this.rotspeed;
			this.scale.x += .02;
			this.scale.y += .02;
		}
		if ( this.firespeed > 0)
		{
			this.angle += this.rotspeed;
			this.game.physics.arcade.velocityFromAngle(this.fireangle, this.firespeed, this.body.velocity);
		}

		if (this.animations.currentFrame.name == this.endframe) this.destroy()
	}

}

export default Gfx;
