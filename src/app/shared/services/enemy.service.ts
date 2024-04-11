import { Injectable } from "@angular/core";
import { AnimationFrame } from "../../features/models/animation-frame.model";
import { GameScene } from "../../features/models/game-scene.model";
import { EnemyState } from "../../features/state-models/enemy-state.model";
import { ImageFrame } from "../interfaces/image-frames.interface";

@Injectable({
  providedIn: "root",
})
export class EnemyService {
  public entity: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;

  public initializeEnemies(
    platforms: Phaser.Physics.Arcade.StaticGroup,
    buildingsGroup: Phaser.Physics.Arcade.Group
  ): void {
    this.entity = GameScene.physics.add.sprite(
      400,
      window.innerHeight - 100,
      EnemyState.enemies[0].name
    );
    this.entity.displayHeight = 90;
    this.entity.displayWidth = 90;

    this.entity.setBounce(0.2);
    this.entity.setCollideWorldBounds(true);

    this.generatePlayerAnimations();

    // --- initialize default animation for player --- //
    this.entity.anims.play("walking", true);

    GameScene.physics.add.collider(this.entity, platforms);

    // GameScene.physics.add.overlap(
    //   this.entity,
    //   buildingsGroup,
    //   this.playerHitBuilding,
    //   null,
    //   null
    // );
  }

  private generatePlayerAnimations(): void {
    EnemyState.enemies[0].imageFrames.forEach((frame: ImageFrame) => {
      AnimationFrame.create(
        this.entity,
        frame.name,
        EnemyState.enemies[0].name,
        frame.start,
        frame.end,
        frame.repeatable,
        frame.fps
      );
    });
  }
}
