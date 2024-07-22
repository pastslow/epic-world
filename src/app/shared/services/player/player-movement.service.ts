import { Injectable } from '@angular/core';
import { GameCursors } from '~/src/app/features/models/game-cursors.model';
import { GameScene } from '~/src/app/features/models/game-scene.model';
import { Parallax } from '~/src/app/features/models/parallax.model';
import { JoystickController } from '../../interfaces/joystick-controller.interface';

@Injectable({ providedIn: 'root' })
export class PlayerMovementService {
   public holdingKey = 0;
   public preventJumping: boolean;

   public animEntityMovement(entity: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody, joystick: JoystickController): void {
      let velocityX = 0;
      let animationKey = 'idle';

      if (GameCursors.keyboardControls.left.isDown || joystick?.left) {
         const isRunning = this.holdingKey > 100;
         Parallax.listenToParallaxMovement(isRunning, 'left', entity.x);

         entity.flipX = true;
         velocityX = isRunning ? -180 : -100;
         animationKey = isRunning ? 'running' : 'walking';
         this.holdingKey++;
      } else if (GameCursors.keyboardControls.right.isDown || joystick?.right) {
         const isRunning = this.holdingKey > 100;
         Parallax.listenToParallaxMovement(isRunning, 'right', entity.x);

         entity.flipX = false;
         velocityX = isRunning ? 180 : 100;
         animationKey = isRunning ? 'running' : 'walking';
         this.holdingKey++;
      } else {
         this.holdingKey = 0;
      }

      entity.setVelocityX(velocityX);
      entity.anims.play(animationKey, true);
   }

   public animEntityJumping(entity: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody, joystick: JoystickController): void {
      if ((GameCursors.keyboardControls.up.isDown || joystick?.up) && entity.body.touching.down && !this.preventJumping) {
         entity.setVelocityY(-150);
      }
   }

   public restrictPartialActionsInAreas(buildingsGroup: Phaser.Physics.Arcade.Group, entity: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody): void {
      this.preventJumping = GameScene.physics.overlap(entity, buildingsGroup);
   }
}
