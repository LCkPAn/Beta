class Credit extends Phaser.Scene {
    constructor() {
        super('credits');
    }

    preload(){

        this.load.image('credit', 'assets/images/crédits.png');
        this.load.image('peluche', 'assets/images/doudou.png');

    }

    create() {

        const back = this.add.image(0, 0, 'credit').setOrigin(0, 0);

    }
}