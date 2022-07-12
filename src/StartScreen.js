import Phaser from 'phaser'
import GameScreen from "./GameScreen";

export default class StartScreen extends Phaser.Scene {

    constructor() {
        super();
        this.btn;
        this.hero;
        this.status = 0;
    }

    preload() {
        this.load.spritesheet('flames', 'fire.png', {
            frameWidth: 64,
            frameHeight: 64,
            endFrame: 23
        });
        this.load.spritesheet('marvel', 'marvel.png', {frameWidth: 48, frameHeight: 48});
        this.load.image('start_1', 'start_1.png');
        this.load.image('start_2', 'start_2.png');
        //this.load.audio('danger_zone', 'start.mp3')
    }

    create() {
        //var music = this.sound.add('danger_zone');
        //music.play();

        this.anims.create({
            key: 'idle',
            frames: this.anims.generateFrameNumbers('marvel', {frames: [5, 6, 7, 8]}),
            frameRate: 8,
            repeat: -1
        });

        this.anims.create({
            key: 'kick',
            frames: this.anims.generateFrameNumbers('marvel', {frames: [10, 11, 12, 13, 10]}),
            frameRate: 8,
            repeat: -1,
            repeatDelay: 2000
        });

        this.anims.create({
            key: 'punch',
            frames: this.anims.generateFrameNumbers('marvel', {frames: [15, 16, 17, 18, 17, 15]}),
            frameRate: 8,
            repeat: -1,
            repeatDelay: 2000
        });


        this.anims.create({
            key: 'burn',
            frames: this.anims.generateFrameNumbers('flames', {start: 5, end:15, first: 5}),
            frameRate: 15,
            repeat: -1
        });
        var x = 1280/2
        var y = 768-190
        var fire = this.add.sprite(x, y, 'flames').play('burn');
        this.add.sprite(x-50, y, 'flames').play('burn');
        this.add.sprite(x-100, y, 'flames').play('burn');
        this.add.sprite(x+50, y, 'flames').play('burn');
        this.add.sprite(x+100, y, 'flames').play('burn');
        this.add.sprite(x-150, y, 'flames').play('burn');
        this.add.sprite(x+150, y, 'flames').play('burn');
        this.add.sprite(x+200, y+50, 'flames').play('burn');
        this.add.sprite(x-200, y+50, 'flames').play('burn');
        this.hero = this.add.sprite(1280/2, 200).play('idle');
        this.hero.setScale(8);
        this.hero.play('idle');

        var btn = this.add.sprite(1280/2, 768-100, 'start_1').setInteractive();
        this.btn = btn;
        this.btn.on('pointerover',this.btnHoverIn, this);
        this.btn.on('pointerout',this.btnHoverOut, this);
        this.btn.on('pointerup', this.startGame, this);
        this.btn.setScale(0.2)
    }

    startGame(){
        this.scene.start('gamescreen');
    }

    btnHoverIn(){
        this.btn.setTexture('start_2');
    }
    btnHoverOut(){
        this.btn.setTexture('start_1');
    }

    update(){
        this.status+=1;
        if (this.status >=100){
            this.status = 0;
            this.hero.play('kick');
            this.hero.play('punch');
        }else{
            this.hero.play('idle');
        }

    }
}