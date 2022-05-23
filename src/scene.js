class scene extends Phaser.Scene {

    preload() {
        this.load.image('background', 'assets/images/background.png');
        this.load.image('spike', 'assets/images/spike.png');
        // At last image must be loaded with its JSON

       /* this.load.atlas('player', 'assets/images/kenney_player.png', 'assets/images/kenney_player_atlas.json');*/
        this.load.image('player', 'assets/images/child.png');
        this.load.atlas('robot', 'assets/images/kenney_player.png', 'assets/images/kenney_player_atlas.json');
        this.load.image('tiles', 'assets/tilesets/platformPack_tilesheet.png');
        this.load.image('tilaqua', 'assets/tilesets/tilesaqua.png');
        this.load.image('player', 'assets/images/child.png');
        this.load.image('boule', 'assets/images/boule.png');
        this.load.image('move', 'assets/images/ech.png');
        this.load.image('col', 'assets/images/hce.png');
        this.load.image('foe', 'assets/images/foe.png');
        this.load.image('spike', 'assets/images/spike.png');
        this.load.image('spikes', 'assets/images/ekips.png');
        // Load the export Tiled JSON
        this.load.tilemapTiledJSON('map', 'assets/tilemaps/Alpha1.json');



    }


    create() {

        //Tilled créer la base
        const backgroundImage = this.add.image(-2000, -3000, 'background').setOrigin(0, 0);
        const map = this.make.tilemap({key: 'map'});
        const tileset = map.addTilesetImage('Alpha_test1', 'tiles');
        const tilesetP1 = map.addTilesetImage('Tileaqua', 'tilaqua');

        this.platforms = map.createLayer('Sol', tilesetP1);
        this.tree = map.createLayer('Arbre', tilesetP1);
        this.Plan1 = map.createLayer('Parallax', tilesetP1);
        this.Plan2 = map.createLayer('Parallax1', tilesetP1);
        this.fleur = map.createLayer('Fleur', tilesetP1);


        this.cursors = this.input.keyboard.createCursorKeys();


        this.player = new Player(this);
        this.brick = new Brick(this,this.player);
        this.foe = new foe(this);
        this.sauvegarde = new Sauvegarde(this,this.player)





        // Camera
        this.pointCamera = this.physics.add.sprite(0, 0);
        this.pointCamera.body.x = this.player.player.body.x;
        this.cameras.main.startFollow(this.pointCamera, true,1,1,0, 150);
        this.pointCamera.body.setAllowGravity(false);
        this.pointCamera.setImmovable(true);
        this.cameras.main.zoomTo(0.80);
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
        if(this.player.player.body.y<this.pointCamera.body.y-300)
        {
            this.pointCamera.body.y = this.player.player.body.y+300
        }
        else if(this.player.player.body.y>this.pointCamera.body.y+50)
        {
            this.pointCamera.body.y = this.player.player.body.y-50
        }
        this.player.move();
        this.brick.wallcollant();

    }
}