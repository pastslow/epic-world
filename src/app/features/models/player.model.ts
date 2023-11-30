import { AnimationFrame } from './animation-frame.model';
import { GameCursors } from './game-cursors.model';
import { Parallax } from './parallax.model';

export class Player {
  public static entity: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
  public static holdingKey = 0;
  public static preventJumping: boolean;

  public static loadPlayer(this: Phaser.Scene): void {
    this.load.spritesheet(
      'player',
      'assets/Characters/GraveRobber/anim/player.png',
      { frameWidth: 48, frameHeight: 48 }
    );
  }

  public static initializePlayer(
    this: Phaser.Scene,
    platforms: Phaser.Physics.Arcade.StaticGroup,
    buildingsGroup: Phaser.Physics.Arcade.Group
  ): void {
    Player.entity = this.physics.add.sprite(
      1000,
      window.innerHeight - 100,
      'player'
    );
    Player.entity.displayHeight = 100;
    Player.entity.displayWidth = 100;

    Player.entity.setBounce(0.2);
    Player.entity.setCollideWorldBounds(true);

    Player.generatePlayerAnimations();

    // --- initialize default animation for player --- //
    Player.entity.anims.play('idle', true);

    this.physics.add.collider(Player.entity, platforms);

    this.physics.add.overlap(
      Player.entity,
      buildingsGroup,
      Player.playerHitBuilding,
      null,
      this
    );
  }

  public static listenToPlayerActions(
    this: Phaser.Scene,
    buildingsGroup: Phaser.Physics.Arcade.Group
  ): void {
    Player.restrictPartialActionsInAreas.bind(this)(buildingsGroup);
    Player.listenToPlayerMovement();
  }

  public static listenToPlayerMovement(): void {
    if (GameCursors.keyboardControls.left.isDown) {
      const isRunning = Player.holdingKey > 100;

      Parallax.listenToParallaxMovement(isRunning, 'left', Player.entity.x);

      Player.entity.flipX = true;
      Player.entity.setVelocityX(isRunning ? -180 : -100);
      Player.entity.anims.play(isRunning ? 'running' : 'walking', true);
      Player.holdingKey++;
    } else if (GameCursors.keyboardControls.right.isDown) {
      const isRunning = Player.holdingKey > 100;

      Parallax.listenToParallaxMovement(isRunning, 'right', Player.entity.x);

      Player.entity.flipX = false;
      Player.entity.setVelocityX(isRunning ? 180 : 100);
      Player.entity.anims.play(isRunning ? 'running' : 'walking', true);

      Player.holdingKey++;
    } else {
      Player.entity.setVelocityX(0);
      Player.entity.anims.play('idle', true);
      Player.holdingKey = 0;
    }

    if (
      GameCursors.keyboardControls.up.isDown &&
      Player.entity.body.touching.down &&
      !Player.preventJumping
    ) {
      Player.entity.setVelocityY(-150);
    }
  }

  private static restrictPartialActionsInAreas(
    this: Phaser.Scene,
    buildingsGroup: Phaser.Physics.Arcade.Group
  ): void {
    Player.preventJumping = this.physics.overlap(Player.entity, buildingsGroup);
  }

  private static generatePlayerAnimations(): void {
    AnimationFrame.create(this.entity, 'idle', 'player', 0, 3, true, 10);
    AnimationFrame.create(this.entity, 'walking', 'player', 4, 9, true, 10);
    AnimationFrame.create(this.entity, 'running', 'player', 10, 15, true, 12);
  }

  private static playerHitBuilding(player, object) {
    // This function will be called when the player collides with the building
    // Add your collision handling logic here
    console.log('Player collided with the building!', object.name);
    // For example, you can add game over logic or perform some action when the collision occurs
  }
}
