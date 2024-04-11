import { Injectable } from "@angular/core";
import { AnimationFrame } from "../../features/models/animation-frame.model";
import { GameCursors } from "../../features/models/game-cursors.model";
import { GameScene } from "../../features/models/game-scene.model";
import { Parallax } from "../../features/models/parallax.model";
import { PlayerState } from "../../features/state-models/player-state.model";
import { ImageFrame } from "../interfaces/image-frames.interface";

@Injectable({
  providedIn: "root",
})
export class PlayerService {
  public entity: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
  public holdingKey = 0;
  public preventJumping: boolean;
  public isAttacking = false;

  public loadPlayer(): void {
    GameScene.load.spritesheet(
      PlayerState.player.name,
      PlayerState.player.image,
      { frameWidth: 48, frameHeight: 48 }
    );
  }

  public initializePlayer(
    platforms: Phaser.Physics.Arcade.StaticGroup,
    buildingsGroup: Phaser.Physics.Arcade.Group
  ): void {
    this.entity = GameScene.physics.add.sprite(
      100,
      window.innerHeight - 100,
      PlayerState.player.name
    );
    this.entity.displayHeight = 100;
    this.entity.displayWidth = 100;

    this.entity.setBounce(0.2);
    this.entity.setCollideWorldBounds(true);

    this.generatePlayerAnimations();

    // --- initialize default animation for player --- //
    this.entity.anims.play("idle", true);

    GameScene.physics.add.collider(this.entity, platforms);

    GameScene.physics.add.overlap(
      this.entity,
      buildingsGroup,
      this.playerHitBuilding,
      null,
      null
    );
  }

  public listenToPlayerActions(
    buildingsGroup: Phaser.Physics.Arcade.Group
  ): void {
    this.restrictPartialActionsInAreas(buildingsGroup);
    this.listenToPlayerMovement();
  }

  public listenToPlayerMovement(): void {
    if (this.isAttacking) {
      this.handleAttacking();
      return;
    }

    if (GameCursors.keyboardControls.space.isDown) {
      if (!this.isAttacking) {
        this.isAttacking = true;
        return;
      }
    }

    this.handleMovement();

    this.handleJumping();
  }

  private handleAttacking(): void {
    this.entity.anims.play("attack", true);

    this.entity.setVelocityX(0);

    if (GameCursors.keyboardControls.left.isDown) {
      this.entity.flipX = true;
    }

    if (GameCursors.keyboardControls.right.isDown) {
      this.entity.flipX = false;
    }

    if (
      this.entity.anims.currentFrame.index ===
        this.entity.anims.currentAnim.frames.length - 1 &&
      !GameCursors.keyboardControls.space.isDown
    ) {
      this.isAttacking = false;
    }
  }

  private handleMovement(): void {
    let velocityX = 0;
    let animationKey = "idle";

    if (GameCursors.keyboardControls.left.isDown) {
      const isRunning = this.holdingKey > 100;
      Parallax.listenToParallaxMovement(isRunning, "left", this.entity.x);
      this.entity.flipX = true;

      velocityX = isRunning ? -180 : -100;
      animationKey = isRunning ? "running" : "walking";
      this.holdingKey++;
    } else if (GameCursors.keyboardControls.right.isDown) {
      const isRunning = this.holdingKey > 100;
      Parallax.listenToParallaxMovement(isRunning, "right", this.entity.x);
      this.entity.flipX = false;
      velocityX = isRunning ? 180 : 100;
      animationKey = isRunning ? "running" : "walking";
      this.holdingKey++;
    } else {
      this.holdingKey = 0;
    }

    this.entity.setVelocityX(velocityX);
    this.entity.anims.play(animationKey, true);
  }

  private handleJumping(): void {
    if (
      GameCursors.keyboardControls.up.isDown &&
      this.entity.body.touching.down &&
      !this.preventJumping
    ) {
      this.entity.setVelocityY(-150);
    }
  }

  private restrictPartialActionsInAreas(
    buildingsGroup: Phaser.Physics.Arcade.Group
  ): void {
    this.preventJumping = GameScene.physics.overlap(
      this.entity,
      buildingsGroup
    );
  }

  private generatePlayerAnimations(): void {
    PlayerState.player.imageFrames.forEach((frame: ImageFrame) => {
      AnimationFrame.create(
        this.entity,
        frame.name,
        PlayerState.player.name,
        frame.start,
        frame.end,
        frame.repeatable,
        frame.fps
      );
    });
  }

  private playerHitBuilding(player, object) {
    // This function will be called when the player collides with the building
    // Add your collision handling logic here
    console.log("Player collided with the building!", object.name);
    // For example, you can add game over logic or perform some action when the collision occurs
  }
}
