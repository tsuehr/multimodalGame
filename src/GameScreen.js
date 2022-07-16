import Phaser from 'phaser'
import ObjectHandler from './ObjectHandler'
import annyang from 'annyang'

export default class GameScreen extends Phaser.Scene {

    constructor() {
        super();
        this.bullet1;
        this.bullet2;
        this.hero;
        this.speed1;
        this.ground;
        this.speed2;
        this.power;
        this.hitpoints = 100;
        this.hitpointsText;
        this.annyang = annyang;
        this.said_jump = false;
        this.chargeText;
        this.buttonLeft = false;
        this.buttonRight = false;
        this.bulletsPaused = false;
        this.bulletsPausedText;
        this.bulletsDodged = 0;
        this.bulletsDodgedCounter = 0;

    }

    preload() {
        //images and other stuff has to get loaded in preload. else they will not be available when the browser
        //renders the game

        this.load.image('bullet', 'bullet-bill.png');
        this.load.image('cannon', 'cannon.png');
        this.load.image('ground', 'ground.png');
        this.load.spritesheet('marvel', 'marvel.png', {frameWidth: 48, frameHeight: 48});
    }

    reduceHitpoints (hero, bullet) {
        //bullet.disableBody(true, true);

        this.hitpoints -=1;
        if (this.hitpoints <=0){
            //hero.play('die');
            //this.bullet1.disableBody(true,true);
            //this.bullet2.disableBody(true,true);
            //this.scene.start('startscreen');
        }

    }

    //jump(){
    //    this.hero.setVelocityY(-300);
    //}

    startJump() {
        this.hero.play('jump');
        this.said_jump=true;
        this.chargeText.setText('DOUBLEJUMP ACTIVE! PRESS SPACE NOW!');
    }

    blockLeft() {
        this.buttonLeft = true;
    }

    blockRight() {
        this.buttonRight = true;
    }

    releaseLeft() {
        this.buttonLeft = false;
    }

    pause(){
        if(this.bulletsPaused){
            this.bulletsPaused = false;
            this.bulletsPausedText.setText('');
        }else{
            this.bulletsPaused = true;
            this.bulletsPausedText.setText('Bullets Paused');
        }

    }

    resume(){

    }

    releaseRight() {
        this.buttonRight = false;
    }

    endJump() {
        //this.timer.remove();
        //this.hero.setVelocityY(-this.power * 100);
        //this.power = 0;
        if (this.said_jump){
            this.hero.setVelocityY(-400);
            this.said_jump=false;
            this.chargeText.setText('');
        }else{
            this.hero.setVelocityY(-200);
        }

        this.hero.play('idle');
    }

    startWalkLeft() {
        //this.timer.remove();
        this.hero.flipX = false;
        this.hero.setVelocity(-100, 0);
        //this.power = 0;
        this.hero.play('walk');
    }

    endWalkLeft() {
        this.hero.setVelocity(0, 0);
        this.hero.play('idle');
    }

    startWalkRight() {
        //this.timer.remove();
        this.hero.flipX = true;
        this.hero.setVelocity(100, 0);
        //this.power = 0;
        this.hero.play('walk');
    }

    endWalkRight() {
        this.hero.setVelocity(0, 0);
        this.hero.play('idle');
    }

