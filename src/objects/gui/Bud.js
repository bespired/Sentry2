class Bud {

	constructor(game, layer)
	{
		this.game  = game;
	}

	add(bx, by, self, nr, name, cost)
	{
		name = name.replace(/ /g, '_');
		let buttonname = name + "_bud";

		let butpixwidth = 80, butpixheight = 88;

		let butn = this.game.make.bitmapData(butpixwidth*3, butpixheight);

		butn = this.blit(butn,   0, 0, 'button-elf-normal', 0.8);
		butn = this.blit(butn,  80, 0, 'button-elf-hover' , 0.8);
		butn = this.blit(butn, 160, 0, 'button-elf-hover' , 0.8);
		butn = this.blit(butn,   0, 0, name);
		butn = this.blit(butn,  80, 0, name);
		butn = this.blit(butn, 160, 8, name);
		butn = this.blit(butn, 160, 0, 'button-elf-mask');

		butn = this.addText(butn, cost + '',  40, 50);
		butn = this.addText(butn, cost + '', 120, 50);

		// add bitmapdata to cache so it can be added to button
		this.game.cache.addSpriteSheet(buttonname, '', butn.canvas, butpixwidth, butpixheight, 3, 0, 0);

		let button  = this.game.make.button(bx,by, buttonname, self.new_elf, self, 1, 0, 2);
		button.cost = cost;
		button.nr   = nr;

 		this.game.addLayer.add(button);
	}

	addText(butn, text, x, y, a)
	{
		let textpixwidth = 0;
		let frame, letter;
		for( let i=0; i < text.length; i++) {
			frame = this.game.cache.getFrameByName('gui', text[i].toUpperCase() );
			textpixwidth += frame.sourceSizeW-2;
		}
		x -= textpixwidth / 2;
		for( var i=0; i < text.length; i++) {
			letter= text[i].toUpperCase();
			butn = this.blit(butn, x, y, letter, a);

			frame = this.game.cache.getFrameByName('gui', text[i].toUpperCase() );
			x += frame.sourceSizeW-2;
		}
		return butn;
	}

	blit(butn, x,y, name, a = 1)
	{
		let frame = this.game.add.sprite(0, 0, 'gui', name);
		frame.alpha = a;
		butn.draw(frame, x, y);
		frame.destroy();
		return butn;
	}

}

export default Bud;
