import Msg        from 'Objects/entities/Msg';
import Monster    from 'Objects/entities/Monster';
import Totum      from 'Objects/entities/Totum';

class Waves {

    // how many waves in this level?
    // how many monsters in a wave?

    constructor(game){
        this.game      = game;
        this.timetable = [];
        this.current_wave = 1;

        this.wave_intermezzo = 0;

        let level = game.level;
        let waves = game.gamedata.levels[level].waves;
        this.wavescount = Object.keys(waves).length;

        this.wave_text = this.game.add.bitmapText(0, 12, 'one', '', 48);
        this.game.guiLayer.add(this.wave_text);

        // spread attackers over time.
        let _this = this, i = 0;

        for (let wave in waves)
        {
            i = 0;
            this.timetable[wave]=[];
            let str  = waves[wave];
            let byte = str.split('');

            for(let b = byte.length-1; b >= 0; b-- )
            {
                i++;
                if ( byte[b] != '.'){
                    _this.timetable[wave].push({
                        'time'  : i * 10,
                        'sprite': game.gamedata.monster[byte[b]]
                    });
                }
            }

        }
        this.start_time = 0;
        this.monsters = 0;
        this.next = -1;

    }

    update(time)
    {
        if ( this.next != -1 )
        {
            if ( time - this.start_time > this.timetable[this.current_wave][this.next].time )
            {
                new Monster(this.game, this.game.start.x, this.game.start.y, this.timetable[this.current_wave][this.next].sprite );
                //new Monster(this.game, 0, 6, this.timetable[this.current_wave][this.next].sprite, 8,8 );

                this.next++;
                if (this.next >= this.timetable[this.current_wave].length ) this.next = -1;
            }
        }

        if ( this.wave_intermezzo < 0 )
        {
            this.wave_intermezzo++;
            if ( this.wave_intermezzo == 0 )
            {
                if ( this.current_wave < this.wavescount )
                {
                    // Next wave?
                    this.current_wave++;
                    this.start_wave(this.current_wave, time);
                }else{

                    // Set this level as done.

                    this.game.gamedata.map[this.game.level].open  = true;
                    this.game.gamedata.map[this.game.level].score = this.game.real_credits;
                    this.game.level++; // only for the map notes...
                    new Map(this.game);
                }

            }
        }

        if ( this.game.wave_monsters == 0 )
        {
            this.wave_intermezzo = -100;
            this.game.wave_monsters = -1;
            if ( this.game.hits == 0 )
            {
                new Msg(this.game, 'PEWFECT', 0);
            }else{
                new Msg(this.game, this.game.hits + ' HITS', 0);
            }
            this.centertext('perfect round');
            this.game.score.add_credits(this.current_wave * 2 + this.game.level * 10);
        }

    }

    centertext(text)
    {
        this.wave_text.text = text;
        this.wave_text.updateTransform();

        let mapwidth  = this.game.gamemap.width  * this.game.gamemap.tileWidth;
        let mapheight = this.game.gamemap.height * this.game.gamemap.tileHeight;
        this.wave_text.position.x = (mapwidth/2 - this.wave_text.width/2);
    }

    start_wave(wave, time)
    {
        let worldtext= 'Level '+this.game.level+' - Wave '+wave+'/' + this.wavescount;
        this.centertext(worldtext);

        new Msg(this.game, 'WAVE ' + wave, 0);

        this.game.wave_monsters = this.timetable[wave].length;
        this.game.hits = 0;

        this.start_time = time;
        this.current_wave = wave;
        this.next = 0;
    }


}
export default Waves;
