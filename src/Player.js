class Player {


    constructor(scene) {
        this.scene = scene
        this.player = this.scene.physics.add.sprite(10300, -550,'player');
        this.player.body.setSize(138, 173);
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
        frameRate: 7,
        repeat: 0,
    });
    this.scene.anims.create({
        key: 'rebond',
        frames: this.scene.anims.generateFrameNumbers('bonce', {
            start: 2,
            end: 9,
        }),
        frameRate: 12,
        repeat: 0,
    });
    this.scene.anims.create({
        key: 'playermort',
        frames: this.scene.anims.generateFrameNumbers('mort', {
            start: 0,
            end: 6,
        }),
        frameRate: 12,
        repeat: 0,
    });
    this.scene.anims.create({
        key: 'playertransfo',
        frames: this.scene.anims.generateFrameNumbers('transfo', {
            start: 0,
            end: 6,
        }),
        frameRate: 14,
        repeat: 0,
    });
    this.scene.anims.create({
        key: 'reversetransfo',
        frames: this.scene.anims.generateFrameNumbers('versere', {
            start: 0,
            end: 6,
        }),
        frameRate: 12,
        repeat: 0,
    });
    this.scene.anims.create({
        key: 'iddleplayer',
        frames: this.scene.anims.generateFrameNumbers('iddleplay', {
            start: 0,
            end: 4,
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
            if (this.player.body.onFloor()){
                this.player.setVelocityY(-500);
                this.player.play('jumpplayer', true)
                this.player.body.setSize(138, 173);
                console.log('jump');
            }
        }

    }

    moveRight()
    {
        this.player.setVelocityX(400);
        this.player.setFlipX(false);
        if(!this.player.boule)
        {
            this.player.play('walkplayer', true)
            this.player.body.setSize(138, 173);
        }
    }

    moveLeft()
    {
        this.player.setVelocityX(-400);
        this.player.setFlipX(true);
        if(!this.player.boule)
        {
            this.player.play('walkplayer', true)
            this.player.body.setSize(138, 173);
        }
    }
    moveBack()
    {
        this.player.setVelocityY(400);
    }

    stop()
    {
        this.player.setVelocityX(0);
        //this.player.play('iddleplayer', true)
    }

    move()
    {
        if(this.player.body.onFloor() && this.player.boule)
        {
            this.player.play('rebond')
            this.player.boule = true;
        }
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
            this.player.play('playertransfo')
            this.player.setTexture('ball')
            this.player.setBounce(1.4, 2);
            this.player.body.setSize(138, 173);
            this.player.body.setMaxVelocityY(860);
            this.player.body.setMaxVelocityX(600);
            this.player.body.position.y = this.player.body.position.y - 50;
            this.player.boule = true;

        }
        else
        {
            this.player.play('reversetransfo')
            this.player.setTexture('player');
            this.player.visible=true;
            this.player.setBounce(0, 0);
            this.player.body.setSize(138, 173);
            this.player.boule = !this.player.boule;
        }

    }

}





