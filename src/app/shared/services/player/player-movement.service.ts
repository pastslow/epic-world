import { Injectable } from '@angular/core';
import { GameCursors } from '~/src/app/features/models/game-cursors.model';
import { Parallax } from '~/src/app/features/models/parallax.model';
import { DynamicBody } from '../../interfaces/dynamic-body.interface';
import { JoystickController } from '../../interfaces/joystick-controller.interface';

@Injectable({ providedIn: 'root' })
export class PlayerMovementService {
   public holdingKey = 0;

   public animEntityMovement(entity: DynamicBody, joystick: JoystickController): void {
      let velocityX = 0;
      let animationKey = 'player_idle';

      if (GameCursors.keyboardControls.left.isDown || joystick?.left) {
         const isRunning = this.holdingKey > 100;
         Parallax.listenToParallaxMovement(isRunning, 'left', entity.x);
         entity.body.setOffset(20, 0);

         entity.flipX = true;
         velocityX = isRunning ? -180 : -100;
         animationKey = isRunning ? 'player_run_equipped' : 'player_walk_equipped';
         this.holdingKey++;
      } else if (GameCursors.keyboardControls.right.isDown || joystick?.right) {
         const isRunning = this.holdingKey > 100;
         Parallax.listenToParallaxMovement(isRunning, 'right', entity.x);

         entity.flipX = false;
         entity.body.setOffset(0, 0);
         velocityX = isRunning ? 180 : 100;
         animationKey = isRunning ? 'player_run_equipped' : 'player_walk_equipped';
         this.holdingKey++;
      } else {
         this.holdingKey = 0;
      }

      entity.setVelocityX(velocityX);

      if (entity.targetOrigin.combatAttributes.isAttacking) {
         return;
      }

      entity.anims.play(animationKey, true);
   }

   public animEntityJumping(entity: DynamicBody, joystick: JoystickController): void {
      if (GameCursors.keyboardControls.up.isDown || joystick?.up) {
         if (entity.body.touching.down && Math.abs(entity.body.velocity.y) < 10) {
            entity.setVelocityY(-200);
         }
      }
   }
}
