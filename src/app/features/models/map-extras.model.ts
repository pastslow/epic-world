import { GameScene } from './game-scene.model';

export class MapExtras {
   public static tiles: Phaser.Physics.Arcade.StaticGroup;
   public static grass: Phaser.Physics.Arcade.StaticGroup;
   public static mapSize = 4000;

   public static loadMapExtras(): void {
      GameScene.load.image('ground-1', 'assets/Maps/Swamp/Tilies/Tile_1.png');
      GameScene.load.image('ground-2', 'assets/Maps/Swamp/Tilies/Tile_2.png');
      GameScene.load.image('ground-3', 'assets/Maps/Swamp/Tilies/Tile_3.png');
      GameScene.load.image('ground-4', 'assets/Maps/Swamp/Tilies/Tile_4.png');
      GameScene.load.image('ground-5', 'assets/Maps/Swamp/Tilies/Tile_5.png');

      GameScene.load.image('grass-empty', 'assets/Maps/empty.png');
      GameScene.load.image('grass-1', 'assets/Maps/Swamp/Objects/Grass/1.png');
      GameScene.load.image('grass-2', 'assets/Maps/Swamp/Objects/Grass/2.png');
      GameScene.load.image('grass-3', 'assets/Maps/Swamp/Objects/Grass/3.png');
      GameScene.load.image('grass-4', 'assets/Maps/Swamp/Objects/Grass/4.png');
      GameScene.load.image('grass-5', 'assets/Maps/Swamp/Objects/Grass/5.png');
      GameScene.load.image('grass-6', 'assets/Maps/Swamp/Objects/Grass/6.png');
      GameScene.load.image('grass-7', 'assets/Maps/Swamp/Objects/Grass/7.png');
      GameScene.load.image('grass-8', 'assets/Maps/Swamp/Objects/Grass/8.png');
      GameScene.load.image('grass-9', 'assets/Maps/Swamp/Objects/Grass/9.png');
      GameScene.load.image('grass-10', 'assets/Maps/Swamp/Objects/Grass/10.png');
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
      const grassHeight = 15;
      const terrainHeight = 32;
      const positionY = window.innerHeight - terrainHeight - grassHeight / 3;

      for (let i = 0; i <= grassPieces; i++) {
         const grassNumber = Math.round(Math.random() * 10) || 1;
         const chance = Math.random() * 100;
         const positionX = Math.random() * this.mapSize;

         MapExtras.grass.create(positionX, positionY, chance <= grassChance ? 'grass-' + grassNumber : 'grass-empty');
      }
   }

   public static initializeMapExtras(): void {
      MapExtras.tiles = GameScene.physics.add.staticGroup();
      MapExtras.grass = GameScene.physics.add.staticGroup();
   }
}
