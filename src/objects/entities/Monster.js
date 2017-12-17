import Vars     from 'Objects/entities/Vars';
import Distance from 'Objects/ai/Distance';
import Gfx      from 'Objects/gui/Gfx';

class Monster extends Phaser.Group{

	constructor(game,x,y, type){
 		super(game);

 		let vars= new Vars();

		// Phaser.Group.call(this, game);
		this.name = "monster";
		this.x = x * 80;
		this.y = y * 72;

		this.id = Math.floor(1000 * Math.random());
		this.tick   = 0;
		this.x_dir  = 1;
		this.y_dir  = 0;
		if ( x ==  0 ) { this.x = -80; }
		if ( y ==  0 ) { this.y = -80; }
		if ( y == 11 ) { this.y += 80; this.y_dir = -1; this.x_dir = 0; }

		this.game.elfLayer.add(this);

		// initial sprite
    	this.add(game.add.sprite(0, 25, 'monsters', 'shade'));

		this.item = game.add.sprite(vars.offset[type].x, vars.offset[type].y, 'monsters', type+'-se');
    	this.add(this.item);

		this.healthbar = game.add.sprite(40-12, -50, 'monsters', 'health25');
    	this.add(this.healthbar);

    	this.birth   = this.game.time.totalElapsedSeconds();
		this.dir     = 'right';

		this.type    = type;
		this.offset  = vars.offset[type];
		this.speed   = vars.offset[type].speed / 2000;
		this.walk    = vars.walk(type);
		this.health  = 100;
		this.damage  = vars.offset[type].damage;
//		this.sick    = 0.05 * this.game.rnd.frac();
		this.sick    = 0;

		this.healing = false;
		this.patient = false;

		this.profit  = vars.offset[type].profit;
		this.noscore = false;

		this.dist= new Distance(game);
	}


	update(){

		let elapsed= this.game.time.totalElapsedSeconds() - this.birth;
		if ( this.game.pause ) return;

		let frame  = Math.floor((elapsed * this.offset.turn) % 2);

		this.tick++;
		if ( this.tick == 10) this.tick = 0;
		this.directional();

		let speed = this.speed;
		if ( this.slowing > 0) {
			speed = speed / 2.5;
			this.slowing --;
		}

		this.x += this.x_dir * speed * this.game.speed;
		this.y += this.y_dir * speed * this.game.speed;

		this.item.y = this.offset.y + this.offset.h * Math.sin(10*elapsed);
		this.item.frameName= this.walk[this.dir][frame];

//		this.health -= this.sick;

		if ( this.health <= 0 )
		{
			new Gfx(this.game, this.x+40, this.y+10, 'gone');

			if (! this.noscore) {
				this.game.score.add_credits(this.game.level);
				this.game.score.add_credits(this.profit);
			}

			this.game.wave_monsters--;

			this.game.elfLayer.remove(this);
			this.health = 0;
		}

		if ( this.health == 0 )
		{
			this.remove();
		}

		this.healthbar.frameName= 'health'+ Math.floor(this.health/4);

		if ((this.type == 'medic') && (this.tick == 0)) this.healer();


	}

	healer()
	{

		let _this = this;
		if ( this.healing )
		{
			if ( this.patient != null )
			{
				if ( this.dist.distance_to_enemy(this.x, this.y, this.patient) > 50 )
				{
					this.healing = false;
				}else{
					this.patient.health = this.patient.health + 1;
					if ( this.patient.health > 100 ) this.patient.health = 100;
				}
			}

		}else{

			this.patient = this.dist.closest_monster(this.x, this.y, this.id);
		 	this.healing = true;

		}
	}

	directional()
	{
		let gx= Math.floor((this.x - (this.x_dir * 40) + 40) / 80);
		let gy= Math.floor((this.y - (this.y_dir * 36) + 36) / 72);

		if (gx< 0) return;
		if (gy< 0) return;
		if (gy>11) return;

		this.x_dir = 0;
		this.y_dir = 0;

		switch(this.game.dirs[gy][gx])
		{
			case 1:
				this.y_dir = -1;
				this.dir = 'up';
				return;
			case 2:
				this.x_dir =  1;
				this.dir = 'right';
				return;
			case 3:
				this.y_dir =  1;
				this.dir = 'down';
				return;
			case 4:
				this.x_dir = -1;
				this.dir = 'left';
				return;
			case 5:
				this.health  = 0;
				this.game.real_lifes--;
				this.game.hits++;
				this.noscore = true;
				return;
		}
	}

	draw_healthbar(){
		if ( this.health < 0 ) return;
		this.healthbar.frameName= this.walk[this.dir][frame];
	}


}

export default Monster;



