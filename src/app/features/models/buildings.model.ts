import { GameScene } from "./game-scene.model";
import { MapExtras } from "./map-extras.model";

export class Buildings {
  public static tower: Phaser.Types.Physics.Arcade.ImageWithDynamicBody;
  public static buildingsGroup: Phaser.Physics.Arcade.Group; // Variable to hold the group of buildings

  public static loadBuildings(): void {
    GameScene.load.image("tower", "assets/Castle/Tower/0.png");
  }

  public static initializeBuildings(): void {
    const posX = 190 / 2 + 32;

    Buildings.buildingsGroup = GameScene.physics.add.group();

    Buildings.tower = GameScene.physics.add.image(
      80,
      window.innerHeight - posX,
      "tower"
    );

    Buildings.tower.setBounce(0.2);
    Buildings.tower.setCollideWorldBounds(true);
    Buildings.tower.setImmovable(true);
    Buildings.tower.setName("tower");
    GameScene.physics.add.collider(Buildings.tower, MapExtras.tiles);

    Buildings.buildingsGroup.add(Buildings.tower);
  }
}
