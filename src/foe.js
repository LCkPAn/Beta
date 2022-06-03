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
            allowGravity: true,
            immovable: true,
        });
        map.getObjectLayer('Enemy').objects.forEach((ennemy) => {
            const ennemySprite = this.ennemy.create(ennemy.x, ennemy.y, 'foer').setOrigin(0);
            this.ennemyPositionX.push(ennemy.x);
            this.ennemyPositionY.push(ennemy.y);
            this.Tuch();
        });
        for(var i = 0; i < this.ennemy.getChildren().length; i++) {
            this.ennemy.getChildren()[i].body.setSize(150,150);
            this.ennemy.getChildren()[i].body.setAllowGravity(false)
            this.ennemy.getChildren()[i].tween = this.scene.tweens.add({
                targets: this.ennemy.getChildren()[i],
                x:  this.ennemy.getChildren()[i].x,
                y:  this.ennemy.getChildren()[i].y,
                ease: 'linear',
                duration: 3000,
                flipX: true,
                yoyo: true,
                repeat: -1,

            });
        }

    }

    IaGesttion(){

        let me = this;
        for(var i = 0; i < this.ennemy.getChildren().length; i++) {
            this.dist = Phaser.Math.Distance.BetweenPoints(this.player.player, this.ennemy.getChildren()[i]);
            if (this.dist <= 300 && !this.ennemy.getChildren()[i].tuchEnnemy) {
                this.ennemy.getChildren()[i].flagTween=false;
                this.ennemy.getChildren()[i].tween.pause()
                this.scene.physics.moveTo(
                    me.ennemy.getChildren()[i],
                    me.player.player.body.x,
                    me.player.player.body.y,
                    210);

            } else {
                if(this.ennemy.getChildren()[i].flagTween){

                } else {
                    this.ennemy.getChildren()[i].tween.play()
                    this.ennemy.getChildren()[i].flagTween=true;

                }
            }
        }
    }

    Tuch(){
        this.scene.physics.add.overlap(this.player.player, this.ennemy, this.isTuching.bind(this))
    }

    isTuching(player, ennemy){
        if (player.boule){
            ennemy.tuchEnnemy = true;
            ennemy.anims.play('ennemyDeath')
            setTimeout(function(){
                ennemy.visible = false;

            },500);


        } else if (!ennemy.tuchEnnemy){
            this.scene.sauvegarde.death();
        }
    }

}