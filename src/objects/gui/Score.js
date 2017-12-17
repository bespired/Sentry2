class Score {

	constructor(game){

		this.game         = game;
		this.disp_credits = 0;
		this.disp_lifes   = 0;

		this.text_credits = game.add.bitmapText(80, 12, 'one', this.disp_credits, 48);
		this.game.guiLayer.add(this.text_credits);
		this.score_icn = game.add.bitmapText(40, 12, 'wave', '=', 32);
		this.game.guiLayer.add(this.score_icn);

		this.text_lifes = game.add.bitmapText(260, 12, 'one', this.disp_lifes, 48);
		this.game.guiLayer.add(this.text_lifes);
		this.life_icn = game.add.bitmapText(220, 12, 'wave', '@', 32);
		this.game.guiLayer.add(this.life_icn);

	}

	add_credits(credit)
	{
		this.game.real_credits += credit;
		if (this.game.real_credits < 0) this.game.real_credits = 0;
	}

	update()
	{

		if ( this.game.real_credits != this.disp_credits )
		{
			if ( this.disp_credits < this.game.real_credits ){
				this.disp_credits += Math.ceil( (this.game.real_credits - this.disp_credits) / 5 );
			}
			if ( this.disp_credits > this.game.real_credits ){
				this.disp_credits -= Math.ceil( (this.disp_credits - this.game.real_credits) / 5 );
			}

			this.text_credits.text = this.disp_credits;
		}


		if ( this.game.real_lifes != this.disp_lifes )
		{
			if ( this.disp_lifes < this.game.real_lifes ){
				this.disp_lifes += Math.ceil( (this.game.real_lifes - this.disp_lifes) / 5 );
			}
			if ( this.disp_lifes > this.game.real_lifes ){
				this.disp_lifes -= Math.ceil( (this.disp_lifes - this.game.real_lifes) / 5 );
			}

			this.text_lifes.text = this.disp_lifes;
		}


	}

}

export default Score;
