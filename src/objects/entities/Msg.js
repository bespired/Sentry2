class Msg extends Phaser.Group{

	constructor(game, text, wait){
 		super(game);
		this.game = game;

		this.text = text;
		this.disp = '';

		this.text_msg = game.add.bitmapText(80, 420, 'wave', '', 64);
		this.game.guiLayer.add(this.text_msg);
        this.text_msg.updateTransform();

        let mapwidth  = game.gamemap.width  * game.gamemap.tileWidth;
        let mapheight = game.gamemap.height * game.gamemap.tileHeight;
        this.text_msg.position.x = (mapwidth/2 - this.text_msg.width/2);
        this.text_msg.speed = -2;
        this.text_msg.speed = 0;
        this.text_msg.accel = 0.00;
		this.localtime = -wait;

	}

	update(){
		this.localtime += this.game.time.elapsed / 100;

		if ( this.localtime < 0 ) return;

        let mapwidth  = this.game.gamemap.width  * this.game.gamemap.tileWidth;
        let mapheight = this.game.gamemap.height * this.game.gamemap.tileHeight;

		this.text_msg.scale.x += 0.001;

		if ( this.disp != this.text )
		{
			this.disp = this.text.substr(0, Math.floor(this.localtime ));
			this.text_msg.text= this.disp;
		}else{
			this.text_msg.position.y -= this.text_msg.speed;
			this.text_msg.speed += this.text_msg.accel;
			this.text_msg.accel += 0.005;
		}


		this.text_msg.position.x = (mapwidth/2 - this.text_msg.width/2);

		if ( this.text_msg.position.y < -200 ) {
			this.text_msg.destroy();
			this.destroy();
		}

	}



}

export default Msg;