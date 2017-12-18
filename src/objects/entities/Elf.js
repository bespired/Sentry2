import Vars     from 'Objects/entities/Vars';
import Spell    from 'Objects/entities/Spell';
import Distance from 'Objects/ai/Distance';
import Gfx      from 'Objects/gui/Gfx';

class Elf extends Phaser.Group{

	constructor(game,x,y, type){
 		super(game);
		let vars= new Vars();

		this.game = game;

		// Phaser.Group.call(this, game);
		this.name = "elf";
		this.x = x * 80;
		this.y = y * 72 + 8;

		this.localtime = 0;
		this.age       = 0;
		this.type      = type;
		this.name      = vars.elfs[type].name;
		this.spell     = vars.elfs[type].spell;
		this.facing    = 0;
		this.game.elfLayer.add(this);

		this.add(game.add.sprite(0, 25, 'monsters', 'shade'));

		this.item = this.game.add.sprite(40, 0, 'elfs', this.name + '-0-f');
		this.item.anchor.setTo(.5,1);

		this.add(this.item);

		this.tracking    = false;
		this.my_monster  = null;

		this.spell_ready = 30;
		if ( game.level == 1 ) this.age = 2;
		if ( game.level == 2 ) this.age = 1;

	}

	update(){

		if ( this.game.pause ) return;

		this.localtime += this.game.time.elapsed / 100;
		this.item.y = 32 + ( 7-this.age ) * Math.sin(this.localtime / (2 + this.age));

		switch(this.age)
		{
			case 0:
				if ( Math.floor(this.localtime) == 60 + this.type ){
					this.set_age(1);
				}
			break;
			case 1:
				if ( Math.floor(this.localtime) == 2 * (60 + this.type) ){
					this.set_age(2);
				}
			break;
			case 2:
				if ( Math.floor(this.localtime) == 3 * (60 + this.type) ){
					this.set_age(3);
				}
			case 3:
			case 4:
				let dist= new Distance(this.game);

				if (this.spell_ready < 0)
				{
					this.spell_ready += this.game.time.elapsed / 100;
				}

				if ( this.my_monster != null ){
					// did my monster die?
					if( this.my_monster.health == 0 )
					{

						console.log('dead monster walking...' );
						this.my_monster = null;

					}else{

						let distance = dist.distance_to_enemy(this.x, this.y, this.my_monster);
						let face     = dist.facing(this.x, this.y, this.my_monster);
						this.set_face(this.age, face);

						if ( distance > 80 + this.age * 50 )
						{
							this.my_monster = null;
						}

						if (( this.spell_ready > 0 ) && ( this.my_monster != null ))
						{

							this.spell_ready = -14 + this.age;

							let damage = this.age / 2;
							if ( this.age == 4)
							{
								new Spell(this.game, this.x+18, this.y+10, this.spell, damage / 1.8, this.my_monster);
								new Spell(this.game, this.x+58, this.y+10, this.spell, damage / 1.8, this.my_monster);
							}else{
								new Spell(this.game, this.x+38, this.y+10, this.spell, damage, this.my_monster);
							}


							// find next closest?
							this.my_monster = dist.closest_enemy(this.x, this.y);
						}

					}

				}else{
					this.my_monster = dist.closest_enemy(this.x, this.y);
				}

				break;
		}

	}

	set_face(age, face)
	{
		if ( age < 3 )
		{
			this.item.frameName= this.name+'-'+age+'-f';
			return;
		}
		if ( age > 2 )
		{
			let dirs = ['ne','se','se','ne'];
			let flip = [ 1, 1, -1, -1];

			this.item.scale.x = Math.abs(this.item.scale.x) * flip[face];
			this.item.frameName= this.name+'-'+age+'-'+dirs[face];
		}
	}


	set_age(age)
	{

		new Gfx(this.game, this.x+40, this.y-8, 'spawn');
		this.set_face(age, Math.floor((Math.random()*4)))
		this.age= age;

	}


}

export default Elf;

        // DEMO MODE
        // let spawn= this.game.time.elapsed / 100;
        // this.spawntime += spawn;
        // if ( this.spawntime > 6 ){
        //     console.log( this.spawntime );
        //     if ( this.spawnitem < 9 )
        //     {
        //         new Elf(this.game,5+ 2*((this.spawnitem-1) % 4), 4 + 2* Math.floor((this.spawnitem-1) / 4), this.spawnitem);
        //         this.spawnitem++;
        //         this.spawntime = 0;
        //     }else{
        //         this.spawntime = -1000;
        //     }
        // }
