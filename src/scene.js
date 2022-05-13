class scene extends Phaser.Scene {

    preload() {
        this.load.image('background', 'assets/images/background.png');
        this.load.image('spike', 'assets/images/spike.png');
        // At last image must be loaded with its JSON

       /* this.load.atlas('player', 'assets/images/kenney_player.png', 'assets/images/kenney_player_atlas.json');*/
        this.load.image('tiles', 'assets/tilesets/platformPack_tilesheet.png');
        this.load.image('player', 'assets/images/child.png');
        this.load.atlas('robot', 'assets/images/kenney_player.png', 'assets/images/kenney_player_atlas.json');
        this.load.image('tiles', 'assets/tilesets/platformPack_tilesheet.png');
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
        const backgroundImage = this.add.image(0, 0, 'background').setOrigin(0, 0);
        backgroundImage.setScale(2, 0.8);
        const map = this.make.tilemap({key: 'map'});
        const tileset = map.addTilesetImage('Alpha_test1', 'tiles');
        this.platforms = map.createLayer('Sol', tileset);


        this.cursors = this.input.keyboard.createCursorKeys();


        this.player = new Player(this);
        this.brick = new Brick(this,this.player);
        this.foe = new foe(this);


       /* this.pointCamera = this.physics.add.sprite(0,this.player.player.body.y);
        this.cameras.main.setDeadzone(100,100);
        this.pointCamera.body.setAllowGravity(false);
        this.pointCamera.setImmovable(true);*/

        // Camera

        this.cameras.main.startFollow(this.player.player, true,1,1,0, 300);
        //this.cameras.main.setDeadzone(100,50);
        this.cameras.main.zoomTo(0.75);
        /*game.camera.follow(player.player, Phaser.camera.FOLLOW_LOCKON, 0.1, 0.1);*/
        /*this.cameras.main.centerOn(640,360);*/

        /*this.cameras.main.setDeadzone(100,100);



        this.moveCam = false;

        this.input.on('pointerdown', function () {
            this.moveCam = (this.moveCam) ? false: true;
        }, this);

        if (this.cameras.main.deadzone)
        {
            const graphics = this.add.graphics().setScrollFactor(0);
            graphics.lineStyle(2, 0x00ff00, 1);
            graphics.strokeRect(300, 300, this.cameras.main.deadzone.width, this.cameras.main.deadzone.height);
        }*/


        this.spikes = this.physics.add.group({
            allowGravity: false,
            immovable: true,
        })
        map.getObjectLayer('Spikes').objects.forEach((spikes) => {
            const spikeSprite = this.spikes.create(spikes.x, spikes.y, 'spikes').setOrigin(0);
            spikeSprite.body.setSize(spikes.width, spikes.height).setOffset(0, 20);
        })

        this.cameras.main.zoomTo(1);
        this.cameras.main.setRoundPixels(true);


        this.player.initKeyboard();

        // Collide
        this.collider = new Collider(this, this.player);

    }





    update() {
        this.player.move();
        this.brick.wallcollant();


        /*switch (true) {
            case (this.cursors.space.isDown || this.cursors.up.isDown) && this.player.player.body.onFloor():
                this.player.jump()
                console.log("oui")
                break;
            case this.cursors.left.isDown:
                this.player.moveLeft()
                break;
            case this.cursors.right.isDown:
                this.player.moveRight();
                break;
            case this.cursors.down.isDown:
                if(!this.flag){

                }
                else{
                    this.player.transform()
                    this.flag=false

                }
                break;
            default:
                this.player.stop();

        }

        if(!this.cursors.down.isDown)
        {
            this.flag=true
        }*/





    }
}