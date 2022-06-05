class Sauvegarde {

    constructor(scene, player) {
        this.scene = scene
        this.player = player

        this.currentSaveX = 0
        this.currentSaveY = 0
        this.currentPoints = 0;
        const map = this.scene.make.tilemap({key: 'map'});


        this.saves = this.scene.physics.add.group({
            allowGravity: false,
            immovable: true
        });
        map.getObjectLayer('Checkpointe').objects.forEach((save) => {
            const saveSprite = this.saves.create(save.x, save.y, 'save').setBodySize(save.width, save.height).setVisible(false);
            this.scene.physics.add.overlap(this.player.player, this.saves, this.resauvegarde, null, this)

        });

    }

    resauvegarde(player, saves)
    {
       this.currentSaveX = saves.x
       this.currentSaveY = saves.y
    }

    death()
    {
        this.player.player.x = this.currentSaveX
        this.player.player.y = this.currentSaveY;

        if(this.player.player.boule===true)
        {
            this.player.transform()
            this.player.player.setVelocity(0)
        }

    }
}