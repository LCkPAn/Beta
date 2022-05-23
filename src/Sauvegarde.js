class Sauvegarde {

    constructor(scene, player) {
        this.scene = scene
        this.player = player

        this.currentSaveX = 0
        this.currentSaveY = 0
        this.currentPoints = 0;
        const map = this.scene.make.tilemap({key: 'map'});



       /* this.scene.anims.create(
            {
                key: 'checkpointFirst',
                frames: this.scene.anims.generateFrameNumbers('checkpoint', { start: 0, end: 2 }),
                frameRate: 10,
                repeat: 0
            });

        this.scene.anims.create(
            {
                key: 'checkpoint',
                frames: this.scene.anims.generateFrameNumbers('checkpoint', { start: 3, end: 10 }),
                frameRate: 10,
                repeat: -1
            });*/

        this.saves = this.scene.physics.add.group({
            allowGravity: false,
            immovable: true
        });
        map.getObjectLayer('Checkpointe').objects.forEach((save) => {
            const saveSprite = this.saves.create(save.x, save.y, 'save').setScale(0.5);
            this.scene.physics.add.overlap(this.player.player, this.saves, this.resauvegarde, null, this)

        });

    }

    resauvegarde(player, saves)
    {
       this.currentSaveX = player.x
       this.currentSaveY = player.y
        console.log("coucou")
    }

    death()
    {
        this.player.player.x = this.currentSaveX
        this.player.player.y = this.currentSaveY;
        this.player.player.setVelocity(0,0);
        this.player.player.setTexture('player');
        this.player.player.visible=true;
        this.player.player.setBounce(0, 0);
        this.player.player.body.setSize(80, 130);
        console.log("kfrgjhdhgds")

    }
}