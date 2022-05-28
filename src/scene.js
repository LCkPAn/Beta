class scene extends Phaser.Scene {

    preload() {


        // At last image must be loaded with its JSON
        this.load.spritesheet('walk','assets/animation/walk.png',{frameWidth: 110, frameHeight: 206});


        this.load.image('player', 'assets/images/child.png');
        this.load.image('tilaqua', 'assets/tilesets/tilesaqua.png');
        this.load.image('player', 'assets/images/child.png');
        this.load.image('boule', 'assets/images/boule.png');
        this.load.image('spike', 'assets/images/spike.png');
        this.load.image('move', 'assets/images/ech.png');
        this.load.image('col', 'assets/images/hce.png');
        this.load.image('foe', 'assets/images/foe.png');
        this.load.image('spike', 'assets/images/spike.png');
        this.load.image('spikes', 'assets/images/ekips.png');
        this.load.image('background', 'assets/images/background.png');

        // Load the export Tiled JSON
        this.load.tilemapTiledJSON('map', 'assets/tilemaps/Alpha1.json');



    }


    create() {

        //Tilled créer la base
        this.backgroundImage = this.add.image(-400, -150, 'background').setOrigin(0, 0);
        this.backgroundImage.setScale(3, 2);
        const map = this.make.tilemap({key: 'map'});
        const tilesetP1 = map.addTilesetImage('Tileaqua', 'tilaqua');

        this.sole = map.createLayer('Sol', tilesetP1);
        this.tray = map.createLayer('traits', tilesetP1);
        this.paralla = map.createLayer('Parallax1', tilesetP1);
        this.paralla1 = map.createLayer('Devant', tilesetP1);

        this.cursors = this.input.keyboard.createCursorKeys();


        this.player = new Player(this);
        this.brick = new Brick(this,this.player);
        this.foe = new foe(this);
        this.sauvegarde = new Sauvegarde(this,this.player);


        // Parallax
        this.backgroundImage.scrollFactorX=0;
        this.backgroundImage.scrollFactorY=0;





        // Camera
        this.pointCamera = this.physics.add.sprite(0, 0);
        this.pointCamera.body.x = this.player.player.body.x;
        this.cameras.main.startFollow(this.pointCamera, true,1,1,0, 150);
        this.pointCamera.body.setAllowGravity(false);
        this.pointCamera.setImmovable(true);
        this.cameras.main.zoomTo(0.70);
        this.cameras.main.setRoundPixels(true);




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
        this.physics.add.collider(this.player.player, this.collide);


        // vie



        this.player.initKeyboard();

    }





    update()
    {
        this.pointCamera.body.x = this.player.player.body.x;
        if(this.player.player.body.y<this.pointCamera.body.y-200)
        {
            this.pointCamera.body.y = this.player.player.body.y+200
        }
        else if(this.player.player.body.y>this.pointCamera.body.y+100)
        {
            this.pointCamera.body.y = this.player.player.body.y-100
        }
        this.player.move();
        this.brick.wallcollant();

    }
}