    create() {

        this.hitpointsText = this.add.text(10, 10, 'Hitpoints: '+this.hitpoints, { font: '16px Courier', fill: '#00ff00' });
        this.chargeText = this.add.text(10, 100, '', { font: '20px Courier', fill: '#00ff00' });
        this.bulletsPausedText = this.add.text(550,100, '', { font: '20px Courier', fill: '#00ff00' });
        this.bulletsDodgedText = this.add.text(1000,10, 'Bullets Dodged: '+this.bulletsDodgedCounter, { font: '16px Courier', fill: '#00ff00' });
        // Animation set
        this.anims.create({
            key: 'walk',
            frames: this.anims.generateFrameNumbers('marvel', {frames: [0, 1, 2, 3]}),
            frameRate: 8,
            repeat: -1
        });

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
            key: 'jump',
            frames: this.anims.generateFrameNumbers('marvel', {frames: [20, 21, 22, 23]}),
            frameRate: 8,
            repeat: -1
        });

        this.anims.create({
            key: 'jumpkick',
            frames: this.anims.generateFrameNumbers('marvel', {frames: [20, 21, 22, 23, 25, 23, 22, 21]}),
            frameRate: 8,
            repeat: -1
        });

        this.anims.create({
            key: 'win',
            frames: this.anims.generateFrameNumbers('marvel', {frames: [30, 31]}),
            frameRate: 8,
            repeat: -1,
            repeatDelay: 2000
        });

        this.anims.create({
            key: 'die',
            frames: this.anims.generateFrameNumbers('marvel', {frames: [35, 36, 37]}),
            frameRate: 8,
        });

        this.bullet2 = this.physics.add.image(64, 540, 'bullet').setOrigin(0);
        this.bullet1 = this.physics.add.image(500, 340, 'bullet').setOrigin(0);
        this.speed2 = Phaser.Math.GetSpeed(600, 2);
        let hero = this.physics.add.sprite(this.sys.game.config.width / 2, 0, "marvel");
        this.hero = hero;

        //set the gravity
        this.hero.setGravityY(300);
        //place the ground
        let groundX = this.sys.game.config.width / 2;
        let groundY = 660;
        this.ground = this.physics.add.sprite(groundX, groundY, "ground");
        //size the ground
        this.ground.displayWidth = this.sys.game.config.width * 1.1;
        //make the ground stay in place
        this.ground.setImmovable();
        this.bullet2.setImmovable();
        this.bullet1.setImmovable();
        //add the colliders

        //this.input.keyboard.on('keydown-SPACE', this.startJump, this);
        this.input.keyboard.on('keyup-SPACE', this.endJump, this);

        this.input.keyboard.on('keydown-A', this.startWalkLeft, this);
        this.input.keyboard.on('keydown-A', this.blockLeft, this);
        this.input.keyboard.on('keyup-A', this.endWalkLeft, this);
        this.input.keyboard.on('keyup-A', this.releaseLeft, this);

        this.input.keyboard.on('keydown-D', this.startWalkRight, this);
        this.input.keyboard.on('keyup-D', this.endWalkRight, this);
        this.input.keyboard.on('keydown-D', this.blockRight, this);
        this.input.keyboard.on('keyup-D', this.releaseRight, this);

        this.input.keyboard.on('keydown-P', this.pause, this);

        //this.hero.body.onCollide = new Phaser.Signal();
        //this.hero.body.bounce.set(1);
        //this.bullet2.body.bounce.set(1);

        this.hero.play('idle');
        this.hero.setScale(3);

        this.hero.setCollideWorldBounds(true);
        this.physics.add.collider(this.hero, this.ground);
        //this.physics.add.collider(this.hero, this.bullet2);
        //this.physics.add.collider(this.hero, this.bullet1);
        this.physics.add.overlap(this.hero,this.bullet2, this.reduceHitpoints, null, this);
        this.physics.add.overlap(this.hero,this.bullet1, this.reduceHitpoints, null, this);

        if (this.annyang) {
            // Let's define a command.
            console.log('ANNYANG IS!')
            const commands = {
                'jump': () => { this.startJump(); },

                'Trump': () => { this.startJump();},

                'ramp': () => {this.startJump();},

                'slump': () => {this.startJump();},
                'go': () => {this.startJump();},
                'go go': () => {this.startJump();},
                'go go go': () => {this.startJump();},
                'jo': () => {this.startJump();},
                'toe': () => {this.startJump();},
                'oh': () => {this.startJump();},
                'tramp': () => {this.startJump();},
                'turn down for what': () => {this.hero.play('jumpkick');},
                'go left': () =>{if(!this.buttonRight){this.startWalkLeft();}},
                'go right': () =>{if(!this.buttonLeft){this.startWalkRight();}},
                'stop going right': () =>{this.endWalkRight();},
                'stop going left': () =>{this.endWalkLeft();},
                'make a super jump for me': () => {this.startJump();
                this.endJump();},
                'make a jump for me': () => {this.endJump();},

            };

            // Add our commands to annyang
            this.annyang.addCommands(commands);
            this.annyang.addCallback('result', function (userSaid, commandTest, phrases) {
                console.log(userSaid); // sample output: 'hello'
            });
            // Start listening.
            this.annyang.start({ autoRestart: true, continuous: true });
        }else{
            console.log("ANNYANG IS NOT")
        }
    }


    update(time, delta) {

        this.hitpointsText.setText('Hitpoints: '+this.hitpoints);

        this.bullet2.x += (this.speed2) * delta;

        if (this.bullet2.x > 1224 && !this.bulletsPaused) {
            this.bulletsDodgedCounter +=1;
            this.bulletsDodgedText.setText('Bullets Dodged: '+this.bulletsDodgedCounter);
            this.bullet2.x = 64;
            if (Math.random()<0.5){
                //let pos = Math.random() * 300;
                this.bullet2.y = 540;
            }else{
                this.bullet2.y = Math.random() * 230;
            }

            //if (Math.random() >= 0.5) {
                //this.bullet2.y = 340;
            //} else {
              //  this.bullet2.y = 540;
            //}
        }

        this.bullet1.x += this.speed2 * delta;

        if (this.bullet1.x > 1224 && !this.bulletsPaused) {
            this.bulletsDodgedCounter +=1;
            this.bulletsDodgedText.setText('Bullets Dodged: '+this.bulletsDodgedCounter);
            this.bullet1.x = 64;
            if (Math.random()<0.5){
                //let pos = Math.random() * 300;
                this.bullet1.y = 480;
            }else{
                this.bullet1.y = Math.random() * 130;
            }

        }

    }
}