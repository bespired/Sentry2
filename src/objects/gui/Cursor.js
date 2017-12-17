import Bud      from 'Objects/gui/Bud';
import Vars     from 'Objects/entities/Vars';
import Elf      from 'Objects/entities/Elf';
import Gfx      from 'Objects/gui/Gfx';


class Cursor extends Phaser.Sprite{

	constructor(game){

 		super(game);
 		this.game = game;

 		let scale= {x:this.game.viewscale, y:this.game.viewscale};
 		this.addTween = this.game.add.tween(this.game.addLayer.scale).to(scale, 50);
		this.addTween.onComplete.add(this.enable_buttons, this);

		this.cursor = game.add.sprite(0, 0, 'gui', 'elf-place-drop');
		this.cursor.alpha = 0.2;
		this.cursor.anchor.setTo(-0, -0.05);

		game.guiLayer.add(this.cursor);

		let slots= ['elf-1', 'elf-2', 'elf-3', 'elf-4', 'elf-5', 'elf-6', 'elf-7', 'elf-8'];
		let costs= [     10,      35,     50,     120,     150,     200,     250,     400];
		let buds    = new Bud(game);
		let budspot = new Vars().budspots();

		let max= game.level + 1;
		if ( max > 8 ) max =8;
		for( let n=0; n<max; n++ )
		{
			buds.add( budspot[n].x, budspot[n].y, this, n, slots[n], costs[n]);
		}

	}

	new_elf(button)
	{
		let addLayer = this.game.addLayer;
		addLayer.visible = false;
		this.game.cursormode = 'add';
		this.cursor.alpha = 0;
		let gx = Math.floor(this.cursor.x / 80);
		let gy = Math.floor(this.cursor.y / 72);

		this.game.towers[gy][gx] = 1+button.nr;

		let vars = new Vars();
		this.game.score.add_credits(-vars.elfs[1+button.nr].cost );

		new Gfx(this.game, gx*80+38, gy*72-10, 'spawn');
		new Elf(this.game, gx, gy, 1+button.nr);

	}


 	hover(p,x,y,s){

 		let xoffs = this.game.elfLayer.x;
 		let yoffs = this.game.elfLayer.y;
		x -= xoffs;
 		y -= yoffs;

        let tile     = 0;
		let addLayer = this.game.addLayer;
        let gx       = Math.floor( x / this.game.viewscale / 80 );
        let gy       = Math.floor( y / this.game.viewscale / 72 );
        let w        = addLayer.width / 2;
		let h        = addLayer.height / 2;
		if ( w < 150) w =150;
		if ( h < 150) h =150;
        let towers   = this.game.towers;


        if ((gy > 11 ) || (gx > 15) || (gy < 0 ) || (gx < 0)) {
        	this.cursor.alpha = 0;
        	return;
        }

        switch( this.game.cursormode )
        {
			case 'elf-select':
				let in_area = false;

				if ((x+xoffs > addLayer.x - w*1.5) && ( x+xoffs < addLayer.x + w*1.5 )){
					if ((y+yoffs > addLayer.y - h*1.5) && ( y+yoffs < addLayer.y + h*1.5 ))
					{
						in_area = true;
					}
				}
				if (!in_area)
				{
					addLayer.visible = false;
					this.game.cursormode = 'add';
					this.cursor.alpha = 0;
				}
			break;

			case 'add':
				this.cursor.x= gx * 80;
				this.cursor.y= gy * 72;

			    if ((gy >= 0 ) && ( gy <= this.game.gamemap.height)){
			        tile = towers[gy][gx];

			        this.cursor.alpha = (tile != 0) ? 0.4 : 0.8;
			        this.addLayerSafe();
			    }

			    if ((s) && (tile == 0))
			    {
			    	addLayer.scale.set(0.5,0.5);
			    	addLayer.visible = true;
			    	this.disable_buttons();
					this.addTween.start();
					this.game.cursormode = 'elf-select';
			    }
			break;
		}
    }

    disable_buttons()
    {
    	let children = this.game.addLayer.children;
    	for( let i=0; i < children.length; i++ ){
    		children[i].inputEnabled = false;
    	}
    }
    enable_buttons()
    {
    	let children = this.game.addLayer.children;
    	for( let i=0; i < children.length; i++ ){
    		if ( children[i].cost <= this.game.real_credits ) children[i].inputEnabled = true;
    	}
    }
    addLayerSafe()
    {

    	let xoffs = this.game.elfLayer.x;
 		let yoffs = this.game.elfLayer.y;
    	let addLayer = this.game.addLayer;
    	let vars     = new Vars();
        let w        = addLayer.width,  w2 = w/2;
		let h        = addLayer.height, h2 = h/2;
		let lr = '';
		let tb = '';

    	if ( addLayer.x - w2 < 0 ) {  lr = 'left'; }
		if ( addLayer.y - h2 < 0 ) {  tb = 'top';  }
		if ( addLayer.x + w > this.game.width  ) { lr = 'right'; }
		if ( addLayer.y + h > this.game.height ) { tb = 'bottom'; }

		let budspot   = vars.budspots();
		let slotspots = [ 1,1,1, 1,0,1, 1,1,1 ];

		let sides   = tb+lr;
		let addoffs = 4;

		if ( sides.length > 0 ){
			let slotspot = vars.slotspots();
			let addoff   = vars.addOffs();

			slotspots = slotspot[sides];
			addoffs   = addoff[sides];
		}

		let n=0;
		addLayer.children.forEach((c)=>{
			if ( slotspots[n] == 0 ) n++;
			c.x = budspot[n].x;
			c.y = budspot[n].y;
			c.alpha = 1;
			if ( c.cost > this.game.real_credits ) c.alpha = .5;
			n++;
		});


    	addLayer.x = xoffs+(72+this.cursor.x + budspot[addoffs].x ) * this.game.viewscale;
    	addLayer.y = yoffs+(78+this.cursor.y + budspot[addoffs].y ) * this.game.viewscale;

    }


}

export default Cursor;
