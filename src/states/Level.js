import Phaser     from 'phaser';

import Layer      from 'Objects/gui/Layer';
import Fps        from 'Objects/gui/Fps';
import Pathfind   from 'Objects/ai/Pathfind';
import Waves      from 'Objects/ai/Waves';

import Cursor     from 'Objects/gui/Cursor';
import Score      from 'Objects/gui/Score';


class Level extends Phaser.State {

    create() {

        // keep running on blur
        this.game.stage.disableVisibilityChange = true;

        //Enable Arcade Physics
        this.game.physics.startSystem(Phaser.Physics.ARCADE);

        //Set the games background colour
        this.game.stage.backgroundColor = '#7b9412';

        new Layer(this.game);

        // draw this map on end of all waves
        // new Map(this.game);

        this.game.speed = 5;
        this.game.pause = 0;

        this.spawntime  = 0;
        this.spawnitem  = 1;

        // this.leftKey  = this.game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
        this.rightKey = this.game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);

        this.fps = new Fps(this.game);

        new Pathfind(this.game, this.map);

        let cursor= new Cursor(this.game);

        this.localtime = 0;
        this.game.cursormode = 'add';

        this.game.score = new Score(this.game);
        this.waves      = new Waves(this.game);

        this.waves.start_wave(1, 10);

        this.game.input.addMoveCallback(
            function(pointer, x, y, state){ cursor.hover(pointer, x, y, state); }
        );

    }

    set_pause()
    {
        this.game.pause = Math.abs( 1- this.game.pause);
        // console.log('--PAUSE--');
    }

    update() {

        if ( this.game.pause ) return;
        this.game.elfLayer.sort('y', Phaser.Group.SORT_ASCENDING);

        this.localtime += this.game.time.elapsed / 100;
        this.fps.update(this.localtime);
        this.game.score.update();
        this.waves.update(this.localtime);

        if (this.rightKey.isUp) this.rightKey.pressed = false;
        if (this.rightKey.isDown)
        {
            if ( this.rightKey.pressed ) return;

            this.rightKey.pressed = true;

//            {"0":{"x":0,"y":0,"next":[1],"open":true},"1":{"x":401,"y":35,"next":[2],"open":true,"score":44},"2":{"x":401,"y":115,"next":[3],"open":false},"3":{"x":521,"y":75,"next":[4],"open":false},"4":{"x":641,"y":35,"next":[5,6],"open":false},"5":{"x":641,"y":115,"next":[],"open":false},"6":{"x":761,"y":115,"next":[7],"open":false},"7":{"x":761,"y":195,"next":[8],"open":false},"8":{"x":601,"y":195,"next":[9,14],"open":false},"9":{"x":601,"y":315,"next":[10],"open":false},"10":{"x":721,"y":315,"next":[11],"open":false},"11":{"x":681,"y":435,"next":[12],"open":false},"12":{"x":521,"y":395,"next":[13],"open":false},"13":{"x":401,"y":355,"next":[],"open":false},"14":{"x":481,"y":235,"next":[15],"open":false},"15":{"x":361,"y":275,"next":[16],"open":false},"16":{"x":281,"y":195,"next":[17],"open":false},"17":{"x":201,"y":115,"next":[18],"open":false},"18":{"x":121,"y":115,"next":[19],"open":false},"19":{"x":41,"y":195,"next":[20],"open":false},"20":{"x":121,"y":275,"next":[21],"open":false},"21":{"x":201,"y":315,"next":[22],"open":false},"22":{"x":201,"y":395,"next":[23,25,27],"open":false},"23":{"x":81,"y":475,"next":[24],"open":false},"24":{"x":41,"y":595,"next":[],"open":false},"25":{"x":241,"y":515,"next":[26],"open":false},"26":{"x":401,"y":595,"next":[],"open":false},"27":{"x":361,"y":435,"next":[28],"open":false},"28":{"x":521,"y":515,"next":[29],"open":false},"29":{"x":681,"y":515,"next":[30],"open":false},"30":{"x":840,"y":515,"next":[],"open":false}}


        }


    }

}
export default Level;
