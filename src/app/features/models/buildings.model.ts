import { BuildingsState } from '../state-models/buildings-state.model';
// import { Game } from './game';
import { MapExtras } from './map-extras.model';

export class Buildings {
  public static tower: Phaser.Types.Physics.Arcade.ImageWithDynamicBody;
  public static secondTower: Phaser.Types.Physics.Arcade.ImageWithDynamicBody;
  public static buildingsGroup: Phaser.Physics.Arcade.Group; // Variable to hold the group of buildings

  public static loadBuildings(this: Phaser.Scene): void {
    this.load.image('tower', 'assets/Castle/Tower_2.png');
  }

  public static initializeBuildings(this: Phaser.Scene): void {
    // Buildings.buildingsGroup = this.physics.add.group();

    // BuildingsState.buildings.forEach((building, index) => {
    //   // debugger;
    //   const posX = building.physicalAttributes.height / 2 + 32;

    //   building['physics'] = this.physics.add.image(
    //     building.physicalAttributes.initialPosition,
    //     Game.config.height - posX,
    //     'tower'
    //   );

    //   building['physics'].displayWidth = 230;
    //   building['physics'].displayHeight = 190;
    //   building['physics'].setBounce(0.2);
    //   building['physics'].setCollideWorldBounds(true);
    //   building['physics'].setImmovable(true);
    //   building['physics'].setName(building.name);
    //   this.physics.add.collider(building['physics'], MapExtras.tiles);
    //   Buildings.buildingsGroup.add(building['physics']);
    // });

    const posX = 190 / 2 + 32;

    Buildings.buildingsGroup = this.physics.add.group();

    Buildings.tower = this.physics.add.image(
      1000,
      window.innerHeight - posX,
      'tower'
    );

    Buildings.tower.displayWidth = 230;
    Buildings.tower.displayHeight = 190;

    Buildings.tower.setBounce(0.2);
    Buildings.tower.setCollideWorldBounds(true);
    Buildings.tower.setImmovable(true);
    Buildings.tower.setName('tower');
    this.physics.add.collider(Buildings.tower, MapExtras.tiles);

    Buildings.secondTower = this.physics.add.image(
      1500,
      window.innerHeight - posX,
      'tower'
    );

    Buildings.secondTower.displayWidth = 230;
    Buildings.secondTower.displayHeight = 190;

    Buildings.secondTower.setBounce(0.2);
    Buildings.secondTower.setCollideWorldBounds(true);
    Buildings.secondTower.setImmovable(true);
    this.physics.add.collider(Buildings.secondTower, MapExtras.tiles);

    Buildings.buildingsGroup.add(Buildings.tower);
    Buildings.buildingsGroup.add(Buildings.secondTower);
  }
}
