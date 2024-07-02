import { GameScene } from './game-scene.model';

export class Avatar {
   public static avatarGroup: Phaser.Physics.Arcade.StaticGroup;

   public static loadAssets(): void {
      GameScene.load.image('empty-bar', 'assets/icons/empty-2.svg');
      GameScene.load.image('hp-drained', 'assets/icons/hp-drained.svg');
      GameScene.load.image('hp-fill', 'assets/icons/hp-fill.svg');
      GameScene.load.image('exp-drained', 'assets/icons/exp-drained.svg');
      GameScene.load.image('exp-fill', 'assets/icons/exp-fill.svg');
   }

   public static initializeAvatar(): void {
      // Avatar.avatarGroup = GameScene.physics.add.staticGroup();
      // const widthBar = Math.round(window.innerWidth / 5.5);
      // const heightBar = Math.round(widthBar / 6.2);
      // const expWidthBar = Math.round(window.innerWidth / 10);
      // this.initProgressBar(50, heightBar, widthBar, heightBar, 'hp-drained', 'hp-fill', 'player-hp');
      // this.initProgressBar(50, heightBar * 2, expWidthBar, heightBar, 'exp-drained', 'exp-fill', 'player-exp');
   }

   private static initProgressBar(
      x: number,
      y: number,
      width: number,
      height: number,
      drainedBarTextureKey: string,
      fullBarTextureKey: string,
      barName: string
   ) {
      // const progressBarTexture = GameScene.add.image(x, y, 'empty-bar');
      // progressBarTexture.setOrigin(0, 0);
      // const drainedTexture = GameScene.add.image(height, y, drainedBarTextureKey);
      // const fullBarTexture = GameScene.add.image(height, y, fullBarTextureKey);
      // const maskHealthBar = progressBarTexture.createBitmapMask();
      // progressBarTexture.setDisplaySize(width, height);
      // drainedTexture.setOrigin(0, 0);
      // drainedTexture.setMask(maskHealthBar);
      // drainedTexture.setDisplaySize(width, height);
      // fullBarTexture.setOrigin(0, 0);
      // fullBarTexture.setMask(maskHealthBar);
      // fullBarTexture.setDisplaySize(width / 2, height);
      // progressBarTexture.setScrollFactor(0, 0);
      // drainedTexture.setScrollFactor(0, 0);
      // fullBarTexture.setScrollFactor(0, 0);
      // fullBarTexture.name = barName;
      // progressBarTexture.setDepth(2);
      // fullBarTexture.setDepth(1);
      // drainedTexture.setDepth(1);
      // Avatar.avatarGroup.add(fullBarTexture);
   }
}
