class Distance {

    constructor(game){
        this.game= game;
    }

    closest_monster(x,y, me)
    {
        let mindist= 6400000;
        let monster= null;
        this.game.elfLayer.children.forEach(function(m){
            if ( m.name == 'monster' )
            {
                if ( m.id != me )
                {
                    let xdist = x- m.x;
                    let ydist = y- m.y;
                    let dist = Math.abs(xdist)+Math.abs(ydist);
                    if ( dist < mindist )
                    {
                        mindist = dist;
                        monster = m;
                    }
                }
            }
        });
        return monster;
    }

    closest_enemy(x,y)
    {
        let mindist= 6400000;
        let monster= null;
        this.game.elfLayer.children.forEach(function(m){
            if ( m.name == 'monster' )
            {
                let xdist = x- m.x;
                let ydist = y- m.y;
                let dist = Math.abs(xdist)+Math.abs(ydist);
                if ( dist < mindist )
                {
                    mindist = dist;
                    monster = m;
                }
            }
        });
        return monster;
    }

    distance_to_enemy(x,y, monster)
    {
        if ( monster == null ) return 6400000;
        let xdist = x - monster.x;
        let ydist = y - monster.y;
        return Math.sqrt( (xdist * xdist) + (ydist * ydist) );
    }

    facing(x,y, monster)
    {

        //   3    0
        //    \  /
        //     *
        //   /  \
        //  2    1
        if ( monster == null ) return 3;

        y-= 10;
        let face = 0;
        if ( x < monster.x )
        {
            if ( y < monster.y ) return 1;
            return 0;
        }else{
            if ( y < monster.y ) return 2;
            return 3;
        }

    }

}

export default Distance;
