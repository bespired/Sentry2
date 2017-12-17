class Button {

	constructor(game, layer, text, bx,by, callback)
	{
		text = text.replace(/ /g, '_');
		let buttonname = text + "_button";
		this.game  = game;
		this.layer = layer;
		this.text  = text;
		this.callback = callback;

		let frame;
		let butpixwidth = 0, butpixheight = 74;
		for( let i=0; i < text.length; i++) {
			frame = game.cache.getFrameByName('gui', text[i].toUpperCase() );
			butpixwidth += frame.sourceSizeW;
		}
		butpixwidth += 48;

		let butn = this.game.make.bitmapData(butpixwidth*3, butpixheight);

		butn = this.button(butn, butpixwidth, 0, 1);
		butn = this.addText(butn, text, 24, 13);

		butn = this.button(butn, butpixwidth, 1, 3);
		butn = this.addText(butn, text, butpixwidth + 24, 13);

		butn = this.button(butn, butpixwidth, 2, 2);
		butn = this.addText(butn, text, butpixwidth*2 + 24, 16);

		this.game.cache.addSpriteSheet(buttonname, '', butn.canvas, butpixwidth, butpixheight, 3, 0, 0);

		let button = this.game.make.button(bx,by, buttonname, () => this.actionOnClick(), this, 1, 0, 2);
 		this.game.elfLayer.add(button);
	}

	actionOnClick()
	{
		if (this.callback) this.callback();
	}

	button(butn, width, offs, type)
	{
		butn = this.blit(butn, offs*width, 0, 'button-red-left-'+type);
		for (let px=24; px < width-48; px+=24)
		{
			butn = this.blit(butn, offs*width + px, 0, 'button-red-mid-'+type);
		}
		butn = this.blit(butn, offs*width + width - 48, 0, 'button-red-mid-'+type);
		butn = this.blit(butn, offs*width + width - 24, 0, 'button-red-right-'+type);
		return butn;
	}

	addText(butn, text, x, y)
	{
		let textpixwidth = text.length;
		let frame, letter;
		for( var i=0; i < text.length; i++) {
			letter= text[i].toUpperCase();
			butn = this.blit(butn, x+textpixwidth, y, letter);

			frame = this.game.cache.getFrameByName('gui', text[i].toUpperCase() );
			textpixwidth += frame.sourceSizeW-2;
		}
		return butn;
	}

	blit(butn, x,y, name)
	{
		let frame = this.game.add.sprite(0, 0, 'gui', name);
		butn.draw(frame, x, y);
		frame.destroy();
		return butn;
	}

}

export default Button;
