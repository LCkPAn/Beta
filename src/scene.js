class scene extends Phaser.Scene {

    constructor() {
        super('game');
    }


    preload() {


        // At last image must be loaded with its JSON
        this.load.spritesheet('walk','assets/animation/walk.png',{frameWidth: 138, frameHeight: 173});
        this.load.spritesheet('jump','assets/animation/jump.png',{frameWidth: 151, frameHeight: 186});
        this.load.spritesheet('bonce','assets/animation/boulehair.png',{frameWidth: 150, frameHeight: 126});
        this.load.spritesheet('mort','assets/animation/death.png',{frameWidth: 138, frameHeight: 130});
        this.load.spritesheet('transfo','assets/animation/transformation.png',{frameWidth: 138, frameHeight: 130});
        this.load.spritesheet('versere','assets/animation/inverse.png',{frameWidth: 138, frameHeight: 130});
        this.load.spritesheet('iddleplay','assets/animation/iddle.png',{frameWidth: 138, frameHeight: 173});


        this.load.image('player', 'assets/images/child.png');
        this.load.image('tilaqua', 'assets/tilesets/tilesaqua.png');
        this.load.image('tilelvl1', 'assets/tilesets/tilesol.png');
        this.load.image('tilelvl2', 'assets/tilesets/tilesol2.png');
        this.load.image('tilelvl3', 'assets/tilesets/tilesol3.png');
        this.load.image('tilelvl4', 'assets/tilesets/firstplan.png');
        this.load.image('player', 'assets/images/child.png');
        this.load.image('spike', 'assets/images/spike.png');
        this.load.image('move', 'assets/images/ech.png');
        this.load.image('col', 'assets/images/hce.png');
        this.load.image('foer', 'assets/images/foe.png');
        this.load.image('spike', 'assets/images/spike.png');
        this.load.image('spikes', 'assets/images/ekips.png');
        this.load.image('background', 'assets/images/background.png');
        this.load.image ('water', 'assets/images/watercolor.png');
        this.load.image ('waterb', 'assets/images/watercolore.png');
        this.load.image ('waterr', 'assets/images/watercolour.png');
        this.load.image('ball', 'assets/images/bouledecheuveux.png');

        // Load the export Tiled JSON
        this.load.tilemapTiledJSON('map', 'assets/tilemaps/Alpha1.json');



    }


    create() {

        //Tilled créer la base
        this.backgroundImage = this.add.image(-190, -200, 'background').setOrigin(0, 0);
        this.backgroundImage.setScale(1.5,1.5);

        this.add.image(-500,-150, 'water').setAlpha(0.1);
        this.add.image(4300,0, 'waterb').setAlpha(0.2);
        this.add.image(8000,-200, 'water').setAlpha(0.3);
        this.add.image(11700,-600, 'waterb').setAlpha(0.3);
        this.add.image(21600,-1200, 'waterr').setAlpha(0.1);


        const map = this.make.tilemap({key: 'map'});
        const tilesetP1 = map.addTilesetImage('Tileaqua', 'tilaqua');
        const tilesetP2 = map.addTilesetImage('tilesol', 'tilelvl1');
        const tilesetP3 = map.addTilesetImage('tilesol2', 'tilelvl2');
        const tilesetP4 = map.addTilesetImage('tilesol3', 'tilelvl3');
        const tilesetP5 = map.addTilesetImage('1er plan', 'tilelvl4');


        this.treee = map.createLayer('Arbre2', tilesetP1);
        this.tree = map.createLayer('Arbre', tilesetP1);



        this.paralaaa = map.createLayer('Parallaxdeux', tilesetP5);
        this.paralaa = map.createLayer('Parallax2', tilesetP1);
        this.parala = map.createLayer('Parallax1', tilesetP5);

        this.spetwo = map.createLayer('special2', tilesetP1);
        this.speone = map.createLayer('special', tilesetP1);

        this.sole = map.createLayer('Sol', tilesetP2);
        this.solee = map.createLayer('Sol2', tilesetP3);
        this.soleee = map.createLayer('Sol3', tilesetP4);

        this.tray = map.createLayer('traits', tilesetP1);


        this.cursors = this.input.keyboard.createCursorKeys();


        this.player = new Player(this);
        this.brick = new Brick(this,this.player);
        this.foe = new foe(this, this.player, this.save);
        this.sauvegarde = new Sauvegarde(this,this.player);


        // Parallax
        this.backgroundImage.scrollFactorX=0;
        this.backgroundImage.scrollFactorY=0;

        this.sole.scrollFactorX=1;
        this.sole.scrollFactorY=1;

        this.solee.scrollFactorX=1;
        this.solee.scrollFactorY=1;

        this.soleee.scrollFactorX=1;
        this.soleee.scrollFactorY=1;

        this.tray.scrollFactorX=1;
        this.tray.scrollFactorY=1;

        this.parala.scrollFactorX=1;
        this.parala.scrollFactorY=1;

        this.paralaa.scrollFactorX=0.8;
        this.paralaa.scrollFactorY=1;

        this.paralaaa.scrollFactorX=0.8;
        this.paralaaa.scrollFactorY=1;

        this.tree.scrollFactorX=1;
        this.tree.scrollFactorY=1;

        this.treee.scrollFactorX=0.8;
        this.treee.scrollFactorY=1;


        // Camera
        this.pointCamera = this.physics.add.sprite(0, 0);
        this.cameras.main.startFollow(this.pointCamera, true,1,1,0, 200);
        this.pointCamera.body.setAllowGravity(false);
        this.pointCamera.setImmovable(true);
        this.cameras.main.setRoundPixels(true);
        this.cameras.main.setZoom(0.80);




        //Spikes
        this.spikes = this.physics.add.group({
            allowGravity: false,
            immovable: true,
        })
        map.getObjectLayer('Spikes').objects.forEach((spikes) => {
            const spikesSprite = this.add.rectangle(spikes.x,spikes.y,spikes.width,spikes.height).setOrigin(0,0)
            this.spikes.add(spikesSprite)
        })
        this.physics.add.collider(this.player.player, this.spikes, playerHit, null, this);

        function playerHit(player, spike) {
           this.sauvegarde.death()
        }


        // Collide
        this.collide = this.physics.add.group({
            allowGravity: false,
            immovable: true,
        });
        map.getObjectLayer('Collide').objects.forEach((col) => {
            const collideSprite = this.add.rectangle(col.x,col.y,col.width,col.height).setOrigin(0,0)
            this.collide.add(collideSprite)
        });




        this.physics.add.overlap(this.player.player, this.endla,null,this);

        this.physics.add.collider(this.player.player, this.collide);
        this.physics.add.collider(this.collide, this.foe.ennemy)



        // vie
        this.player.initKeyboard();

    }



    update()
    {
        this.pointCamera.body.x = this.player.player.body.x;
        this.pointCamera.body.y = this.player.player.body.y;
        let offset=100;
        switch(true)
        {
            case this.player.player.body.velocity.y<0:
            offset=200;
            break;
            case this.player.player.body.velocity.y>0:
            offset=-200;
            break;

            default:
            offset=100
            break;

        }


        function lerp (start, end, amt=0.1){
            return (1-amt)*start+amt*end
        }




        this.cameras.main.followOffset.y=lerp(this.cameras.main.followOffset.y,offset,  0.01)
        this.player.move();
        this.brick.wallcollant();
        this.foe.IaGesttion();

    }
}