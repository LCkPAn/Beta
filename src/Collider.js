class Collider {


    constructor(scene,player) {
        this.scene = scene
        this.player = player


        const map = this.scene.make.tilemap({key: 'map'});



        this.collide = this.scene.physics.add.group({
            allowGravity: false,
            immovable: true,
        });
        map.getObjectLayer('Collide').objects.forEach((col) => {
            this.collideSprite = this.collide.create(col.x, col.y, col.height).setOrigin(0).setDisplaySize(col.width,col.height).visible=false;

        });
        this.scene.physics.add.collider(this.player.player, this.collide);





    }
}