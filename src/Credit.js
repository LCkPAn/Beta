class Credit extends Phaser.Scene {
    constructor() {
        super('credits');
    }

    preload(){

        this.load.image('credit', 'assets/images/crédits.png');
        this.load.image('NextB', 'assets/images/UI/NextButt.png');

    }

    create() {

        const back = this.add.image(-80, 0, 'credit').setOrigin(0, 0);

        this.buttonNextSprite = this.add.image(25510, -3000, 'NextB')
            .setOrigin(0, 0)
            .setScale(1)
            .setAlpha(0.7)
            .setVisible(true);
        back.setScale(1.1)


        this.buttonNext = this.add.rectangle(this.buttonNextSprite.x, this.buttonNextSprite.y,350,150,0xffffff,0)
            .setOrigin(0,0)
            .setInteractive()
            .on(Phaser.Input.Events.GAMEOBJECT_POINTER_UP, ()=> {

            })
            .on('pointerover',function(){
                line1.setVisible(true);
            })
            .on('pointerout',function(){
                line1.setVisible(false);
            })

    }
}