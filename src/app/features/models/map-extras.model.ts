import { GameScene } from './game-scene.model';

export class MapExtras {
   public static tiles: Phaser.Physics.Arcade.StaticGroup;
   public static grass: Phaser.Physics.Arcade.StaticGroup;
   public static mapSize = 4000;

   public static loadMapExtras(): void {
      GameScene.load.image('ground-1', 'assets/map_1_village/extras/tiles/1.png');
      GameScene.load.image('ground-2', 'assets/map_1_village/extras/tiles/2.png');
      GameScene.load.image('ground-3', 'assets/map_1_village/extras/tiles/3.png');
      GameScene.load.image('ground-4', 'assets/map_1_village/extras/tiles/4.png');
      GameScene.load.image('ground-5', 'assets/map_1_village/extras/tiles/5.png');

      GameScene.load.image('grass-empty', 'assets/empty.png');
      GameScene.load.image('grass-1', 'assets/map_1_village/extras/objects/grass/1.png');
      GameScene.load.image('grass-2', 'assets/map_1_village/extras/objects/grass/2.png');
      GameScene.load.image('grass-3', 'assets/map_1_village/extras/objects/grass/3.png');
      GameScene.load.image('grass-4', 'assets/map_1_village/extras/objects/grass/4.png');
      GameScene.load.image('grass-5', 'assets/map_1_village/extras/objects/grass/5.png');
      GameScene.load.image('grass-6', 'assets/map_1_village/extras/objects/grass/6.png');
      GameScene.load.image('grass-7', 'assets/map_1_village/extras/objects/grass/7.png');
      GameScene.load.image('grass-8', 'assets/map_1_village/extras/objects/grass/8.png');
      GameScene.load.image('grass-9', 'assets/map_1_village/extras/objects/grass/9.png');
      GameScene.load.image('grass-10', 'assets/map_1_village/extras/objects/grass/10.png');
   }

   public static initializeTiles(): void {
      const terrainPieces = 200;
      const terrainWidth = 32;
      const terrainHeight = 32;
      const positionY = window.innerHeight - terrainHeight / 2.1;
      let groundIndex = 0;

      for (let i = 0; i < terrainPieces; i++) {
         groundIndex = Math.floor(Math.random() * 5) + 1;
         MapExtras.tiles.create(0 + terrainWidth / 2 + i * terrainWidth, positionY, 'ground-' + groundIndex);
      }
   }

   public static initializeGrass(grassChance: number = 60): void {
      const grassPieces = 500;
      const grassScale = 2;
      const grassHeight = 20 * grassScale;
      const terrainHeight = 32;
      const positionY = window.innerHeight - terrainHeight - grassHeight / 3;

      for (let i = 0; i <= grassPieces; i++) {
         const grassNumber = Math.round(Math.random() * 10) || 1;
         const chance = Math.random() * 100;
         const positionX = Math.random() * this.mapSize;

         const x = MapExtras.grass.create(positionX, positionY, chance <= grassChance ? 'grass-' + grassNumber : 'grass-empty');
         x.setScale(grassScale);
         x.texture.setFilter(Phaser.Textures.FilterMode.NEAREST);
      }
   }

   public static initializeMapExtras(): void {
      MapExtras.tiles = GameScene.physics.add.staticGroup();
      MapExtras.grass = GameScene.physics.add.staticGroup();
   }
}
