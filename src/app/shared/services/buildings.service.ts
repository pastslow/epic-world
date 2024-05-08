import { Injectable } from "@angular/core";
import { GameScene } from "../../features/models/game-scene.model";
import { MapExtras } from "../../features/models/map-extras.model";
import { BuildingsState } from "../../features/state-models/buildings-state.model";
import { Target } from "../interfaces/target.interface";

@Injectable({ providedIn: "root" })
export class BuildingsService {
  public buildingsGroup: Phaser.Physics.Arcade.Group;

  public loadBuildings(): void {
    BuildingsState.buildings.forEach((entity: Target) => {
      GameScene.load.image(entity.name, entity.image);
    });
  }

  public initializeBuildings(): void {
    BuildingsState.buildings.forEach((entity: Target) => {
      let building: Phaser.Types.Physics.Arcade.ImageWithDynamicBody;
      const posY = entity.physicalAttributes.initialPositionY;

      this.buildingsGroup = GameScene.physics.add.group();

      building = GameScene.physics.add.image(
        entity.physicalAttributes.initialPosition,
        window.innerHeight - posY,
        entity.name
      );

      building.setBounce(0.2);
      building.setCollideWorldBounds(true);
      building.setImmovable(true);
      building.setName(entity.name);

      GameScene.physics.add.collider(building, MapExtras.tiles);

      this.buildingsGroup.add(building);
    });
  }
}