class Brick{

    constructor(scene, player) {
        this.scene = scene
        this.player = player
        const map = this.scene.make.tilemap({key: 'map'});


        // Mur collant
        this.echelle = this.scene.physics.add.group({
            allowGravity: false,
            immovable: true,
        })
        map.getObjectLayer('test').objects.forEach((move) => {
            this.echelleSprite = this.echelle.create(move.x, move.y, move.height).setOrigin(0).setDisplaySize(move.width,move.height).visible=false;
            this.scene.physics.add.overlap(this.echelle, this.player.player, this.tuch.bind(this),null,this);
        })

        /*// Platform qui traverse
        this.travers = this.scene.physics.add.group({
            allowGravity: false,
            immovable: true,
        });
        map.getObjectLayer('Travers').objects.forEach((tra) => {
            this.traversSprite = this.travers.create(tra.x, tra.y, tra.height).setOrigin(0).setDisplaySize(tra.width,tra.height).visible=true;
            this.scene.physics.add.collider( this.travers, this.player.player, this.flou );
        });*/


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

    flou(travers, player)
    {
        let me = this
        if (me.player.player.body.velocity.y > 0)
        {
            me.scene.removeCollider = true;
        }
        else
        {
            me.scene.collideCollider = false;
        }

    }




}
