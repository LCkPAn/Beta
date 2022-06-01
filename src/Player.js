class Player {


    constructor(scene) {
        this.scene = scene
        /**
         *
         * @type {Phaser.Types.Physics.Arcade.SpriteWithDynamicBody}
         */
        this.player = this.scene.physics.add.sprite(3150,250,'player');
        this.player.body.setSize(87, 130);
        this.player.boule = false;
        this.animation();


    }

animation()
{
    this.scene.anims.create({
        key: 'walkplayer',
        frames: this.scene.anims.generateFrameNumbers('walk', {
            start: 0,
            end: 7,
}),
frameRate: 12,
    repeat: 0,
});

    this.scene.anims.create({
        key: 'jumpplayer',
        frames: this.scene.anims.generateFrameNumbers('jump', {
            start: 0,
            end: 6,
        }),
        frameRate: 12,
        repeat: 0,
    });

}


    initKeyboard() {
        let me = this;
        this.scene.input.keyboard.on('keydown', function (kevent) {
            switch (kevent.keyCode) {
                case Phaser.Input.Keyboard.KeyCodes.Z:
                    me.zDown=true;
                    break;
                case Phaser.Input.Keyboard.KeyCodes.Q:
                    me.qDown=true;
                    break;
                case Phaser.Input.Keyboard.KeyCodes.D:
                    me.dDown=true;
                    break;
                case Phaser.Input.Keyboard.KeyCodes.S:
                    me.sDown=true;
                    break;
                case Phaser.Input.Keyboard.KeyCodes.SPACE:
                    me.spaceDown=true;
                    break;
            }
        });
        this.scene.input.keyboard.on('keyup', function (kevent) {
            switch (kevent.keyCode) {
                case Phaser.Input.Keyboard.KeyCodes.Z:
                    me.zDown=false;
                    break;
                case Phaser.Input.Keyboard.KeyCodes.Q:
                    me.qDown=false;
                    break;
                case Phaser.Input.Keyboard.KeyCodes.D:
                    me.dDown=false;
                    break;
                case Phaser.Input.Keyboard.KeyCodes.S:
                    me.sDown=false;
                    break;
                case Phaser.Input.Keyboard.KeyCodes.SPACE:
                    me.spaceDown=false;
                    break;
            }
        });
    }


    jump() {
        if (!this.flag1) {

        }
        else {
            this.flag1=false
            if (this.player.body.onFloor()){
                this.player.setVelocityY(-500);
                this.player.play('jumpplayer', true)
                console.log('jump');
            }
        }

    }

    moveRight()
    {
        this.player.setVelocityX(400);
        this.player.setFlipX(false);
        this.player.play('walkplayer', true)
    }

    moveLeft()
    {
        this.player.setVelocityX(-400);
        this.player.setFlipX(true);
        this.player.play('walkplayer', true)
    }
    moveBack()
    {
        this.player.setVelocityY(400);
    }

    stop()
    {
        this.player.setVelocityX(0);
    }

    move()
    {
        if (this.zDown)
        {
            this.jump();
            this.flag1=true;
        }
        switch (true)
        {
            case this.qDown:
                this.moveLeft()
                break;
            case this.dDown:
                this.moveRight()
                break;
            case this.sDown:
                this.moveBack()
                break;
            case this.spaceDown:
                if(!this.flag){}
                else
                {
                    this.transform()
                    this.flag=false
                }
                break;
            case this.player.body.onFloor():
                this.stop();
                break;
        }

        if(!this.spaceDown)
        {
            this.flag=true
        }
    }



    transform() {
        if (!this.player.boule)
        {

            this.player.visible=false;
            this.player.setBounce(1.4, 2);
            this.player.body.setSize(150,150);
            this.player.body.setMaxVelocityY(860);
            this.player.body.setMaxVelocityX(600);
            this.player.body.position.y = this.player.body.position.y - 30;
            this.player.boule = true;

        }
        else
        {
            this.player.setTexture('player');
            this.player.visible=true;
            this.player.setBounce(0, 0);
            this.player.body.setSize(80, 130);
            this.player.boule = !this.player.boule;
        }

    }

}





