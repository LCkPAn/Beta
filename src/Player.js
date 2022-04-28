class Player {


    constructor(scene) {
        this.scene = scene
        this.player = this.scene.physics.add.sprite(0, 650, 'player');
        this.player.setCollideWorldBounds(false);
        this.player.body.setSize(80, 130);
        this.scene.physics.add.collider(this.player, this.scene.platforms);
        this.player.boule = false;

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
                console.log('jump');
            }
        }

    }

    moveRight() {
        this.player.setVelocityX(400);
        this.player.setFlipX(false);
    }

    moveLeft() {
        this.player.setVelocityX(-400);
        this.player.setFlipX(true);
    }
    moveBack(){
        this.player.setVelocityY(400);
    }

    stop() {
        this.player.setVelocityX(0);
    }

    move(){
        if (this.zDown){
            this.jump();
            this.flag1=true;
        }
        switch (true) {
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
                if(!this.flag){

                }
                else{
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
            this.scene.cameras.main.startFollow(this.player, true,1,1,0, 20);
            this.scene.cameras.main.zoomTo(0.8);
            this.player.setCollideWorldBounds(false);
            this.player.body.position.y = this.player.body.position.y - 90;
            this.player.boule = true;

        }
        else
        {
            this.player.setTexture('player');
            this.player.visible=true;
            this.player.setBounce(0, 0);
            this.player.body.setSize(80, 130);
            this.scene.cameras.main.zoomTo(1);
            this.player.setCollideWorldBounds(false);
            this.scene.cameras.main.startFollow(this.player, true,1,1,0, 200);
            this.player.boule = !this.player.boule;
        }

    }

}





