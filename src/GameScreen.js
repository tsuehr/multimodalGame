import Phaser from 'phaser'
import ObjectHandler from './ObjectHandler'

export default class GameScreen extends Phaser.Scene {

    constructor() {
        super();
        this.bullet1;
        this.bullet2;

        this.hero;

        this.speed1;
        this.speed2;
    }
 /**
    addTaxi(scene, x, y) {
        var group = scene.add.container();
        var timer = scene.add.text(x, y, '0', {color: 0x006400})
        timer.name = '0'
        let cab = scene.add.sprite(x, y, 'cab');
        cab.setInteractive();
        cab.on('clicked', scene.cabClickHandler, scene);
        cab.setScale(0.1);
        this.objectHandler.register(cab)
        group.add([timer, cab])
        return group
    }

    addPassenger(scene, x, y) {
        var group = scene.add.container();
        var timer = scene.add.text(x, y, '0', {color: 0x006400})
        timer.name = '0'
        let p = scene.add.sprite(x, y, 'passenger');
        p.setInteractive();
        p.on('clicked', scene.passengerClickHandler, scene);
        p.setScale(0.2);
        this.objectHandler.register(p)
        group.add([timer, p]);
        return group
    }
**/


    preload() {
        //images and other stuff has to get loaded in preload. else they will not be available when the browser
        //renders the game

        this.load.image('bullet', 'bullet-bill.png');
        this.load.image('cannon', 'cannon.png');
        this.load.image('ground', 'ground.png');
        this.load.image('marvel', 'marvel.png');

    }

    create() {

        //create is a bit like "onLoad()" in html/js it gets called once in the beginning.
        // here we create the background image
        //this.add.image(0, 200, 'ground').setOrigin(0);

        //this.bullet1 = this.add.image(64, 76, 'bullet').setOrigin(0);

        //this.speed1 = Phaser.Math.GetSpeed(600, 6);

        //this.add.image(64, 72, 'cannon').setOrigin(0);

        //this.add.text(64, 50, '600px / 6 secs', { fill: '#000' });

        //   Bullet 2 (600px in 3 seconds)

        this.add.image(0, 660, 'ground').setOrigin(0);
        this.add.image(500, 660, 'ground').setOrigin(0);
        this.bullet2 = this.add.image(64, 540, 'bullet').setOrigin(0);

        this.speed2 = Phaser.Math.GetSpeed(600, 2);

        this.hero = this.add.image(64,600,'marvel').setOrigin(0);

        //this.add.image(64, 660, 'cannon').setOrigin(0, 1);

        //this.add.text(64, 350, '600px / 3 secs', { fill: '#000' });
    }


    // time is the total run time of the app in ms and delta is the time since the last frame was rendered
    update(time, delta) {
        //rerender the line which appears when we selected a taxi
        /**
        this.bullet1.x += this.speed1 * delta;

        if (this.bullet1.x > 864)
        {
            this.bullet1.x = 64;
        }
         **/

        this.bullet2.x += this.speed2 * delta;

        if (this.bullet2.x > 1224)
        {
            this.bullet2.x = 64;
            if (Math.random() >=0.5){
                this.bullet2.y = 600;
            }else{
                this.bullet2.y = 540;
            }


        }
    }
}