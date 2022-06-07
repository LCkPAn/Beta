const config = {
    type: Phaser.AUTO,
    parent: 'game',
    width: 1280,
    heigth: 720,
    scale: {
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 1000 },
            fps:144,
        },
    },
    scene: [new Start(), new scene(), new Credit() ]
};

const game = new Phaser.Game(config);