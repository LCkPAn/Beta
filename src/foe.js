class foe{
    constructor(scene, player, save) {
        let me = this;
        this.scene = scene
        this.player = player
        this.sauvegarde = save

        const map = this.scene.make.tilemap({key: 'map'});

        this.ennemyPositionX = []
        this.ennemyPositionY = []


        this.ennemy = this.scene.physics.add.group({
            allowGravity: false,
            immovable: true
        });
        map.getObjectLayer('Enemy').objects.forEach((ennemy) => {
            const ennemySprite = this.ennemy.create(ennemy.x, ennemy.y, 'ennemy').setOrigin(0).setBodySize(30,30).setDepth(3);
            this.ennemyPositionX.push(ennemy.x);
            this.ennemyPositionY.push(ennemy.y);

            this.Tuch();
        });
        for(var i = 0; i < this.ennemy.getChildren().length; i++) {
            //this.ennemy.getChildren()[i].anims.play('ennemyIdle');
            this.ennemy.getChildren()[i].body.setSize(150,150);
            this.ennemy.getChildren()[i].flagExclamation = true;
        }

    }

    IaGesttion(){


        let me = this;


        for(var i = 0; i < this.ennemy.getChildren().length; i++) {
            let tween = this.scene.tweens.add({
                targets: this.ennemy.getChildren()[i],
                x: 944,
                ease: 'linear',
                duration: 3000,
                flipX: true,
                yoyo: true,
                repeat: -1,

            });
            tween.play()

            this.dist = Phaser.Math.Distance.BetweenPoints(this.player.player, this.ennemy.getChildren()[i]);

            if (this.dist <= 500 && !this.ennemy.getChildren()[i].tuchEnnemy) {
                tween.pause()
                if (this.ennemy.getChildren()[i].flagExclamation){
                    this.exclamation = this.scene.add.sprite(this.ennemy.getChildren()[i].x + 40, this.ennemy.getChildren()[i].y, 'exclamation')
                        .setScale(0.5)
                    this.ennemy.getChildren()[i].flagExclamation = false;
                    setTimeout(function(){
                        me.exclamation.destroy();
                    },1000)
                }
                this.exclamation.x = this.ennemy.getChildren()[i].x +40
                this.exclamation.y = this.ennemy.getChildren()[i].y -10
                this.scene.physics.moveTo(
                    me.ennemy.getChildren()[i],
                    me.player.player.body.x,
                    me.player.player.body.y,
                    210);

            } else {
                console.log("twen")
                this.ennemy.getChildren()[i].setVelocity(0);
                tween.resume()



            }
        }
        this.tuchEnnemyDeath = false;
    }

    Tuch(){
        this.scene.physics.add.overlap(this.player.player, this.ennemy, this.isTuching.bind(this))
    }

    /*isTuching(player, ennemy){
        if (this.player.isDashing){
            ennemy.tuchEnnemy = true;
            ennemy.anims.play('ennemyDeath')
            setTimeout(function(){
                ennemy.visible = false;


            },500);

        } else if (!ennemy.tuchEnnemy){
            this.scene.sauvegarde.death();
        }
    }*/

}