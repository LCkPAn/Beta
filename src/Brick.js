class Brick{

    constructor(scene, Player) {
        this.scene = scene
        this.player = Player
        const map = this.scene.make.tilemap({key: 'map'});



        this.echelle = this.scene.physics.add.group({
            allowGravity: false,
            immovable: true,
        })
        map.getObjectLayer('test').objects.forEach((move) => {
            this.echelleSprite = this.echelle.create(move.x, move.y, move.height).setOrigin(0).setDisplaySize(move.width,move.height).visible=false;
            this.scene.physics.add.overlap(this.echelle, this.player.player, this.tuch.bind(this),null,this);
        })

    }

    tuch(echelle, player) {
        let me = this;

        if (me.player.player.boule) {
            me.collant = true;
        }
    }

    wallcollant() {

        let me = this;
        if(me.collant) {
            me.collant = false;

                if (me.player.zDown) {
                    me.player.player.setVelocityY(-400);
                    me.player.player.body.setAllowGravity(false);
                } else if (me.player.dDown) {
                    me.player.player.setVelocityY(-17);
                    me.player.player.setVelocityX(400);
                    me.player.player.body.setAllowGravity(false);
                } else if (me.player.qDown) {
                    me.player.player.setVelocityY(-17);
                    me.player.player.setVelocityX(-400);
                    me.player.player.body.setAllowGravity(false);
                } else if (me.player.sDown) {
                    me.player.player.setVelocityY(400);
                    me.player.player.body.setAllowGravity(false);
                } else {
                    me.player.player.setVelocityY(0);
                    me.player.player.setVelocityX(0);
                    me.player.player.body.setAllowGravity(false);

                }

        }

        else {
            if (me.scene.player.spaceDown || me.scene.player.zDown || me.scene.player.dDown || me.scene.player.qDown) {
                me.player.player.body.setAllowGravity(true);
            }
        }

    }





}
