import { GameScene } from './game-scene.model';
import { MapExtras } from './map-extras.model';

export class Parallax {
   public static settings = {
      backgroundColor: null,
      backgroundTrees: null,
      backgroundFog: null,
      backgroundWater: null,
      backgroundTerrain: null,
   };
   static readonly movementFactors = {
      running: { trees: 0.1, fog: 0.14, water: 0.2, terrain: 0.4 },
      walking: { trees: 0.05, fog: 0.07, water: 0.1, terrain: 0.2 },
   };

   public static initializeParallaxBackgrounds(): void {
      const backgroundInitialWidthSize = 576;
      const backgroundInitialHeightSize = 324;

      const backgroundScaleX = window.innerWidth >= backgroundInitialWidthSize ? window.innerWidth / backgroundInitialWidthSize : 1;
      const backgroundScaleY = window.innerHeight >= backgroundInitialHeightSize ? window.innerHeight / backgroundInitialHeightSize : 0.9;

      Object.keys(Parallax.settings).forEach((layerName: string, index: number) => {
         const layerImageSource = 'layer-' + (index + 1);

         Parallax.settings[layerName] = GameScene.add.tileSprite(0, 0, MapExtras.mapSize, window.innerHeight, layerImageSource);

         Parallax.settings[layerName].setScale(backgroundScaleX, backgroundScaleY);

         Parallax.settings[layerName].setOrigin(0, 0);
      });
   }

   public static listenToParallaxMovement(isPlayerRunning: boolean, orientation: string, playerPositionX: number): void {
      const minEdge = window.innerWidth / 2;
      const maxEdge = 4000 - minEdge;

      if (playerPositionX < minEdge || playerPositionX > maxEdge) {
         return;
      }

      const movementFactor = isPlayerRunning ? Parallax.movementFactors.running : Parallax.movementFactors.walking;

      const { backgroundFog, backgroundTerrain, backgroundTrees, backgroundWater } = Parallax.settings;

      const increment = (value: number, factor: number): number => (orientation === 'left' ? value - factor : value + factor);

      backgroundFog.tilePositionX = increment(backgroundFog.tilePositionX, movementFactor.trees);
      backgroundTerrain.tilePositionX = increment(backgroundTerrain.tilePositionX, movementFactor.fog);
      backgroundTrees.tilePositionX = increment(backgroundTrees.tilePositionX, movementFactor.water);
      backgroundWater.tilePositionX = increment(backgroundWater.tilePositionX, movementFactor.terrain);
   }

   public static loadParallaxBackgrounds(): void {
      GameScene.load.image('layer-1', 'assets/map_1_village/extras/background/layers/1.png');
      GameScene.load.image('layer-2', 'assets/map_1_village/extras/background/layers/2.png');
      GameScene.load.image('layer-3', 'assets/map_1_village/extras/background/layers/3.png');
      GameScene.load.image('layer-4', 'assets/map_1_village/extras/background/layers/4.png');
      GameScene.load.image('layer-5', 'assets/map_1_village/extras/background/layers/5.png');
   }
}
