import { GameScene } from './game-scene.model';

export class Ammunition {
   public static loadAssets(): void {
      GameScene.load.image('simple_arrow', 'assets/ammunition/arrow.png');
   }
}
