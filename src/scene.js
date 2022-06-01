class scene extends Phaser.Scene {

    preload() {


        // At last image must be loaded with its JSON
        this.load.spritesheet('walk','assets/animation/walk.png',{frameWidth: 103, frameHeight: 133});
        this.load.spritesheet('jump','assets/animation/jump.png',{frameWidth: 131, frameHeight: 145});


        this.load.image('player', 'assets/images/child.png');
        this.load.image('tilaqua', 'assets/tilesets/tilesaqua.png');
        this.load.image('tilelvl1', 'assets/tilesets/tilesol.png');
        this.load.image('tilelvl2', 'assets/tilesets/tilesol2.png');
        this.load.image('tilelvl3', 'assets/tilesets/tilesol3.png');
        this.load.image('player', 'assets/images/child.png');
        this.load.image('boule', 'assets/images/boule.png');
        this.load.image('spike', 'assets/images/spike.png');
        this.load.image('move', 'assets/images/ech.png');
        this.load.image('col', 'assets/images/hce.png');
        this.load.image('foe', 'assets/images/foe.png');
        this.load.image('spike', 'assets/images/spike.png');
        this.load.image('spikes', 'assets/images/ekips.png');
        this.load.image('background', 'assets/images/background.png');
        this.load.image ('water', 'assets/images/watercolor.png');

        // Load the export Tiled JSON
        this.load.tilemapTiledJSON('map', 'assets/tilemaps/Alpha1.json');



    }


    create() {

        //Tilled créer la base
        this.backgroundImage = this.add.image(-190, -200, 'background').setOrigin(0, 0);
        this.backgroundImage.setScale(1.5,1.5);
        this.add.image(-500,-150, 'water').setAlpha(0.1);
        const map = this.make.tilemap({key: 'map'});
        const tilesetP1 = map.addTilesetImage('Tileaqua', 'tilaqua');
        const tilesetP2 = map.addTilesetImage('tilesol', 'tilelvl1');
        const tilesetP3 = map.addTilesetImage('tilesol2', 'tilelvl2');
        const tilesetP4 = map.addTilesetImage('tilesol3', 'tilelvl3');

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





        // Camera
        this.pointCamera = this.physics.add.sprite(0, 0);
        this.cameras.main.startFollow(this.pointCamera, true,1,1,0, 200);
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
        this.physics.add.collider(this.collide, this.foe.ennemy)



        // vie



        this.player.initKeyboard();

    }





    update()
    {
        this.pointCamera.body.x = this.player.player.body.x;
        this.pointCamera.body.y = this.player.player.body.y;
        console.log(this.player.player.body.velocity.y)
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