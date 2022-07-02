import Phaser from 'phaser'
import GameScreen from "./GameScreen";
import StartScreen from "./StartScreen";

/**
 * Main game class, here we only create the game and add scenes to the game (something like start screen, game screen, end screen etc)
 * For now we can work with just one screen (TitleScreen)
 * @type {{plugins: {global: [{plugin: *, start: boolean, key: string}]}, width: number, type: *, height: number}}
 */

const config = {
    width: 1280, //resolution for the game window in the browser
    height: 768,
    type: Phaser.AUTO,
};

const game = new Phaser.Game(config);
game.scene.add('startscreen', StartScreen)
game.scene.start('startscreen')
game.scene.add('gamescreen', GameScreen)
// game.scene.start('gamescreen')